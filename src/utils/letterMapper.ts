import { LetterRequestMapper, LetterRequestResponseDTO } from "../interfaces/IDTOs";

const mapLetterRequestToDTO = ({
  letterRequests,
  pagination,
  message,
  status
}: LetterRequestMapper): LetterRequestResponseDTO => {
  return {
    message,
    status,
    data: {
      letterRequests,
      pagination,
    },
  };
};

export default mapLetterRequestToDTO;