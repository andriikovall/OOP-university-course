import Keyboard from 'telegraf-keyboard';

import { Fighter, FighterType } from "./models/Fighter";
import { Markup, Extra } from 'telegraf';
import { User } from './models/User';
import buttonsConfig from './config/buttons';


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


interface IBotUIHelper {
    parseMode: ParseMode;
    drawFighter(fighter: Fighter): string;
    clearKeyboard(): void;
    createKeyboard(buttons: string[][]): any;
    createExtraOptions(opts: ExtraOptions): any;
}


// FACADE
class BotUI implements IBotUIHelper {

    public parseMode: ParseMode = ParseMode.ParseModeMarkdown;

    private keyBoard = new Keyboard();
    
    public drawFighter(fighter: Fighter): string {
        const formatter: TextFormatter = this.getCurrentTextFormatter();
        const msg: string = [
            `${formatter.toItalic('Name:')} ${formatter.toBold(fighter.name)}`, 
            `${formatter.toItalic('Creator:')} ${formatter.toUserLink(fighter.creator?.nickName, fighter.creator?.id)}`, 
            `${formatter.toItalic('Type:')} ${formatter.toBold(FighterType[fighter.type])}`,
            `${formatter.toBold('Abilities:')}`, 
            ...(Object.entries(fighter.specs).map(([key, val]) => `   ${formatter.toBold(key)} ${formatter.toItalic(val)}`))
        ].join('\n');
        return msg;
        
    }

    public clearKeyboard() {
        return this.createKeyboard([[]]);
    }
    
    public createKeyboard(buttons: string[][]) {
        if (buttons.length === 1 && buttons[0]?.length === 0) {
            return this.keyBoard.clear();
        }

        this.keyBoard.new();
    
        for (const btnRow of buttons) {
            this.keyBoard.add(...btnRow)
        }
        return this.keyBoard.draw();
    }

    public createExtraOptions(opts: ExtraOptions) {
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

        switch (this.parseMode) {
            case ParseMode.ParseModeHTML: extra.parse_mode = 'HTML'; break;
            case ParseMode.ParseModeMarkdown: extra.parse_mode = 'Markdown'; break;
        }

        return extra;
    }
    
    public getCurrentTextFormatter(): TextFormatter {
        switch (this.parseMode) {
            case ParseMode.ParseModeMarkdown: return new MDFormatter();
            case ParseMode.ParseModeHTML: return new HTMLFormatter();
        }
    }

}

// PROXY
export default class BotUIProxied implements IBotUIHelper {
    
    public getMainMenuButtons() {
        return this.createKeyboard([
            [buttonsConfig.createNewFighter],
            [buttonsConfig.showMyFighters],
            [buttonsConfig.showEnemies],
            [buttonsConfig.startFight]]);
    }

    public set parseMode(value: ParseMode) {
        this.botUI.parseMode = value;
    }

    public get parseMode() {
        return this.botUI.parseMode
    }

    public set user(usr: User) {
        this._user = usr;
    }

    private botUI: BotUI;

    constructor(private _user: User = null) {
        this.botUI = new BotUI();
        this.botUI.parseMode = ParseMode.ParseModeMarkdown;
    }

    drawFighter(fighter: Fighter): string {
        const idLine = 
            `${this.botUI.getCurrentTextFormatter().toItalic('Id:')} ${this.botUI.getCurrentTextFormatter().toBold(fighter.id + '')}`; 
        const botString = this.botUI.drawFighter(fighter);

        if (fighter.creator.id === this._user.id) {
            return [
                idLine, 
                botString
            ].join('\n');
        }
        return botString;
    }
    clearKeyboard(): any {
        return this.botUI.clearKeyboard();
    }
    createKeyboard(buttons: string[][]) {
        if (!this._user.state.canStartFight()) {
            buttons = buttons.map(row => row.filter(btn => btn !== buttonsConfig.startFight));
        }
        
        return this.botUI.createKeyboard(buttons);
    }
    createExtraOptions(opts: ExtraOptions): any {
        return this.botUI.createExtraOptions(opts);
    }


}


