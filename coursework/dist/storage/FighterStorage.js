"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Fighter_1 = require("../models/Fighter");
const UserStorage_1 = __importDefault(require("./UserStorage"));
const config_1 = require("../config/config");
const fs_adapted_1 = __importDefault(require("./fs-adapted"));
class FighterStorage {
    static async loadFighters() {
        console.log('loading fighters...');
        const rawData = await fs_adapted_1.default.readFile(config_1.config.FIGHTERS_FILE_PATH) || '[]';
        const fighters = JSON.parse(rawData);
        fighters.forEach(f => {
            FighterStorage._fighters.set(f.id, FighterStorage.createFighter(f.name, f.creator.id, f.type, f.specs));
        });
    }
    static async saveFighters() {
        const serialized = JSON.stringify([...FighterStorage._fighters.values()], null, 2);
        return fs_adapted_1.default.writeFile(config_1.config.FIGHTERS_FILE_PATH, serialized);
    }
    // FABRIC method
    static createFighter(name, creatorId, type, specs = null) {
        const creator = UserStorage_1.default.getUserById(creatorId);
        switch (type) {
            case Fighter_1.FighterType.FighterAwesome: return new Fighter_1.FighterAwesome(name, creator, type, specs);
            case Fighter_1.FighterType.FighterLucky: return new Fighter_1.FighterLucky(name, creator, type, specs);
            case Fighter_1.FighterType.FighterPowerfull: return new Fighter_1.FighterPowerfull(name, creator, type, specs);
            case Fighter_1.FighterType.FighterSmart: return new Fighter_1.FighterSmart(name, creator, type, specs);
            case Fighter_1.FighterType.FighterStrong: return new Fighter_1.FighterStrong(name, creator, type, specs);
        }
        return null;
    }
    static getFighterById(id) {
        console.log(FighterStorage._fighters);
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
            .filter(f => f.creator.id === userId);
    }
}
exports.default = FighterStorage;
FighterStorage._fighters = new Map();
