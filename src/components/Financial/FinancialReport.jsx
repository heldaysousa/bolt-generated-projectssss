import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getFinancialRecords } from '../../libsql'

const FinancialReportContainer = styled.div`
  padding: 20px;
`

const Report = styled.div`
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
`

function FinancialReport() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getFinancialRecords()
        setRecords(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRecords()
  }, [])

  if (loading) {
    return <FinancialReportContainer>Loading financial report...</FinancialReportContainer>
  }

  if (error) {
    return <FinancialReportContainer>Error: {error}</FinancialReportContainer>
  }

  const totalRevenue = records
    .filter((record) => record.type === 'revenue')
    .reduce((sum, record) => sum + record.amount, 0)
  const totalExpense = records
    .filter((record) => record.type === 'expense')
    .reduce((sum, record) => sum + record.amount, 0)
  const netProfit = totalRevenue - totalExpense

  return (
    <FinancialReportContainer>
      <h2>Relatório Financeiro</h2>
      <Report>
        <p>Total de Receitas: R$ {totalRevenue.toFixed(2)}</p>
        <p>Total de Despesas: R$ {totalExpense.toFixed(2)}</p>
        <p>Lucro Líquido: R$ {netProfit.toFixed(2)}</p>
      </Report>
    </FinancialReportContainer>
  )
}

export default FinancialReport
