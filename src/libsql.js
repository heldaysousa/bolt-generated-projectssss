import { createClient } from '@libsql/client'

const client = createClient({
  url: 'file:./ceoexpress.db',
})

async function init() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      contact TEXT NOT NULL
    )
  `)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  `)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS financial_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      amount REAL NOT NULL
    )
  `)
}

init()

export async function getClients() {
  try {
    const rs = await client.execute('SELECT * FROM clients')
    return rs.rows
  } catch (error) {
    console.error('Error fetching clients:', error)
    return []
  }
}

export async function addClient(clientData) {
  try {
    await client.execute({
      sql: 'INSERT INTO clients (name, contact) VALUES (?, ?)',
      args: [clientData.name, clientData.contact],
    })
  } catch (error) {
    console.error('Error adding client:', error)
  }
}

export async function deleteClient(id) {
  try {
    await client.execute({
      sql: 'DELETE FROM clients WHERE id = ?',
      args: [id],
    })
  } catch (error) {
    console.error('Error deleting client:', error)
  }
}

export async function getServices() {
  try {
    const rs = await client.execute('SELECT * FROM services')
    return rs.rows
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function addService(serviceData) {
  try {
    await client.execute({
      sql: 'INSERT INTO services (name, price) VALUES (?, ?)',
      args: [serviceData.name, serviceData.price],
    })
  } catch (error) {
    console.error('Error adding service:', error)
  }
}

export async function deleteService(id) {
  try {
    await client.execute({
      sql: 'DELETE FROM services WHERE id = ?',
      args: [id],
    })
  } catch (error) {
    console.error('Error deleting service:', error)
  }
}

export async function getFinancialRecords() {
  try {
    const rs = await client.execute('SELECT * FROM financial_records')
    return rs.rows
  } catch (error) {
    console.error('Error fetching financial records:', error)
    return []
  }
}

export async function addFinancialRecord(recordData) {
  try {
    await client.execute({
      sql: 'INSERT INTO financial_records (type, category, amount) VALUES (?, ?, ?)',
      args: [recordData.type, recordData.category, recordData.amount],
    })
  } catch (error) {
    console.error('Error adding financial record:', error)
  }
}
