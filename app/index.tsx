import { MaterialIcons } from '@expo/vector-icons'; // O Expo já traz ícones embutidos!
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#00457D', '#05051F']}
            style={styles.container}
        >
            <View style={styles.content}>

                <View style={{ height: 30 }} />

                <Image
                    source={require('../assets/images/logo_climapp.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Image
                    source={require('../assets/images/ilustracao_home.png')}
                    style={styles.illustration}
                    resizeMode="contain"
                />

                <Text style={styles.title}>
                    Boas-vindas!
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8} // Dá um leve efeito de clique
                    onPress={() => router.push('../screens/list-city')}
                >
                    {/* Equivalente ao Row dentro do botão */}
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Entrar</Text>
                        <MaterialIcons name="arrow-forward" size={25} color="black" />
                    </View>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Preenche a tela toda
    },
    content: {
        flex: 1,
        padding: 16,
        alignItems: 'center', // Centraliza os itens no eixo X (cruzeiro)
        justifyContent: 'center', // Centraliza no eixo Y (principal)
        gap: 40, // Espaçamento entre os elementos 
    },
    logo: {
        width: 150,
        height: 50, // Importante: Imagens locais no RN precisam de altura definida
    },
    illustration: {
        height: 200,
        width: '100%',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 26,
        fontFamily: 'Montserrat_400Regular',
    },
    button: {
        backgroundColor: '#7693ff',
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 8,
        width: '100%', // O botão ocupa a largura disponível
    },
    buttonContent: {
        flexDirection: 'row', // Comportamento de Row
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    buttonText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Montserrat_600SemiBold',
    }
});