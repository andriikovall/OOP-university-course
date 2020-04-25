import { ICommand, OnStartCommand, CreateFighterCommand, FighterTypeSelectedCommand, FighterNameConfirmingCommand, FighetrsShowComamnd, ChooseFighterCommand, DeleteFighterCommand, EnemiesShowCommand, ChooseEnemyCommand, BattleCommand, BattleEndedCommand } from "./Command";
import Telegrah, { ContextMessageUpdate } from "telegraf";
import { config, configureStorages } from './config/config';
import { ctxType } from "./botHandlers";
import { UserSelectingFighterTypeState, UserDefaultState, UserStateEnum, UserSelectingEnemyState, UserState, UserInFightState } from "./models/User";
import BotUI,{ IBotUIHelper }  from './BotUiFacade';
import { FightResult } from "./Fight";


export class Application {

    // public botUI = new BotUI();
    public botUI: IBotUIHelper

    public runCommand(command: ICommand, doneCb: Function = () => {}) {
        command.execute(doneCb);
    }

    constructor(public bot: Telegrah<ContextMessageUpdate>) {
        this.botUI = new BotUI();
     }

    public start(): Promise<void> {
        return configureStorages()
            .then(() => this.bot.launch())
            .then(() => console.log('bot started'))
    }

    public onAny(ctx: ctxType) {
        this.botUI.user = ctx.state.user;
        if (!ctx.state.user && ctx.message.text !== '/start')
            this.onStart(ctx);
    }

    public onStart(ctx: ctxType) {
        this.runCommand(new OnStartCommand(ctx, this));
    }

    public onCreateFighter(ctx: ctxType) {
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
        if (ctx.state?.user?.state.canEnterFighterName()) {
            this.runCommand(new FighterNameConfirmingCommand(ctx, this), () => {
                ctx.state.user.setState(UserStateEnum.UserDefault);
            });
        }
    }

    public onFightersShow(ctx: ctxType) {
        this.runCommand(new FighetrsShowComamnd(ctx, this));
    }

    public onEmeniesShow(ctx: ctxType) {
        this.runCommand(new EnemiesShowCommand(ctx, this));
    }

    public onCallbackQuery(ctx: ctxType) {
        const cbQueryData: CallbackQueryData = JSON.parse(ctx.callbackQuery.data);
        const handler: Function = CallbackQueryHandler.getQueryHandler(ctx, this, cbQueryData.methodName, cbQueryData.args);
        handler();
    }

    public onFight(ctx: ctxType) {
        if (ctx.state.user.state.canStartFight()) {
            ctx.state.user.setState(new UserInFightState(ctx.state.user))
                .then(_ => {
                    ctx.reply('Mmm... Let the battle begin!! 💀');

                    const id1 = ctx.state.user.bufferFighterSelectedId, 
                          id2 = ctx.state.user.bufferEmenySelectedId;

                    this.runCommand(new BattleCommand(ctx, this, id1, id2), (result: FightResult) => {
                        this.runCommand(new BattleEndedCommand(ctx, this, result), () => {
                            ctx.state.user.setState(new UserDefaultState(ctx.state.user))
                        });
                    });
                })
        } else {
            ctx.replyWithMarkdown('You cannot start the fight before choosing your hero and the enemy! ❌');
        }
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
        app.runCommand(new ChooseFighterCommand(ctx, fighterId, app));
    }

    public static chooseEnemy(ctx: ctxType, app: Application, enemyId: number) {
        app.runCommand(new ChooseEnemyCommand(ctx, app, enemyId));
    }

    public static deleteFighter(ctx: ctxType, app: Application, fighterId: number) {
        app.runCommand(new DeleteFighterCommand(ctx, fighterId, app));
    }
}