import { User } from "./User";
import { ICloneable } from "./ICloneable";

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
    FighterLongLiving 
}

export abstract class Fighter implements ICloneable {
    private static nextId = 0;
    public id: number;
    private hp: number;
    constructor(public name: string, 
                public creator: User, 
                public specs: FighterSpecs, 
                public type: FighterType ) {
                    this.id = ++Fighter.nextId;
                    this.hp = specs.maxHp;
                }

    public enemyCanBeAttacked(enemy: Fighter, successProbabilityBonus: number = 0): boolean {
        const successProbability = (1 - (enemy.specs.strength + enemy.specs.agility) / 100) + successProbabilityBonus;
        const isAttackSuccess = Math.random() <= successProbability;
        return isAttackSuccess;
    }

    abstract attack(enemy: Fighter): void;

    public dealDamage(dmg: number) {
        this.hp -= dmg;

        if (this.hp < 0) 
            this.hp = 0;
    }

    clone() {
        // @todo builder
        return {...this};
    }
}


export class FighterSmart extends Fighter {

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterSmart -> ', enemy);
    }
    
}

export class FighterStrong extends Fighter {

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterStrong -> ', enemy);
    }
    
}


export class FighterPowerfull extends Fighter {

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterPowerfull -> ', enemy);
    }
    
}



export class FighterAwesome extends Fighter {

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterAwesome -> ', enemy);
    }
    
}



export class FighterLongLiving extends Fighter {

    attack(enemy: Fighter): void {
        // @todo add good loggin into bot
        console.log('FighterLongLiving -> ', enemy);
    }
    
}

