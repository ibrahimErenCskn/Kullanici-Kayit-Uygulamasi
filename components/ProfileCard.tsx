import { View, Text } from 'react-native'
import React from 'react'

interface ProfileDataProps {
    data: string
    placeh: string
}

export default function ProfileCard({ data, placeh }: ProfileDataProps) {
    return (
        <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>
                {placeh}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                {data ? data : 'Bilgi Yok'}
            </Text>
        </View>
    )
}