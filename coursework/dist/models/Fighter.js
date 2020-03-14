"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FighterType;
(function (FighterType) {
    FighterType[FighterType["FighterSmart"] = 0] = "FighterSmart";
    FighterType[FighterType["FighterStrong"] = 1] = "FighterStrong";
    FighterType[FighterType["FighterPowerfull"] = 2] = "FighterPowerfull";
    FighterType[FighterType["FighterAwesone"] = 3] = "FighterAwesone";
    FighterType[FighterType["FighterLongLiving"] = 4] = "FighterLongLiving";
})(FighterType = exports.FighterType || (exports.FighterType = {}));
class Fighter {
    constructor(name, creator, specs) {
        this.name = name;
        this.creator = creator;
        this.specs = specs;
        this.id = ++Fighter.nextId;
        this.hp = specs.maxHp;
    }
    enemyCanBeAttacked(enemy, successProbabilityBonus = 0) {
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
    dealDamage(dmg) {
        this.hp -= dmg;
        if (this.hp < 0)
            this.hp = 0;
    }
    clone() {
        // @todo builder
        return { ...this };
    }
}
exports.Fighter = Fighter;
Fighter.nextId = 0;
