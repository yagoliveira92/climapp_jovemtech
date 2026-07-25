import CityTile from "@/components/CityTile";
import { WeatherForecast } from "@/interfaces/forecast_interfaces";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { theme } from '../../constants/theme';

export default function ListCityScreen() {
    const router = useRouter();

    const [allCities, setAllCities] = useState<WeatherForecast[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const listCity = ['Aracaju,SE', 'Itabaiana,SE', 'Salvador,BA', 'Curitiba,PR'];

    useEffect(() => {
        loadCities();
    }, []);
    
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
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    </View>
                ) : (
                    <FlatList
                        data={allCities}
                        keyExtractor={(item) => item.cityName}
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
                        contentContainerStyle={styles.listContent}
                    />
                )}
            </View>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        padding: theme.spacing.md,
    },
    listContent: {
        paddingHorizontal: theme.spacing.md,
        paddingBottom: theme.spacing.lg,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});