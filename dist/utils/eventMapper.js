"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapEventScheduleToDTO = ({ events, pagination, message, status, }) => {
    return {
        message,
        status,
        data: {
            events,
            pagination,
        },
    };
};
exports.default = mapEventScheduleToDTO;
