import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getServices, deleteService } from '../../libsql'

const ServiceListContainer = styled.div`
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

function ServiceList() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices()
        setServices(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteService(id)
      setServices(services.filter((service) => service.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <ServiceListContainer>Loading services...</ServiceListContainer>
  }

  if (error) {
    return <ServiceListContainer>Error: {error}</ServiceListContainer>
  }

  return (
    <ServiceListContainer>
      <h2>Lista de Serviços</h2>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Preço</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <Td>{service.id}</Td>
              <Td>{service.name}</Td>
              <Td>R$ {service.price.toFixed(2)}</Td>
              <Td>
                <Button>Editar</Button>
                <Button onClick={() => handleDelete(service.id)}>Excluir</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ServiceListContainer>
  )
}

export default ServiceList
