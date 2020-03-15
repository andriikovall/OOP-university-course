"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const config_1 = require("./config");
const User_1 = require("./models/User");
const telegraf_keyboard_1 = __importDefault(require("telegraf-keyboard"));
class Application {
    constructor(bot) {
        this.bot = bot;
        this.botKeyboard = new telegraf_keyboard_1.default();
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
        // ctx.state.user.setState(new UserDefaultState(ctx.state.user));
        this.runCommand(new Command_1.OnStartCommand(ctx, this));
        ctx.state.user.setState(new User_1.UserSelectingFighterTypeState(ctx.state.user));
    }
    onCreateFighter(ctx) {
        if (ctx.state.user.state.canSelectFighterType()) {
            this.runCommand(new Command_1.CreateFighterCommand(ctx, this));
            ctx.state.user.setState(User_1.UserStateEnum.UserDefault);
        }
    }
    onFighterTypeSelected(ctx) {
        this.runCommand(new Command_1.FighterTypeSelectedCommand(ctx, this));
        ctx.state.user.setState(User_1.UserStateEnum.UserDefault);
    }
}
exports.default = Application;
