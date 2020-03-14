"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fighter_1 = require("../models/Fighter");
const UserStorage_1 = require("../storage/UserStorage");
class FighterSmartBuilder {
    createFighter(name, creatorId, specs, type) {
        console.log('creating a new smart fighter');
        return new Fighter_1.FighterSmart(name, UserStorage_1.UserStorage.getUserById(creatorId), specs, type);
    }
}
exports.FighterSmartBuilder = FighterSmartBuilder;
