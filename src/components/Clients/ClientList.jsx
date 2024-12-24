import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getClients, deleteClient } from '../../libsql'

const ClientListContainer = styled.div`
  padding: 20px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
`

function ClientList() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients()
        setClients(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteClient(id)
      setClients(clients.filter((client) => client.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <ClientListContainer>Loading clients...</ClientListContainer>
  }

  if (error) {
    return <ClientListContainer>Error: {error}</ClientListContainer>
  }

  return (
    <ClientListContainer>
      <h2>Lista de Clientes</h2>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Contato</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <Td>{client.id}</Td>
              <Td>{client.name}</Td>
              <Td>{client.contact}</Td>
              <Td>
                <Button>Editar</Button>
                <Button onClick={() => handleDelete(client.id)}>Excluir</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ClientListContainer>
  )
}

export default ClientList
