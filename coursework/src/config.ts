import dotenv from 'dotenv';
import path from 'path';

import UsersStorage from './storage/UserStorage';
import FightersStorage from './storage/FighterStorage';

dotenv.config({ path: path.join(__dirname, '../.env')});

export const config = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    USERS_FILE_PATH: path.join(__dirname, '../data/users.json'), 
    FIGHTERS_FILE_PATH: path.join(__dirname, '../data/fighters.json'), 
}

export function configureStorages(): Promise<void[]> {
    return Promise.all([UsersStorage.loadUsers(), FightersStorage.loadFighters()]);
}