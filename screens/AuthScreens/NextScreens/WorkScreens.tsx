import { View, SafeAreaView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import CustomButton from '../../../components/CustomButton'
import CustomDropdown from '../../../components/CustomDropdown'
import meslekler from '../../../fakerData'
import CustomTextInput from '../../../components/CustomTextInput'
import MaskedInput from '../../../components/MaskedInput'
import CustomAddItem from '../../../components/CustomAddItem'
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../navigations/StackNav'
import { useNavigation } from '@react-navigation/native'

const WorkData = [{
    label: 'Çalışan',
    value: 'Çalışan'
}, {
    label: 'İşsiz',
    value: 'İşsiz'
}, {
    label: 'Ögrenci',
    value: 'Ögrenci'
}]
const SchoolData = [{
    label: 'İlkokul',
    value: 'İlkokul'
}, {
    label: 'Ortaokul',
    value: 'Ortaokul'
}, {
    label: 'Lise',
    value: 'Lise'
}, {
    label: 'Üniversite',
    value: 'Üniversite'
}]

const WorkerData = [
    { "value": "mimar", "label": "Mimar" },
    { "value": "doktor", "label": "Doktor" },
    { "value": "avukat", "label": "Avukat" },
    { "value": "mühendis", "label": "Mühendis" },
    { "value": "öğretmen", "label": "Öğretmen" },
    { "value": "polis", "label": "Polis" },
    { "value": "it uzmanı", "label": "IT Uzmanı" },
    { "value": "diş hekimi", "label": "Diş Hekimi" },
    { "value": "eczacı", "label": "Eczacı" },
    { "value": "hemşire", "label": "Hemşire" },
    { "value": "şoför", "label": "Şoför" },
    { "value": "aşçı", "label": "Aşçı" },
    { "value": "grafik tasarımcısı", "label": "Grafik Tasarımcısı" },
    { "value": "muhasebeci", "label": "Muhasebeci" },
    { "value": "yazar", "label": "Yazar" },
    { "value": "aktör", "label": "Aktör" },
    { "value": "ressam", "label": "Ressam" },
    { "value": "müzik öğretmeni", "label": "Müzik Öğretmeni" },
    { "value": "spor antrenörü", "label": "Spor Antrenörü" },
    { "value": "psikolog", "label": "Psikolog" },
    { "value": "market sahibi", "label": "Market Sahibi" },
    { "value": "garson", "label": "Garson" },
    { "value": "manken", "label": "Manken" },
    { "value": "inşaat işçisi", "label": "İnşaat İşçisi" },
    { "value": "elektrikçi", "label": "Elektrikçi" },
    { "value": "temizlik görevlisi", "label": "Temizlik Görevlisi" },
    { "value": "pilot", "label": "Pilot" },
    { "value": "kasiyer", "label": "Kasiyer" },
    { "value": "eczane teknisyeni", "label": "Eczane Teknisyeni" },
    { "value": "otobüs şoförü", "label": "Otobüs Şoförü" },
    { "value": "yazılım geliştirici", "label": "Yazılım Geliştirici" },
    { "value": "diyetisyen", "label": "Diyetisyen" },
    { "value": "emlakçı", "label": "Emlakçı" },
    { "value": "öğrenci", "label": "Öğrenci" },
    { "value": "şarkıcı", "label": "Şarkıcı" },
    { "value": "marangoz", "label": "Marangoz" },
    { "value": "tıp öğrencisi", "label": "Tıp Öğrencisi" },
    { "value": "bankacı", "label": "Bankacı" },
    { "value": "fotografçı", "label": "Fotoğrafçı" },
    { "value": "iş analisti", "label": "İş Analisti" },
    { "value": "hava trafik kontrolörü", "label": "Hava Trafik Kontrolörü" },
    { "value": "arkeolog", "label": "Arkeolog" },
    { "value": "biyolog", "label": "Biyolog" },
    { "value": "it destek uzmanı", "label": "IT Destek Uzmanı" },
    { "value": "kahveci", "label": "Kahveci" },
    { "value": "yoga eğitmeni", "label": "Yoga Eğitmeni" },
    { "value": "gıda teknikeri", "label": "Gıda Teknikeri" },
    { "value": "aile hekimi", "label": "Aile Hekimi" },
    { "value": "sosyal medya uzmanı", "label": "Sosyal Medya Uzmanı" },
    { "value": "havacılık mühendisi", "label": "Havacılık Mühendisi" },
    { "value": "kütüphaneci", "label": "Kütüphaneci" },
    { "value": "deniz biyologu", "label": "Deniz Biyologu" },
    { "value": "mimarlık öğrencisi", "label": "Mimarlık Öğrencisi" },
    { "value": "eczacılık öğrencisi", "label": "Eczacılık Öğrencisi" },
    { "value": "spor salonu antrenörü", "label": "Spor Salonu Antrenörü" },
    { "value": "tezgahtar", "label": "Tezgahtar" },
    { "value": "gazeteci", "label": "Gazeteci" },
    { "value": "hukuk öğrencisi", "label": "Hukuk Öğrencisi" },
    { "value": "mekanik mühendisi", "label": "Mekanik Mühendisi" },
    { "value": "kimya mühendisi", "label": "Kimya Mühendisi" },
    { "value": "biyomedikal mühendisi", "label": "Biyomedikal Mühendisi" },
    { "value": "araba tamircisi", "label": "Araba Tamircisi" },
    { "value": "jeolog", "label": "Jeolog" },
    { "value": "aktüer", "label": "Aktüer" },
    { "value": "film yönetmeni", "label": "Film Yönetmeni" },
    { "value": "moda tasarımcısı", "label": "Moda Tasarımcısı" },
    { "value": "eczane sahibi", "label": "Eczane Sahibi" },
    { "value": "reklamcı", "label": "Reklamcı" },
    { "value": "gıda mühendisi", "label": "Gıda Mühendisi" },
    { "value": "biyokimyager", "label": "Biyokimyager" },
    { "value": "müzisyen", "label": "Müzisyen" },
    { "value": "yazılım test mühendisi", "label": "Yazılım Test Mühendisi" },
    { "value": "uydu teknisyeni", "label": "Uydu Teknisyeni" },
    { "value": "uydu mühendisi", "label": "Uydu Mühendisi" },
    { "value": "maden mühendisi", "label": "Maden Mühendisi" },
    { "value": "araştırmacı", "label": "Araştırmacı" },
    { "value": "müze küratörü", "label": "Müze Küratörü" },
    { "value": "yazılım mimarı", "label": "Yazılım Mimarlığı" },
    { "value": "aşçı çırak", "label": "Aşçı Çırak" },
    { "value": "fotoğraf editörü", "label": "Fotoğraf Editörü" },
    { "value": "sanat terapisti", "label": "Sanat Terapisti" },
    { "value": "su arıtma uzmanı", "label": "Su Arıtma Uzmanı" },
    { "value": "kahve uzmanı", "label": "Kahve Uzmanı" },
    { "value": "araştırma görevlisi", "label": "Araştırma Görevlisi" },
    { "value": "meteorolog", "label": "Meteorolog" },
    { "value": "web tasarımcısı", "label": "Web Tasarımcısı" },
    { "value": "spor yazarı", "label": "Spor Yazarı" },
    { "value": "grafolog", "label": "Grafolog" },
    { "value": "araba yarışçısı", "label": "Araba Yarışçısı" },
    { "value": "kağıt sanatçısı", "label": "Kağıt Sanatçısı" },
    { "value": "kahraman pilot", "label": "Kahraman Pilot" },
    { "value": "kimyager", "label": "Kimyager" },
    { "value": "serbest muhabir", "label": "Serbest Muhabir" },
    { "value": "robotik mühendisi", "label": "Robotik Mühendisi" },
    { "value": "moleküler biyolog", "label": "Moleküler Biyolog" },
    { "value": "biyoteknolog", "label": "Biyoteknolog" },
    { "value": "koç", "label": "Koç" },
    { "value": "kıyafet tasarımcısı", "label": "Kıyafet Tasarımcısı" },
    { "value": "kimya öğrencisi", "label": "Kimya Öğrencisi" },
    { "value": "biyoloji öğrencisi", "label": "Biyoloji Öğrencisi" },
    { "value": "endüstri mühendisi", "label": "Endüstri Mühendisi" },
    { "value": "siber güvenlik uzmanı", "label": "Siber Güvenlik Uzmanı" },
    { "value": "işletme sahibi", "label": "İşletme Sahibi" },
    { "value": "sosyal hizmet uzmanı", "label": "Sosyal Hizmet Uzmanı" },
    { "value": "gazeteci öğrencisi", "label": "Gazeteci Öğrencisi" },
    { "value": "yazılım geliştirme öğrencisi", "label": "Yazılım Geliştirme Öğrencisi" },
    { "value": "aşçılık öğrencisi", "label": "Aşçılık Öğrencisi" },
    { "value": "tıp doktoru", "label": "Tıp Doktoru" },
    { "value": "tasarımcı", "label": "Tasarımcı" },
    { "value": "havayolu pilotu", "label": "Havayolu Pilotu" },
    { "value": "gıda teknolojisi uzmanı", "label": "Gıda Teknolojisi Uzmanı" },
    { "value": "ses mühendisi", "label": "Ses Mühendisi" }
]

type homeScreenProp = StackNavigationProp<RootStackParamList>;
const { width } = Dimensions.get('window')

const WorkSchema = Yup.object().shape({
    workD: Yup.string()
        .required('Zorunlu'),
    jobD: Yup.string().when('workD', {
        is: (workD: string) => workD == 'Çalışan',
        then: () => Yup.string().required('Zorunlu'),
    }),
    schoolD: Yup.string()
        .required('Zorunlu'),
    schoolName: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Zorunlu'),
    department: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .when('schoolD', {
            is: (schoolD: string) => schoolD == 'Üniversite',
            then: () => Yup.string()
                .min(8, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Zorunlu'),
        }),
    schoolDate: Yup.string()
        .min(8, 'Too Short!')
        .max(8, 'Too Long!')
        .required('Zorunlu'),
    skillsD: Yup.array()
        .min(1)
        .required('Zorunlu'),
    degreeD: Yup.array()
        .min(1)
        .required('Zorunlu'),
})

export default function WorkScreens({ route }: any) {
    const navigation = useNavigation<homeScreenProp>();
    const [skills, setSkills] = useState<string>('')
    const [degree, setDegree] = useState<string>('')
    const [object, setObject] = useState<any>(route.params)

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={{
                        workD: '', jobD: '', schoolD: '', schoolName: '', department: '', schoolDate: '', skillsD: [], degreeD: []
                    }}
                    onSubmit={(values: any) => {
                        const newObject = Object.assign({}, object, values)
                        navigation.navigate('CvAndProject', newObject)
                    }}
                    validationSchema={WorkSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched, isValid, dirty }) => (
                        <ScrollView>
                            <View style={styles.formikContainer}>
                                <CustomDropdown
                                    placeholder='Çalışma Durumu'
                                    data={WorkData} value={values}
                                    setItem={setFieldValue}
                                    itemName={values.workD}
                                    customStyle={{ width: width * 0.8 }}
                                    setName='workD'
                                />
                                {
                                    values.workD === 'Çalışan' && (
                                        <CustomDropdown
                                            placeholder='Meslek Bilgisi'
                                            data={WorkerData}
                                            value={values}
                                            setItem={setFieldValue}
                                            itemName={values.jobD}
                                            setName='jobD'
                                            customStyle={{ width: width * 0.8 }}
                                        />)
                                }
                                <CustomDropdown
                                    placeholder='Eğtim Seviyesi'
                                    data={SchoolData} value={values}
                                    setItem={setFieldValue}
                                    itemName={values.schoolD}
                                    setName='schoolD'
                                    customStyle={{ width: width * 0.8 }}
                                />
                                {values.schoolD && (
                                    <View style={{ alignItems: 'center', gap: 25 }}>
                                        <CustomTextInput
                                            handleC={handleChange('schoolName')}
                                            val={values.schoolName}
                                            onB={handleBlur('schoolName')}
                                            placeH='Okul Adı'
                                            error={errors.schoolName}
                                            touch={touched.schoolName}
                                        />
                                        {
                                            values.schoolD === 'Üniversite' && (
                                                <CustomTextInput
                                                    handleC={handleChange('department')}
                                                    val={values.department}
                                                    onB={handleBlur('department')}
                                                    placeH='Bölüm Adı'
                                                    error={errors.department}
                                                    touch={touched.department}
                                                />
                                            )
                                        }
                                        <MaskedInput
                                            values={values.schoolDate}
                                            fieldValues={setFieldValue}
                                            error={errors.schoolDate}
                                            touch={touched.schoolDate}
                                            setName={'schoolDate'}
                                            placeH='Mezuneyet Yılı DD/MM/YYYY'
                                        />
                                        <CustomAddItem
                                            setFieldValue={setFieldValue}
                                            setSkills={setSkills}
                                            skills={skills}
                                            setName='skillsD'
                                            placH='Yetkinlikler'
                                            value={values.skillsD}
                                        />
                                        <CustomAddItem
                                            setFieldValue={setFieldValue}
                                            setSkills={setDegree}
                                            skills={degree}
                                            setName='degreeD'
                                            placH='Dereceler'
                                            value={values.degreeD}
                                        />

                                    </View>
                                )}
                                <CustomButton
                                    title='Devam'
                                    handlePress={handleSubmit}
                                    handleDisable={!isValid && !dirty}
                                    customStyle={!isValid || !dirty ? { opacity: 0.7 } : { opacity: 1 }}
                                />
                            </View>
                        </ScrollView>
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
        marginTop: 30,
        gap: 20
    },
})