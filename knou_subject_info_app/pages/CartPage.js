import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Platform, View, Text, Alert } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import { firebase_db } from "../firebaseConfig.js"
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';
import SelectSubject from "../components/SelectSubject.js"

export default function LikePage({ }) {

    const isFocused = useIsFocused();

    const [sbjt, setsbjt] = useState([])
    const [totalGpa, setTotalGpa] = useState([])
    const [sbjtDcCount, setSbjtDcCount] = useState([])
    
    useEffect(() => {
        if (isFocused) {
            console.log("Cart Page : Focused")
            getSelected();
        }
    }, [isFocused]);


    const getSelected = async () => {
        let userUniqueId;
        if (isIOS) {
            let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        } else {
            userUniqueId = await Application.androidId
        }

        firebase_db.ref('/cart/' + userUniqueId).once('value').then((snapshot) => {
            console.log("Cart Page : 파이어베이스에서 데이터 가져왔습니다!!")
            let sbjttmp = snapshot.val();
            let sbjt_list = []
            if (sbjttmp) {
                sbjt_list = Object.values(sbjttmp)
            }
            setsbjt(sbjt_list)
            let tmp = 0
            let count = { gyoyang: 0, jeongong: 0, ilban: 0 }
            sbjt_list.map((data) => {
                tmp = tmp + Number(data.gpa)
                if (data.sbjtDc == "교양") { count.gyoyang = count.gyoyang + 1 }
                if (data.sbjtDc == "전공") { count.jeongong = count.jeongong + 1 }
                if (data.sbjtDc == "일반선택") { count.ilban = count.ilban + 1 }
            })
            setTotalGpa(tmp)
            setSbjtDcCount(count)
        })
    }

    remove = async (csbjtNo) => {
        let userUniqueId;
        if (isIOS) {
            let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        } else {
            userUniqueId = await Application.androidId
        }
        firebase_db.ref('/cart/' + userUniqueId + '/' + csbjtNo).remove().then(function () {
            Alert.alert("삭제 완료");
            getSelected()
        })
    }


    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scrollContainer}>
                {
                    sbjt.map((content, i) => {
                        return (<SelectSubject key={i} content={content} remove={this.remove}/>)
                    })
                }
            </ScrollView>
            <View style={styles.infoContainer}>
                <View style={styles.infoSections1}>
                    <Text style={styles.smallText}>과목 합계</Text>
                    <Text style={styles.largeText}>{sbjt.length}</Text>
                </View>
                <View style={styles.infoSections2}>
                    <Text style={styles.smallText}>학점 합계</Text>
                    <Text style={styles.largeText}>{totalGpa}</Text>
                </View>
                <View style={styles.infoSections3}>
                    <View style={styles.infoSections3_jg}>
                        <Text style={styles.smallText}>전공</Text>
                        <Text style={styles.midText}>{sbjtDcCount.jeongong}</Text>
                    </View>
                    <View style={styles.infoSections3_gy}>
                        <Text style={styles.smallText}>교양</Text>
                        <Text style={styles.midText}>{sbjtDcCount.gyoyang}</Text>
                    </View>
                    <View style={styles.infoSections3_is}>
                        <Text style={styles.smallText}>일반선택</Text>
                        <Text style={styles.midText}>{sbjtDcCount.ilban}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    scrollContainer: {
        backgroundColor: "#fff"
    },
    infoContainer: {
        flexDirection: "row",
        height: 110,
        backgroundColor: "#fff"
    },
    infoSections1: {
        flex: 1,
        justifyContent: "center"
    },
    infoSections2: {
        flex: 1,
        justifyContent: "center"
    },
    infoSections3: {
        flex: 1,
    },
    infoSections3_jg: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    infoSections3_gy: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    infoSections3_is: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    largeText: {
        fontSize: 60,
        textAlign: "center",
        color: "#005482",
    },
    midText: {
        marginRight: 30,
        fontSize: 30,
        color: "#5C9BCC",
    },
    smallText: {
        marginLeft: 10,
        fontSize: 15,
        color: "#5C9BCC",
    }
})