import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type FilterStyleProps = {
  isActive?: boolean
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  background-color: ${({ theme }) => theme.colors.gray600};
  border-radius: 4px;
  margin-right: 12px;
  height: 38px;
  padding: 8px;
  align-items: center;
  justify-content: center;

  ${({ theme, isActive }) =>
    isActive &&
    css`
      background-color: ${theme.colors.primary700};
    `};
`

export const Title = styled.Text`
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.sm}px;
    color: ${theme.colors.white};
  `};
`
