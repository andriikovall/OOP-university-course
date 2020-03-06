"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = __importDefault(require("telegraf"));
const bot = new telegraf_1.default('1045750573:AAFyCWKHEqIMIBDCrlV3UrZDIIBHpLO10Q4');
bot.launch().then(() => console.log('bot started')).catch((err) => console.log('err', err));
