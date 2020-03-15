"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class default_1 {
    static readFile(path) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(path, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data.toString());
            });
        });
    }
    static writeFile(path, data) {
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(path, data, (err) => {
                if (err)
                    reject(err);
                else
                    resolve(null);
            });
        });
    }
}
exports.default = default_1;
