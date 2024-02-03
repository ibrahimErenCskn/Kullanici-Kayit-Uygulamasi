import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input'

interface MaskedInputProps {
    values: string;
    fieldValues: any,
    error: any
    touch: any
    setName: string
    placeH: string
}

const { width, height } = Dimensions.get('window')

export default function MaskedInput({ values, fieldValues, error, touch, setName, placeH }: MaskedInputProps) {
    return (
        <View style={styles.container}>
            {error && touch ? <View style={[{ position: 'absolute', right: 10, top: 13 }]}><Text style={{ fontWeight: 'bold' }}>{error}</Text></View> : null}
            <MaskInput
                style={styles.textInputS}
                value={values}
                onChangeText={(masked, unmasked) => {
                    fieldValues(setName, unmasked)
                }}
                mask={Masks.DATE_DDMMYYYY}
                keyboardType='numeric'
                placeholder={placeH}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        position: 'relative'
    },
    textInputS: {
        height: height * 0.05,
        width: width * 0.8,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderBottomColor: 'black',
        borderLeftColor: 'black',
        borderRadius: 15,
        paddingLeft: 8,
        paddingRight: 30
    }
})