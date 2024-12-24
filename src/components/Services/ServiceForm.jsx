import React, { useState } from 'react'
import styled from 'styled-components'
import { addService } from '../../libsql'

const ServiceFormContainer = styled.div`
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

function ServiceForm({ onAddService }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addService({ name, price: parseFloat(price) })
      onAddService()
      setName('')
      setPrice('')
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) {
    return <ServiceFormContainer>Error: {error}</ServiceFormContainer>
  }

  return (
    <ServiceFormContainer>
      <h2>Adicionar Serviço</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button type="submit">Adicionar Serviço</Button>
      </form>
    </ServiceFormContainer>
  )
}

export default ServiceForm
