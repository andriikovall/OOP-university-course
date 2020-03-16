"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randInt(from, to) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
}
exports.randInt = randInt;
