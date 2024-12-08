import { TouchableOpacity } from 'react-native'
import styled, { css, DefaultTheme } from 'styled-components/native'

export type ButtonTypeStyleProps = 'primary' | 'secondary'

type Props = {
  type: ButtonTypeStyleProps
}

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  background-color: ${({ theme, type }) => getBackgroundColor(theme, type)};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.md}px;
    color: ${theme.colors.white};
    font-family: ${theme.fontFamily.bold};
  `};
`

const getBackgroundColor = (theme: DefaultTheme, type: string) => {
  switch (type) {
    case 'primary':
      return theme.colors.primary700
    case 'secondary':
      return theme.colors.secondary700
    default:
      return theme.colors.gray500
  }
}
