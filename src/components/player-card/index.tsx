import { Player } from '@/models/player'

import { ButtonIcon } from '../button-icon'

import { Container, Icon, Name } from './styles'

type PlayerCardProps = {
  player: Player
  onRemove: () => void
}

export function PlayerCard({ player, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{player.name}</Name>
      <ButtonIcon icon="close" type="secondary" onPress={onRemove} />
    </Container>
  )
}
