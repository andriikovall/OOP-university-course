import Telegraf, { ContextMessageUpdate } from 'telegraf';

import UserStorage from './storage/UserStorage';
import { app } from './index';
import { User } from './models/User';

import buttons from './config/buttons';

export interface ctxType extends ContextMessageUpdate {
    state?: { user: User },
};

const bot = new Telegraf();

bot.use((ctx: ctxType, next) => {
    const userId = ctx?.message?.chat.id || ctx.callbackQuery?.message.chat.id;
    ctx.state.user = UserStorage.getUserById(userId);
    app.onAny(ctx);
    if (!ctx.state?.user?.state.isInFight())
        return next()
});

bot.command('start', (ctx: ctxType) => {
    if (!ctx.state.user) 
        ctx.reply('Hello. Thanks for beginning!');

    app.onStart(ctx);
});

bot.hears(buttons.createNewFighter, (ctx: ctxType) => {
    app.onCreateFighter(ctx);
});

bot.hears(buttons.showMyFighters, (ctx: ctxType) => {
    console.log('showMyFighters');
    app.onFightersShow(ctx);
})

bot.hears([...Object.values(buttons.fighters)], (ctx: ctxType) => {
    app.onFighterTypeSelected(ctx);
});

bot.hears(buttons.showEnemies, (ctx: ctxType) => {
    app.onEmeniesShow(ctx);
});

bot.hears(buttons.startFight, (ctx: ctxType) => {
    app.onFight(ctx);
})

bot.on('text', (ctx: ctxType) => {
    app.onText(ctx);
});

bot.on('callback_query', (ctx: ctxType) => {
    app.onCallbackQuery(ctx);
})



export default bot;
