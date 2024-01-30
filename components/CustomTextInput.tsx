import { StyleSheet, TextInput } from 'react-native'

interface TextInputProps {
    placeH?: string;
    handleC: any;
    onB: any;
    val: string;
    customStyle?: object
}

export default function CustomTextInput({ placeH, handleC, onB, val, customStyle }: TextInputProps) {
    return (
        <TextInput
            style={[styles.textInputS, customStyle]}
            placeholder={placeH ? placeH : ''}
            onChangeText={handleC}
            onBlur={onB}
            value={val}
        />
    )
}

const styles = StyleSheet.create({
    textInputS: {
        width: '80%',
        height: 30,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderBottomColor: 'black',
        borderLeftColor: 'black',
        borderRadius: 15,
        paddingLeft: 8,
        paddingRight: 12
    }
})