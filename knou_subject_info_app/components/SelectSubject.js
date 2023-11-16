import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const SelectSubject = ({ content, remove }) => {

    return (
        <View style={styles.card}>
            <View style={styles.cardText}>
                <View style={styles.sbjtTitle}>
                    <Text style={styles.sbjtNmText}>{content.sbjtNm}</Text>
                    <Text style={styles.sbjtDcText}> [{content.sbjtDc}]</Text>
                </View>
                <View style={styles.sbjtDesc}>
                    <Text style={styles.descText}>{content.shgr}학년</Text>
                    <Text style={styles.descText}>{content.seme}학기</Text>
                    <Text style={styles.descText}>{content.gpa}학점</Text>
                    <Text style={styles.descText}>{content.lesnTpDc}</Text>
                    <Text style={styles.descText}>{content.trenexPrpbTc}</Text>
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} disabled={true}><Text style={styles.buttonText}>자세히보기</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => remove(content.sbjtNo)}><Text style={styles.buttonText}>삭제</Text></TouchableOpacity>

                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    card: {
        flex: 1,
        flexDirection: "row",
        margin: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#005482",
        paddingBottom: 10
    },
    cardImage: {
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    sbjtTitle: {
        flexDirection: "row"
    },
    cardText: {
        flex: 2,
        flexDirection: "column",
        marginLeft: 10,
        justifyContent: "space-between"
    },
    sbjtNmText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#005482"
    },
    sbjtDcText: {
        textAlignVertical: "bottom",
        marginLeft: 10,
        fontSize: 15,
        color: "#5C9BCC"
    },
    sbjtDesc: {
        flexDirection: "row",
    },
    descText: {
        marginRight: 10,
        marginTop: 3,
        fontSize: 15,
        color: "#5C9BCC"
    },
    buttonGroup: {
        flexDirection: "row",
    },
    button: {
        width: 90,
        marginTop: 10,
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#005482',
        borderRadius: 7
    },
    buttonText: {
        color: '#005482',
        textAlign: 'center'
    }
});



export default SelectSubject;