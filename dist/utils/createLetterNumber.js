"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LetterRequestRepository_1 = __importDefault(require("../repositories/LetterRequestRepository"));
const createLetterNumber = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 1–12
    const romanMonths = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    const romanMonth = romanMonths[month - 1];
    const lastLetter = yield LetterRequestRepository_1.default.findLastLetterNumber(romanMonth, year);
    let nextNumber = 1;
    if (lastLetter) {
        const parts = lastLetter.split('-');
        const lastNum = parseInt(parts[0], 10);
        nextNumber = lastNum + 1;
    }
    const formattedNumber = String(nextNumber).padStart(3, '0');
    const finalLetterNumber = `${formattedNumber}-${romanMonth}-${year}`;
    return finalLetterNumber;
});
exports.default = createLetterNumber;
