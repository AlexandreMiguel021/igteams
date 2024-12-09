import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

import { Player } from './player'

export class Group {
  public name!: string
  public key!: string
  public players!: Player[]
  public readonly id!: string

  constructor(group: Partial<Group>) {
    Object.assign(this, {
      ...group,
      players: [],
      key: group.key || new Date().toISOString(),
      id: uuidv4()
    })
  }
}
