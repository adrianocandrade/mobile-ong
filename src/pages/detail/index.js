import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
    const route = useRoute();
    const incident = route.params.incident;
    const navigation = useNavigation();
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    function facebook() {
        Linking.openURL(incident.facebook);
    }

    function instagram() {
        Linking.openURL(`instagram://user?username=${incident.instagram}`)
    }

    function site() {
        Linking.openURL(incident.site);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity
                    style={styles.headerTextBold}
                    onPress={navigateBack}
                >
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroDescription}>Seja o herói desse caso.</Text>

                <Text style={styles.contact}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendWhatsapp}
                    >
                        <FontAwesome5 name="whatsapp" size={16} color="#FFF" />
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendMail}
                    >
                        <FontAwesome5 name="envelope" size={16} color="#FFF" />
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.social}
                        onPress={instagram}
                    >
                        <FontAwesome5 name="instagram" size={16} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.social}
                        onPress={facebook}
                    >
                        <FontAwesome5 name="facebook" size={16} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.social}
                        onPress={site}
                    >
                        <FontAwesome5 name="globe" size={16} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}