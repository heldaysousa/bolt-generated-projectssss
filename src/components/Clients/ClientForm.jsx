import React, { useState } from 'react'
import styled from 'styled-components'
import { addClient } from '../../libsql'

const ClientFormContainer = styled.div`
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

function ClientForm({ onAddClient }) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addClient({ name, contact })
      onAddClient()
      setName('')
      setContact('')
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) {
    return <ClientFormContainer>Error: {error}</ClientFormContainer>
  }

  return (
    <ClientFormContainer>
      <h2>Adicionar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Contato"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <Button type="submit">Adicionar Cliente</Button>
      </form>
    </ClientFormContainer>
  )
}

export default ClientForm
