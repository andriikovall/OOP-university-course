import { User, UserStateEnum } from "../models/User";
import fs from './fs-adapted';
import { config } from '../config/config';
import { FighterType } from "../models/Fighter";

export default class UserStorage {

    private static _users = new Map<number, User>();

    public static async loadUsers(): Promise<any> {
        console.log('loading users...');
        try {
            const rawData = (await fs.readFile(config.USERS_FILE_PATH)) || '[]';
            const users: User[] = JSON.parse(rawData) as User[];
            users.forEach(user => UserStorage._users.set(
                user.id,
                new User(user.id,
                    user.nickName,
                    user.stateValue,
                    user.bufferFighterType,
                    user.bufferFighterSelectedId,
                    user.bufferEmenySelectedId)));
        } catch {
        }
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

    public static addUser(user: User): Promise<any> {
        if (UserStorage.getUserById(user.id) == null) {
            return UserStorage.updateUser(user);
        }

        return Promise.resolve();
    }

    public static setUserStateValue(user: User, state: UserStateEnum): Promise<void> {
        user.stateValue = state;
        return UserStorage.updateUser(user);
    }

    public static setUserFighterTypeChoice(user: User, type: FighterType): Promise<void> {
        user.bufferFighterType = type;
        return UserStorage.updateUser(user);
    }

    public static updateUser(user: User): Promise<void> {
        UserStorage._users.set(user.id, user);
        return UserStorage.saveUsers();
    }

}