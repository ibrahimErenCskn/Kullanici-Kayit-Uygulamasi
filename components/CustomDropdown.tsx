import { Text, TouchableOpacity, Modal, SafeAreaView, FlatList, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'

const { width } = Dimensions.get('window');

interface CustomDropdownProps {
    value: any,
    setItem: any,
    data: any,
    placeholder: string,
    itemName: string,
    setName: string
    customStyle?: object
    setCode?: any
}

export default function CustomDropdown({ value, setItem, data, placeholder, itemName, setName, customStyle, setCode }: CustomDropdownProps) {
    const [modalShow, setModalShow] = useState(false)

    const handleSelectItem = (item: any) => {
        setModalShow(false)
        setItem(setName, item.label)
        if (setCode) {
            setCode(item?.code)
        }
    }

    const handleButtonClick = () => {
        setModalShow(true)
    }
    const RenderListItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity onPress={() => handleSelectItem(item)} style={styles.listItem}>
                <Image source={{ uri: item.flagPng }} style={{ width: 30, height: 30 }} resizeMode='contain' />
                <Text style={styles.listItemLabel}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <TouchableOpacity style={[styles.button, customStyle]} onPress={handleButtonClick}>
                <Text style={[styles.buttonTitle, !!value === false && { color: '#646464' }]}>
                    {itemName ? itemName : placeholder}
                </Text>
            </TouchableOpacity>
            <Modal visible={modalShow} animationType='fade'>
                <SafeAreaView style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>{placeholder}</Text>
                    <FlatList style={{ flex: 1, }} data={data || []} renderItem={RenderListItem} initialNumToRender={7} maxToRenderPerBatch={15} updateCellsBatchingPeriod={55} />
                </SafeAreaView>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    button: {
        width: width * 0.4,
        height: width * 0.1,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 15,
        borderWidth: 2
    },
    buttonTitle: {
        fontSize: width * 0.035,
        fontWeight: '400',
        color: '#000',
    },
    listItem: {
        width: '100%',
        height: width * 0.15,
        paddingLeft: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        flexDirection: 'row',
    },
    listItemLabel: {
        fontSize: width * 0.035,
        fontWeight: '400',
        color: '#000',
        paddingLeft: 15
    },
    modalTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 20
    }
})