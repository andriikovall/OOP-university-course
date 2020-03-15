import { User } from "../models/User";
import fs from './fs-adapted';
import { config } from '../config';

export default class UserStorage {

    private static _users = new Map<number, User>();

    public static async loadUsers(): Promise<void> {
        console.log('loading users...');
        const rawData = await fs.readFile(config.USERS_FILE_PATH) || '[]';
        const users: User[] = JSON.parse(rawData);
        users.forEach(user => UserStorage._users.set(user.id, user));
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
}