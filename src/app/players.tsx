import { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@/components/button'
import { ButtonIcon } from '@/components/button-icon'
import { Filter } from '@/components/filter'
import { Highlight } from '@/components/highlight'
import { Input } from '@/components/input'
import { ListEmpty } from '@/components/list-empty'

export default function NewGroup() {
  const renderPersonItem: ListRenderItem<string> = useCallback(() => {
    return <></>
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
      <FlatList
        data={['time a', 'time b']}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item}
        horizontal
      />
      <FlatList
        data={[]}
        renderItem={renderPersonItem}
        ListEmptyComponent={
          <ListEmpty message="Nenhuma pessoa para ser listada, adicione uma pessoa na lista." />
        }
      />
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
`

const Form = styled.View`
  background-color: ${({ theme }) => theme.colors.gray600};
  justify-content: center;
  flex-direction: row;
`
