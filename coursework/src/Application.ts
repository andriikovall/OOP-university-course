import { ICommand, OnStartCommand, CreateFighterCommand, FighterTypeSelectedCommand, FighterNameConfirmingCommand, FighetrsShowComamnd, ChooseFighterCommand, DeleteFighterCommand } from "./Command";
import Telegrah, { ContextMessageUpdate } from "telegraf";
import { config, configureStorages } from './config/config';
import { ctxType } from "./botHandlers";
import { UserSelectingFighterTypeState, UserDefaultState, UserStateEnum, UserSelectingEnemyState } from "./models/User";
import FighterStorage from "./storage/FighterStorage";

export default class Application {

    public runCommand(command: ICommand, doneCb: Function = () => {}) {
        command.execute(doneCb);
    }

    constructor(public bot: Telegrah<ContextMessageUpdate>) { }

    public start(): Promise<void> {
        return configureStorages()
            .then(() => this.bot.launch())
            .then(() => console.log('bot started'))
    }

    public onStart(ctx: ctxType) {
        this.runCommand(new OnStartCommand(ctx, this));
    }

    public onCreateFighter(ctx: ctxType) {
        console.log(ctx.state.user?.state);
        if (ctx.state.user?.state.canSelectFighterType()) {
            this.runCommand(new CreateFighterCommand(ctx, this), () => {
                ctx.state.user.setState(new UserSelectingFighterTypeState(ctx.state.user));
            });
        }
    }

    public onFighterTypeSelected(ctx: ctxType) {
        if (ctx.state.user?.state.canSelectFighterType()) {
            this.runCommand(new FighterTypeSelectedCommand(ctx, this), () => {
                ctx.state.user.setState(UserStateEnum.UserEnteringFighterName);
            });
        }
    }   

    public onText(ctx: ctxType) {
        if (ctx.state.user.state.canEnterFighterName()) {
            this.runCommand(new FighterNameConfirmingCommand(ctx, this), () => {
                ctx.state.user.setState(UserStateEnum.UserDefault);
            });
        }
    }

    public onFightersShow(ctx: ctxType) {
        this.runCommand(new FighetrsShowComamnd(ctx, this));
    }

    public onCallbackQuery(ctx: ctxType) {
        const cbQueryData: CallbackQueryData = JSON.parse(ctx.callbackQuery.data);
        console.log(cbQueryData);
        const handler: Function = CallbackQueryHandler.getQueryHandler(ctx, this, cbQueryData.methodName, cbQueryData.args);
        handler();
    }
}

interface CallbackQueryData {
    methodName: string, 
    args: any[]
}


export class CallbackQueryHandler {

    public static getQueryHandler(ctx: ctxType, app: Application, methodName: string, args: any[]): Function {
        return () => CallbackQueryHandler[methodName](ctx, app, ...args);
    }

    // @todo proxy
    public static chooseFighter(ctx: ctxType, app: Application, fighterId: number) {
        app.runCommand(new ChooseFighterCommand(ctx, fighterId, app), () => {
            ctx.state.user.setState(new UserSelectingEnemyState(ctx.state.user));
            // const fighter = FighterStorage.getFighterById(fighterId);
            // const reply = 'You selected ' + fighter.name + ' for fight!';
            // ctx.reply(reply);
            // ctx.answerCbQuery(reply);
        });
    }

    public static deleteFighter(ctx: ctxType, app: Application, fighterId: number) {
        app.runCommand(new DeleteFighterCommand(ctx, fighterId, app), () => {
            // ctx.state.user.setState(new UserSelectingEnemyState(ctx.state.user));
        });
    }
}