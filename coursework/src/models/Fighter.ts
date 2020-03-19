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

    public getHp(): number {
        return this._hp;
    }

    private _hp: number;
    private static nextId = 0;
    constructor(public name: string,
        public creator: User,
        public type: FighterType,
        public specs: FighterSpecs) {

        if (!specs) {
            this.specs = this.generateSpecs();
        }
        this.id = ++Fighter.nextId;
        this._hp = this.specs.maxHp;
    }

    public enemyCanBeAttacked(enemy: Fighter, successProbabilityBonus: number = 0): boolean {
        const successProbability = (1 - (enemy.specs.strength + enemy.specs.agility) / 100) + successProbabilityBonus;
        const isAttackSuccess = Math.random() <= successProbability;
        return isAttackSuccess;
    }

    abstract attack(enemy: Fighter): string;
    abstract generateSpecs(): FighterSpecs;

    public dealDamage(dmg: number) {
        console.log('before hit', this.getHp())
        this._hp -= dmg;
        console.log('after hit', this.getHp());

        if (this._hp < 0)
            this._hp = 0;
        
    }

    clone(): Fighter {
        return { ...this, 
                attack: this.attack, 
                dealDamage: this.dealDamage, 
                enemyCanBeAttacked: this.enemyCanBeAttacked,
                getHp: this.getHp,
                specs: { ...this.specs } 
            } as this;
    }

    toJSON() {
        return { ...this, photoUrl: undefined };
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

    attack(enemy: Fighter): string {
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `${this.name} makes a smart move and deals ${this.specs.damage} to ${enemy.name}`;
        }
        return `${this.name}'s smart move was not enough and he missed!`;
    }

}

export class FighterStrong extends Fighter {

    public photoUrl = config.fightersImages.strong;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(10, 20), 
            strength: randInt(50, 60), 
            agility: randInt(20, 40), 
            maxHp: randInt(300, 400)
        }
    }

    attack(enemy: Fighter): string {
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `${this.name} deals ${this.specs.damage} to ${enemy.name} with his spectacular punch!`;
        }
        return `${this.name} has missed his punch =(`;
    }

}


export class FighterPowerfull extends Fighter {

    public photoUrl = config.fightersImages.powerfull;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(70, 80), 
            strength: randInt(60, 80), 
            agility: randInt(15, 20), 
            maxHp: randInt(100, 200)
        }
    }

    attack(enemy: Fighter): string {
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `Just look at ${this.name}. He is so powerfull and deals ${this.specs.damage} damage to ${enemy.name}!`;
        }
        return `${this.name} has missed. Oh no!`;
    }

}



export class FighterAwesome extends Fighter {

    public photoUrl = config.fightersImages.awesome;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(25, 30), 
            strength: randInt(5, 10), 
            agility: randInt(50, 60), 
            maxHp: randInt(150, 200)
        }
    }

    attack(enemy: Fighter): string {
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `OMG😱 ${this.name} is awesome! He deals ${this.specs.damage} damage to ${enemy.name}!`;
        }
        return `${this.name}'s awesomness sometimes doesn't work 😳`;
    }

}



export class FighterLucky extends Fighter {

    public photoUrl = config.fightersImages.lucky;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(10, 15), 
            strength: randInt(5, 10), 
            agility: randInt(60, 75), 
            maxHp: randInt(100, 200)
        }
    }

    attack(enemy: Fighter): string {
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `${this.name} is so lucky! He deals ${this.specs.damage} damage to ${enemy.name}! Unbelieveable`;
        }
        return `Even lucky ones sometimes have to miss like ${this.name} did`;
    }

}

