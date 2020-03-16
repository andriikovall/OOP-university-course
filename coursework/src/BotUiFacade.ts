import Keyboard from 'telegraf-keyboard';

import { Fighter } from "./models/Fighter";


// FACADE
export default class BotUI {

    private static keyBoard = new Keyboard();

    public static drawFighter(fighter: Fighter): string {
        // @todo fix
        return JSON.stringify(fighter, null, 2);
    }

    public static createInlineKeyBoard(buttons: string[][]) {
        BotUI.keyBoard.clear();
        BotUI.keyBoard.new();

        for (const btnRow of buttons) {
            BotUI.keyBoard.add(...btnRow)
        }
        return BotUI.keyBoard.draw();
    }
}