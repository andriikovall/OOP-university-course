import { ICloneable } from "./ICloneable";


export class User implements ICloneable {
    constructor(public id: number, public nickName: string, public state: UserState = 0){}
    clone(): this {
        return new User(this.id, this.nickName, this.state) as this;
    }

}


export enum UserState {
    // state
}