"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./models/User");
const UserStorage_1 = __importDefault(require("./storage/UserStorage"));
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
    }
}
exports.OnStartCommand = OnStartCommand;
class CreateFighterCommand {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    execute() {
        console.log('creating fighter');
    }
}
exports.CreateFighterCommand = CreateFighterCommand;
