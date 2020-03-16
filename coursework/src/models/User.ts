import { ICloneable } from "./ICloneable";
import { FighterType } from "./Fighter";
import UserStorage from "../storage/UserStorage";


export class User implements ICloneable {

    public state: UserState;

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
            default: return new UserDefaultState(this);
        }
    }

    toJSON() {
        const copy = { ...this, state: undefined };
        return copy;
    }
}


export enum UserStateEnum {
    UserDefault,
    UserSelectingFighterType,
    UserEnteringFighterName
}

export abstract class UserState {
    public enumValue: UserStateEnum;
    constructor(private user: User) { }

    abstract canSelectFighterType(): boolean;
    abstract canEnterFighterName(): boolean;
    // ..
}

export class UserDefaultState extends UserState {

    public enumValue = UserStateEnum.UserDefault;
    canSelectFighterType() {
        return true;
    }

    canEnterFighterName(): boolean {
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
}


export class UserEnteringFighterNameState extends UserState {

    public enumValue = UserStateEnum.UserEnteringFighterName;

    canSelectFighterType(): boolean {
        return false;
    }

    canEnterFighterName(): boolean {
        return true;
    }
}