import React, { useState } from 'react'
import styled from 'styled-components'
import { addFinancialRecord } from '../../libsql'

const FinancialRecordContainer = styled.div`
  padding: 20px;
`

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Select = styled.select`
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

function FinancialRecord({ onAddRecord }) {
  const [type, setType] = useState('revenue')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addFinancialRecord({
        type,
        category,
        amount: parseFloat(amount),
      })
      onAddRecord()
      setCategory('')
      setAmount('')
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) {
    return <FinancialRecordContainer>Error: {error}</FinancialRecordContainer>
  }

  return (
    <FinancialRecordContainer>
      <h2>Registro Financeiro</h2>
      <form onSubmit={handleSubmit}>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="revenue">Receita</option>
          <option value="expense">Despesa</option>
        </Select>
        <Input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button type="submit">Adicionar Registro</Button>
      </form>
    </FinancialRecordContainer>
  )
}

export default FinancialRecord
