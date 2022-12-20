
export const listRooms = /* GraphQL */ `
  query ListRooms($limit: Int) {
    listRooms(limit: $limit) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;


export const getRoomInfo = /* GraphQL */ `
  query ListRooms($roomId: ID!) {
    listRooms(id: $roomId) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;


export const listMessagesForRoom = /* GraphQL */ `
  query ListMessagesForRoom($roomId: ID!, $sortDirection: ModelSortDirection) {
    listMessagesForRoom(roomId: $roomId, sortDirection: $sortDirection) {
      items {
        id
        content {
          text
          imageId
        }
        owner
        createdAt
        updatedAt
        roomId
      }
      nextToken
    }
  }
`;
