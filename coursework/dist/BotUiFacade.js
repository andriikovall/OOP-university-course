"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_keyboard_1 = __importDefault(require("telegraf-keyboard"));
const Fighter_1 = require("./models/Fighter");
const telegraf_1 = require("telegraf");
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
    static drawFighter(fighter) {
        const formatter = BotUI.getCurrentTextFormatter();
        const msg = [
            `${formatter.toItalic('Name:')} ${formatter.toBold(fighter.name)}`,
            `${formatter.toItalic('Creator:')} ${formatter.toUserLink(fighter.creator.nickName, fighter.creator.id)}`,
            `${formatter.toItalic('Type:')} ${formatter.toBold(Fighter_1.FighterType[fighter.type])}`,
            `${formatter.toBold('Abilities:')}`,
            ...(Object.entries(fighter.specs).map(([key, val]) => `   ${formatter.toBold(key)} ${formatter.toItalic(val)}`))
        ].join('\n');
        return msg;
    }
    static clearKeyboard() {
        return BotUI.createKeyboard([[]]);
    }
    static createKeyboard(buttons) {
        var _a;
        if (buttons.length === 1 && ((_a = buttons[0]) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return BotUI.keyBoard.clear();
        }
        BotUI.keyBoard.new();
        for (const btnRow of buttons) {
            BotUI.keyBoard.add(...btnRow);
        }
        return BotUI.keyBoard.draw();
    }
    static createExtraOptions(opts) {
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
        switch (BotUI.parseMode) {
            case ParseMode.ParseModeHTML:
                extra.parse_mode = 'HTML';
                break;
            case ParseMode.ParseModeMarkdown:
                extra.parse_mode = 'Markdown';
                break;
        }
        return extra;
    }
    static getCurrentTextFormatter() {
        switch (BotUI.parseMode) {
            case ParseMode.ParseModeMarkdown: return new MDFormatter();
            case ParseMode.ParseModeHTML: return new HTMLFormatter();
        }
    }
}
exports.default = BotUI;
BotUI.parseMode = ParseMode.ParseModeMarkdown;
BotUI.keyBoard = new telegraf_keyboard_1.default();
