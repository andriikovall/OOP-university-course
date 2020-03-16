import Telegraf, { ContextMessageUpdate } from 'telegraf';

import UserStorage from './storage/UserStorage';
import { app } from './index';
import { User } from './models/User';

import buttons from './buttons';

export interface ctxType extends ContextMessageUpdate {
    state?: { user: User },
};

const bot = new Telegraf();

bot.use((ctx: ctxType, next) => {
    ctx.state.user = UserStorage.getUserById(ctx.message.chat.id);
    return next()
});

bot.command('start', (ctx: ctxType) => {
    app.onStart(ctx);
});

bot.hears(buttons.createNewFighter, (ctx: ctxType) => {
    app.onCreateFighter(ctx);
});

bot.hears([...Object.values(buttons.fighters)], (ctx: ctxType) => {
    app.onFighterTypeSelected(ctx);
});

bot.on('text', (ctx: ctxType) => {
    app.onText(ctx);
});



export default bot;
