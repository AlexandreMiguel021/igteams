import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  gap: 4px;
`

export const Title = styled.Text`
  text-align: center;

  ${({ theme }) => css`
    font-size: ${theme.fontSize.xl}px;
    font-family: ${theme.fontFamily.bold};
    color: ${theme.colors.white};
  `};
`

export const Subtitle = styled.Text`
  text-align: center;

  ${({ theme }) => css`
    font-size: ${theme.fontSize.sm}px;
    font-family: ${theme.fontFamily.regular};
    color: ${theme.colors.gray300};
  `};
`
