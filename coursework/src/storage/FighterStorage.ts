import { Fighter, FighterSpecs, FighterType, FighterAwesome, FighterLongLiving, FighterPowerfull, FighterSmart, FighterStrong } from "../models/Fighter";
import UserStorage from "./UserStorage";
import { config } from '../config';
import fs from './fs-adapted';

export default class FighterStorage {
    private static _fighters = new Map<number, Fighter>();
    private static nextId: number = 0;

    public static async loadFighters(): Promise<void> {
        console.log('loading fighters...');
        const rawData = await fs.readFile(config.FIGHTERS_FILE_PATH) || '[]';
        const fighters: any[] = JSON.parse(rawData);
        fighters.forEach(f => {
            FighterStorage._fighters.set(f.id, FighterStorage.createFighter(f.name, f.creator.id, f.type, f.specs));
            if (f.id > FighterStorage.nextId) {
                FighterStorage.nextId = f.id + 1;
        }});
    }

    public static async saveFighters(): Promise<void> {
        console.log('saving fighters...');
        const serialized: string = JSON.stringify([...FighterStorage._fighters.values()], null, 2);
        return fs.writeFile(config.FIGHTERS_FILE_PATH, serialized);
    }



    // FABRIC method
    public static createFighter(name: string, creatorId: number, type: FighterType, specs: FighterSpecs = null): Fighter {
        const creator = UserStorage.getUserById(creatorId);
        switch (type) {
            case FighterType.FighterAwesome: return    new FighterAwesome(name, creator, type, specs);
            case FighterType.FighterLongLiving: return new FighterLongLiving(name, creator, type, specs);
            case FighterType.FighterPowerfull: return  new FighterPowerfull(name, creator, type, specs);
            case FighterType.FighterSmart: return      new FighterSmart(name, creator, type, specs);
            case FighterType.FighterStrong: return     new FighterStrong(name, creator, type, specs);
        }

        return null;
    }

    public static getFighterById(id: number): Fighter {
        const fighter = FighterStorage._fighters.get(id);
        if (!fighter)
            return null;
            
        return fighter.clone();
    }

    public static insertFighter(fighter: Fighter): Promise<void> {
        if (!FighterStorage._fighters.get(fighter.id))
            FighterStorage._fighters.set(++FighterStorage.nextId, fighter);

        return FighterStorage.saveFighters();
    }
}
