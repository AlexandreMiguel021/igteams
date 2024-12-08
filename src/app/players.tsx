import { useCallback, useState } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@/components/button'
import { ButtonIcon } from '@/components/button-icon'
import { Filter } from '@/components/filter'
import { Highlight } from '@/components/highlight'
import { Input } from '@/components/input'
import { ListEmpty } from '@/components/list-empty'
import { PlayerCard } from '@/components/player-card'

export default function NewGroup() {
  const [players] = useState(['Alexandre'])

  const renderPersonItem: ListRenderItem<string> = useCallback(({ item: player }) => {
    return <PlayerCard name={player} onRemove={() => {}} />
  }, [])

  const renderFilterItem: ListRenderItem<string> = useCallback(({ item: filter }) => {
    return <Filter title={filter} />
  }, [])

  return (
    <Container>
      <Highlight title="Nome da turma" subtitle="adicione a galera e separe os times" />
      <Form>
        <Input placeholder="Nome da pessoa" />
        <ButtonIcon icon="add" />
      </Form>

      <View>
        <FlatList
          data={['time a', 'time b']}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item}
          horizontal
        />
      </View>

      <FlatList
        data={players}
        renderItem={renderPersonItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ListEmpty message="Nenhuma pessoa para ser listada, adicione uma pessoa na lista." />
        }
      />
      <Button title="Remover turma" type="secondary" />
    </Container>
  )
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.gray700};
  flex: 1;
  gap: 16px;
  padding: 16px;
  justify-content: center;
`

const Form = styled.View`
  background-color: ${({ theme }) => theme.colors.gray600};
  justify-content: center;
  flex-direction: row;
`
