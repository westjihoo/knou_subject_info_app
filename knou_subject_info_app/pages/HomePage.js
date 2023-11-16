import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';


export default function Home({ }) {

    const URL_Calender = "https://www.knou.ac.kr/knou/47/subview.do?epTicket=LOG"
    const URL_Notice = "https://www.knou.ac.kr/knou/561/subview.do?epTicket=LOG"
    const URL_Contact = "https://www.knou.ac.kr/knou/70/subview.do"
    const [url, setUrl] = useState(URL_Calender);
    const onNavigationStateChange = (webViewState) => {
        setUrl(webViewState.url);
    };

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            console.log("Home Page : Focused")
        } else {
            // console.log("Home Page : UnFocused")
            console.log("Home Page : URL 초기화")
            setUrl(URL_Calender);
        }
    }, [isFocused]);


    return (
        <SafeAreaView style={{ flex: 1, paddingBottom:3}} edges={['right', 'left', 'top']} >
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnLink} onPress={() => setUrl(URL_Calender)}><Text style={styles.btnLinkText}>학사일정</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btnLink} onPress={() => setUrl(URL_Notice)}><Text style={styles.btnLinkText}>공지사항</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btnLink} onPress={() => setUrl(URL_Contact)}><Text style={styles.btnLinkText}>전화번호</Text></TouchableOpacity>
            </View>
            <WebView
                source={{
                    uri: url,
                }}
                onNavigationStateChange={onNavigationStateChange}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        width: 300,
        alignSelf: "center"
    },
    btnLink: {
        backgroundColor: "#C9C9C9",
        width: 70,
        height: 30,
        marginRight: 4,
        borderRadius: 5,
        justifyContent: "center",
    },
    btnLinkText: {
        color: "#005482",
        fontWeight: "700",
        textAlign: "center"
    },
});