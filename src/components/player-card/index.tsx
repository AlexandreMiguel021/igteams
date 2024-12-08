import { memo } from 'react'

import { ButtonIcon } from '../button-icon'

import { Container, Icon, Name } from './styles'

type PlayerCardProps = {
  name: string
  onRemove: () => void
}

export function _PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon icon="close" type="secondary" onPress={onRemove} />
    </Container>
  )
}

export const PlayerCard = memo(_PlayerCard)
