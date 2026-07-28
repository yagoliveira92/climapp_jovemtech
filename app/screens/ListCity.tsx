import CityTile from "@/components/CityTile";
import { WeatherForecast } from "@/interfaces/forecast_interfaces";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ListCityScreen() {
    const router = useRouter();

    const [allCities, setAllCities] = useState<WeatherForecast[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredCities, setFilteredCities] = useState<WeatherForecast[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const listCity = ['Aracaju,SE', 'Itabaiana,SE', 'Salvador,BA', 'Curitiba,PR'];

    useEffect(() => {
        loadCities();
    }, []);

    const filterCities = (text: string) => {
        setSearchQuery(text);

        if (text === '') {
            setFilteredCities(allCities);
        } else {
            const filtered = allCities.filter((city) =>
                city.cityName.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredCities(filtered);
        }
    }

    const loadCities = async () => {
        try {
            setIsLoading(true);
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;
            const apiKey = process.env.EXPO_PUBLIC_API_KEY;

            const promises = listCity.map(async (city) => {
                const response = await fetch(`${apiUrl}?key=${apiKey}&city_name=${city}`);
                if (!response.ok) {
                    throw new Error('Deu ruim, olhe pela janela!');
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

            const listAllCities = await Promise.all(promises);

            setAllCities(listAllCities);
            setFilteredCities(listAllCities);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Deu ruim, olhe pela janela', error);
        }
    };

    return (
        <LinearGradient
            colors={['#00457D', '#05051F']}
            style={styles.container}>
            <View style={styles.content}>
                <View style={{ height: 60 }} />
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite uma cidade"
                        placeholderTextColor='#FFFFFF80'
                        value={searchQuery}
                        onChangeText={filterCities}
                    />
                    <Ionicons
                        name='search'
                        size={24}
                        color='white'
                        style={styles.searchIcon}
                    />
                </View>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    </View>
                ) : (
                    <FlatList
                        data={filteredCities}
                        keyExtractor={(item) => item.cityName}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    Nenhuma cidade encontrada para "{searchQuery}"
                                </Text>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <CityTile
                                cityName={item.cityName}
                                icon={item.conditionSlug}
                                temperature={item.temp}
                                onTap={() => {
                                    router.push({
                                        pathname: '../screens/WeatherCity',
                                        params: { weatherData: JSON.stringify(item) }
                                    })
                                }} />
                        )}
                    />
                )}
            </View>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('../screens/MapScreen')}
            >
                <Ionicons name="map" size={28} color="white" />
            </TouchableOpacity>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#00457D',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
        color: '#FFFFFF80',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Montserrat_400Regular',
    }
});