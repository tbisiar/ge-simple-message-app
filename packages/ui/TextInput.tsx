import React, { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Button, TextField } from '@mui/material'

const useTextInputStyles = makeStyles()((theme) => {
  return {
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      marginBottom: `10ps`
    },
    wrapText: {
      width: "100%"
    },
    button: {
      //margin: theme.spacing(1),
    },
  }
})


export const TextInput = ({ handleMessageSend }: { handleMessageSend: Function }) => {
  const { classes } = useTextInputStyles()
  const [messageText, setMessageText] = useState('')

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    handleMessageSend(messageText)
    setMessageText('')
  }

  const handleTextFieldUpdate = (event: any) => {
    setMessageText((event.target as HTMLTextAreaElement).value)
  }

  return (
    <form className={classes.wrapForm} noValidate autoComplete="off" onSubmit={handleFormSubmit}>
      <TextField
        id="standard-text"
        label="Enter your message"
        className={classes.wrapText}
        onChange={handleTextFieldUpdate}
        value={messageText}
      />
      <Button variant="contained" color="primary" className={classes.button} type='submit'>
        send
      </Button>
    </form>
  )
}
