import { FighterSpecs, Fighter } from "./Fighter";
import { config } from "../config/config";
import { randInt } from "../helpers";


export interface FighterTypeFlyweight {
    photoUrl: string;
    generateSpecs(): FighterSpecs;
    attack(concreteFighter: Fighter, enemy: Fighter): string;
}

export class FighterSmart implements FighterTypeFlyweight {

    public photoUrl = config.fightersImages.smart;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(10, 15), 
            strength: randInt(5, 10), 
            agility: randInt(40, 50), 
            maxHp: randInt(80, 140)
        }
    }

    attack(concreteFighter: Fighter, enemy: Fighter): string {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `👺 ${concreteFighter.name} makes a smart move and deals ${concreteFighter.specs.damage} to ${enemy.name} 😈`;
        }
        return `${concreteFighter.name}'s smart move was not enough and he missed! 😤`;
    }

}

export class FighterStrong implements FighterTypeFlyweight {

    public photoUrl = config.fightersImages.strong;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(10, 20), 
            strength: randInt(50, 60), 
            agility: randInt(20, 40), 
            maxHp: randInt(300, 400)
        }
    }

    attack(concreteFighter: Fighter, enemy: Fighter): string {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `${concreteFighter.name} 👊 deals ${concreteFighter.specs.damage} to ${enemy.name} with his spectacular punch!🤜`;
        }
        return `${concreteFighter.name} has missed his punch =( 🥊`;
    }

}


export class FighterPowerfull implements FighterTypeFlyweight {

    public photoUrl = config.fightersImages.powerfull;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(70, 80), 
            strength: randInt(60, 80), 
            agility: randInt(15, 20), 
            maxHp: randInt(100, 200)
        }
    }

    attack(concreteFighter: Fighter, enemy: Fighter): string {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `Just look at ${concreteFighter.name}. 👊 He is so powerfull and deals ${concreteFighter.specs.damage} damage to ${enemy.name}! 🤟`;
        }
        return `${concreteFighter.name} has missed. Oh no! 😧`;
    }

}



export class FighterAwesome implements FighterTypeFlyweight {

    public photoUrl = config.fightersImages.awesome;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(25, 30), 
            strength: randInt(5, 10), 
            agility: randInt(50, 60), 
            maxHp: randInt(150, 200)
        }
    }

    attack(concreteFighter: Fighter, enemy: Fighter): string {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `OMG😱 ${concreteFighter.name} is awesome! He deals ${concreteFighter.specs.damage} damage to ${enemy.name}!`;
        }
        return `${concreteFighter.name}'s awesomness sometimes doesn't work 😳`;
    }

}



export class FighterLucky implements FighterTypeFlyweight {

    public photoUrl = config.fightersImages.lucky;

    generateSpecs(): FighterSpecs {
        return {
            damage: randInt(10, 15), 
            strength: randInt(5, 10), 
            agility: randInt(60, 75), 
            maxHp: randInt(100, 200)
        }
    }

    attack(concreteFighter: Fighter, enemy: Fighter): string {
        if (concreteFighter.enemyCanBeAttacked(enemy)) {
            enemy.dealDamage(concreteFighter.specs.damage);
            return `${concreteFighter.name} is so lucky 🌚! He deals ${concreteFighter.specs.damage} damage to ${enemy.name}! Unbelieveable 🙅`;
        }
        return `Even lucky ones sometimes have to miss like ${concreteFighter.name} did 🤨`;
    }

}

