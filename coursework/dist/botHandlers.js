"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = __importDefault(require("telegraf"));
const UserStorage_1 = __importDefault(require("./storage/UserStorage"));
const index_1 = require("./index");
const buttons_1 = __importDefault(require("./config/buttons"));
;
const bot = new telegraf_1.default();
bot.use((ctx, next) => {
    ctx.state.user = UserStorage_1.default.getUserById(ctx.message.chat.id);
    return next();
});
bot.command('start', (ctx) => {
    if (!ctx.state.user)
        ctx.reply('Hello. Thanks for beginning!');
    index_1.app.onStart(ctx);
});
bot.hears(buttons_1.default.createNewFighter, (ctx) => {
    index_1.app.onCreateFighter(ctx);
});
bot.hears([...Object.values(buttons_1.default.fighters)], (ctx) => {
    index_1.app.onFighterTypeSelected(ctx);
});
bot.on('text', (ctx) => {
    index_1.app.onText(ctx);
});
exports.default = bot;
