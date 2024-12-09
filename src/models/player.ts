import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export class Player {
  public name!: string
  public key!: string
  public readonly id!: string

  constructor(player: Partial<Player>) {
    Object.assign(this, { ...player, key: player.key || new Date().toISOString(), id: uuidv4() })
  }
}
