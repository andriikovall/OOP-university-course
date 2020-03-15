import { Fighter, FighterSpecs, FighterType, FighterAwesome, FighterLongLiving, FighterPowerfull, FighterSmart, FighterStrong } from "../models/Fighter";
import UserStorage from "./UserStorage";
import { config } from '../config';
import fs from './fs-adapted';

export default class FighterStorage {
    private static _fighters = new Map<number, Fighter>();

    public static async loadFighters(): Promise<void> {
        console.log('loading fighters...');
        const rawData = await fs.readFile(config.FIGHTERS_FILE_PATH) || '[]';
        const users: Fighter[] = JSON.parse(rawData);
        users.forEach(user => FighterStorage._fighters.set(user.id, user));
    }

    public static async saveFighters(): Promise<void> {
        console.log('saving fighters...');
        const serialized: string = JSON.stringify([...FighterStorage._fighters.values()], null, 2);
        return fs.writeFile(config.FIGHTERS_FILE_PATH, serialized);
    }


    // FABRIC method
    private createFighter(name: string, creatorId: number, specs: FighterSpecs, type: FighterType): Fighter {
        const creator = UserStorage.getUserById(creatorId);
        switch (type) {
            case FighterType.FighterAwesome: return    new FighterAwesome(name, creator, specs, type);
            case FighterType.FighterLongLiving: return new FighterLongLiving(name, creator, specs, type);
            case FighterType.FighterPowerfull: return  new FighterPowerfull(name, creator, specs, type);
            case FighterType.FighterSmart: return      new FighterSmart(name, creator, specs, type);
            case FighterType.FighterStrong: return     new FighterStrong(name, creator, specs, type);
        }

        return null;
    }

    public static getFighterById(id: number): Fighter {
        const fighter = FighterStorage._fighters.get(id);
        if (!fighter)
            return null;
            
        return fighter.clone();
    }
}
