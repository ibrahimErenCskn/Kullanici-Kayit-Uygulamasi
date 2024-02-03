import { View, Dimensions } from 'react-native'
import React, { ReactNode } from 'react'

const { width } = Dimensions.get('window')

interface CardCoverProps {
    children: ReactNode;
    height: number
    customStyle?: object
}


export default function CardCover({ children, height, customStyle }: CardCoverProps) {
    return (
        <View style={[{ backgroundColor: '#1877F2', width: width * 0.9, height: height, borderRadius: 25, justifyContent: 'center', paddingLeft: 20, marginTop: 15 }, customStyle]}>
            {children}
        </View>
    )
}