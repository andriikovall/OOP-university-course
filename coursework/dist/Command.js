"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Telegrah from 'telegraf';
const User_1 = require("./models/User");
const UserStorage_1 = __importDefault(require("./storage/UserStorage"));
const buttons_1 = __importDefault(require("./buttons"));
function extractUsername(user) {
    return user.username || `${user.first_name} ${user.last_name}`;
}
class OnStartCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute() {
        const newUser = new User_1.User(this.ctx.chat.id, extractUsername(this.ctx.from));
        UserStorage_1.default.addUser(newUser);
        this.app.botKeyboard.new();
        this.app.botKeyboard.add(`${buttons_1.default.createNewFighter}`);
        this.ctx.reply('Hello. Thanks for beginning!\n' + 'Start a fight or create a new fighter!', this.app.botKeyboard.draw());
    }
}
exports.OnStartCommand = OnStartCommand;
class CreateFighterCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute() {
        this.app.botKeyboard.new();
        const fighters = Object.values(buttons_1.default.fighters);
        fighters.forEach(f => this.app.botKeyboard.add(f));
        this.ctx.reply('Choose what type of hero you want. Choose wisely...', this.app.botKeyboard.draw());
    }
}
exports.CreateFighterCommand = CreateFighterCommand;
class FighterTypeSelectedCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute() {
        console.log(this.ctx.state.user, this.ctx.message.text);
    }
}
exports.FighterTypeSelectedCommand = FighterTypeSelectedCommand;
