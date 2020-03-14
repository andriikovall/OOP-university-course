import { User } from "../models/User";

export class UserStorage {

    private static _users = new Map<number, User>();

    public static loadUser() {
        this._users.set(1, new User(1, 'ziovio'));
        this._users.set(2, new User(2, 'nicname'));
        console.log('users are loaded...');
    }

    public static getUserById(id: number) {
        const user = this._users.get(id);
        if (!user)
            return null;
        
        return user.clone();
    }
}