import { Users } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export const Container = styled(TouchableOpacity)`
  height: 70px;
  background-color: ${({ theme }) => theme.colors.gray500};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  gap: 12px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.md}px;
    color: ${theme.colors.gray200};
    font-family: ${theme.fontFamily.regular};
  `};
`

export const Icon = styled(Users).attrs(({ theme }) => ({
  size: 28,
  color: theme.colors.primary700,
  weight: 'fill'
}))``
