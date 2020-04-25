import { Application } from './Application';
import Telegrah from 'telegraf';
import handlers from './botHandlers';

import { config } from './config/config';

const bot = new Telegrah(config.BOT_TOKEN as string);
bot.use(handlers.middleware());

export const app = new Application(bot);

app.start().catch((err: Error) => console.log(err.message));