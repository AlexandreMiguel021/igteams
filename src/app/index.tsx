import { Link } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export default function Home() {
  return (
    <Container>
      <Link href={'/test'} asChild>
        <TouchableOpacity>
          <Text style={{ color: 'white' }}>a</Text>
        </TouchableOpacity>
      </Link>
    </Container>
  )
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.gray700};
  flex: 1;
`
