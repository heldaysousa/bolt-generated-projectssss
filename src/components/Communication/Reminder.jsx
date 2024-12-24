import React, { useState } from 'react'
import styled from 'styled-components'

const ReminderContainer = styled.div`
  padding: 20px;
`

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

function Reminder() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Lembrete enviado:', { email, message })
    // Aqui você normalmente lidaria com o envio de um lembrete por e-mail
  }

  return (
    <ReminderContainer>
      <h2>Enviar Lembrete</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Email do Cliente"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Enviar Lembrete</Button>
      </form>
    </ReminderContainer>
  )
}

export default Reminder
