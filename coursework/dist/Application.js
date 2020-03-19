"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const config_1 = require("./config/config");
const User_1 = require("./models/User");
const BotUiFacade_1 = __importDefault(require("./BotUiFacade"));
class Application {
    constructor(bot) {
        this.bot = bot;
        this.botUI = new BotUiFacade_1.default();
    }
    runCommand(command, doneCb = () => { }) {
        command.execute(doneCb);
    }
    start() {
        return config_1.configureStorages()
            .then(() => this.bot.launch())
            .then(() => console.log('bot started'));
    }
    onAny(ctx) {
        this.botUI.user = ctx.state.user;
        if (!ctx.state.user)
            this.onStart(ctx);
    }
    onStart(ctx) {
        this.runCommand(new Command_1.OnStartCommand(ctx, this));
    }
    onCreateFighter(ctx) {
        var _a;
        if ((_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.state.canSelectFighterType()) {
            this.runCommand(new Command_1.CreateFighterCommand(ctx, this), () => {
                ctx.state.user.setState(new User_1.UserSelectingFighterTypeState(ctx.state.user));
            });
        }
    }
    onFighterTypeSelected(ctx) {
        var _a;
        if ((_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.state.canSelectFighterType()) {
            this.runCommand(new Command_1.FighterTypeSelectedCommand(ctx, this), () => {
                ctx.state.user.setState(User_1.UserStateEnum.UserEnteringFighterName);
            });
        }
    }
    onText(ctx) {
        var _a, _b;
        if ((_b = (_a = ctx.state) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.state.canEnterFighterName()) {
            this.runCommand(new Command_1.FighterNameConfirmingCommand(ctx, this), () => {
                ctx.state.user.setState(User_1.UserStateEnum.UserDefault);
            });
        }
    }
    onFightersShow(ctx) {
        this.runCommand(new Command_1.FighetrsShowComamnd(ctx, this));
    }
    onEmeniesShow(ctx) {
        this.runCommand(new Command_1.EnemiesShowCommand(ctx, this));
    }
    onCallbackQuery(ctx) {
        const cbQueryData = JSON.parse(ctx.callbackQuery.data);
        console.log(cbQueryData);
        const handler = CallbackQueryHandler.getQueryHandler(ctx, this, cbQueryData.methodName, cbQueryData.args);
        handler();
    }
    onFight(ctx) {
        if (ctx.state.user.state.canStartFight()) {
            ctx.reply('Mmm... Let the battle begin!! 💀');
            const id1 = ctx.state.user.bufferFighterSelectedId, id2 = ctx.state.user.bufferEmenySelectedId;
            this.runCommand(new Command_1.BattleCommand(ctx, this, id1, id2), (result) => {
                console.log(result);
            });
        }
        else {
            ctx.reply('You cannot start the fight before choosing your hero and the enemy! ❌');
        }
    }
}
exports.default = Application;
class CallbackQueryHandler {
    static getQueryHandler(ctx, app, methodName, args) {
        return () => CallbackQueryHandler[methodName](ctx, app, ...args);
    }
    // @todo proxy
    static chooseFighter(ctx, app, fighterId) {
        app.runCommand(new Command_1.ChooseFighterCommand(ctx, fighterId, app), () => {
            // ctx.state.user.setState(new UserSelectingEnemyState(ctx.state.user));
            // const fighter = FighterStorage.getFighterById(fighterId);
            // const reply = 'You selected ' + fighter.name + ' for fight!';
            // ctx.reply(reply);
            // ctx.answerCbQuery(reply);
        });
    }
    static chooseEnemy(ctx, app, enemyId) {
        app.runCommand(new Command_1.ChooseEnemyCommand(ctx, app, enemyId), () => {
        });
    }
    static deleteFighter(ctx, app, fighterId) {
        app.runCommand(new Command_1.DeleteFighterCommand(ctx, fighterId, app), () => {
            // ctx.state.user.setState(new UserSelectingEnemyState(ctx.state.user));
        });
    }
}
exports.CallbackQueryHandler = CallbackQueryHandler;
