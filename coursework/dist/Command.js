"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./models/User");
const Application_1 = require("./Application");
const UserStorage_1 = __importDefault(require("./storage/UserStorage"));
const buttons_1 = __importDefault(require("./config/buttons"));
const BotUiFacade_1 = require("./BotUiFacade");
const Fighter_1 = require("./models/Fighter");
const FighterStorage_1 = __importDefault(require("./storage/FighterStorage"));
const Fight_1 = require("./Fight");
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
            this.app.botUI.user = newUser;
            const btns = this.app.botUI.createKeyboard([[`${buttons_1.default.createNewFighter}`]]);
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
        const fightersBtns = this.app.botUI.createKeyboard(fighters);
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
        this.ctx.reply('Take the name for your fighter!', this.app.botUI.clearKeyboard());
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
                fighterType = Fighter_1.FighterType.FighterPowerfull;
                break;
            case buttons_1.default.fighters.lucky:
                fighterType = Fighter_1.FighterType.FighterLucky;
                break;
        }
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
        var _a;
        const name = this.ctx.message.text;
        const creatorId = this.ctx.state.user.id;
        const fighter = FighterStorage_1.default.createFighter(name, creatorId, (_a = this.ctx.state.user.bufferFighterType) !== null && _a !== void 0 ? _a : Fighter_1.FighterType.FighterAwesome);
        FighterStorage_1.default.insertFighter(fighter).then(_ => {
            // nothing will change, because of BUILDER
            // this.app.botUI.parseMode = ParseMode.ParseModeHTML;
            const reply = this.app.botUI.drawFighter(fighter);
            const btns = this.app.botUI.getMainMenuButtons();
            const extraMessageConfig = this.app.botUI.createExtraOptions({ caption: reply });
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
            const reply = this.app.botUI.drawFighter(f);
            const btns = [
                [new BotUiFacade_1.CallbackBtn(buttons_1.default.callbacks.selectFighter.text, JSON.stringify({ methodName: Application_1.CallbackQueryHandler.chooseFighter.name, args: [f.id] })),
                    new BotUiFacade_1.CallbackBtn(buttons_1.default.callbacks.deleteFighter.text, JSON.stringify({ methodName: Application_1.CallbackQueryHandler.deleteFighter.name, args: [f.id] }))]
            ];
            const extraMessageConfig = this.app.botUI.createExtraOptions({ markup: btns, caption: reply });
            this.ctx.replyWithPhoto(f.photoUrl, extraMessageConfig)
                .then(_ => cb());
        }
    }
}
exports.FighetrsShowComamnd = FighetrsShowComamnd;
class DeleteFighterCommand {
    constructor(ctx, fighterId, app) {
        this.ctx = ctx;
        this.fighterId = fighterId;
        this.app = app;
    }
    execute(cb) {
        FighterStorage_1.default.deleteFighter(this.fighterId)
            .then(res => {
            if (res) {
                this.ctx.answerCbQuery('Your fighter was deleted', true);
                this.ctx.deleteMessage();
            }
            cb(res);
        });
    }
}
exports.DeleteFighterCommand = DeleteFighterCommand;
class EnemiesShowCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute(cb) {
        const fighters = this.ctx.state.user.getEnemies();
        for (const f of fighters) {
            const reply = this.app.botUI.drawFighter(f);
            const btns = [
                [new BotUiFacade_1.CallbackBtn(buttons_1.default.callbacks.selectEnemy.text, JSON.stringify({ methodName: Application_1.CallbackQueryHandler.chooseEnemy.name, args: [f.id] }))]
            ];
            const extraMessageConfig = this.app.botUI.createExtraOptions({ markup: btns, caption: reply });
            this.ctx.replyWithPhoto(f.photoUrl, extraMessageConfig)
                .then(_ => cb());
        }
    }
}
exports.EnemiesShowCommand = EnemiesShowCommand;
class ChooseFighterCommand {
    constructor(ctx, fighterId, app) {
        this.ctx = ctx;
        this.fighterId = fighterId;
        this.app = app;
    }
    execute(cb) {
        this.ctx.state.user.bufferFighterSelectedId = this.fighterId;
        UserStorage_1.default.updateUser(this.ctx.state.user)
            .then(_ => {
            const fighter = FighterStorage_1.default.getFighterById(this.fighterId);
            const reply = 'You selected ' + fighter.name + ' for fight!';
            const btns = this.app.botUI.getMainMenuButtons();
            this.ctx.reply(reply, { ...btns });
            this.ctx.answerCbQuery(reply);
        })
            .then(_ => cb());
    }
}
exports.ChooseFighterCommand = ChooseFighterCommand;
class ChooseEnemyCommand {
    constructor(ctx, app, enemyId) {
        this.ctx = ctx;
        this.app = app;
        this.enemyId = enemyId;
    }
    execute(cb) {
        this.ctx.state.user.bufferEmenySelectedId = this.enemyId;
        UserStorage_1.default.updateUser(this.ctx.state.user)
            .then(_ => {
            const fighter = FighterStorage_1.default.getFighterById(this.enemyId);
            const reply = 'You selected ' + fighter.name + ' as the enemy!';
            const btns = this.app.botUI.getMainMenuButtons();
            this.ctx.reply(reply, { ...btns });
            this.ctx.answerCbQuery(reply);
        })
            .then(_ => cb());
    }
}
exports.ChooseEnemyCommand = ChooseEnemyCommand;
class BattleCommand {
    constructor(ctx, app, fighter1Id, fighter2Id) {
        this.ctx = ctx;
        this.app = app;
        this.fighter1Id = fighter1Id;
        this.fighter2Id = fighter2Id;
    }
    execute(cb) {
        const f1 = FighterStorage_1.default.getFighterById(this.fighter1Id);
        const f2 = FighterStorage_1.default.getFighterById(this.fighter2Id);
        const battle = new Fight_1.Fight(f1, f2);
        const battleResult = battle.begin();
        cb(battleResult);
    }
}
exports.BattleCommand = BattleCommand;
class BattleEndedCommand {
    constructor(ctx, app, result) {
        this.ctx = ctx;
        this.app = app;
        this.result = result;
    }
    execute(cb) {
        this.replyWithInterval(this.ctx, this.result.log, 500, () => {
            const reply = this.app.botUI.drawFightResult(this.result.winner, this.result.loser);
            this.ctx.replyWithMarkdown(reply)
                .then(_ => cb());
        });
    }
    replyWithInterval(ctx, messages, intervalMs, doneCb) {
        for (let i = 0; i < messages.length; i++) {
            setTimeout(() => {
                ctx.reply(messages[i]);
                if (i === messages.length - 1) {
                    doneCb();
                }
            }, i * intervalMs);
        }
    }
}
exports.BattleEndedCommand = BattleEndedCommand;
