import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { Alert, FlatList, ListRenderItem, View } from 'react-native'
import Animated, { CurvedTransition, FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated'
import styled from 'styled-components/native'

import { Button } from '@/components/button'
import { ButtonIcon } from '@/components/button-icon'
import { Filter } from '@/components/filter'
import { Highlight } from '@/components/highlight'
import { Input } from '@/components/input'
import { ListEmpty } from '@/components/list-empty'
import { PlayerCard } from '@/components/player-card'
import { Group } from '@/models/group'
import { Player } from '@/models/player'
import { useGroup } from '@/store/useGroup'

export default function NewGroup() {
  const router = useRouter()

  const { groupId }: { groupId: string } = useLocalSearchParams()
  const { groups, deleteGroup, deletePlayer } = useGroup()

  const [filterGroupId, setFilterGroupId] = useState(groupId)

  const currentGroup = useMemo(() => {
    return groups.find((group) => group.id === filterGroupId)
  }, [filterGroupId, groups])

  if (!currentGroup) {
    throw new Error('Grupo não encontrado!')
  }

  const handleDeleteGroup = () => {
    Alert.alert('Remover grupo?', 'Ação não pode ser revertida, tem certeza?', [
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          deleteGroup(filterGroupId)
          router.back()
        }
      },
      { text: 'Cancelar', onPress: undefined }
    ])
  }

  const handleDeletePlayer = useCallback(
    (playerId: string) => {
      try {
        deletePlayer(playerId, filterGroupId)
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('Erro', error.message)
        }
      }
    },
    [deletePlayer, filterGroupId]
  )

  const renderPersonItem: ListRenderItem<Player> = useCallback(
    ({ item: player }) => {
      return (
        <Animated.View entering={FadeInUp}>
          <PlayerCard name={player.name} onRemove={() => handleDeletePlayer(player.id)} />
        </Animated.View>
      )
    },
    [handleDeletePlayer]
  )

  const renderFilterItem: ListRenderItem<Group> = useCallback(
    ({ item: filter }) => {
      return (
        <Filter
          title={filter.name}
          isActive={filterGroupId === filter.id}
          onPress={() => setFilterGroupId(filter.id)}
        />
      )
    },
    [filterGroupId]
  )

  return (
    <Container>
      <Animated.View exiting={FadeOut} entering={FadeIn.delay(250)} key={filterGroupId}>
        <Highlight title={currentGroup.name} subtitle="adicione a galera e separe os times" />
      </Animated.View>

      <PlayersForm filterGroupId={filterGroupId} />

      <View>
        <FlatList
          data={groups}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.key}
          horizontal
        />
      </View>

      <Animated.FlatList
        itemLayoutAnimation={CurvedTransition}
        data={currentGroup.players}
        renderItem={renderPersonItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ListEmpty message="Nenhuma pessoa para ser listada, adicione uma pessoa na lista." />
        }
      />
      <Button title="Remover turma" type="secondary" onPress={handleDeleteGroup} />
    </Container>
  )
}

function PlayersForm({ filterGroupId }: { filterGroupId: string }) {
  const { addPlayer } = useGroup()
  const [playerName, setPlayerName] = useState('')

  const handleAddPlayer = () => {
    try {
      const newPlayer = new Player({ name: playerName })
      addPlayer(newPlayer, filterGroupId)
      setPlayerName('')
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message)
      }
    }
  }

  return (
    <Form>
      <Input
        placeholder="informe o nome do jogador"
        value={playerName}
        onChangeText={setPlayerName}
      />
      <ButtonIcon icon="add" onPress={handleAddPlayer} />
    </Form>
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
