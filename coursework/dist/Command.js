"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./models/User");
const UserStorage_1 = __importDefault(require("./storage/UserStorage"));
const buttons_1 = __importDefault(require("./config/buttons"));
const BotUiFacade_1 = __importStar(require("./BotUiFacade"));
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
    execute(cb) {
        const newUser = new User_1.User(this.ctx.chat.id, extractUsername(this.ctx.from));
        UserStorage_1.default.addUser(newUser)
            .then(_ => {
            const btns = BotUiFacade_1.default.createKeyboard([[`${buttons_1.default.createNewFighter}`]]);
            this.ctx.reply('Start a fight or create a new fighter!', btns)
                .then(_ => cb());
        });
    }
}
exports.OnStartCommand = OnStartCommand;
class CreateFighterCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute(cb) {
        const fighters = Object.values(buttons_1.default.fighters).map(f => [f]);
        const fightersBtns = BotUiFacade_1.default.createKeyboard(fighters);
        this.ctx.reply('Choose what type of hero you want. Choose wisely...', fightersBtns)
            .then(_ => cb());
    }
}
exports.CreateFighterCommand = CreateFighterCommand;
class FighterTypeSelectedCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute(cb) {
        this.ctx.reply('Take the name for your fighter!', BotUiFacade_1.default.clearKeyboard());
        let fighterType = 0;
        switch (this.ctx.message.text) {
            case buttons_1.default.fighters.smart:
                fighterType = Fighter_1.FighterType.FighterSmart;
                break;
            case buttons_1.default.fighters.strong:
                fighterType = Fighter_1.FighterType.FighterStrong;
                break;
            case buttons_1.default.fighters.awesome:
                fighterType = Fighter_1.FighterType.FighterAwesome;
                break;
            case buttons_1.default.fighters.powerfull:
                fighterType = Fighter_1.FighterType.FighterAwesome;
                break;
            case buttons_1.default.fighters.lucky:
                fighterType = Fighter_1.FighterType.FighterLucky;
                break;
        }
        console.log('fighterType:', fighterType, this.ctx.message.text);
        UserStorage_1.default.setUserFighterTypeChoice(this.ctx.state.user, fighterType)
            .then(_ => cb());
    }
}
exports.FighterTypeSelectedCommand = FighterTypeSelectedCommand;
class FighterNameConfirmingCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute(cb) {
        const name = this.ctx.message.text;
        const creatorId = this.ctx.state.user.id;
        const fighter = FighterStorage_1.default.createFighter(name, creatorId, this.ctx.state.user.bufferFighterType || Fighter_1.FighterType.FighterAwesome);
        FighterStorage_1.default.insertFighter(fighter).then(_ => {
            // nothing will change, because of BUILDER
            // BotUI.parseMode = ParseMode.ParseModeHTML;
            const reply = BotUiFacade_1.default.drawFighter(fighter);
            const btns = BotUiFacade_1.default.createKeyboard([[`${buttons_1.default.createNewFighter}`], [`${buttons_1.default.showMyFighters}`]]);
            const extraMessageConfig = BotUiFacade_1.default.createExtraOptions({ caption: reply });
            this.ctx.replyWithPhoto(fighter.photoUrl, { ...extraMessageConfig, ...btns })
                .then(_ => cb());
        });
    }
}
exports.FighterNameConfirmingCommand = FighterNameConfirmingCommand;
class FighetrsShowComamnd {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute(cb) {
        const fighters = this.ctx.state.user.getFighters();
        for (const f of fighters) {
            const reply = BotUiFacade_1.default.drawFighter(f);
            const buttons = [
                [new BotUiFacade_1.CallbackBtn('Choose for fight', '   '), new BotUiFacade_1.CallbackBtn('Delete(', '   ')]
            ];
            const extraMessageConfig = BotUiFacade_1.default.createExtraOptions({ markup: buttons, caption: reply });
            this.ctx.replyWithPhoto(f.photoUrl, extraMessageConfig)
                .then(_ => cb());
        }
    }
}
exports.FighetrsShowComamnd = FighetrsShowComamnd;
