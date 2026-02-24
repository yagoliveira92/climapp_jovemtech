import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// 1. Importe o hook useFonts e os pesos da fonte que você vai usar
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts
} from '@expo-google-fonts/montserrat';

// Impede que a tela de abertura feche automaticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 2. Carrega as fontes
  const [fontsLoaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  // 3. Oculta a Splash Screen assim que as fontes terminarem de carregar
  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // Se as fontes ainda não carregaram, não renderiza o app ainda
  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        {/* Você pode adicionar a rota list-city aqui depois: */}
        {/* <Stack.Screen name="list-city" /> */}
      </Stack>
    </>
  );
}