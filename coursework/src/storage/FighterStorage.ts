import { Fighter, FighterSpecs, FighterType, FighterAwesome, FighterLongLiving, FighterPowerfull, FighterSmart, FighterStrong } from "../models/Fighter";
import { UserStorage } from "./UserStorage";

export class FighterStorage {
    private static _fighters = new Map<number, Fighter>();

    public loadFighters(): void {
        console.log('loading fighters...');
    }

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
        const fighter = this._fighters.get(id);
        if (!fighter)
            return null;
            
        return fighter.clone();
    }
}