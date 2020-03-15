import { app } from './index';
import Telegraf, { ContextMessageUpdate } from 'telegraf';
import UserStorage from './storage/UserStorage';
import { User } from './models/User';
import { CreateFighterCommand } from './Command';

export interface ctxType extends ContextMessageUpdate {
    state: any,
};

const bot = new Telegraf();

bot.use((ctx: ctxType, next) => {
    ctx.state.user = UserStorage.getUserById(ctx.message.chat.id);
    return next()
});

bot.command('start', (ctx: ctxType) => {
    console.log(ctx.state.user);
    app.onStart(ctx);
});


export default bot;
