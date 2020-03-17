import { User } from './models/User';
import Application from './Application';
import { User as TelegrafUser, ExtraPhoto } from 'telegraf/typings/telegram-types';
import UserStorage from './storage/UserStorage';
import { ctxType } from './botHandlers';
import buttons from './config/buttons';
import BotUI, { ParseMode, UrlBtn, CallbackBtn } from './BotUiFacade';
import { FighterType, Fighter } from './models/Fighter';
import FighterStorage from './storage/FighterStorage';

export interface ICommand {
    ctx: ctxType,
    app: Application,
    execute(): void
}

function extractUsername(user: TelegrafUser): string {
    return user.username || `${user.first_name || ''} ${user.last_name || ''}`;
}


export class OnStartCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(): void {
        const newUser = new User(this.ctx.chat.id, extractUsername(this.ctx.from));
        UserStorage.addUser(newUser)
            .then(_ => {
                const btns = BotUI.createKeyboard([[`${buttons.createNewFighter}`]]);
                this.ctx.reply('Start a fight or create a new fighter!', btns);
            });
    }
}


export class CreateFighterCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(): void {
        const fighters: string[][] = Object.values(buttons.fighters).map(f => [f]);
        const fightersBtns = BotUI.createKeyboard(fighters);
        this.ctx.reply('Choose what type of hero you want. Choose wisely...', fightersBtns);
    }
}

export class FighterTypeSelectedCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(): void {
        this.ctx.reply('Take the name for your fighter!', BotUI.clearKeyboard());
        let fighterType: FighterType = 0;
        switch (this.ctx.message.text) {
            case buttons.fighters.smart: fighterType = FighterType.FighterSmart; break;
            case buttons.fighters.strong: fighterType = FighterType.FighterStrong; break;
            case buttons.fighters.awesome: fighterType = FighterType.FighterAwesome; break;
            case buttons.fighters.powerfull: fighterType = FighterType.FighterAwesome; break;
            case buttons.fighters.lucky: fighterType = FighterType.FighterLucky; break;
        }

        console.log('fighterType:', fighterType, this.ctx.message.text);
        UserStorage.setUserFighterTypeChoice(this.ctx.state.user, fighterType);
    }

}

export class FighterNameConfirmingCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute() {

        const name: string = this.ctx.message.text;
        const creatorId: number = this.ctx.state.user.id;

        const fighter = FighterStorage.createFighter(name, creatorId, this.ctx.state.user.bufferFighterType || FighterType.FighterAwesome);
        FighterStorage.insertFighter(fighter).then(_ => {
            // nothing will change, because of BUILDER
            // BotUI.parseMode = ParseMode.ParseModeHTML;
            const reply = BotUI.drawFighter(fighter);
            const btns = BotUI.createKeyboard([[`${buttons.createNewFighter}`], [`${buttons.showMyFighters}`]]);
            const extraMessageConfig = BotUI.createExtraOptions({ caption: reply })
            this.ctx.replyWithPhoto(fighter.photoUrl, { ...extraMessageConfig, ...btns } as ExtraPhoto);
        })
    }
}


export class FighetrsShowComamnd implements ICommand {
    constructor(public ctx: ctxType, public app: Application) { }

    execute() {
        const fighters: Fighter[] = this.ctx.state.user.getFighters();
        for (const f of fighters) {
            const reply = BotUI.drawFighter(f);
            const buttons = [
                [ new CallbackBtn('Choose for fight', '   '), new CallbackBtn('Delete(', '   ')]
            ];

            const extraMessageConfig = BotUI.createExtraOptions({ markup: buttons, caption: reply });
            this.ctx.replyWithPhoto(f.photoUrl, extraMessageConfig as ExtraPhoto);
        }
    }
}