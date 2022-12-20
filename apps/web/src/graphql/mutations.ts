
export const createMessage = /* GraphQL */ `
mutation CreateMessage($input: MessageInput!) {
  createMessage(input: $input) {
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
}
`

export const createRoom = /* GraphQL */ `
  mutation CreateRoom($input: RoomInput!) {
    createRoom(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;