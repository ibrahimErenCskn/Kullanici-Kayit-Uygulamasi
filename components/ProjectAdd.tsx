import { View, Text, Pressable, Dimensions } from 'react-native'
import React from 'react'
import CustomTextInput from './CustomTextInput'
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window')
interface CustomAddItemProps {
    setFieldValue: any
    setName: string
    value: any
    input: string
    input_one: string
    input_two: string
    setInput: any
    setInput_one: any
    setInput_two: any
}

export default function ProjectAdd({ input, setInput, input_one, setInput_one, input_two, setInput_two, setFieldValue, setName, value }: CustomAddItemProps) {

    const press = () => {
        const data = {
            projectName: input,
            projectDetails: input_one,
            porjectLink: input_two
        }
        setFieldValue(setName, [...value, data])
        setInput('')
        setInput_one('')
        setInput_two('')
    }
    const spliceData = (index: number) => {
        const newData = value?.filter((item: any, i: any) => i !== index)
        setFieldValue(setName, newData)
    }
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ position: 'relative', width: width * 0.8, gap: 25 }}>
                <CustomTextInput
                    handleC={(text: any) => setInput(text)}
                    val={input}
                    placeH='Proje İsmi'
                />
                <CustomTextInput
                    handleC={(text: any) => setInput_one(text)}
                    val={input_one}
                    placeH='Proje Detayı'
                />
                <CustomTextInput
                    handleC={(text: any) => setInput_two(text)}
                    val={input_two}
                    placeH='Proje Linki'
                />
            </View>
            <View style={{ width: width * 0.8, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                <Text style={input.length > 4 && input.length < 20 && value.length < 5 ? { fontSize: 20, fontWeight: 'bold', opacity: 1 } : { fontSize: 20, fontWeight: 'bold', opacity: 0.6 }}>
                    Proje Ekle
                </Text>
                <Pressable onPress={press} style={input.length > 4 && input.length < 20 && value.length < 5 ? { opacity: 1 } : { opacity: 0.6 }}
                    disabled={input.length > 4 && input.length < 20 && value.length < 5 ? false : true}>
                    <Ionicons name="add-circle-outline" size={48} color="black" />
                </Pressable>
            </View>
            <View style={{ width: width * 0.8, marginVertical: 10, flexDirection: 'row', gap: 20, flexWrap: 'wrap' }}>
                {value?.map((v: any, i: any) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable onPress={() => spliceData(i)}>
                            <Ionicons name="close" size={20} color="black" />
                        </Pressable>
                        <Text style={{ fontSize: 16 }}>
                            {v?.projectName}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {v?.projectDetails}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {v?.porjectLink}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}