import CityTile from "@/components/CityTile";
import { MOCK_WEATHER_FORECAST } from "@/mocks/weatherForecastMock";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { theme } from '../../constants/theme';

const MOCK_ICON = 'https://www.gstatic.com/weather/conditions/v1/svg/mostly_clear_night_light.svg'

export default function ListCityScreen() {
    const router = useRouter();
    return (
        <LinearGradient
            colors={['#00457D', '#05051F']}
            style={styles.container}>
            <View style={styles.content}>
                <View style={{height: 60}} />
                <FlatList
                    data={MOCK_WEATHER_FORECAST}
                    keyExtractor={(item) => item.cityName}
                    renderItem={({ item }) => (
                        <CityTile
                            cityName={item.cityName}
                            icon={MOCK_ICON}
                            temperature={item.temp}
                            onTap={() => {
                                router.push({
                                    pathname: '../screens/WeatherCity',
                                    params: { weatherData: JSON.stringify(item)}
                                })
                             }} />
                    )}
                    contentContainerStyle={styles.listContent}
                />
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
    }
});