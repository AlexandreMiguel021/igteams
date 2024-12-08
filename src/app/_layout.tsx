import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components/native'

import * as Header from '@/components/header'
import { theme } from '@/theme'

export default function HomeLayout() {
  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          header: (props) => {
            return (
              <Header.SafeAreaView>
                <Header.Container>
                  {props.back && (
                    <Header.GoBackButton onPress={props.navigation.goBack}>
                      <Header.GoBackIcon />
                    </Header.GoBackButton>
                  )}
                  <Header.Logo />
                </Header.Container>
              </Header.SafeAreaView>
            )
          }
        }}
      />
    </ThemeProvider>
  )
}
