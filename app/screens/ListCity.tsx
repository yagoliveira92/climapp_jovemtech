import CityTile from "@/components/CityTile";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { theme } from '../../constants/theme';

const MOCK_ICON = 'https://www.gstatic.com/weather/conditions/v1/svg/mostly_clear_night_light.svg'

const MOCK_CITIES = [
    { id: '1', name: 'Aracaju - SE', temperature: 24, icon: MOCK_ICON, },
    { id: '2', name: 'Santos - SP', temperature: 24, icon: MOCK_ICON, },
    { id: '3', name: 'Xique-Xique - BA', temperature: 24, icon: MOCK_ICON, },
    { id: '4', name: 'Lagarto - SE', temperature: 24, icon: MOCK_ICON, }
];

export default function ListCityScreen() {
    return (
        <View style={styles.container}>
            <Text
                style={styles.headerTitle}>
                Selecione uma cidade
            </Text>
            <FlatList
                data={MOCK_CITIES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CityTile
                        cityName={item.name}
                        icon={item.icon}
                        temperature={item.temperature}
                        onTap={() => { }} />
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
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