import styled from 'styled-components'

const HomeContainer = styled.div`
  text-align: center;
`

const Title = styled.h1`
  color: #333;
`

function Home() {
  return (
    <HomeContainer>
      <Title>Welcome to CEO Express</Title>
    </HomeContainer>
  )
}

export default Home
