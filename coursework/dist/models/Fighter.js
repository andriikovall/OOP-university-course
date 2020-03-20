"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserStorage_1 = __importDefault(require("../storage/UserStorage"));
const FighterFlyweight_1 = require("./FighterFlyweight");
var FighterType;
(function (FighterType) {
    FighterType[FighterType["FighterSmart"] = 0] = "FighterSmart";
    FighterType[FighterType["FighterStrong"] = 1] = "FighterStrong";
    FighterType[FighterType["FighterPowerfull"] = 2] = "FighterPowerfull";
    FighterType[FighterType["FighterAwesome"] = 3] = "FighterAwesome";
    FighterType[FighterType["FighterLucky"] = 4] = "FighterLucky";
})(FighterType = exports.FighterType || (exports.FighterType = {}));
class FighterFactory {
    static createFighter(name, creatorId, type, specs = null) {
        const creator = UserStorage_1.default.getUserById(creatorId);
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
exports.FighterFactory = FighterFactory;
FighterFactory._cachedFlyweights = new Map([
    [FighterType.FighterSmart, new FighterFlyweight_1.FighterSmart()],
    [FighterType.FighterPowerfull, new FighterFlyweight_1.FighterPowerfull()],
    [FighterType.FighterStrong, new FighterFlyweight_1.FighterStrong()],
    [FighterType.FighterLucky, new FighterFlyweight_1.FighterLucky()],
    [FighterType.FighterAwesome, new FighterFlyweight_1.FighterAwesome()]
]);
class Fighter {
    constructor(name, creator, type, typeFlyweight, specs) {
        this.name = name;
        this.creator = creator;
        this.type = type;
        this.typeFlyweight = typeFlyweight;
        this.specs = specs;
        if (!specs) {
            this.specs = this.generateSpecs();
        }
        this.id = ++Fighter.nextId;
        this._hp = this.specs.maxHp;
    }
    getHp() {
        return this._hp;
    }
    get photoUrl() {
        return this.typeFlyweight.photoUrl;
    }
    enemyCanBeAttacked(enemy, successProbabilityBonus = 0) {
        const successProbability = (1 - (enemy.specs.strength + enemy.specs.agility) / 100) + successProbabilityBonus;
        const isAttackSuccess = Math.random() <= successProbability;
        return isAttackSuccess;
    }
    attack(enemy) {
        return this.typeFlyweight.attack(this, enemy);
    }
    generateSpecs() {
        return this.typeFlyweight.generateSpecs();
    }
    dealDamage(dmg) {
        this._hp -= dmg;
        if (this._hp < 0)
            this._hp = 0;
    }
    clone() {
        return { ...this,
            attack: this.attack,
            dealDamage: this.dealDamage,
            enemyCanBeAttacked: this.enemyCanBeAttacked,
            getHp: this.getHp,
            specs: { ...this.specs }
        };
    }
    toJSON() {
        return { ...this };
    }
}
exports.Fighter = Fighter;
Fighter.nextId = 0;
