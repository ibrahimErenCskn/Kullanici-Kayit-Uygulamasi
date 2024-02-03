import { View, Text, Pressable, Dimensions } from 'react-native'
import React from 'react'
import CustomTextInput from './CustomTextInput'
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')
interface CustomAddItemProps {
    skills: string
    setSkills: any
    setFieldValue: any
    placH: string
    setName: string
    value: any
}

export default function CustomAddItem({ skills, setSkills, setFieldValue, placH, setName, value }: CustomAddItemProps) {

    const press = () => {
        setFieldValue(setName, [...value, skills])
        setSkills('')
    }
    const spliceData = (index: number) => {
        const newData = value?.filter((item: any, i: any) => i !== index)
        setFieldValue(setName, newData)
    }
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ position: 'relative', width: width * 0.8 }}>
                <CustomTextInput
                    handleC={(text: any) => setSkills(text)}
                    val={skills}
                    placeH={placH}
                />
                <Pressable onPress={press} style={skills.length > 2 && skills.length < 30 && value.length < 5 ? { position: 'absolute', top: 0, right: 5, width: 30 } : { position: 'absolute', top: 4, right: 5, width: 30, opacity: 0.6 }}
                    disabled={skills.length > 2 && skills.length < 30 && value.length < 5 ? false : true}>
                    <Ionicons name="add-circle-outline" size={height * 0.04} color="black" />
                </Pressable>
            </View>
            <View style={{ width: width * 0.8, marginVertical: 10, flexDirection: 'row', gap: 20, flexWrap: 'wrap' }}>
                {value?.map((v: any, i: any) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable onPress={() => spliceData(i)}>
                            <Ionicons name="close" size={20} color="black" />
                        </Pressable>
                        <Text style={{ fontSize: 16 }}>
                            {v}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}