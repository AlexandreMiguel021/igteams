import { theme } from '@/theme'
import 'styled-components/native'

type The = typeof theme

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      white: string
      primary700: string
      primary500: string
      secondary500: string
      secondary700: string
      gray700: string
      gray600: string
      gray500: string
      gray400: string
      gray300: string
      gray200: string
      gray100: string
    }
    headerHeight: number
    fontFamily: {
      regular: string
      bold: string
    }
    fontSize: {
      sm: number
      md: number
      lg: number
      xl: number
    }
  }
}
