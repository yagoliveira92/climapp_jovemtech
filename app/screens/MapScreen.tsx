import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';

export default function MapScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const locationSubscription = useRef<Location.LocationSubscription | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de localização negada');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            locationSubscription.current = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    
                    distanceInterval: 5
                },
                (newLocation) => {
                    setLocation(newLocation);
                }
            )
        })();

        return () => {
            if (locationSubscription.current) {
                locationSubscription.current.remove();
            }
        }
    }, []);

    if (!location) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#00457D" />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                <UrlTile
                    urlTemplate='https://cartocdn.com/{z}/{x}/{y}.png'
                    maximumZ={19}
                    flipY={false}

                />
                <Marker
                    coordinate={{
                        latitude: -10.98888,
                        longitude: -37.04821,
                    }}
                    title="Arcos da Orla"
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})