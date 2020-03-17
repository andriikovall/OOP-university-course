"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const UserStorage_1 = __importDefault(require("../storage/UserStorage"));
const FighterStorage_1 = __importDefault(require("../storage/FighterStorage"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
exports.config = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    USERS_FILE_PATH: path_1.default.join(__dirname, '../../data/users.json'),
    FIGHTERS_FILE_PATH: path_1.default.join(__dirname, '../../data/fighters.json'),
    fightersImages: {
        smart: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/smart_us0tm4.png',
        strong: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/strong_v5eb31.png',
        powerfull: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/powerfull_ccxmtc.png',
        awesome: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/awesome_h2dcdc.png',
        lucky: 'https://res.cloudinary.com/webprogbase/image/upload/v1584442924/lucky_dxf1ny.png',
    }
};
function configureStorages() {
    return UserStorage_1.default.loadUsers()
        .then(_ => FighterStorage_1.default.loadFighters());
}
exports.configureStorages = configureStorages;
