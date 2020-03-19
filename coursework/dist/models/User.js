"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Fighter_1 = require("./Fighter");
const UserStorage_1 = __importDefault(require("../storage/UserStorage"));
const FighterStorage_1 = __importDefault(require("../storage/FighterStorage"));
const config_1 = require("../config/config");
class User {
    constructor(id, nickName, stateValue = UserStateEnum.UserDefault, bufferFighterType = Fighter_1.FighterType.FighterAwesome, bufferFighterSelectedId = -1, bufferEmenySelectedId = -1) {
        this.id = id;
        this.nickName = nickName;
        this.stateValue = stateValue;
        this.bufferFighterType = bufferFighterType;
        this.bufferFighterSelectedId = bufferFighterSelectedId;
        this.bufferEmenySelectedId = bufferEmenySelectedId;
        this.state = this.getStateValueFromEmun(stateValue);
    }
    setState(state) {
        if (state instanceof UserState) {
            this.state = state;
            UserStorage_1.default.setUserStateValue(this, this.state.enumValue);
        }
        else {
            this.state = this.getStateValueFromEmun(state);
            UserStorage_1.default.setUserStateValue(this, state);
        }
    }
    clone() {
        return new User(this.id, this.nickName, this.stateValue, this.bufferFighterType, this.bufferFighterSelectedId, this.bufferEmenySelectedId);
    }
    getStateValueFromEmun(state) {
        switch (state) {
            case UserStateEnum.UserSelectingFighterType: return new UserSelectingFighterTypeState(this);
            case UserStateEnum.UserEnteringFighterName: return new UserEnteringFighterNameState(this);
            case UserStateEnum.UserSelectingEnemy: return new UserSelectingEnemyState(this);
            case UserStateEnum.UserStartingFight: return new UserSelectingFighterTypeState(this);
            case UserStateEnum.UserAboutToStartFight: return new UserAboutToStartFightState(this);
            default: return new UserDefaultState(this);
        }
    }
    getFighters(page = 1) {
        if (page < 0)
            page = 0;
        // todo PROXY
        return FighterStorage_1.default.getUserFighters(this.id)
            .slice((page - 1) * config_1.config.TELEGRAM_MESSAGES_PER_SECOND);
    }
    getEnemies(page = 1) {
        if (page < 0)
            page = 0;
        // todo PROXY
        return FighterStorage_1.default.getUserEnemies(this.id)
            .slice((page - 1) * config_1.config.TELEGRAM_MESSAGES_PER_SECOND);
    }
    toJSON() {
        return { ...this, state: undefined };
    }
}
exports.User = User;
var UserStateEnum;
(function (UserStateEnum) {
    UserStateEnum[UserStateEnum["UserDefault"] = 0] = "UserDefault";
    UserStateEnum[UserStateEnum["UserSelectingFighterType"] = 1] = "UserSelectingFighterType";
    UserStateEnum[UserStateEnum["UserEnteringFighterName"] = 2] = "UserEnteringFighterName";
    UserStateEnum[UserStateEnum["UserSelectingEnemy"] = 3] = "UserSelectingEnemy";
    UserStateEnum[UserStateEnum["UserStartingFight"] = 4] = "UserStartingFight";
    UserStateEnum[UserStateEnum["UserAboutToStartFight"] = 5] = "UserAboutToStartFight";
})(UserStateEnum = exports.UserStateEnum || (exports.UserStateEnum = {}));
class UserState {
    constructor(user) {
        this.user = user;
    }
    canStartFight() {
        var _a, _b;
        return ((_a = this.user) === null || _a === void 0 ? void 0 : _a.bufferEmenySelectedId) > 0 && ((_b = this.user) === null || _b === void 0 ? void 0 : _b.bufferFighterSelectedId) > 0;
    }
}
exports.UserState = UserState;
class UserDefaultState extends UserState {
    constructor() {
        super(...arguments);
        this.enumValue = UserStateEnum.UserDefault;
    }
    canSelectFighterType() {
        return true;
    }
    canEnterFighterName() {
        return false;
    }
    canChooseEnemy() {
        return false;
    }
}
exports.UserDefaultState = UserDefaultState;
class UserSelectingFighterTypeState extends UserState {
    constructor() {
        super(...arguments);
        this.enumValue = UserStateEnum.UserSelectingFighterType;
    }
    canSelectFighterType() {
        return true;
    }
    canEnterFighterName() {
        return false;
    }
    canChooseEnemy() {
        return false;
    }
    canStartFight() {
        return false;
    }
}
exports.UserSelectingFighterTypeState = UserSelectingFighterTypeState;
class UserEnteringFighterNameState extends UserState {
    constructor() {
        super(...arguments);
        this.enumValue = UserStateEnum.UserEnteringFighterName;
    }
    canSelectFighterType() {
        return false;
    }
    canEnterFighterName() {
        return true;
    }
    canChooseEnemy() {
        return false;
    }
    canStartFight() {
        return false;
    }
}
exports.UserEnteringFighterNameState = UserEnteringFighterNameState;
class UserSelectingEnemyState extends UserState {
    constructor() {
        super(...arguments);
        this.enumValue = UserStateEnum.UserSelectingEnemy;
    }
    canSelectFighterType() {
        return false;
    }
    canEnterFighterName() {
        return false;
    }
    canChooseEnemy() {
        return true;
    }
}
exports.UserSelectingEnemyState = UserSelectingEnemyState;
class UserAboutToStartFightState extends UserState {
    constructor() {
        super(...arguments);
        this.enumValue = UserStateEnum.UserAboutToStartFight;
    }
    canSelectFighterType() {
        return false;
    }
    canEnterFighterName() {
        return false;
    }
    canChooseEnemy() {
        return true;
    }
}
exports.UserAboutToStartFightState = UserAboutToStartFightState;
