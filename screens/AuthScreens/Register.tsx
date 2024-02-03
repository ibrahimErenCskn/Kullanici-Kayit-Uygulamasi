import { View, Text, SafeAreaView, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable, Dimensions, ActivityIndicator, TextInput, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/StackNav';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { FontAwesome } from '@expo/vector-icons';
import CustomDropdown from '../../components/CustomDropdown';
import * as Yup from 'yup';
import Checkbox from 'expo-checkbox';
import MaskedInput from '../../components/MaskedInput';


type homeScreenProp = StackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window')

const RegisterSchema = Yup.object().shape({
    imgUri: Yup.string().required('Zorunlu'),
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Zorunlu'),
    surename: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Zorunlu'),
    telNumber: Yup.string()
        .min(10, 'Too Short!')
        .max(11, 'Too Long!')
        .required('Zorunlu'),
    uniq: Yup.string()
        .min(11, 'Too Short!')
        .max(11, 'Too Long!')
        .required('Zorunlu'),
    birthday: Yup.string()
        .min(8, 'Too Short!')
        .max(8, 'Too Long!')
        .required('Zorunlu'),
    county: Yup.string()
        .required('Zorunlu'),
    country: Yup.string()
        .required('Zorunlu'),
    gender: Yup.string()
        .required('Zorunlu'),
    kvkk: Yup.boolean()
        .oneOf([true])
        .required('Zorunlu alana')
})

export default function Register() {
    const navigation = useNavigation<homeScreenProp>();
    const [image, setImage] = useState<any>(null);
    const [countryData, setCountryData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingCounty, setisLoadingCounty] = useState(false)
    const [countryCode, setCountryCode] = useState()
    const [countyData, setCountyData] = useState<any>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2')
                if (!response.ok) {
                    throw new Error('Network Error')
                }
                const result = await response.json()
                result.map((v: any, i: any) => {
                    setCountryData((prev: any) => ([...prev, {
                        flagPng: v.flags.png,
                        label: v.name.common,
                        code: v.cca2,
                        value: i
                    }]))
                })
                setIsLoading(false)
            }
            catch (err) {
                console.error('Error during data fetch:', err);
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                setisLoadingCounty(true)
                const response = await fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&username=kode`)
                if (!response.ok) {
                    throw new Error('Network Error')
                }
                const result = await response.json()
                setCountyData([])
                result?.geonames?.map((v: any, i: any) => {
                    setCountyData((prev: any) => ([...prev, {
                        label: v.toponymName,
                        value: i
                    }]))
                })
            }
            catch (err) {
                console.error('Error during data fetch:', err);
            }
            setisLoadingCounty(false)
        }
        fetchData()
    }, [countryCode])
    const pickImage = async (setUri: any) => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setUri('imgUri', result.assets[0].uri)
            setImage(result.assets[0].uri);
        }
    };
    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }
    const genderData = [
        { label: 'Erkek', value: 'erkek' },
        { label: 'Kadın', value: 'kadın' }
    ]

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={{
                        imgUri: '', country: '', county: '', name: '', surename: '', uniq: '', telNumber: '', birthday: '', gender: '', kvkk: false
                    }}
                    onSubmit={(values: any) => {
                        navigation.navigate('Work', values)
                    }}
                    validationSchema={RegisterSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched, isValid, dirty }) => (
                        <View style={styles.formikContainer}>
                            <ScrollView>
                                <View style={{ flex: 1, alignItems: 'center', gap: 30, marginTop: height * 0.02 }}>
                                    <View style={{ width: width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ width: width * 0.3 }}>
                                            {image ?
                                                (
                                                    <Pressable onPress={() => pickImage(setFieldValue)} style={{ alignItems: 'center', gap: 5 }}>
                                                        <Image source={{ uri: image }} resizeMode='contain' style={{ width: 70, height: 70 }} />
                                                    </Pressable>
                                                ) :
                                                (
                                                    <Pressable onPress={() => pickImage(setFieldValue)} style={{ alignItems: 'center', gap: 5 }}>
                                                        <Text style={{ fontWeight: '700', fontSize: 16 }}>Fotograf Seç</Text>
                                                        <FontAwesome name="user-o" size={70} color="black" />
                                                    </Pressable>
                                                )
                                            }
                                        </View>
                                        <View style={{ width: width * 0.7, gap: 15 }}>
                                            <CustomTextInput
                                                handleC={handleChange('name')}
                                                val={values.name}
                                                onB={handleBlur('name')}
                                                placeH='Name'
                                                customStyle={{ width: width * 0.65, height: height * 0.05 }}
                                                error={errors.name}
                                                touch={touched.name}
                                                customRight={{ right: width * 0.18 }}
                                            />
                                            <CustomTextInput
                                                handleC={handleChange('surename')}
                                                val={values.surename}
                                                onB={handleBlur('surename')}
                                                placeH='Surename'
                                                customStyle={{ width: width * 0.65, height: height * 0.05 }}
                                                error={errors.surename}
                                                touch={touched.surename}
                                                customRight={{ right: width * 0.18 }}
                                            />
                                        </View>
                                    </View>
                                    <CustomTextInput
                                        handleC={handleChange('telNumber')}
                                        val={values.telNumber}
                                        onB={handleBlur('telNumber')}
                                        placeH='Telefon Numarası'
                                        customStyle={{ width: '100%', height: height * 0.05 }}
                                        keyboardType='numeric'
                                        error={errors.telNumber}
                                        length={10}
                                        touch={touched.telNumber}
                                    />
                                    <CustomTextInput
                                        handleC={handleChange('uniq')}
                                        val={values.uniq}
                                        onB={handleBlur('uniq')}
                                        placeH='Kimlik No'
                                        keyboardType='numeric'
                                        customStyle={{ width: '100%', height: height * 0.05 }}
                                        error={errors.uniq}
                                        length={11}
                                        touch={touched.uniq}
                                    />
                                    <MaskedInput
                                        values={values.birthday}
                                        fieldValues={setFieldValue}
                                        error={errors.telNumber}
                                        touch={touched.telNumber}
                                        setName='birthday'
                                        placeH='Dogum Günü DD/MM/YYYY'
                                    />
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <CustomDropdown placeholder='Ülke Seç' data={countryData} value={values} setItem={setFieldValue} itemName={values.country} setName='country' setCode={setCountryCode} />
                                        {
                                            countryCode && !isLoadingCounty && <CustomDropdown placeholder='Şehir Seç' data={countyData} value={values} setItem={setFieldValue} itemName={values.county} setName='county' />
                                        }
                                    </View>
                                    <View style={{ width: width * 0.82, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <CustomDropdown placeholder='Cinsiyetiniz' data={genderData} value={values} setItem={setFieldValue} itemName={values.gender} setName='gender' />
                                        <View style={{ flexDirection: 'row', gap: 10 }}>
                                            <Text>KVKK</Text>
                                            <Checkbox value={values.kvkk} onValueChange={() => setFieldValue('kvkk', !values.kvkk)} />
                                        </View>
                                    </View>
                                    <CustomButton title='Devam' handlePress={handleSubmit} handleDisable={!isValid && !dirty} customStyle={!isValid || !dirty ? { opacity: 0.7 } : { opacity: 1 }} />
                                </View>
                            </ScrollView>
                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    formikContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        gap: 20
    },
})