"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const config_1 = require("../config/config");
var FighterType;
(function (FighterType) {
    FighterType[FighterType["FighterSmart"] = 0] = "FighterSmart";
    FighterType[FighterType["FighterStrong"] = 1] = "FighterStrong";
    FighterType[FighterType["FighterPowerfull"] = 2] = "FighterPowerfull";
    FighterType[FighterType["FighterAwesome"] = 3] = "FighterAwesome";
    FighterType[FighterType["FighterLucky"] = 4] = "FighterLucky";
})(FighterType = exports.FighterType || (exports.FighterType = {}));
class Fighter {
    constructor(name, creator, type, specs) {
        this.name = name;
        this.creator = creator;
        this.type = type;
        this.specs = specs;
        if (!specs) {
            this.specs = this.generateSpecs();
        }
        this.id = ++Fighter.nextId;
        this.hp = this.specs.maxHp;
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
        return { ...this, specs: { ...this.specs } };
    }
    toJSON() {
        return { ...this, photoUrl: undefined };
    }
}
exports.Fighter = Fighter;
Fighter.nextId = 0;
class FighterSmart extends Fighter {
    constructor() {
        super(...arguments);
        this.photoUrl = config_1.config.fightersImages.smart;
    }
    generateSpecs() {
        return {
            damage: helpers_1.randInt(10, 15),
            strength: helpers_1.randInt(5, 10),
            agility: helpers_1.randInt(40, 50),
            maxHp: helpers_1.randInt(80, 140)
        };
    }
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterSmart -> ', enemy);
    }
}
exports.FighterSmart = FighterSmart;
class FighterStrong extends Fighter {
    constructor() {
        super(...arguments);
        this.photoUrl = config_1.config.fightersImages.strong;
    }
    generateSpecs() {
        return {
            damage: helpers_1.randInt(10, 20),
            strength: helpers_1.randInt(20, 40),
            agility: helpers_1.randInt(10, 20),
            maxHp: helpers_1.randInt(150, 200)
        };
    }
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterStrong -> ', enemy);
    }
}
exports.FighterStrong = FighterStrong;
class FighterPowerfull extends Fighter {
    constructor() {
        super(...arguments);
        this.photoUrl = config_1.config.fightersImages.powerfull;
    }
    generateSpecs() {
        return {
            damage: helpers_1.randInt(40, 50),
            strength: helpers_1.randInt(10, 20),
            agility: helpers_1.randInt(20, 30),
            maxHp: helpers_1.randInt(100, 200)
        };
    }
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterPowerfull -> ', enemy);
    }
}
exports.FighterPowerfull = FighterPowerfull;
class FighterAwesome extends Fighter {
    constructor() {
        super(...arguments);
        this.photoUrl = config_1.config.fightersImages.awesome;
    }
    generateSpecs() {
        return {
            damage: helpers_1.randInt(30, 40),
            strength: helpers_1.randInt(10, 20),
            agility: helpers_1.randInt(50, 100),
            maxHp: helpers_1.randInt(50, 200)
        };
    }
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterAwesome -> ', enemy);
    }
}
exports.FighterAwesome = FighterAwesome;
class FighterLucky extends Fighter {
    constructor() {
        super(...arguments);
        this.photoUrl = config_1.config.fightersImages.lucky;
    }
    generateSpecs() {
        return {
            damage: helpers_1.randInt(10, 20),
            strength: helpers_1.randInt(10, 20),
            agility: helpers_1.randInt(100, 200),
            maxHp: helpers_1.randInt(100, 200)
        };
    }
    attack(enemy) {
        // @todo add good loggin into bot
        console.log('FighterLongLiving -> ', enemy);
    }
}
exports.FighterLucky = FighterLucky;
