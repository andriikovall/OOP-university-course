import { User } from './models/User';
import Application from './Application';
import { User as TelegrafUser } from 'telegraf/typings/telegram-types';
import UserStorage from './storage/UserStorage';
import { ctxType } from './botHandlers';
import buttons from './buttons';
import BotUI from './BotUiFacade';
import { Fighter, FighterSmart, FighterType } from './models/Fighter';
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
                const btns = BotUI.createInlineKeyBoard([[`${buttons.createNewFighter}`]]);
                this.ctx.reply('Hello. Thanks for beginning!\n' + 'Start a fight or create a new fighter!', btns);
            });
    }
}


export class CreateFighterCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(): void {
        const fighters: string[][] = Object.values(buttons.fighters).map(f => [f]);
        const fightersBtns = BotUI.createInlineKeyBoard(fighters);
        this.ctx.reply('Choose what type of hero you want. Choose wisely...', fightersBtns);
    }
}

export class FighterTypeSelectedCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(): void {
        this.ctx.reply('Take the name for your fighter!');
        let fighterType: FighterType = 0;
        switch (this.ctx.message.text) {
            case buttons.fighters.smart: fighterType = FighterType.FighterSmart;
            case buttons.fighters.strong: fighterType = FighterType.FighterStrong;
            case buttons.fighters.awesome: fighterType = FighterType.FighterAwesome;
            case buttons.fighters.powerfull: fighterType = FighterType.FighterAwesome;
            case buttons.fighters.longLiving: fighterType = FighterType.FighterLongLiving;
        }
        this.ctx.state.user.bufferFighterType = fighterType;
    }

}

export class FighterNameConfirmingCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute() {
        // @todo

        const name: string = [...this.ctx.message.text].join('');
        const creatorId: number = this.ctx.state.user.id;

        const fighter = FighterStorage.createFighter(name, creatorId, this.ctx.state.user.bufferFighterType || FighterType.FighterAwesome);
        FighterStorage.insertFighter(fighter).then(_ => {
            const reply = BotUI.drawFighter(fighter);
            const btns = BotUI.createInlineKeyBoard([[`${buttons.createNewFighter}`]]);
            this.ctx.reply(reply, btns);
        })
    }
}