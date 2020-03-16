import Keyboard from 'telegraf-keyboard';

import { Fighter, FighterType } from "./models/Fighter";


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


// FACADE
export default class BotUI {

    private static keyBoard = new Keyboard();
    public static parseMode: ParseMode = ParseMode.ParseModeMarkdown;

    private static getCurrentTextFormatter(): TextFormatter {
        switch (BotUI.parseMode) {
            case ParseMode.ParseModeMarkdown: return new MDFormatter();
            case ParseMode.ParseModeHTML: return new HTMLFormatter();
        }
    }


    public static drawFighter(fighter: Fighter): string {
        const formatter: TextFormatter = BotUI.getCurrentTextFormatter();
        const msg: string = [
            `${formatter.toItalic('Name:')} ${formatter.toBold(fighter.name)}`, 
            `${formatter.toItalic('Creator:')} ${formatter.toUserLink(fighter.creator.nickName, fighter.creator.id)}`, 
            `${formatter.toItalic('Type:')} ${formatter.toBold(FighterType[fighter.type])}`,
            `${formatter.toBold('Abilities:')}`, 
            ...(Object.entries(fighter.specs).map(([key, val]) => `   ${formatter.toBold(key)} ${formatter.toItalic(val)}`))
        ].join('\n');
        return msg;

    }

    public static createInlineKeyBoard(buttons: string[][]) {
        BotUI.keyBoard.clear();
        BotUI.keyBoard.new();

        for (const btnRow of buttons) {
            BotUI.keyBoard.add(...btnRow)
        }
        return BotUI.keyBoard.draw();
    }
}


