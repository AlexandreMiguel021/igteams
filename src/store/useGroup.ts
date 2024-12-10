import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { Group } from '@/models/group'
import { Player } from '@/models/player'

export interface GroupStore {
  groups: Group[]
  addGroup: (group: Group) => void
  addPlayer: (player: Player, groupId: string) => void
  deleteGroup: (groupId: string) => void
  deletePlayer: (playerId: string, groupId: string) => void
  findGroupByName: (groupName: string) => Group
}

const useGroup = create<GroupStore>()(
  persist(
    immer((set, get) => ({
      groups: [] as Group[],
      findGroupByName: (groupName: string) => {
        const group = get().groups.find(
          (group) => group.name.toLowerCase() === groupName.toLocaleLowerCase()
        )

        if (!group) {
          return {} as Group
        }

        return group
      },
      deletePlayer: (playerId, groupId) => {
        set((state) => {
          const groupInd = state.groups.findIndex((group) => group.id === groupId)

          if (groupInd === -1) {
            throw new Error('Não foi remover Grupo, não encontrado!')
          }

          const group = state.groups[groupInd]
          const playerInd = group.players.findIndex((player) => player.id === playerId)

          if (playerInd === -1) {
            throw new Error('Não foi remover Jogador, não encontrado!')
          }

          group.players.splice(playerInd, 1)
        })
      },
      addGroup: (newGroup) => {
        set((state) => {
          if (!newGroup.name.trim().length) {
            throw new Error('Informe o nome da turma!')
          }

          const groupNameAlreadyExist = get().findGroupByName(newGroup.name).name

          if (groupNameAlreadyExist) {
            throw new Error(`Já existe uma turma com o nome ${newGroup.name}`)
          }

          state.groups.push(newGroup)
        })
      },
      deleteGroup: (groupId) => {
        set((state) => {
          const groupInd = state.groups.findIndex((group) => group.id === groupId)

          if (groupInd === -1) {
            throw new Error('Não foi remover Grupo, não encontrado!')
          }

          state.groups.splice(groupInd, 1)
        })
      },
      addPlayer: (newPlayer, groupId) => {
        set((state) => {
          if (!newPlayer.name.trim().length) {
            throw new Error('Informe o nome do jogador!')
          }

          const groupInd = state.groups.findIndex((group) => group.id === groupId)

          if (groupInd === -1) {
            throw new Error('Não foi adicionar Jogador!')
          }

          const playerNames = new Set()

          state.groups.forEach((group) => {
            group.players.forEach((player) => {
              playerNames.add(player.name)
            })
          })

          if (playerNames.has(newPlayer.name)) {
            throw new Error('Já existe um jogador com esse nome!')
          }

          state.groups[groupInd].players.push(newPlayer)
        })
      }
    })),
    {
      name: 'group-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)

export { useGroup }
