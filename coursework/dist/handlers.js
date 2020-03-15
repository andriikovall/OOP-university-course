"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const UserStorage_1 = __importDefault(require("./storage/UserStorage"));
const User_1 = require("./models/User");
function extractUsername(user) {
    return user.username || `${user.first_name} ${user.last_name}`;
}
index_1.bot.command('start', (ctx) => {
    // insert this into commands
    ctx.reply('Hello. Thanks for beginning!\n' + 'Start a fight or create a new fighter!');
    const newUser = new User_1.User(ctx.chat.id, extractUsername(ctx.from));
    UserStorage_1.default.addUser(newUser);
});
index_1.bot.use((ctx, next) => {
    // insert this into commands
    ctx.state.user = UserStorage_1.default.getUserById(ctx.message.chat.id);
    return next();
});
