import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// No React/TypeScript, usamos Interfaces para definir quais "parâmetros" (props).
interface CityTileProps {
  cityName: string;
  icon: string;
  temperature: number;
  onTap: () => void;
}

export default function CityTile({ cityName, icon, temperature, onTap }: CityTileProps) {
  const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_URL;
 

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onTap}
      activeOpacity={0.7}
    >
      <View style={styles.contentRow}>
        
        <Image
          source={{ uri: `${IMAGE_URL}${icon}.svg` }}
          style={styles.icon}
          contentFit="contain" 
        />

        <Text style={styles.cityName}>
          {cityName}
        </Text>

        <Text style={styles.temperatureText}>
          {temperature}°C
        </Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // Cor branca com transparência (equivalente ao 0xFF15FFFFFF do Flutter)
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 15,
    marginVertical: 10, // margin: EdgeInsets.symmetric(vertical: 10.0)
    padding: 16,
  },
  contentRow: {
    flexDirection: 'row', // Comportamento de Row do Flutter
    alignItems: 'center', // Centraliza verticalmente
    justifyContent: 'space-between', // Separa os itens (Leading, Title, Trailing)
  },
  icon: {
    width: 40,
    height: 40,
  },
  cityName: {
    flex: 1, // Ocupa o espaço restante
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat_600SemiBold', // Se estiver usando a fonte da aula anterior
  },
  temperatureText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: 'Montserrat_700Bold',
  }
});