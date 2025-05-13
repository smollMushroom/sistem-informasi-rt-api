"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateId = () => {
    const now = new Date();
    const pad = (number) => number.toString().padStart(2, '0');
    const dateStr = now.getFullYear().toString().slice(2) +
        pad(now.getMonth() + 1) +
        pad(now.getDate());
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return dateStr + randomPart;
};
exports.default = generateId;
