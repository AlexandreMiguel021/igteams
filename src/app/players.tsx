import { useLocalSearchParams, useRouter } from 'expo-router'
import { memo, useCallback, useState } from 'react'
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
  const { groups, deleteGroup } = useGroup()

  const [filterGroupId, setFilterGroupId] = useState(groupId)

  const currentGroup = groups.find((group) => group.id === filterGroupId)

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

  const renderPersonItem: ListRenderItem<Player> = useCallback(
    ({ item: player }) => {
      return (
        <Animated.View entering={FadeInUp}>
          <PlayerCardController filterGroupId={filterGroupId} player={player} />
        </Animated.View>
      )
    },
    [filterGroupId]
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
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ListEmpty message="Nenhuma pessoa para ser listada, adicione uma pessoa na lista." />
        }
      />
      <Button title="Remover turma" type="secondary" onPress={handleDeleteGroup} />
    </Container>
  )
}

/**
 * `PlayersForm` is a form component that allows adding a new player to a specific filter group.
 * The component ensures that typing in the input does not cause unnecessary rerenders of the parent component.
 */
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

type PlayerCardControllerProps = {
  player: Player
  filterGroupId: string
}

/**
 * `PlayerCardController` is a component designed to manage player removal from the list efficiently,
 * preventing unnecessary rerenders when a player is added or deleted. It encapsulates the deletion logic
 * to ensure that removing a player doesn't trigger a full re-render of the list.
 */
const PlayerCardController = memo(({ player, filterGroupId }: PlayerCardControllerProps) => {
  const deletePlayer = useGroup((state) => state.deletePlayer)

  const handleDeletePlayer = useCallback(() => {
    try {
      deletePlayer(player.id, filterGroupId)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message)
      }
    }
  }, [deletePlayer, filterGroupId, player.id])

  return <PlayerCard player={player} onRemove={handleDeletePlayer} />
})

PlayerCardController.displayName = 'PlayerCardController'

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
