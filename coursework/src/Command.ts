import { User } from './models/User';
import Application, { CallbackQueryHandler } from './Application';
import { User as TelegrafUser, ExtraPhoto } from 'telegraf/typings/telegram-types';
import UserStorage from './storage/UserStorage';
import { ctxType } from './botHandlers';
import buttons from './config/buttons';
import BotUI, { CallbackBtn } from './BotUiFacade';
import { FighterType, Fighter } from './models/Fighter';
import FighterStorage from './storage/FighterStorage';

export interface ICommand {
    ctx: ctxType,
    app: Application,
    execute(cb): void,
}

function extractUsername(user: TelegrafUser): string {
    return user.username || `${user.first_name || ''} ${user.last_name || ''}`;
}


export class OnStartCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(cb: Function): void {
        const newUser = new User(this.ctx.chat.id, extractUsername(this.ctx.from));
        UserStorage.addUser(newUser)
            .then(_ => {
                const btns = this.app.botUI.createKeyboard([[`${buttons.createNewFighter}`]]);
                this.ctx.reply('Start a fight or create a new fighter!', btns)
                    .then(_ => cb());
            });
    }
}


export class CreateFighterCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(cb: Function): void {
        const fighters: string[][] = Object.values(buttons.fighters).map(f => [f]);
        const fightersBtns = this.app.botUI.createKeyboard(fighters);
        this.ctx.reply('Choose what type of hero you want. Choose wisely...', fightersBtns)
            .then(_ => cb());
    }
}

export class FighterTypeSelectedCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(cb: Function): void {
        this.ctx.reply('Take the name for your fighter!', this.app.botUI.clearKeyboard());
        let fighterType: FighterType = 0;
        switch (this.ctx.message.text) {
            case buttons.fighters.smart: fighterType = FighterType.FighterSmart; break;
            case buttons.fighters.strong: fighterType = FighterType.FighterStrong; break;
            case buttons.fighters.awesome: fighterType = FighterType.FighterAwesome; break;
            case buttons.fighters.powerfull: fighterType = FighterType.FighterPowerfull; break;
            case buttons.fighters.lucky: fighterType = FighterType.FighterLucky; break;
        }

        UserStorage.setUserFighterTypeChoice(this.ctx.state.user, fighterType)
            .then(_ => cb());
    }

}

export class FighterNameConfirmingCommand implements ICommand {

    constructor(public ctx: ctxType, public app: Application) { }

    execute(cb: Function) {

        const name: string = this.ctx.message.text;
        const creatorId: number = this.ctx.state.user.id;

        const fighter = FighterStorage.createFighter(name, creatorId, this.ctx.state.user.bufferFighterType ?? FighterType.FighterAwesome);
        FighterStorage.insertFighter(fighter).then(_ => {
            // nothing will change, because of BUILDER
            // this.app.botUI.parseMode = ParseMode.ParseModeHTML;
            const reply = this.app.botUI.drawFighter(fighter);
            const btns = this.app.botUI.getMainMenuButtons();
            const extraMessageConfig = this.app.botUI.createExtraOptions({ caption: reply })
            this.ctx.replyWithPhoto(fighter.photoUrl, { ...extraMessageConfig, ...btns } as ExtraPhoto)
                .then(_ => cb());
        })
    }
}


export class FighetrsShowComamnd implements ICommand {
    constructor(public ctx: ctxType, public app: Application) { }

    execute(cb: Function) {
        const fighters: Fighter[] = this.ctx.state.user.getFighters();
        for (const f of fighters) {
            const reply = this.app.botUI.drawFighter(f);

            const btns = [
                [new CallbackBtn(buttons.callbacks.selectFighter.text,
                    JSON.stringify({ methodName: CallbackQueryHandler.chooseFighter.name, args: [f.id] })),
                new CallbackBtn(buttons.callbacks.deleteFighter.text,
                    JSON.stringify({ methodName: CallbackQueryHandler.deleteFighter.name, args: [f.id] }))]
            ];

            const extraMessageConfig = this.app.botUI.createExtraOptions({ markup: btns, caption: reply });
            this.ctx.replyWithPhoto(f.photoUrl, extraMessageConfig as ExtraPhoto)
                .then(_ => cb());
        }
    }
}

export class DeleteFighterCommand implements ICommand {
    constructor(public ctx: ctxType, private fighterId: number, public app: Application) { }

    execute(cb: Function) {
        FighterStorage.deleteFighter(this.fighterId)
            .then(res => {
                if (res) {
                    this.ctx.answerCbQuery('Your fighter was deleted', true);
                    this.ctx.deleteMessage();
                }
                cb(res);
            })
    }
}

export class EnemiesShowCommand implements ICommand {
    constructor(public ctx: ctxType, public app: Application) { }

    execute(cb: Function) {
        const fighters: Fighter[] = this.ctx.state.user.getEnemies();
        for (const f of fighters) {
            const reply = this.app.botUI.drawFighter(f);

            const btns = [
                [new CallbackBtn(buttons.callbacks.selectEnemy.text,
                    JSON.stringify({ methodName: CallbackQueryHandler.chooseEnemy.name, args: [f.id] }))]
            ];

            const extraMessageConfig = this.app.botUI.createExtraOptions({ markup: btns, caption: reply });
            this.ctx.replyWithPhoto(f.photoUrl, extraMessageConfig as ExtraPhoto)
                .then(_ => cb());
        }
    }
}

export class ChooseFighterCommand implements ICommand {
    constructor(public ctx: ctxType, private fighterId: number, public app: Application) { }

    execute(cb: Function) {
        this.ctx.state.user.bufferFighterSelectedId = this.fighterId;
        UserStorage.updateUser(this.ctx.state.user)
            .then(_ => {
                const fighter = FighterStorage.getFighterById(this.fighterId);
                const reply = 'You selected ' + fighter.name + ' for fight!';
                const btns = this.app.botUI.getMainMenuButtons();

                this.ctx.reply(reply, { ...btns });
                this.ctx.answerCbQuery(reply);
            })
            .then(_ => cb());
    }

}

export class ChooseEnemyCommand implements ICommand {
    constructor(public ctx: ctxType, public app: Application, private enemyId: number) { }

    execute(cb: Function) {
        this.ctx.state.user.bufferEmenySelectedId = this.enemyId;
        UserStorage.updateUser(this.ctx.state.user)
            .then(_ => {
                const fighter = FighterStorage.getFighterById(this.enemyId);
                const reply = 'You selected ' + fighter.name + ' as the enemy!';
                const btns = this.app.botUI.getMainMenuButtons();
                this.ctx.reply(reply, { ...btns });
                this.ctx.answerCbQuery(reply);
            })
            .then(_ => cb());
    }
}


export class BattleCommand implements ICommand {
    constructor(public ctx: ctxType, 
                public app: Application, 
                private fighter1Id: number, 
                private fighter2Id: number) { }
    execute(cb: Function) {
        const f1 = FighterStorage.getFighterById(this.fighter1Id);
        const f2 = FighterStorage.getFighterById(this.fighter2Id);
        console.log(f1?.name, f2?.name);
        cb();
    }
}