import dotenv from 'dotenv';
import path from 'path';

import UsersStorage from '../storage/UserStorage';
import FightersStorage from '../storage/FighterStorage';

dotenv.config({ path: path.join(__dirname, '../../.env')});

export const config = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    USERS_FILE_PATH: path.join(__dirname, '../../data/users.json'), 
    FIGHTERS_FILE_PATH: path.join(__dirname, '../../data/fighters.json'), 
    fightersImages: {
        smart: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/smart_us0tm4.png', 
        strong: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/strong_v5eb31.png', 
        powerfull: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/powerfull_ccxmtc.png', 
        awesome: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/awesome_h2dcdc.png', 
        lucky: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/lucky_dxf1ny.png',
    }, 
    TELEGRAM_MESSAGES_PER_SECOND: 35,
}

export function configureStorages(): Promise<void> {
    return UsersStorage.loadUsers()
            .then(_ => FightersStorage.loadFighters());
}