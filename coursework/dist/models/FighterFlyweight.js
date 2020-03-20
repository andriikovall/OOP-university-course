"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const helpers_1 = require("../helpers");
class FighterSmart {
    constructor() {
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
    attack(concreteFighter, enemy) {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `👺 ${concreteFighter.name} makes a smart move and deals ${concreteFighter.specs.damage} to ${enemy.name} 😈`;
        }
        return `${concreteFighter.name}'s smart move was not enough and he missed! 😤`;
    }
}
exports.FighterSmart = FighterSmart;
class FighterStrong {
    constructor() {
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
    attack(concreteFighter, enemy) {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `${concreteFighter.name} 👊 deals ${concreteFighter.specs.damage} to ${enemy.name} with his spectacular punch!🤜`;
        }
        return `${concreteFighter.name} has missed his punch =( 🥊`;
    }
}
exports.FighterStrong = FighterStrong;
class FighterPowerfull {
    constructor() {
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
    attack(concreteFighter, enemy) {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `Just look at ${concreteFighter.name}. 👊 He is so powerfull and deals ${concreteFighter.specs.damage} damage to ${enemy.name}! 🤟`;
        }
        return `${concreteFighter.name} has missed. Oh no! 😧`;
    }
}
exports.FighterPowerfull = FighterPowerfull;
class FighterAwesome {
    constructor() {
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
    attack(concreteFighter, enemy) {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `OMG😱 ${concreteFighter.name} is awesome! He deals ${concreteFighter.specs.damage} damage to ${enemy.name}!`;
        }
        return `${concreteFighter.name}'s awesomness sometimes doesn't work 😳`;
    }
}
exports.FighterAwesome = FighterAwesome;
class FighterLucky {
    constructor() {
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
    attack(concreteFighter, enemy) {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `${concreteFighter.name} is so lucky 🌚! He deals ${concreteFighter.specs.damage} damage to ${enemy.name}! Unbelieveable 🙅`;
        }
        return `Even lucky ones sometimes have to miss like ${concreteFighter.name} did 🤨`;
    }
}
exports.FighterLucky = FighterLucky;
