import React, { useEffect, useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Button } from '@mui/material'
import { API } from 'aws-amplify'
import { listRooms } from '../src/graphql/queries'
import { ListRoomsResult, Room } from 'sma-types'

const fetchRoomList = () =>
  (API.graphql({ query: listRooms }) as Promise<ListRoomsResult>)
    .then(room => room.data.listRooms.items)

const Home = ({ signOut, user }:any) => {
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    fetchRoomList().then(setRooms)
  }, [])

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <Button onClick={signOut}>Sign Out</Button>
      Select or create a chat room:

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <a title={room.name} href={`/room/${room.id}`}>
              {room.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Wrapping withAuthenticator to enforce cognito auth
export default withAuthenticator(Home, {
  signUpAttributes: ['email', 'given_name', 'family_name'],
})