import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { firebase_db } from "../firebaseConfig.js"
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';

//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function Card({ content }) {

    const addBtn_Click = async () => {
        let userUniqueId;
        if (isIOS) {
            let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        } else {
            userUniqueId = await Application.androidId
        }
        firebase_db.ref('/cart/' + userUniqueId + '/' + content.sbjtNo).set(content, function (error) {
            console.log(error)
            Alert.alert("바구니 추가 완료!")
        });
    }

    return (
        // <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('Detail', { idx: content.sbjtNo })}}>
        <View style={styles.card}>
            {/* <Image style={styles.addBtnImg} source={{ uri: "https://storage.googleapis.com/sparta-image.appspot.com/lecture/money1.png" }} /> */}
            <View style={styles.cardText}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={styles.sbjtTitle}>
                        <Text style={styles.sbjtNmText}>{content.sbjtNm}</Text>
                        <Text style={styles.sbjtDcText}> [{content.sbjtDc}]</Text>
                    </View>
                    <TouchableOpacity style={styles.addBtn} onPress={() => addBtn_Click()}>
                        <Text style={styles.addBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sbjtDesc}>
                    <Text style={styles.descText}>{content.shgr}학년</Text>
                    <Text style={styles.descText}>{content.seme}학기</Text>
                    <Text style={styles.descText}>{content.gpa}학점</Text>
                    <Text style={styles.descText}>{content.lesnTpDc}</Text>
                    <Text style={styles.descText}>{content.trenexPrpbTc}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    card: {
        flex: 1,
        height:70,
        marginBottom: 15,
        paddingBottom: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#005482"
    },
    sbjtTitle: {
        flex: 9,
        flexDirection: "row",
    },
    cardText: {
        flex: 2,
        flexDirection: "column",
        marginLeft: 10,
        justifyContent:"space-between"
    },
    addBtn: {
        flex: 1,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    addBtnText: {
        fontSize: 30,
        color: "#005482"
    },
    sbjtNmText: {
        marginTop: 5,
        fontSize: 22,
        fontWeight: "700",
        color: "#005482"
    },
    sbjtDcText: {
        marginTop: 9,
        marginBottom: 5,
        textAlignVertical: "bottom",
        marginLeft:10,
        fontSize: 15,
        color: "#5C9BCC"
    },
    sbjtDesc: {
        flexDirection: "row",
    },
    descText: {
        marginLeft:10,
        fontSize: 15,
        color: "#5C9BCC"
    }
});