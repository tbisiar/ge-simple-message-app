
export type Room = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type ListRoomsResult = {
  data: {
    listRooms: {
      items: Room[]
    }
  }
}

export type Message = {
  id: string
  content: {
    text: string
    imageId: string
  }
  owner: string
  createdAt: string
  updatedAt: string
  roomId: string
}

export type ListMessagesResult = {
  data: {
    listMessagesForRoom: {
      items: Message[]
    }
  }
}

export type CreateMessageResult = {
  data: {
    createMessage: Message
  }
}
