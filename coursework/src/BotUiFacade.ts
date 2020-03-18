import Keyboard from 'telegraf-keyboard';

import { Fighter, FighterType } from "./models/Fighter";
// import { Extra, Markup } from 'telegraf/typings/index';
import { ExtraEditMessage } from 'telegraf/typings/telegram-types';
import { Markup, Extra } from 'telegraf';
import { isArray } from 'util';


export enum ParseMode {
    ParseModeMarkdown, 
    ParseModeHTML
}

abstract class TextFormatter {
    abstract toItalic(str: string): string;
    abstract toBold(str: string): string;
    abstract toLink(text: string, url: string);
    
    toUserLink(text: string, userId: number) {
        return this.toLink(text, `tg://user?id=` + userId);
    }
}

class HTMLFormatter extends TextFormatter {
    toItalic(str: string): string {
        return `<i>${str}</i>`
    }
    toBold(str: string): string {
        return `<b>${str}</b>`
    }
    toLink(text: string, url: string) {
        return `<a href="${encodeURI(url)}">${text}</a>`;
    }
}

class MDFormatter extends TextFormatter {
    toItalic(str: string): string {
        return `_${str}_`;
    }
    toBold(str: string): string {
        return `*${str}*`;
    }
    toLink(text: string, url: string) {
        return `[${text}](${encodeURI(url)})`;
    }
    
}

export class UrlBtn {
    constructor(public text: string, public url: string) {}
}

export class CallbackBtn {
    constructor(public text: string, public callback: string) {}
}

interface ExtraOptions {
    markup?: (UrlBtn | CallbackBtn)[][];
    caption?: string;
}


// FACADE
export default class BotUI {

    public static parseMode: ParseMode = ParseMode.ParseModeMarkdown;

    private static keyBoard = new Keyboard();
    
    public static drawFighter(fighter: Fighter): string {
        const formatter: TextFormatter = BotUI.getCurrentTextFormatter();
        const msg: string = [
            `${formatter.toItalic('Name:')} ${formatter.toBold(fighter.name)}`, 
            `${formatter.toItalic('Creator:')} ${formatter.toUserLink(fighter.creator?.nickName, fighter.creator?.id)}`, 
            `${formatter.toItalic('Type:')} ${formatter.toBold(FighterType[fighter.type])}`,
            `${formatter.toBold('Abilities:')}`, 
            ...(Object.entries(fighter.specs).map(([key, val]) => `   ${formatter.toBold(key)} ${formatter.toItalic(val)}`))
        ].join('\n');
        return msg;
        
    }

    public static clearKeyboard() {
        return BotUI.createKeyboard([[]]);
    }
    
    public static createKeyboard(buttons: string[][]) {
        if (buttons.length === 1 && buttons[0]?.length === 0) {
            return BotUI.keyBoard.clear();
        }

        BotUI.keyBoard.new();
    
        for (const btnRow of buttons) {
            BotUI.keyBoard.add(...btnRow)
        }
        return BotUI.keyBoard.draw();
    }

    public static createExtraOptions(opts: ExtraOptions) {
        if (!opts.markup)
        opts.markup = [];
        
        const inlineKeyboard = [];
        for (const row of opts.markup) {
            const mappedRow = row.map(btn => btn instanceof UrlBtn ? 
                Markup.urlButton(btn.text, btn.url) : 
                Markup.callbackButton(btn.text, btn.callback));
            inlineKeyboard.push(mappedRow);
        }

        const extra = Extra.markup(Markup.inlineKeyboard(inlineKeyboard));
        extra['caption'] = opts?.caption;

        switch (BotUI.parseMode) {
            case ParseMode.ParseModeHTML: extra.parse_mode = 'HTML'; break;
            case ParseMode.ParseModeMarkdown: extra.parse_mode = 'Markdown'; break;
        }

        return extra;
    }
    
    private static getCurrentTextFormatter(): TextFormatter {
        switch (BotUI.parseMode) {
            case ParseMode.ParseModeMarkdown: return new MDFormatter();
            case ParseMode.ParseModeHTML: return new HTMLFormatter();
        }
    }

}


