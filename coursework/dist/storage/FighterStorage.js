"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fighter_1 = require("../models/Fighter");
const UserStorage_1 = require("./UserStorage");
class FighterStorage {
    loadFighters() {
        console.log('loading fighters...');
    }
    createFighter(name, creatorId, specs, type) {
        const creator = UserStorage_1.UserStorage.getUserById(creatorId);
        switch (type) {
            case Fighter_1.FighterType.FighterAwesome: return new Fighter_1.FighterAwesome(name, creator, specs, type);
            case Fighter_1.FighterType.FighterLongLiving: return new Fighter_1.FighterLongLiving(name, creator, specs, type);
            case Fighter_1.FighterType.FighterPowerfull: return new Fighter_1.FighterPowerfull(name, creator, specs, type);
            case Fighter_1.FighterType.FighterSmart: return new Fighter_1.FighterSmart(name, creator, specs, type);
            case Fighter_1.FighterType.FighterStrong: return new Fighter_1.FighterStrong(name, creator, specs, type);
        }
        return null;
    }
    static getFighterById(id) {
        const fighter = this._fighters.get(id);
        if (!fighter)
            return null;
        return fighter.clone();
    }
}
exports.FighterStorage = FighterStorage;
FighterStorage._fighters = new Map();
