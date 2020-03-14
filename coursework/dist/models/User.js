"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, nickName, state = 0) {
        this.id = id;
        this.nickName = nickName;
        this.state = state;
    }
    clone() {
        return new User(this.id, this.nickName, this.state);
    }
}
exports.User = User;
var UserState;
(function (UserState) {
    // state
})(UserState = exports.UserState || (exports.UserState = {}));
