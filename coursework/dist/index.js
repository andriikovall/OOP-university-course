"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = __importDefault(require("telegraf"));
const config_1 = require("./config");
const bot = new telegraf_1.default(config_1.config.BOT_TOKEN);
bot.launch().then(() => console.log('bot started')).catch((err) => console.log('err', err));
