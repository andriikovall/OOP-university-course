"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("./Application"));
const telegraf_1 = __importDefault(require("telegraf"));
const botHandlers_1 = __importDefault(require("./botHandlers"));
const config_1 = require("./config/config");
const bot = new telegraf_1.default(config_1.config.BOT_TOKEN);
bot.use(botHandlers_1.default.middleware());
exports.app = new Application_1.default(bot);
exports.app.start().catch((err) => console.log(err.message));
