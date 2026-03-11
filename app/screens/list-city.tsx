import CityTile from '@/components/CityTile';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { WeatherForecast } from '../../interfaces/forecast_interface';

export default function ListCityScreen() {
  const router = useRouter();

  const [allCities, setAllCities] = useState<WeatherForecast[]>([]);
  const [filteredCities, setFilteredCities] = useState<WeatherForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const listCitySearch = ['Aracaju,SE', 'Itabaiana,SE', 'Salvador,BA', 'Curitiba,PR'];

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      setIsLoading(true);
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;

      const promises = listCitySearch.map(async (city) => {
        const response = await fetch(`${apiUrl}?key=${apiKey}&city_name=${city}`);
        if (!response.ok) {
          throw new Error('Deu ruim, olhe pela janela');
        }
        const data = await response.json();
        return {
          cityName: data.results.city,
          conditionSlug: data.results.condition_slug,
          temp: data.results.temp,
          date: data.results.date,
          description: data.results.description,
          forecast: data.results.forecast,
        } as WeatherForecast;
      });

      const listCity = await Promise.all(promises);

      setAllCities(listCity);
      setFilteredCities(listCity);
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.error('Deu ruim, olhe pela janela', error);
    }
  };

  const filterCities = (text: string) => {
    setSearchQuery(text); // Atualiza o texto do input

    if (text === '') {
      setFilteredCities(allCities);
    } else {
      const filtered = allCities.filter((city) =>
        city.cityName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  };

  return (
    <LinearGradient colors={['#00457D', '#05051F']} style={styles.container}>
      <View style={styles.content}>
        <View style={{ height: 60 }} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder='Digite uma cidade'
            placeholderTextColor='#FFFFFF80'
            value={searchQuery}
            onChangeText={filterCities}
          />
          <Ionicons
            name="search"
            size={24}
            color="white"
            style={styles.searchIcon}
          />

        </View>
        <View style={{ height: 30 }} />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <FlatList
            data={filteredCities} // A lista de itens
            keyExtractor={(item) => item.cityName} // A chave única de cada item
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Nenhuma cidade encontrada para "{searchQuery}".
                </Text>
              </View>
            )}
            renderItem={({ item }) => ( // Como desenhar cada item
              <CityTile
                cityName={item.cityName}
                icon={item.conditionSlug}
                temperature={item.temp}
                onTap={() => {
                  router.push({
                    pathname: '../screens/weather-city',
                    params: { weatherData: JSON.stringify(item) }
                  });
                }}
              />
            )}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Color(0xFF15FFFFFF)
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 50,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  searchIcon: {
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#FFFFFF80', // Um branco mais transparente para não ficar agressivo
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular', // Usando a fonte que já está no projeto
  }
});