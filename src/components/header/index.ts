import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import LogoImg from '@/assets/images/logo.png'

export const Container = styled.View`
  height: 72;
  background-color: ${({ theme }) => theme.colors.secondary700};
  align-items: center;
  flex-direction: row;
  padding-left: 16;
  padding-right: 16;
`
export const SafeAreaView = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.secondary700};
`
export const GoBackIcon = styled(ChevronLeft).attrs(() => ({
  size: 32,
  strokeWidth: 1.5
}))`
  color: ${({ theme }) => theme.colors.white};
  margin-left: -12;
`

export const GoBackButton = styled(TouchableOpacity)`
  flex: 1;
`

export const Logo = styled.Image.attrs(() => ({
  source: LogoImg
}))`
  height: 56;
  width: 40;
  margin: auto;
`
