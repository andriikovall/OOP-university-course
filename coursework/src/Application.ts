import { ICommand, OnStartCommand, CreateFighterCommand, FighterTypeSelectedCommand, FighterNameConfirmingCommand, FighetrsShowComamnd } from "./Command";
import Telegrah, { ContextMessageUpdate } from "telegraf";
import { config, configureStorages } from './config/config';
import { ctxType } from "./botHandlers";
import { UserSelectingFighterTypeState, UserDefaultState, UserStateEnum } from "./models/User";
import { Fighter } from "./models/Fighter";

export default class Application {

    public runCommand(command: ICommand) {
        command.execute();
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
            this.runCommand(new CreateFighterCommand(ctx, this));
            ctx.state.user.setState(new UserSelectingFighterTypeState(ctx.state.user));
        }
    }

    public onFighterTypeSelected(ctx: ctxType) {
        if (ctx.state.user?.state.canSelectFighterType()) {
            this.runCommand(new FighterTypeSelectedCommand(ctx, this));
            ctx.state.user.setState(UserStateEnum.UserEnteringFighterName);
        }
    }   

    public onText(ctx: ctxType) {
        if (ctx.state.user.state.canEnterFighterName()) {
            this.runCommand(new FighterNameConfirmingCommand(ctx, this));
            ctx.state.user.setState(UserStateEnum.UserDefault);
        }
    }

    public onFightersShow(ctx: ctxType) {
        this.runCommand(new FighetrsShowComamnd(ctx, this));
    }
}