import UserStorage from "./UserStorage";
import { config } from '../config/config';
import fs from './fs-adapted';
import { randInt } from "../helpers";
import { Fighter, FighterFactory } from "../models/Fighter";

export default class FighterStorage {
    private static _fighters = new Map<number, Fighter>();

    public static async loadFighters(): Promise<void> {
        console.log('loading fighters...');
        const rawData = await fs.readFile(config.FIGHTERS_FILE_PATH) || '[]';
        const fighters: any[] = JSON.parse(rawData);
        fighters.forEach(f => {
            FighterStorage._fighters.set(f.id, FighterFactory.createFighter(f.name, f.creator.id, f.type, f.specs));
        });
    }

    public static async saveFighters(): Promise<void> {
        const serialized: string = JSON.stringify([...FighterStorage._fighters.values()], null, 2);
        return fs.writeFile(config.FIGHTERS_FILE_PATH, serialized);
    }



    // FABRIC method
    // public static createFighter(name: string, creatorId: number, type: FighterType, specs: FighterSpecs = null): Fighter {
    //     // const creator = UserStorage.getUserById(creatorId);
    //     // switch (type) {
    //     //     case FighterType.FighterAwesome: return    new FighterAwesome(name, creator, type, specs);
    //     //     case FighterType.FighterLucky: return      new FighterLucky(name, creator, type, specs);
    //     //     case FighterType.FighterPowerfull: return  new FighterPowerfull(name, creator, type, specs);
    //     //     case FighterType.FighterSmart: return      new FighterSmart(name, creator, type, specs);
    //     //     case FighterType.FighterStrong: return     new FighterStrong(name, creator, type, specs);
    //     // }

    //     // return null;
    // }

    public static getFighterById(id: number): Fighter {
        const fighter = FighterStorage._fighters.get(id);
        if (!fighter)
            return null;
            
        return fighter.clone();
    }

    public static deleteFighter(id: number): Promise<boolean> {
        const result = FighterStorage._fighters.delete(id);
        if (!result)
            return new Promise((res, _rej) => res(false));
        return FighterStorage.saveFighters().then(_ => true);
    }

    public static insertFighter(fighter: Fighter): Promise<void> {
        if (!FighterStorage._fighters.get(fighter.id)) {
            FighterStorage._fighters.set(fighter.id, fighter);
        }

        return FighterStorage.saveFighters();
    }

    public static getUserFighters(userId: number): Fighter[] {
        return [...FighterStorage._fighters.values()]
                    .filter(f => f.creator?.id === userId);
    } 

    public static getUserEnemies(userId: number): Fighter[] {
        return [...FighterStorage._fighters.values()]
                    .filter(f => f.creator?.id !== userId);
    }
}
