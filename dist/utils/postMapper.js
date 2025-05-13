"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapPostToDTO = ({ posts, pagination, message, status }) => {
    return {
        message,
        status,
        data: {
            posts,
            pagination
        }
    };
};
exports.default = mapPostToDTO;
