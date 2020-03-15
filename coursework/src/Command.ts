// import Telegrah from 'telegraf';
import { User } from './models/User';
// import { FighterType, Fighter } from './models/Fighter';
import Application from './Application';
import { User as TelegrafUser } from 'telegraf/typings/telegram-types';
import UserStorage from './storage/UserStorage';
import buttons from './buttons';
import { ctxType } from './botHandlers';


export interface ICommand {
    ctx: ctxType,
    app: Application,
    execute(): void
}

function extractUsername(user: TelegrafUser): string {
    return user.username || `${user.first_name} ${user.last_name}`;
}


export class OnStartCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(): void {
        const newUser = new User(this.ctx.chat.id, extractUsername(this.ctx.from));
        UserStorage.addUser(newUser);
        this.app.botKeyboard.new();
        this.app.botKeyboard.add(`${buttons.createNewFighter}`);
        this.ctx.reply('Hello. Thanks for beginning!\n' + 'Start a fight or create a new fighter!', this.app.botKeyboard.draw());
    }
}


export class CreateFighterCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(): void {
        this.app.botKeyboard.new();
        const fighters: string[] = Object.values(buttons.fighters);
        fighters.forEach(f => this.app.botKeyboard.add(f));
        this.ctx.reply('Choose what type of hero you want. Choose wisely...', this.app.botKeyboard.draw());
    }
}

export class FighterTypeSelectedCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(): void {
        console.log(this.ctx.state.user, this.ctx.message.text);
    }
}