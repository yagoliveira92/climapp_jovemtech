import CityTile from '@/components/CityTile';
import { Ionicons } from '@expo/vector-icons'; // Ícones nativos do Expo
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TextInput,
    View
} from 'react-native';

// Interface para simular o seu WeatherForecastModel
interface WeatherForecast {
  cityName: string;
  conditionSlug: string;
  temp: number;
}

export default function ListCityScreen() {
  const router = useRouter();

  // 1. ESTADOS (Substitui o setState do Flutter)
  const [allCities, setAllCities] = useState<WeatherForecast[]>([]);
  const [filteredCities, setFilteredCities] = useState<WeatherForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const listCitySearch = ['Aracaju,SE', 'Itabaiana,SE', 'Salvador,BA', 'Curitiba,PR'];

  // 2. CICLO DE VIDA (Substitui o initState do Flutter)
  // O array vazio [] no final garante que essa função só rode UMA vez ao abrir a tela.
  useEffect(() => {
    loadCities();
  }, []);

  // 3. REQUISIÇÃO E LÓGICA
  const loadCities = async () => {
    try {
      setIsLoading(true);
      
      // Aqui faríamos a requisição HTTP. 
      // Como exemplo didático para a aula, estamos usando um timeout para simular a rede.
      // Você pode substituir pela lógica de fetch() nativa do JS usando a API original.
      setTimeout(() => {
        const mockData: WeatherForecast[] = [
          { cityName: 'Aracaju', conditionSlug: 'cloud', temp: 28 },
          { cityName: 'Itabaiana', conditionSlug: 'rain', temp: 25 },
          { cityName: 'Salvador', conditionSlug: 'sun', temp: 30 },
          { cityName: 'Curitiba', conditionSlug: 'snow', temp: 12 },
        ];
        
        setAllCities(mockData);
        setFilteredCities(mockData);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      console.error('Deu ruim, olhe pela janela', error);
    }
  };

  // 4. FUNÇÃO DE FILTRO DA BUSCA
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
        
        {/* Espaçamento do topo seguro */}
        <View style={{ height: 60 }} />

        {/* CAMPO DE BUSCA (TextField do Flutter) */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma cidade"
            placeholderTextColor="#FFFFFF80"
            value={searchQuery}
            onChangeText={filterCities} // Chama a função a cada letra digitada
          />
          <Ionicons name="search" size={24} color="white" style={styles.searchIcon} />
        </View>

        <View style={{ height: 15 }} />

        {/* RENDERIZAÇÃO CONDICIONAL */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          /* LISTA DE ALTA PERFORMANCE (ListView.builder do Flutter) */
          <FlatList
            data={filteredCities} // A lista de itens
            keyExtractor={(item) => item.cityName} // A chave única de cada item
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => ( // Como desenhar cada item
              <CityTile
                cityName={item.cityName}
                icon={item.conditionSlug}
                temperature={item.temp}
                onTap={() => {
                  // Navegação passando parâmetros na Rota (que criaremos depois)
                  // router.push({ pathname: '/weather-city', params: { city: item.cityName } });
                  console.log(`Navegando para ${item.cityName}`);
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
  }
});