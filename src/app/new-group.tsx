import { useRouter } from 'expo-router'
import { Users } from 'lucide-react-native'
import { useState } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@/components/button'
import { Highlight } from '@/components/highlight'
import { Input } from '@/components/input'
import { Group } from '@/models/group'
import { useGroup } from '@/store/useGroup'

export default function NewGroup() {
  const router = useRouter()

  const { addGroup } = useGroup()
  const [groupName, setGroupName] = useState('')

  const createGroup = () => {
    try {
      const newGroup = new Group({ name: groupName })
      addGroup(newGroup)
      router.back()
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message)
      }
    }
  }

  return (
    <Container>
      <Icon />
      <Highlight title="Nova turma" subtitle="crie uma turma para adicionar pessoas" />
      <Input
        placeholder="Informe o nome da turma..."
        value={groupName}
        onChangeText={setGroupName}
      />
      <Button title="Criar" onPress={createGroup} />
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
