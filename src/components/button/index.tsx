import { Link, LinkProps } from 'expo-router'
import { TouchableOpacityProps } from 'react-native'

import { ButtonTypeStyleProps, Container, Title } from './styles'

type ButtonProps = TouchableOpacityProps & {
  title: string
  type?: ButtonTypeStyleProps
  link?: LinkProps
}

export function Button({ title, type = 'primary', link, ...rest }: ButtonProps) {
  const buttonContent = (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  )

  if (link?.href) {
    return (
      <Link {...link} asChild>
        {buttonContent}
      </Link>
    )
  }

  return buttonContent
}
