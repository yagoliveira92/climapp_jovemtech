import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WeatherForecast } from '../../interfaces/forecast_interface';

export default function WeatherCityScreen() {
    const router = useRouter();

    // 1. Recebendo e decodificando os parâmetros da URL
    const { weatherData } = useLocalSearchParams();
    const weather: WeatherForecast = JSON.parse(weatherData as string);

    // Variáveis de ambiente
    const imageUrl = process.env.EXPO_PUBLIC_IMAGE_URL;
    const moonUrl = process.env.EXPO_PUBLIC_MOON_URL;

    return (
        <LinearGradient colors={['#00457D', '#05051F']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{weather.cityName}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent} // ⚠️ Atenção aqui!
                showsVerticalScrollIndicator={false} // Esconde a barra de rolagem feia
            >                <View style={styles.mainCard}>
                    <Text style={styles.dateText}>Hoje: {weather.date}</Text>

                    <Image
                        source={{ uri: `${imageUrl}${weather.conditionSlug}.svg` }}
                        style={styles.mainIcon}
                        contentFit="contain"
                    />

                    <Text style={styles.mainTemp}>{weather.temp}°</Text>
                    <Text style={styles.description}>{weather.description}</Text>

                    <View style={styles.minMaxContainer}>
                        <MaterialIcons name="thermostat" size={33} color="#FF5252" />
                        <Text style={styles.minMaxLabel}>Min/Max:</Text>
                        <Text style={styles.minMaxValues}>
                            {weather.forecast[0].min}° / {weather.forecast[0].max}°
                        </Text>
                    </View>
                </View>

                <View style={{ height: 30 }} />

                {/* CARROSSEL DOS PRÓXIMOS DIAS (Substitui o CarouselView) */}
                <View style={styles.carouselContainer}>
                    <FlatList
                        horizontal // Essa é a mágica que faz rolar pro lado!
                        showsHorizontalScrollIndicator={false}
                        data={weather.forecast}
                        keyExtractor={(item) => item.date}
                        contentContainerStyle={{ gap: 16 }} // Espaçamento entre os cards
                        renderItem={({ item }) => (
                            <View style={styles.forecastCard}>
                                <Text style={styles.forecastDay}>{item.weekday}</Text>
                                <Text style={styles.forecastDate}>({item.date})</Text>

                                <Image
                                    source={{ uri: `${moonUrl}${item.moon_phase}.png` }}
                                    style={styles.moonIcon}
                                    contentFit="contain"
                                />

                                <Text style={styles.forecastTemp}>
                                    {item.min}° / {item.max}°
                                </Text>
                            </View>
                        )}
                    />
                </View>

            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60, // Dá o espaço da barra de status (notch)
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: 'rgba(0, 69, 125, 0.5)', // Um leve azul translúcido
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'Montserrat_600SemiBold',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40, 
    },
    mainCard: {
        backgroundColor: '#4463D5',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
    },
    dateText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Montserrat_600SemiBold',
    },
    mainIcon: {
        width: 120,
        height: 120,
        marginVertical: 10,
    },
    mainTemp: {
        color: 'white',
        fontSize: 60,
        fontFamily: 'Montserrat_700Bold',
    },
    description: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Montserrat_400Regular',
        marginBottom: 20,
    },
    minMaxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        borderRadius: 10,
    },
    minMaxLabel: {
        color: 'white',
        fontSize: 21,
        fontFamily: 'Montserrat_700Bold',
        marginLeft: 10,
    },
    minMaxValues: {
        color: 'white',
        fontSize: 21,
        fontFamily: 'Montserrat_600SemiBold',
        flex: 1,
        textAlign: 'right', // Empurra os números para o canto direito
    },
    carouselContainer: {
        height: 220, // Altura fixa para o carrossel não esmagar
    },
    forecastCard: {
        backgroundColor: 'rgba(5, 5, 31, 0.85)',
        borderRadius: 15,
        padding: 16,
        width: 150, // Largura fixa de cada card do carrossel
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    forecastDay: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Montserrat_600SemiBold',
    },
    forecastDate: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
    },
    moonIcon: {
        width: 50,
        height: 50,
        marginVertical: 10,
    },
    forecastTemp: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'Montserrat_700Bold',
    }
});