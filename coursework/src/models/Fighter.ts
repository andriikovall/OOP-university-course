import { User } from "./User";
import { ICloneable } from "./ICloneable";
import UserStorage from "../storage/UserStorage";
import { FighterTypeFlyweight, FighterSmart, FighterAwesome, FighterLucky, FighterPowerfull, FighterStrong } from "./FighterFlyweight";

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

export class FighterFactory {

    private static _cachedFlyweights = new Map<number, FighterTypeFlyweight>([
        [FighterType.FighterSmart,     new FighterSmart()], 
        [FighterType.FighterPowerfull, new FighterPowerfull()], 
        [FighterType.FighterStrong,    new FighterStrong()], 
        [FighterType.FighterLucky,     new FighterLucky()], 
        [FighterType.FighterAwesome,   new FighterAwesome()]
    ]);

    public static createFighter(name: string, creatorId: number, type: FighterType, specs: FighterSpecs = null): Fighter {
        const creator = UserStorage.getUserById(creatorId);
        const flyweight = FighterFactory._cachedFlyweights.get(type);
        return new Fighter(name, creator, type, flyweight, specs);
                            
        // switch (type) {
        //     case FighterType.FighterAwesome: return    new Fighter(name, creator, type, specs);
        //     case FighterType.FighterLucky: return      new Fighter(name, creator, type, specs);
        //     case FighterType.FighterPowerfull: return  new Fighter(name, creator, type, specs);
        //     case FighterType.FighterSmart: return      new Fighter(name, creator, type, specs);
        //     case FighterType.FighterStrong: return     new Fighter(name, creator, type, specs);
        // }

        // return null;
    }
}

export class Fighter implements ICloneable {
    public id: number;

    public getHp(): number {
        return this._hp;
    }

    public get photoUrl(): string {
        return this.typeFlyweight.photoUrl;
    }

    private _hp: number;
    private static nextId = 0;

    
    constructor(public name: string,
        public creator: User,
        public type: FighterType,
        private typeFlyweight: FighterTypeFlyweight,
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

    attack(enemy: Fighter): string {
        return this.typeFlyweight.attack(this, enemy);
    }
    generateSpecs(): FighterSpecs {
        return this.typeFlyweight.generateSpecs();
    }

    public dealDamage(dmg: number) {
        this._hp -= dmg;

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
        return { ...this };
    }

}
