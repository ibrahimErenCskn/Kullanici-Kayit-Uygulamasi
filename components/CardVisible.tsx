import { View, Text, Pressable } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

interface CardVisibleProps {
    children: ReactNode;
    text: string
}

export default function CardVisible({ children, text }: CardVisibleProps) {
    const [visible, setVisible] = useState(false)

    const visibleState = () => {
        setVisible(!visible)
    }

    return (
        <>
            <View style={{ flexDirection: 'row', gap: 10, backgroundColor: '#1877F2', paddingHorizontal: 8, height: 30, alignItems: 'center', borderRadius: 20, marginTop: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{text}</Text>
                <Pressable onPress={() => visibleState()} style={{ flex: 1, alignItems: 'flex-end' }}>
                    {
                        visible && <AntDesign name="down" size={24} color="black" />
                    }
                    {
                        !visible &&
                        <AntDesign name="right" size={24} color="black" />
                    }
                </Pressable>
            </View>
            {
                visible &&
                <View>
                    {children}
                </View>
            }
        </>
    )
}