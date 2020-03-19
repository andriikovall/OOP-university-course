"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_keyboard_1 = __importDefault(require("telegraf-keyboard"));
const Fighter_1 = require("./models/Fighter");
const telegraf_1 = require("telegraf");
const buttons_1 = __importDefault(require("./config/buttons"));
var ParseMode;
(function (ParseMode) {
    ParseMode[ParseMode["ParseModeMarkdown"] = 0] = "ParseModeMarkdown";
    ParseMode[ParseMode["ParseModeHTML"] = 1] = "ParseModeHTML";
})(ParseMode = exports.ParseMode || (exports.ParseMode = {}));
class TextFormatter {
    toUserLink(text, userId) {
        return this.toLink(text, `tg://user?id=` + userId);
    }
}
class HTMLFormatter extends TextFormatter {
    toItalic(str) {
        return `<i>${str}</i>`;
    }
    toBold(str) {
        return `<b>${str}</b>`;
    }
    toLink(text, url) {
        return `<a href="${encodeURI(url)}">${text}</a>`;
    }
}
class MDFormatter extends TextFormatter {
    toItalic(str) {
        return `_${str}_`;
    }
    toBold(str) {
        return `*${str}*`;
    }
    toLink(text, url) {
        return `[${text}](${encodeURI(url)})`;
    }
}
class UrlBtn {
    constructor(text, url) {
        this.text = text;
        this.url = url;
    }
}
exports.UrlBtn = UrlBtn;
class CallbackBtn {
    constructor(text, callback) {
        this.text = text;
        this.callback = callback;
    }
}
exports.CallbackBtn = CallbackBtn;
// FACADE
class BotUI {
    constructor() {
        this.parseMode = ParseMode.ParseModeMarkdown;
        this.keyBoard = new telegraf_keyboard_1.default();
    }
    drawFighter(fighter) {
        var _a, _b;
        const formatter = this.getCurrentTextFormatter();
        const msg = [
            `${formatter.toItalic('Name:')} ${formatter.toBold(fighter.name)}`,
            `${formatter.toItalic('Creator:')} ${formatter.toUserLink((_a = fighter.creator) === null || _a === void 0 ? void 0 : _a.nickName, (_b = fighter.creator) === null || _b === void 0 ? void 0 : _b.id)}`,
            `${formatter.toItalic('Type:')} ${formatter.toBold(Fighter_1.FighterType[fighter.type])}`,
            `${formatter.toBold('Abilities:')}`,
            ...(Object.entries(fighter.specs).map(([key, val]) => `   ${formatter.toBold(key)} ${formatter.toItalic(val)}`))
        ].join('\n');
        return msg;
    }
    clearKeyboard() {
        return this.createKeyboard([[]]);
    }
    createKeyboard(buttons) {
        var _a;
        if (buttons.length === 1 && ((_a = buttons[0]) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return this.keyBoard.clear();
        }
        this.keyBoard.new();
        for (const btnRow of buttons) {
            this.keyBoard.add(...btnRow);
        }
        return this.keyBoard.draw();
    }
    createExtraOptions(opts) {
        if (!opts.markup)
            opts.markup = [];
        const inlineKeyboard = [];
        for (const row of opts.markup) {
            const mappedRow = row.map(btn => btn instanceof UrlBtn ?
                telegraf_1.Markup.urlButton(btn.text, btn.url) :
                telegraf_1.Markup.callbackButton(btn.text, btn.callback));
            inlineKeyboard.push(mappedRow);
        }
        const extra = telegraf_1.Extra.markup(telegraf_1.Markup.inlineKeyboard(inlineKeyboard));
        extra['caption'] = opts === null || opts === void 0 ? void 0 : opts.caption;
        switch (this.parseMode) {
            case ParseMode.ParseModeHTML:
                extra.parse_mode = 'HTML';
                break;
            case ParseMode.ParseModeMarkdown:
                extra.parse_mode = 'Markdown';
                break;
        }
        return extra;
    }
    getCurrentTextFormatter() {
        switch (this.parseMode) {
            case ParseMode.ParseModeMarkdown: return new MDFormatter();
            case ParseMode.ParseModeHTML: return new HTMLFormatter();
        }
    }
}
// PROXY
class BotUIProxied {
    constructor(_user = null) {
        this._user = _user;
        this.botUI = new BotUI();
        this.botUI.parseMode = ParseMode.ParseModeMarkdown;
    }
    getMainMenuButtons() {
        return this.createKeyboard([
            [buttons_1.default.createNewFighter],
            [buttons_1.default.showMyFighters],
            [buttons_1.default.showEnemies],
            [buttons_1.default.startFight]
        ]);
    }
    set parseMode(value) {
        this.botUI.parseMode = value;
    }
    get parseMode() {
        return this.botUI.parseMode;
    }
    set user(usr) {
        this._user = usr;
    }
    drawFighter(fighter) {
        const idLine = `${this.botUI.getCurrentTextFormatter().toItalic('Id:')} ${this.botUI.getCurrentTextFormatter().toBold(fighter.id + '')}`;
        const botString = this.botUI.drawFighter(fighter);
        if (fighter.creator.id === this._user.id) {
            return [
                idLine,
                botString
            ].join('\n');
        }
        return botString;
    }
    clearKeyboard() {
        return this.botUI.clearKeyboard();
    }
    createKeyboard(buttons) {
        if (!this._user.state.canStartFight()) {
            buttons = buttons.map(row => row.filter(btn => btn !== buttons_1.default.startFight));
        }
        return this.botUI.createKeyboard(buttons);
    }
    createExtraOptions(opts) {
        return this.botUI.createExtraOptions(opts);
    }
}
exports.default = BotUIProxied;
