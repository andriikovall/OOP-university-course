"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const fs_adapted_1 = __importDefault(require("./fs-adapted"));
const config_1 = require("../config");
class UserStorage {
    static async loadUsers() {
        console.log('loading users...');
        const rawData = await fs_adapted_1.default.readFile(config_1.config.USERS_FILE_PATH) || '[]';
        const users = JSON.parse(rawData);
        users.forEach(user => UserStorage._users.set(user.id, new User_1.User(user.id, user.nickName, user.state)));
    }
    static async saveUsers() {
        console.log('saving users');
        const serialized = JSON.stringify([...UserStorage._users.values()], null, 2);
        return fs_adapted_1.default.writeFile(config_1.config.USERS_FILE_PATH, serialized);
    }
    static getUserById(id) {
        const user = UserStorage._users.get(id);
        if (!user)
            return null;
        return user.clone();
    }
    static addUser(user) {
        if (UserStorage.getUserById(user.id) != null) {
            UserStorage._users.set(user.id, user);
            UserStorage.saveUsers();
        }
    }
}
exports.default = UserStorage;
UserStorage._users = new Map();
