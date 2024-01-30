import { View, Text, Button, SafeAreaView, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/StackNav';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Formik } from 'formik';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { FontAwesome } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Dashboard', 'Register'>;

const { width, height } = Dimensions.get('window')

export default function Register() {
    const navigation = useNavigation<homeScreenProp>();
    const [image, setImage] = useState<any>(null);
    const [country, setCountry] = useState<any>([]);
    const [value, setValue] = useState(null);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,flags')
            .then(response => {
                // Sunucudan gelen yanıt başarılı mı kontrol et
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // JSON verilerini ayrıştır
                return response.json();
            })
            .then(data => {
                setCountry(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [])
    const pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickDocument = async () => {

        let result: any = await DocumentPicker.getDocumentAsync({});

        setImage(result.assets[0].uri)

        console.log(result.assets[0].uri);

    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={{
                        img: '', name: '', surename: '', country: '', county: '', uniq: '', telNumber: '', birthday: '', gender: ''
                    }}
                    onSubmit={(values) => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.formikContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 25 }}>
                                {image ?
                                    (
                                        <Pressable onPress={pickImage} style={{ alignItems: 'center', gap: 5 }}>
                                            <Text>Choose Photo</Text>
                                            <Image source={{ uri: image }} resizeMode='contain' style={{ width: 80, height: 80 }} />
                                        </Pressable>
                                    ) :
                                    (
                                        <Pressable onPress={pickImage} style={{ alignItems: 'center', gap: 5 }}>
                                            <Text>Choose Photo</Text>
                                            <FontAwesome name="user-o" size={80} color="black" />
                                        </Pressable>
                                    )
                                }
                                <View style={{ width: width * 0.6, gap: 10 }}>
                                    <CustomTextInput
                                        handleC={handleChange('name')}
                                        val={values.name}
                                        onB={handleBlur('name')}
                                        placeH='Name'
                                        customStyle={{ width: '100%' }}
                                    />
                                    <CustomTextInput
                                        handleC={handleChange('surename')}
                                        val={values.surename}
                                        onB={handleBlur('surename')}
                                        placeH='Surename'
                                        customStyle={{ width: '100%' }}
                                    />
                                </View>
                            </View>
                            <View>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={country}
                                    search
                                    maxHeight={300}
                                    labelField="name.common"
                                    valueField="_index"
                                    placeholder="Select a country"
                                    searchPlaceholder="Search..."
                                    value={value}
                                    onChange={(item: any) => {
                                        console.log(item._index)
                                        setValue(item._index);
                                    }}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                            <CustomButton title='Tıkla' handlePress={handleSubmit} />
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
        backgroundColor: 'white',
    },
    formikContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        gap: 20
    },
    dropdown: {
        margin: 16,
        height: 50,
        width: 100,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})