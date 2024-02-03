import { View, Text, Image, StyleSheet, Keyboard, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/StackNav';
import * as Yup from 'yup';

type homeScreenProp = StackNavigationProp<RootStackParamList>;

const LoginSchema = Yup.object().shape({
    uniq: Yup.string()
        .min(11, 'Too Short!')
        .max(11, 'Too Long!'),
    telNumber: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!'),
})


export default function Login() {
    const [pData, setPData] = useState<any>()
    const navigation = useNavigation<homeScreenProp>();
    const [isLoading, setIsLoading] = useState(false)
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('personData');
            const loginValue = await AsyncStorage.getItem('logindata');
            if (value !== null) {
                setPData(JSON.parse(value))
                if (loginValue !== null) {
                    navigation.replace('MainNav')
                }
                setIsLoading(false)
            }
            else {
                navigation.replace('Register')
            }
        } catch (e) {
            console.log('HATA')
        }
    };
    useEffect(() => {
        setIsLoading(true)
        getData()
    }, [])
    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={{
                        uniq: '', telNumber: ''
                    }}
                    onSubmit={async (values: any) => {
                        console.log(pData.telNumber, pData.uniq)
                        if (values.uniq === pData.uniq && values.telNumber === pData.telNumber) {
                            const data = {
                                uniqId: pData.uniq,
                                telNumberId: pData.telNumber
                            }
                            try {
                                const jsonValue = JSON.stringify(data);
                                await AsyncStorage.setItem('logindata', jsonValue);
                                navigation.replace('MainNav')
                            } catch (e: any) {
                                console.log(e.message)
                            }
                        }
                        else {
                            console.log('Datalar Uyuşmuyor')
                        }
                    }}
                    validationSchema={LoginSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched, isValid, dirty }) => (
                        <View style={styles.formikContainer}>
                            <CustomTextInput handleC={handleChange('uniq')} val={values.uniq} error={errors} placeH='TC No' keyboardType='numeric' length={11} />
                            <CustomTextInput handleC={handleChange('telNumber')} val={values.telNumber} error={errors} placeH='Telefon Numarası' keyboardType='numeric' length={10} />
                            <CustomButton title='Giriş Yap' handlePress={handleSubmit} />
                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    formikContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
    },
})