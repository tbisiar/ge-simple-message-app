import React from 'react'
import { makeStyles } from 'tss-react/mui'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { Message } from 'sma-types'

const useMessageStyles = makeStyles()((theme) => {
  return {
    messageRow: {
      display: "flex"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end"
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#A8DDFD",
      width: "60%",
      minWidth: "10em",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      borderRadius: "5px"
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#f8e896",
      width: "60%",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      borderRadius: "5px"
    },

    messageContent: {
      padding: 0,
      margin: 0
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: 300,
      marginTop: "10px",
      right: "5px"
    },

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    displayName: {
      marginLeft: "20px"
    }
  }
})

export const MessageLeft = (props: { message: Message }) => {
  const { message } = props
  const { classes } = useMessageStyles()
  return (
    <div className={classes.messageRow}>
      <Avatar
        alt={message.owner}
        className={classes.orange}
        src={`https://github.com/${message.owner}.png`}
      ></Avatar>
      <div>
        <div className={classes.displayName}>{message.owner}</div>
        <div className={classes.messageBlue}>
          <div>
            <p className={classes.messageContent}>{message.content.text}</p>
          </div>
          <div className={classes.messageTimeStampRight}>{new Date(message.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export const MessageRight = (props: { message: Message }) => {
  const { classes } = useMessageStyles()
  const { message } = props
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <p className={classes.messageContent}>{message.content.text}</p>
        <div className={classes.messageTimeStampRight}>{new Date(message.createdAt).toLocaleString()}</div>
      </div>
    </div>
  )
}
