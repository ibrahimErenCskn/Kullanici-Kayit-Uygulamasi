import { View, SafeAreaView, ScrollView, Image, Pressable, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/StackNav';
import { useNavigation } from '@react-navigation/native';
import ProfileCard from '../../components/ProfileCard';
import CardCover from '../../components/CardCover';
import CardVisible from '../../components/CardVisible';
import { AntDesign } from '@expo/vector-icons';
import Pdf from 'react-native-pdf';

type homeScreenProp = StackNavigationProp<RootStackParamList>;


export default function Profile() {
    const navigation = useNavigation<homeScreenProp>();
    const [personData, setPersonData] = useState<any>()

    useEffect(() => {
        readPersondata()
    }, [])

    const readPersondata = async () => {
        try {
            const jsonValue: any = await AsyncStorage.getItem('personData')
            setPersonData(JSON.parse(jsonValue))
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const exitProfile = async () => {
        try {
            await AsyncStorage.removeItem('logindata')
            navigation.replace('Login')
        } catch (e: any) {
            console.log(e.message)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <Pressable onPress={() => exitProfile()} style={{ gap: 5, flexDirection: 'row', justifyContent: 'flex-end', width: '100%', paddingRight: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Çıkış Yap
                </Text>
                <AntDesign name="logout" size={24} color="black" />
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false} >
                <CardCover height={210} customStyle={{ gap: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                        <Image source={{ uri: personData?.imgUri }} width={80} height={80} borderRadius={40} />
                        <View>
                            <ProfileCard data={personData?.name} placeh='İsim:' />
                            <ProfileCard data={personData?.surename} placeh='Soyadı:' />
                            <ProfileCard data={personData?.birthday} placeh='Doğum Tarihi:' />
                            <ProfileCard data={personData?.gender} placeh='Cinsiyeti:' />
                        </View>
                    </View>
                    <View>
                        <ProfileCard data={personData?.telNumber} placeh='Telefon Numarası:' />
                        <ProfileCard data={personData?.uniq} placeh='TC Numarası:' />
                        <ProfileCard data={personData?.country} placeh='Ülkesi:' />
                        <ProfileCard data={personData?.county} placeh='Şehri:' />
                    </View>
                </CardCover>
                <CardVisible text='Çalışma Ve Eğtim Bilgileri'>
                    <CardCover height={200}>
                        <ProfileCard data={personData?.workD} placeh='Çalışma Durumu:' />
                        <ProfileCard data={personData?.jobD} placeh='Meslek:' />
                        <ProfileCard data={personData?.schoolD} placeh='Okul Bilgisi:' />
                        <ProfileCard data={personData?.schoolName} placeh='Okul İsmi:' />
                        <ProfileCard data={personData?.department} placeh='Bölümü:' />
                        <ProfileCard data={personData?.schoolDate} placeh='Okulu Bitirme Zamanı:' />
                        {
                            personData?.skillsD.map((v: any, i: any) => (
                                <View key={i}>
                                    <ProfileCard data={v} placeh='Yetkinlikleri:' />
                                </View>
                            ))
                        }
                        {
                            personData?.degreeD.map((v: any, i: any) => (
                                <View key={i}>
                                    <ProfileCard data={v} placeh='Dereceleri:' />
                                </View>
                            ))
                        }
                    </CardCover>
                </CardVisible>
                {
                    personData?.projectD.map((v: any, i: any) => (
                        <View key={i}>
                            <CardVisible text={'Proje: ' + i} >
                                <CardCover height={100}>
                                    <ProfileCard data={v.projectName} placeh='Yetkinlikleri:' />
                                    <ProfileCard data={v.projectDetails} placeh='Yetkinlikleri:' />
                                    <ProfileCard data={v.porjectLink} placeh='Yetkinlikleri:' />
                                </CardCover>
                            </CardVisible>
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaView >
    )
}