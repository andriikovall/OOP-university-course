import { ICommand, OnStartCommand } from "./Command";
import Telegrah, { ContextMessageUpdate } from "telegraf";
import { config, configureStorages } from './config';
import { ctxType } from "./botHandlers";

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
        ctx.reply('Hello. Thanks for beginning!\n' + 'Start a fight or create a new fighter!');
    }
}