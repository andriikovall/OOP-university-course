"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./models/User");
const UserStorage_1 = __importDefault(require("./storage/UserStorage"));
const buttons_1 = __importDefault(require("./buttons"));
const BotUiFacade_1 = __importDefault(require("./BotUiFacade"));
const Fighter_1 = require("./models/Fighter");
const FighterStorage_1 = __importDefault(require("./storage/FighterStorage"));
function extractUsername(user) {
    return user.username || `${user.first_name || ''} ${user.last_name || ''}`;
}
class OnStartCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute() {
        const newUser = new User_1.User(this.ctx.chat.id, extractUsername(this.ctx.from));
        UserStorage_1.default.addUser(newUser)
            .then(_ => {
            const btns = BotUiFacade_1.default.createInlineKeyBoard([[`${buttons_1.default.createNewFighter}`]]);
            this.ctx.reply('Hello. Thanks for beginning!\n' + 'Start a fight or create a new fighter!', btns);
        });
    }
}
exports.OnStartCommand = OnStartCommand;
class CreateFighterCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute() {
        const fighters = Object.values(buttons_1.default.fighters).map(f => [f]);
        const fightersBtns = BotUiFacade_1.default.createInlineKeyBoard(fighters);
        this.ctx.reply('Choose what type of hero you want. Choose wisely...', fightersBtns);
    }
}
exports.CreateFighterCommand = CreateFighterCommand;
class FighterTypeSelectedCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute() {
        this.ctx.reply('Take the name for your fighter!');
        let fighterType = 0;
        switch (this.ctx.message.text) {
            case buttons_1.default.fighters.smart: fighterType = Fighter_1.FighterType.FighterSmart;
            case buttons_1.default.fighters.strong: fighterType = Fighter_1.FighterType.FighterStrong;
            case buttons_1.default.fighters.awesome: fighterType = Fighter_1.FighterType.FighterAwesome;
            case buttons_1.default.fighters.powerfull: fighterType = Fighter_1.FighterType.FighterAwesome;
            case buttons_1.default.fighters.longLiving: fighterType = Fighter_1.FighterType.FighterLongLiving;
        }
        this.ctx.state.user.bufferFighterType = fighterType;
    }
}
exports.FighterTypeSelectedCommand = FighterTypeSelectedCommand;
class FighterNameConfirmingCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute() {
        // @todo
        const name = [...this.ctx.message.text].join('');
        const creatorId = this.ctx.state.user.id;
        const fighter = FighterStorage_1.default.createFighter(name, creatorId, this.ctx.state.user.bufferFighterType || Fighter_1.FighterType.FighterAwesome);
        FighterStorage_1.default.insertFighter(fighter).then(_ => {
            const reply = BotUiFacade_1.default.drawFighter(fighter);
            const btns = BotUiFacade_1.default.createInlineKeyBoard([[`${buttons_1.default.createNewFighter}`]]);
            this.ctx.reply(reply, btns);
        });
    }
}
exports.FighterNameConfirmingCommand = FighterNameConfirmingCommand;
