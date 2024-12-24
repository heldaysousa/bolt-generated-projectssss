prossiimport { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import styled from 'styled-components'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ClientList from './components/Clients/ClientList'
import ClientForm from './components/Clients/ClientForm'
import ServiceList from './components/Services/ServiceList'
import ServiceForm from './components/Services/ServiceForm'
import FinancialRecord from './components/Financial/FinancialRecord'
import FinancialReport from './components/Financial/FinancialReport'
import Reminder from './components/Communication/Reminder'

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f0f0f0;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;

  &:hover {
    background-color: #ddd;
  }
`

function App() {
  return (
    <Router>
      <AppContainer>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Registro</NavLink>
          <NavLink to="/clients">Clientes</NavLink>
          <NavLink to="/add-client">Adicionar Cliente</NavLink>
          <NavLink to="/services">Serviços</NavLink>
          <NavLink to="/add-service">Adicionar Serviço</NavLink>
          <NavLink to="/financial-record">Registro Financeiro</NavLink>
          <NavLink to="/financial-report">Relatório Financeiro</NavLink>
          <NavLink to="/reminder">Lembrete</NavLink>
        </Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/add-client" element={<ClientForm onAddClient={() => {}} />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/add-service" element={<ServiceForm onAddService={() => {}} />} />
          <Route path="/financial-record" element={<FinancialRecord onAddRecord={() => {}} />} />
          <Route path="/financial-report" element={<FinancialReport />} />
          <Route path="/reminder" element={<Reminder />} />
        </Routes>
      </AppContainer>
    </Router>
  )
}

export default App
