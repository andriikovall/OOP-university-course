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
        this._hp = this.specs.maxHp;
    }
    getHp() {
        return this._hp;
    }
    enemyCanBeAttacked(enemy, successProbabilityBonus = 0) {
        const successProbability = (1 - (enemy.specs.strength + enemy.specs.agility) / 100) + successProbabilityBonus;
        const isAttackSuccess = Math.random() <= successProbability;
        return isAttackSuccess;
    }
    dealDamage(dmg) {
        console.log('before hit', this.getHp());
        this._hp -= dmg;
        console.log('after hit', this.getHp());
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
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `${this.name} makes a smart move and deals ${this.specs.damage} to ${enemy.name}`;
        }
        return `${this.name}'s smart move was not enough and he missed!`;
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
            strength: helpers_1.randInt(50, 60),
            agility: helpers_1.randInt(20, 40),
            maxHp: helpers_1.randInt(300, 400)
        };
    }
    attack(enemy) {
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `${this.name} deals ${this.specs.damage} to ${enemy.name} with his spectacular punch!`;
        }
        return `${this.name} has missed his punch =(`;
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
            damage: helpers_1.randInt(70, 80),
            strength: helpers_1.randInt(60, 80),
            agility: helpers_1.randInt(15, 20),
            maxHp: helpers_1.randInt(100, 200)
        };
    }
    attack(enemy) {
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `Just look at ${this.name}. He is so powerfull and deals ${this.specs.damage} damage to ${enemy.name}!`;
        }
        return `${this.name} has missed. Oh no!`;
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
            damage: helpers_1.randInt(25, 30),
            strength: helpers_1.randInt(5, 10),
            agility: helpers_1.randInt(50, 60),
            maxHp: helpers_1.randInt(150, 200)
        };
    }
    attack(enemy) {
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `OMG😱 ${this.name} is awesome! He deals ${this.specs.damage} damage to ${enemy.name}!`;
        }
        return `${this.name}'s awesomness sometimes doesn't work 😳`;
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
            damage: helpers_1.randInt(10, 15),
            strength: helpers_1.randInt(5, 10),
            agility: helpers_1.randInt(60, 75),
            maxHp: helpers_1.randInt(100, 200)
        };
    }
    attack(enemy) {
        if (this.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(this.specs.damage);
            return `${this.name} is so lucky! He deals ${this.specs.damage} damage to ${enemy.name}! Unbelieveable`;
        }
        return `Even lucky ones sometimes have to miss like ${this.name} did`;
    }
}
exports.FighterLucky = FighterLucky;
