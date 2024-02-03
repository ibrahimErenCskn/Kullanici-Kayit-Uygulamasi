import { View, Text, Pressable, Dimensions, ScrollView, StyleSheet, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome6, FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import CustomButton from '../../../components/CustomButton';
import ProjectAdd from '../../../components/ProjectAdd';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigations/StackNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

type homeScreenProp = StackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window')

const CvAndProjectSchema = Yup.object().shape({
    pdfD: Yup.object().required('Zorunlu'),
})

export default function CvAndProject({ route }: any) {
    const [errorType, setErrorType] = useState<string>()
    const navigation = useNavigation<homeScreenProp>();
    const [object, setObject] = useState<any>(route.params)
    const [project, setProject] = useState(false)
    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')

    const pickDocument = async (setItem: any) => {
        try {
            const result: any = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: true,
                multiple: false,
            });
            console.log(result)
            const lastThree = result.assets[0].name.substr(result.assets[0].name.length - 3);
            if (lastThree == 'pdf') {
                setItem('pdfD', result)
            }
            else {
                setErrorType('Lütfen Pdf Formatında Dosya Yükleyiniz')
                console.log('Please select PDF File')
            }
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const addProject = () => {
        setProject(true)
    }
    const deleteProject = () => {
        setProject(false)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={{
                        pdfD: '',
                        projectD: []
                    }}
                    onSubmit={async (values: any) => {
                        const newObject = Object.assign({}, object, values)
                        console.log(newObject)
                        try {
                            await AsyncStorage.setItem('personData', JSON.stringify(newObject));
                            navigation.replace('Login')
                        } catch (err: any) {
                            console.log('Error:', err.message)
                        }
                    }}
                    validationSchema={CvAndProjectSchema}
                >
                    {({ handleSubmit, values, setFieldValue, isValid, dirty }) => (
                        <View style={styles.formikContainer}>
                            <Pressable onPress={() => pickDocument(setFieldValue)}>
                                <FontAwesome name="file-pdf-o" size={height * 0.3} color="black" />
                                {
                                    errorType && <Text>{errorType}</Text>
                                }
                            </Pressable>
                            <View style={{ width: width * 0.8, paddingHorizontal: 5, flexDirection: 'row', borderWidth: 2, justifyContent: 'space-between' }}>
                                <Pressable onPress={() => addProject()}>
                                    <FontAwesome6 name="plus" size={30} color="black" />
                                </Pressable>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                    Proje Ekle
                                </Text>
                                <Pressable onPress={() => deleteProject()}>
                                    <FontAwesome name="close" size={30} color="black" />
                                </Pressable>
                            </View>
                            {
                                project && (<ProjectAdd input={input1} input_one={input2} input_two={input3} setFieldValue={setFieldValue} setInput={setInput1} setInput_one={setInput2} setInput_two={setInput3} setName='projectD' value={values.projectD} />)
                            }
                            <CustomButton title='Kaydı Tamamla' handlePress={handleSubmit} handleDisable={!isValid && !dirty} customStyle={!isValid || !dirty ? { opacity: 0.7 } : { opacity: 1 }} />
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
        gap: 20
    },
})