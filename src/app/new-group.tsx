import { Users } from 'lucide-react-native'
import styled from 'styled-components/native'

import { Button } from '@/components/button'
import { Highlight } from '@/components/highlight'
import { Input } from '@/components/input'

export default function NewGroup() {
  return (
    <Container>
      <Icon />
      <Highlight title="Nova turma" subtitle="crie uma turma para adicionar pessoas" />
      <Input />
      <Button title="Criar" />
    </Container>
  )
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.gray700};
  flex: 1;
  gap: 16px;
  padding: 16px;
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.headerHeight}px;
`

const Icon = styled(Users).attrs(({ theme }) => ({
  color: theme.colors.primary500,
  size: 42
}))`
  align-self: center;
`
