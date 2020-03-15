"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const config_1 = require("./config");
class Application {
    constructor(bot) {
        this.bot = bot;
    }
    runCommand(command) {
        command.execute();
    }
    start() {
        return config_1.configureStorages()
            .then(() => this.bot.launch())
            .then(() => console.log('bot started'));
    }
    onStart(ctx) {
        this.runCommand(new Command_1.OnStartCommand(ctx, this));
        ctx.reply('Hello. Thanks for beginning!\n' + 'Start a fight or create a new fighter!');
    }
}
exports.default = Application;
