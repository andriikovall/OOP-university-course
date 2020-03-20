"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const fs_adapted_1 = __importDefault(require("./fs-adapted"));
const Fighter_1 = require("../models/Fighter");
class FighterStorage {
    static async loadFighters() {
        console.log('loading fighters...');
        const rawData = await fs_adapted_1.default.readFile(config_1.config.FIGHTERS_FILE_PATH) || '[]';
        const fighters = JSON.parse(rawData);
        fighters.forEach(f => {
            FighterStorage._fighters.set(f.id, Fighter_1.FighterFactory.createFighter(f.name, f.creator.id, f.type, f.specs));
        });
    }
    static async saveFighters() {
        const serialized = JSON.stringify([...FighterStorage._fighters.values()], null, 2);
        return fs_adapted_1.default.writeFile(config_1.config.FIGHTERS_FILE_PATH, serialized);
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
    static getFighterById(id) {
        const fighter = FighterStorage._fighters.get(id);
        if (!fighter)
            return null;
        return fighter.clone();
    }
    static deleteFighter(id) {
        const result = FighterStorage._fighters.delete(id);
        if (!result)
            return new Promise((res, _rej) => res(false));
        return FighterStorage.saveFighters().then(_ => true);
    }
    static insertFighter(fighter) {
        if (!FighterStorage._fighters.get(fighter.id)) {
            FighterStorage._fighters.set(fighter.id, fighter);
        }
        return FighterStorage.saveFighters();
    }
    static getUserFighters(userId) {
        return [...FighterStorage._fighters.values()]
            .filter(f => { var _a; return ((_a = f.creator) === null || _a === void 0 ? void 0 : _a.id) === userId; });
    }
    static getUserEnemies(userId) {
        return [...FighterStorage._fighters.values()]
            .filter(f => { var _a; return ((_a = f.creator) === null || _a === void 0 ? void 0 : _a.id) !== userId; });
    }
}
exports.default = FighterStorage;
FighterStorage._fighters = new Map();
