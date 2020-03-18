import { ICloneable } from "./ICloneable";
import { FighterType, Fighter } from "./Fighter";
import UserStorage from "../storage/UserStorage";
import FighterStorage from "../storage/FighterStorage";
import { config } from "../config/config";


export class User implements ICloneable {

    public state: UserState;
    public bufferFighterSelectedId: number;

    public setState(state: UserState | UserStateEnum) {
        if (state instanceof UserState) {
            this.state = state;
            UserStorage.setUserStateValue(this, this.state.enumValue);
        } else {
            this.state = this.getStateValueFromEmun(state);
            UserStorage.setUserStateValue(this, state);
        }
    }
    constructor(public id: number, 
                public nickName: string, 
                public stateValue: UserStateEnum = UserStateEnum.UserDefault, 
                public bufferFighterType: FighterType = FighterType.FighterAwesome) {
        this.setState(stateValue);
    }
    clone(): this {
        return new User(this.id, this.nickName, this.stateValue, this.bufferFighterType) as this;
    }

    private getStateValueFromEmun(state: UserStateEnum): UserState {
        switch (state) {
            case UserStateEnum.UserSelectingFighterType: return new UserSelectingFighterTypeState(this);
            case UserStateEnum.UserEnteringFighterName:  return new UserEnteringFighterNameState(this);
            case UserStateEnum.UserSelectingEnemy:       return new UserSelectingEnemyState(this);
            case UserStateEnum.UserStartingFight:        return new UserSelectingFighterTypeState(this);
            case UserStateEnum.UserAboutToStartFight:    return new UserAboutToStartFightState(this);
            default: return new UserDefaultState(this);
        }
    }

    public getFighters(page: number = 1): Fighter[] {
        if (page < 0)
            page = 0;

        // todo PROXY
        return FighterStorage.getUserFighters(this.id)
                .slice((page  - 1) * config.TELEGRAM_MESSAGES_PER_SECOND);
    }

    toJSON() {
        const copy = { ...this, state: undefined };
        return copy;
    }
}


export enum UserStateEnum {
    UserDefault,
    UserSelectingFighterType,
    UserEnteringFighterName, 
    UserSelectingEnemy, 
    UserStartingFight, 
    UserAboutToStartFight
}

export abstract class UserState {
    public enumValue: UserStateEnum;
    constructor(private user: User) { }

    abstract canSelectFighterType(): boolean;
    abstract canEnterFighterName(): boolean;
    abstract canChooseEnemy(): boolean;
    abstract canStartFight(): boolean;
    // ..
}

export class UserDefaultState extends UserState {

    public enumValue = UserStateEnum.UserDefault;

    canSelectFighterType(): boolean {
        return true;
    }

    canEnterFighterName(): boolean {
        return false;
    }

    canChooseEnemy(): boolean {
        return false;
    }

    canStartFight(): boolean {
        return false;
    }

}


export class UserSelectingFighterTypeState extends UserState {

    public enumValue = UserStateEnum.UserSelectingFighterType;
    canSelectFighterType(): boolean {
        return true;
    }

    canEnterFighterName(): boolean {
        return false;
    }

    canChooseEnemy(): boolean {
        return false;
    }
    
    canStartFight(): boolean {
        return false;
    }
}


export class UserEnteringFighterNameState extends UserState {

    public enumValue = UserStateEnum.UserEnteringFighterName;

    canSelectFighterType(): boolean {
        return false;
    }

    canEnterFighterName(): boolean {
        return true;
    }

    canChooseEnemy(): boolean {
        return false;
    }

    canStartFight(): boolean {
        return false;
    }
}

export class UserSelectingEnemyState extends UserState {

    public enumValue = UserStateEnum.UserSelectingEnemy;

    canSelectFighterType(): boolean {
        return false;
    }    

    canEnterFighterName(): boolean {
        return false;
    }

    canChooseEnemy(): boolean {
        return true;
    }

    canStartFight(): boolean {
        return false;
    }

}


export class UserAboutToStartFightState extends UserState {

    public enumValue = UserStateEnum.UserAboutToStartFight;

    canSelectFighterType(): boolean {
        return false;
    }    

    canEnterFighterName(): boolean {
        return false;
    }

    canChooseEnemy(): boolean {
        return true;
    }

    canStartFight(): boolean {
        return true;
    }

}