"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapLetterRequestToDTO = ({ letterRequests, pagination, message, status }) => {
    return {
        message,
        status,
        data: {
            letterRequests,
            pagination,
        },
    };
};
exports.default = mapLetterRequestToDTO;
