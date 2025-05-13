import { EventScheduleMapper, EventScheduleResponseDTO } from "../interfaces/IDTOs";

const mapEventScheduleToDTO = ({
  events,
  pagination,
  message,
  status,
}: EventScheduleMapper): EventScheduleResponseDTO => {
  return {
    message,
    status,
    data: {
      events,
      pagination,
    },
  };
};

export default mapEventScheduleToDTO;