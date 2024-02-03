import { Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    title: string
    handlePress: Function
    customStyle?: object
    handleDisable?: any
}

const { width, height } = Dimensions.get('window')

export default function CustomButton({ title, handlePress, customStyle, handleDisable }: CustomButtonProps) {
    return (
        <Pressable onPress={() => handlePress()} style={[styles.buttonS, customStyle]} disabled={handleDisable ? handleDisable : false}>
            <Text style={styles.textC}>{title}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    buttonS: {
        width: width * 0.5,
        height: 50,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    textC: {
        fontWeight: '700',
        fontSize: 20
    }
})