"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
class UserStorage {
    static loadUser() {
        this._users.set(1, new User_1.User(1, 'ziovio'));
        this._users.set(2, new User_1.User(2, 'nicname'));
        console.log('users are loaded...');
    }
    static getUserById(id) {
        const user = this._users.get(id);
        if (!user)
            return null;
        return user.clone();
    }
}
exports.UserStorage = UserStorage;
UserStorage._users = new Map();
