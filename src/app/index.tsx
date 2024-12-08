import { useCallback, useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@/components/button'
import { GroupCard } from '@/components/group-card'
import { Highlight } from '@/components/highlight'
import { ListEmpty } from '@/components/list-empty'

export default function Home() {
  const [groups] = useState(['Galera da rocket'])

  const renderItem: ListRenderItem<string> = useCallback(({ item }) => {
    return <GroupCard title={item} />
  }, [])

  return (
    <Container>
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        ListEmptyComponent={
          <ListEmpty message="Não há turmas para serem listadas, que tal cadastrar a primeira turma?" />
        }
      />
      <Button title="Criar nova turma" />
    </Container>
  )
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.gray700};
  flex: 1;
  gap: 16px;
  padding: 16px;
`
