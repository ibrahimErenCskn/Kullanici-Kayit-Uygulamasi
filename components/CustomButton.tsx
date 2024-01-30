import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    title: string
    handlePress: Function
    customStyle?: object
}

export default function CustomButton({ title, handlePress, customStyle }: CustomButtonProps) {
    return (
        <Pressable onPress={() => handlePress()} style={[styles.buttonS, customStyle]}>
            <Text>{title}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    buttonS: {
        width: '30%',
        height: 40,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    }
})