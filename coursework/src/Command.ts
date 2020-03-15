import Telegrah, { ContextMessageUpdate } from 'telegraf';
import { User } from './models/User';
import { FighterType, Fighter } from './models/Fighter';
import Application from './Application';
import { User as TelegrafUser } from 'telegraf/typings/telegram-types';
import UserStorage from './storage/UserStorage';


export interface ICommand {
    ctx: ContextMessageUpdate,
    app: Application,
    execute(): void
}

function extractUsername(user: TelegrafUser): string {
    return user.username || `${user.first_name} ${user.last_name}`;
}


export class OnStartCommand implements ICommand {

    constructor(public ctx: ContextMessageUpdate, public app: Application) { }

    execute(): void {
        const newUser = new User(this.ctx.chat.id, extractUsername(this.ctx.from));
        UserStorage.addUser(newUser);
    }
}


export class CreateFighterCommand implements ICommand {

    constructor(public ctx: ContextMessageUpdate, public app: Application) { }

    execute(): void {
        console.log('creating fighter');
    }
}