import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Box, MenuItem, Paper, Select } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { listMessagesForRoom, listRooms } from '../../src/graphql/queries'
import { API, Auth } from 'aws-amplify'
import { createMessage } from '../../src/graphql/mutations'
import { CreateMessageResult, ListMessagesResult, ListRoomsResult, Message, Room } from 'sma-types'
import { MessageLeft, MessageRight, TextInput } from 'ui'


const ROOM_PLACEHOLDER = 'Room name'

const useStyles = makeStyles()((theme) => {
  return {
    paper: {
      width: "95vw",
      height: "95vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    header: {
      width: "100%"
    },
    box: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 90px )"
    }
  }
})

const fetchMessages = (roomId: string) =>
  (API.graphql({ query: listMessagesForRoom, variables: { roomId } }) as Promise<ListMessagesResult>)
    .then(result => result.data.listMessagesForRoom.items)

const fetchUsername = () =>
  Auth.currentAuthenticatedUser().then(user => user.username)

const fetchRoomList = () =>
  (API.graphql({ query: listRooms }) as Promise<ListRoomsResult>)
    .then(result => result.data.listRooms.items)

export const getRoomName = ({ rooms, roomId }: {
  rooms: Room[], roomId: string
}) =>
  rooms?.find(room => room.id === roomId)?.name

const ChatRoom = () => {
  const router = useRouter()
  const { roomId } = router.query
  const { classes } = useStyles()

  const [messages, setMessages] = useState<Message[]>([])
  const [username, setUsername] = useState<string>()
  const [rooms, setRooms] = useState<Room[]>()

  const handleRoomSelect = (e: any) => {
    console.log('handleRoomSelect e = ', e.target.value)
    router.push(`/room/${e.target.value}`)
  }

  const handleMessageSend = (newMessage: string) => {
    if (typeof roomId === 'string') {
      (API.graphql({
        query: createMessage,
        variables: {
          input: {
            content: {
              text: newMessage
            },
            roomId,
          },
        },
      }) as Promise<CreateMessageResult>)
        .then(({ data }) => {
          console.log('created message ', data.createMessage)
          setMessages([...messages, data.createMessage])
        })
    }
  }

  useEffect(() => {
    if (typeof roomId === 'string') {
      fetchMessages(roomId).then(setMessages)
      fetchRoomList().then(setRooms)
      fetchUsername().then(setUsername)
    }
  }, [roomId])

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={2}>
        <div className={classes.header}>
          <Box className={classes.box}>
            <Select label="Room" value={roomId || ROOM_PLACEHOLDER} onChange={handleRoomSelect}>
              {/* //{`Room: ${rooms && typeof roomId === 'string' && getRoomName({ rooms, roomId })}`}> */}
              {rooms && rooms.map(room => <MenuItem value={room.id}>{room.name}</MenuItem>)}
              {!roomId && <MenuItem value={ROOM_PLACEHOLDER}>{ROOM_PLACEHOLDER}</MenuItem>}
            </Select>
            <div>
              <Avatar
                alt={username || ''}
                src={username ? `https://github.com/${username}.png` : ''}
              ></Avatar>
              {username}
            </div>
          </Box>
        </div>
        <Paper id="style-1" className={classes.messagesBody}>
          {messages.map((message) => username === message.owner
            ? <MessageRight message={message} key={message.id} />
            : <MessageLeft message={message} key={message.id} />
          )}
        </Paper>
        <TextInput handleMessageSend={handleMessageSend} />
      </Paper>
    </div>
  )
}

export default ChatRoom