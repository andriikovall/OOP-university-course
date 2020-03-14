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
    FighterAwesone,
    FighterLongLiving 
}

export abstract class Fighter implements ICloneable {
    public static nextId = 0;
    public id: number;
    private hp: number;
    constructor(public name: string, 
                public creator: User, 
                public specs: FighterSpecs ){
                    this.id = ++Fighter.nextId;
                    this.hp = specs.maxHp;
                }

    public enemyCanBeAttacked(enemy: Fighter, successProbabilityBonus: number = 0): boolean {
        const successProbability = (1 - (enemy.specs.strength + enemy.specs.agility) / 100) + successProbabilityBonus;
        const isAttackSuccess = Math.random() <= successProbability;
        return isAttackSuccess;
        // if (isAttackSuccess) {
            // const attackerDmg = this.specs.damage;
            // enemy.dealDamage(attackerDmg);
            // console.log(`${this.getName()} makes ${attackerDmg} damage to ${enemy.getName()}`);
            // return true;
        // } else {
            // console.log(`${this.getName()} attack missed`);
            // return false;
        // }
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