import { PostMapper, PostResponseDTO } from "../interfaces/IDTOs";

const mapPostToDTO = ({posts, pagination, message, status}: PostMapper): PostResponseDTO => {
  return {
    message,
    status,
    data: {
      posts,
      pagination
    }
  }
}

export default mapPostToDTO;