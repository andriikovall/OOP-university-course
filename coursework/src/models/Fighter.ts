import { User } from "./User";
import { ICloneable } from "./ICloneable";
import { randInt } from '../helpers';
import { config } from '../config/config';

export interface FighterSpecs {
    damage: number;
    strength: number;
    agility: number;
    maxHp: number;
}

export enum FighterType {
    FighterSmart,
    FighterStrong,
    FighterPowerfull,
    FighterAwesome,
    FighterLucky
}

export abstract class Fighter implements ICloneable {
    public id: number;
    public photoUrl: string;

    private static nextId = 0;
    private hp: number;
    constructor(public name: string,
        public creator: User,
        public type: FighterType,
        public specs: FighterSpecs) {

        if (!specs) {
            this.specs = this.generateSpecs();
        }
        this.id = ++Fighter.nextId;
        this.hp = this.specs.maxHp;
    }

    public enemyCanBeAttacked(enemy: Fighter, successProbabilityBonus: number = 0): boolean {
        const successProbability = (1 - (enemy.specs.strength + enemy.specs.agility) / 100) + successProbabilityBonus;
        const isAttackSuccess = Math.random() <= successProbability;
        return isAttackSuccess;
    }

    abstract attack(enemy: Fighter): void;
    abstract generateSpecs(): FighterSpecs;

    public dealDamage(dmg: number) {
        this.hp -= dmg;

        if (this.hp < 0)
            this.hp = 0;
    }

    clone(): Fighter {
        return { ...this, specs: { ...this.specs } } as Fighter;
    }
}


export class FighterSmart extends Fighter {

    public photoUrl = config.fightersImages.smart;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(10, 15), 
            strength: randInt(5, 10), 
            agility: randInt(40, 50), 
            maxHp: randInt(80, 140)
        }
    }

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterSmart -> ', enemy);
    }

}

export class FighterStrong extends Fighter {

    public photoUrl = config.fightersImages.strong;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(10, 20), 
            strength: randInt(20, 40), 
            agility: randInt(10, 20), 
            maxHp: randInt(150, 200)
        }
    }

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterStrong -> ', enemy);
    }

}


export class FighterPowerfull extends Fighter {

    public photoUrl = config.fightersImages.powerfull;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(40, 50), 
            strength: randInt(10, 20), 
            agility: randInt(20, 30), 
            maxHp: randInt(100, 200)
        }
    }

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterPowerfull -> ', enemy);
    }

}



export class FighterAwesome extends Fighter {

    public photoUrl = config.fightersImages.awesome;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(30, 40), 
            strength: randInt(10, 20), 
            agility: randInt(50, 100), 
            maxHp: randInt(50, 200)
        }
    }

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterAwesome -> ', enemy);
    }

}



export class FighterLucky extends Fighter {

    public photoUrl = config.fightersImages.lucky;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(10, 20), 
            strength: randInt(10, 20), 
            agility: randInt(100, 200), 
            maxHp: randInt(100, 200)
        }
    }

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterLongLiving -> ', enemy);
    }

}

