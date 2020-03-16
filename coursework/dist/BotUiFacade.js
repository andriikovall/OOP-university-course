"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_keyboard_1 = __importDefault(require("telegraf-keyboard"));
// FACADE
class BotUI {
    static drawFighter(fighter) {
        // @todo fix
        return JSON.stringify(fighter, null, 2);
    }
    static createInlineKeyBoard(buttons) {
        BotUI.keyBoard.clear();
        BotUI.keyBoard.new();
        for (const btnRow of buttons) {
            BotUI.keyBoard.add(...btnRow);
        }
        return BotUI.keyBoard.draw();
    }
}
exports.default = BotUI;
BotUI.keyBoard = new telegraf_keyboard_1.default();
