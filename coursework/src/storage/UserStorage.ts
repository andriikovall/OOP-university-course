import { User, UserStateEnum } from "../models/User";
import fs from './fs-adapted';
import { config } from '../config/config';
import { FighterType } from "../models/Fighter";

export default class UserStorage {

    private static _users = new Map<number, User>();

    public static async loadUsers(): Promise<void> {
        console.log('loading users...');
        const rawData = await fs.readFile(config.USERS_FILE_PATH) || '[]';
        const users: User[] = JSON.parse(rawData);
        users.forEach(user => UserStorage._users.set(user.id, new User(user.id, user.nickName, user.stateValue, user.bufferFighterType)));
    }

    public static async saveUsers(): Promise<void> {
        console.log('saving users');
        const serialized: string = JSON.stringify([...UserStorage._users.values()], null, 2);
        return fs.writeFile(config.USERS_FILE_PATH, serialized);
    }

    public static getUserById(id: number): User {
        const user = UserStorage._users.get(id);
        if (!user)
            return null;
        
        return user.clone();
    }

    public static addUser(user: User): Promise<void> {
        if (UserStorage.getUserById(user.id) != null) {
            UserStorage._users.set(user.id, user);
            return UserStorage.saveUsers();
        }
    }

    public static setUserStateValue(user: User, state: UserStateEnum): Promise<void> {
        user.stateValue = state;
        UserStorage._users.set(user.id, user);
        return UserStorage.saveUsers();
    }

    public static setUserFighterTypeChoice(user: User, type: FighterType): Promise<void> {
        user.bufferFighterType = type;
        UserStorage._users.set(user.id, user);
        return UserStorage.saveUsers();
    }

}