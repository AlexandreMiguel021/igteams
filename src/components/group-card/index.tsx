import { memo } from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Icon, Title } from './styles'

interface GroupCardProps extends TouchableOpacityProps {
  title: string
}

function _GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}

export const GroupCard = memo(_GroupCard)
