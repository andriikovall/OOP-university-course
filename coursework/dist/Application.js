"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const config_1 = require("./config/config");
const User_1 = require("./models/User");
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
    }
    onCreateFighter(ctx) {
        var _a, _b;
        console.log((_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.state);
        if ((_b = ctx.state.user) === null || _b === void 0 ? void 0 : _b.state.canSelectFighterType()) {
            this.runCommand(new Command_1.CreateFighterCommand(ctx, this));
            ctx.state.user.setState(new User_1.UserSelectingFighterTypeState(ctx.state.user));
        }
    }
    onFighterTypeSelected(ctx) {
        var _a;
        if ((_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.state.canSelectFighterType()) {
            this.runCommand(new Command_1.FighterTypeSelectedCommand(ctx, this));
            ctx.state.user.setState(User_1.UserStateEnum.UserEnteringFighterName);
        }
    }
    onText(ctx) {
        if (ctx.state.user.state.canEnterFighterName()) {
            this.runCommand(new Command_1.FighterNameConfirmingCommand(ctx, this));
            ctx.state.user.setState(User_1.UserStateEnum.UserDefault);
        }
    }
    onFightersShow(ctx) {
        this.runCommand(new Command_1.FighetrsShowComamnd(ctx, this));
    }
}
exports.default = Application;
