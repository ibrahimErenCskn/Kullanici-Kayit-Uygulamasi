import { KeyboardType, StyleSheet, TextInput, View, Dimensions, Text } from 'react-native'

type TextInputProps = {
    placeH?: string;
    handleC: any;
    onB?: any;
    val: string;
    customStyle?: object;
    keyboardType?: KeyboardType
    error?: any
    touch?: any
    length?: number;
    customRight?: object
}

const { width, height } = Dimensions.get('window')

export default function CustomTextInput({ placeH, handleC, onB, val, keyboardType, customStyle, error, length, touch, customRight }: TextInputProps) {
    return (
        <View style={styles.container}>
            {error && touch ? <View style={[{ position: 'absolute', right: 10, top: height * 0.01 }, customRight]}><Text style={{ fontWeight: 'bold' }}>{error}</Text></View> : null}
            <TextInput
                style={[styles.textInputS, customStyle]}
                placeholder={placeH ? placeH : ''}
                onChangeText={handleC}
                onBlur={onB}
                value={val}
                keyboardType={keyboardType ? keyboardType : 'default'}
                maxLength={length ? length : 50}
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
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderBottomColor: 'black',
        borderLeftColor: 'black',
        borderRadius: 15,
        paddingLeft: 8,
        paddingRight: 30
    }
})