import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@/components/button'
import { GroupCard } from '@/components/group-card'
import { Highlight } from '@/components/highlight'
import { ListEmpty } from '@/components/list-empty'
import { Group } from '@/models/group'
import { useGroup } from '@/store/useGroup'

export default function Home() {
  const router = useRouter()
  const { groups } = useGroup()

  const renderItem: ListRenderItem<Group> = useCallback(
    ({ item: group }) => {
      return (
        <GroupCard
          title={group.name}
          onPress={() => router.navigate({ pathname: '/players', params: { groupId: group.id } })}
        />
      )
    },
    [router]
  )

  return (
    <Container>
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 16 }}
        ListEmptyComponent={
          <ListEmpty message="Não há turmas para serem listadas, que tal cadastrar a primeira turma?" />
        }
      />
      <Button title="Criar nova turma" link={{ href: '/new-group' }} />
    </Container>
  )
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.gray700};
  flex: 1;
  gap: 16px;
  padding: 16px;
`
