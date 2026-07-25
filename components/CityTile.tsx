import { CityTileProps } from "@/interfaces/forecast_interfaces";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CityTile({ cityName, icon, temperature, onTap }: CityTileProps) {
    const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_URL;

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onTap}
            activeOpacity={0.7}>
            <View style={styles.contentRow}>
                <Image
                    source={{ uri: `${IMAGE_URL}${icon}.svg` }}
                    style={styles.icon}
                    contentFit="contain" />
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
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 15,
        marginVertical: 10,
        padding: 16,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 40,
        height: 40,
    },
    cityName: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat_600SemiBold',
    },
    temperatureText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontFamily: 'Montserrat_700Bold',
    }
});
