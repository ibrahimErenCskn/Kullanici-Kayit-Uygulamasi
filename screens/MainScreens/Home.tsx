import { View, Text, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart } from 'react-native-chart-kit'

export default function Home() {
    const [userData, setUserData] = useState<any>()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!response.ok) {
                    throw new Error('Network Error')
                }
                const result = await response.json()
                setUserData(result)
            }
            catch (err) {
                console.error('Error during data fetch:', err);
            }
        }
        fetchData()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <LineChart
                    data={{
                        labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width * 0.95} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                {
                    userData?.map((v: any, i: any) => (
                        <View key={i} style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center', gap: 15, paddingLeft: 5, backgroundColor: '#1877F2', height: 100, borderRadius: 10 }}>
                            <View>
                                <Image source={require('../../assets/icon.png')} style={{ width: 75, height: 75 }} resizeMode='contain' borderRadius={40} />
                            </View>
                            <View style={{ gap: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                    İsmi: {v.name}
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                    E-Posta: {v.email}
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                    Telefon: {v.phone}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}