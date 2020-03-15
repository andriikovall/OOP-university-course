"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FighterType;
(function (FighterType) {
    FighterType[FighterType["FighterSmart"] = 0] = "FighterSmart";
    FighterType[FighterType["FighterStrong"] = 1] = "FighterStrong";
    FighterType[FighterType["FighterPowerfull"] = 2] = "FighterPowerfull";
    FighterType[FighterType["FighterAwesome"] = 3] = "FighterAwesome";
    FighterType[FighterType["FighterLongLiving"] = 4] = "FighterLongLiving";
})(FighterType = exports.FighterType || (exports.FighterType = {}));
class Fighter {
    constructor(name, creator, specs, type) {
        this.name = name;
        this.creator = creator;
        this.specs = specs;
        this.type = type;
        this.id = ++Fighter.nextId;
        this.hp = specs.maxHp;
    }
    enemyCanBeAttacked(enemy, successProbabilityBonus = 0) {
        const successProbability = (1 - (enemy.specs.strength + enemy.specs.agility) / 100) + successProbabilityBonus;
        const isAttackSuccess = Math.random() <= successProbability;
        return isAttackSuccess;
    }
    dealDamage(dmg) {
        this.hp -= dmg;
        if (this.hp < 0)
            this.hp = 0;
    }
    clone() {
        const specsCopy = { ...this.specs };
        return { ...this, specs: specsCopy };
    }
}
exports.Fighter = Fighter;
Fighter.nextId = 0;
class FighterSmart extends Fighter {
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterSmart -> ', enemy);
    }
}
exports.FighterSmart = FighterSmart;
class FighterStrong extends Fighter {
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterStrong -> ', enemy);
    }
}
exports.FighterStrong = FighterStrong;
class FighterPowerfull extends Fighter {
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterPowerfull -> ', enemy);
    }
}
exports.FighterPowerfull = FighterPowerfull;
class FighterAwesome extends Fighter {
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterAwesome -> ', enemy);
    }
}
exports.FighterAwesome = FighterAwesome;
class FighterLongLiving extends Fighter {
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterLongLiving -> ', enemy);
    }
}
exports.FighterLongLiving = FighterLongLiving;
