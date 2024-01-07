import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { firebase_db } from "../firebaseConfig"
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';

import Subject from "../components/Subject.js";


export default function Subjet({ }) {

	const [major, setMajor] = useState("34")
	const isFocused = useIsFocused();

	const [sbjt, setSbjt] = useState([])
	const [sbjtFiltered, setSbjtFiltered] = useState([])
	const [filterDict, setFilterDict] = useState([
		{
			sbjtDc: "전체",
			lesnTpDc: "전체",
			trenexPrpbTc: "전체",
			shgr: "전체",
			seme: "전체"
		}
	])
	const [btnState, setBtnState] = useState([
		{
			btnState01: 0,
			btnState02: 0,
			btnState03: 0,
			btnState04: 0,
			btnState05: 0
		}
	])
	const [isCollapsed, setIsCollapsed] = useState(true)
	const [isPickOpn, setIsPickOpn] = useState(false)
	const [options, setOptions] = useState([
		{ value: "all", label: "전체학과"},
		{ value: "10", label: "국어국문학과" },
		{ value: "11", label: "영어영문학과" },
		{ value: "12", label: "중어중문학과" },
		{ value: "13", label: "프랑스언어문화학과" },
		{ value: "14", label: "일본학과" },
		{ value: "21", label: "법학과" },
		{ value: "22", label: "행정학과" },
		{ value: "23", label: "경제학과" },
		{ value: "24", label: "경영학과" },
		{ value: "25", label: "무역학과" },
		{ value: "26", label: "미디어영상학과" },
		{ value: "27", label: "관광학과" },
		{ value: "28", label: "사회복지학과" },
		{ value: "31", label: "농학과" },
		{ value: "33", label: "생활과학부" },
		{ value: "34", label: "컴퓨터과학과" },
		{ value: "35", label: "통계·데이터과학과" },
		{ value: "36", label: "보건환경학과" },
		{ value: "37", label: "간호학과" },
		{ value: "42", label: "유아교육과" },
		{ value: "43", label: "문화교양학과" },
		{ value: "44", label: "교육학과" },
		{ value: "45", label: "청소년교육과" },
		{ value: "46", label: "생활체육지도과" },
		{ value: "51", label: "생활과학부(가정복지상담학전공)" },
		{ value: "52", label: "생활과학부(식품영양학전공)" },
		{ value: "53", label: "생활과학부(의류패션학전공)" }
	])


	useEffect(() => {
		if (isFocused) {
			console.log("Subject Page : Focused")
			loading()
		} else {
			setIsPickOpn(false)
			setIsCollapsed(true)
			// console.log("Subject Page : UnFocused ")
		}
	}, [isFocused]);

	useEffect(() => {
		loading()
	}, [major])


	function loading() {
		loadDataBase(major)
		setFilterDict([
			{
				sbjtDc: "전체",
				lesnTpDc: "전체",
				trenexPrpbTc: "전체",
				shgr: "전체",
				seme: "전체"
			}
		])
		btnState.btnState01 = 0
		btnState.btnState02 = 0
		btnState.btnState03 = 0
		btnState.btnState04 = 0
		btnState.btnState05 = 0
	}

	function loadDataBase(mj) {
		firebase_db.ref('/subjects/' + (mj)).once('value').then((snapshot) => {
			console.log("Subject Page : 파이어베이스에서 데이터 가져왔습니다!!")
			let sbjtTmp = snapshot.val();
			let sbjt_list = Object.values(sbjtTmp)
			if (sbjt_list && sbjt_list.length > 0) {
				setSbjt(sbjt_list)
				setSbjtFiltered(sbjt_list)
			}
		});
	}

	function sbjtFiltering(sbjt) {
		tmp_sbjtlist = sbjt
		for (const [k, v] of Object.entries(filterDict[0])) {
			if (v == "전체") {
			} else {
				tmp_sbjtlist = tmp_sbjtlist.filter((data) => {
					return data[k] == v
				})
			}
		}
		return tmp_sbjtlist
	}

	function clkCollapse() {
		setIsCollapsed(!isCollapsed)
	}

	function clkCateBtn(key, value, setSbjtFiltered) {
		filterDict[0][key] = value
		setSbjtFiltered(sbjtFiltering(sbjt))
	}

	return (
		<View style={styles.container}>
			<DropDownPicker
				open={isPickOpn}
				value={major}
				items={options}
				setOpen={setIsPickOpn}
				setValue={setMajor}
				setItems={setOptions}
				autoScroll={true}
				selectedItemContainerStyle={{
					backgroundColor: "rgba(127,202,219,0.1)",
				}}
				style={{
					marginTop: 7,
					marginBottom: 3,
					borderRadius: 4,
					borderWidth: 0.9
				}}
				textStyle={{
					fontSize: 15
				}}
				labelStyle={{
					fontWeight: "bold"
				}}
			/>
			<View style={styles.cateContainer}>
				{
					isCollapsed
						?
						<View style={styles.middleContainer}>
							<TouchableOpacity style={btnState.btnState01 === 0 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('sbjtDc', '전체', setSbjtFiltered); { btnState.btnState01 = 0 }; }}><Text style={styles.middleButtonTextAll}>전체</Text></TouchableOpacity>
							<TouchableOpacity style={btnState.btnState01 === 1 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('sbjtDc', '교양', setSbjtFiltered); { btnState.btnState01 = 1 }; }}><Text style={styles.middleButtonText}>교양</Text></TouchableOpacity>
							<TouchableOpacity style={btnState.btnState01 === 2 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('sbjtDc', '전공', setSbjtFiltered); { btnState.btnState01 = 2 }; }}><Text style={styles.middleButtonText}>전공</Text></TouchableOpacity>
							<TouchableOpacity style={btnState.btnState01 === 3 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('sbjtDc', '일반선택', setSbjtFiltered); { btnState.btnState01 = 3 }; }}><Text style={styles.middleButtonText}>일반선택</Text></TouchableOpacity>
						</View>
						:
						<View>
							<View style={styles.middleContainer}>
								<TouchableOpacity style={btnState.btnState01 === 0 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('sbjtDc', '전체', setSbjtFiltered); { btnState.btnState01 = 0 }; }}><Text style={styles.middleButtonTextAll}>전체</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState01 === 1 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('sbjtDc', '교양', setSbjtFiltered); { btnState.btnState01 = 1 }; }}><Text style={styles.middleButtonText}>교양</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState01 === 2 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('sbjtDc', '전공', setSbjtFiltered); { btnState.btnState01 = 2 }; }}><Text style={styles.middleButtonText}>전공</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState01 === 3 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('sbjtDc', '일반선택', setSbjtFiltered); { btnState.btnState01 = 3 }; }}><Text style={styles.middleButtonText}>일반선택</Text></TouchableOpacity>
							</View>
							<View style={styles.middleContainer}>
								<TouchableOpacity style={btnState.btnState02 === 0 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('lesnTpDc', '전체', setSbjtFiltered); { btnState.btnState02 = 0 }; }}><Text style={styles.middleButtonTextAll}>전체</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState02 === 1 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('lesnTpDc', '출석수업', setSbjtFiltered); { btnState.btnState02 = 1 }; }}><Text style={styles.middleButtonText}>출석수업</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState02 === 2 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('lesnTpDc', '중간과제물', setSbjtFiltered); { btnState.btnState02 = 2 }; }}><Text style={styles.middleButtonText}>과제물</Text></TouchableOpacity>
							</View>
							<View style={styles.middleContainer}>
								<TouchableOpacity style={btnState.btnState03 === 0 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('trenexPrpbTc', '전체', setSbjtFiltered); { btnState.btnState03 = 0 }; }}><Text style={styles.middleButtonTextAll}>전체</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState03 === 1 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('trenexPrpbTc', '기말시험', setSbjtFiltered); { btnState.btnState03 = 1 }; }}><Text style={styles.middleButtonText}>객관식시험</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState03 === 2 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('trenexPrpbTc', '기말과제물', setSbjtFiltered); { btnState.btnState03 = 2 }; }}><Text style={styles.middleButtonText}>과제물</Text></TouchableOpacity>
							</View>
							<View style={styles.middleContainer}>
								<TouchableOpacity style={btnState.btnState04 === 0 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('shgr', '전체', setSbjtFiltered); { btnState.btnState04 = 0 }; }}><Text style={styles.middleButtonTextAll}>전체</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState04 === 1 ? styles.middleButtonShgr_Active : styles.middleButtonShgr} onPress={() => { clkCateBtn('shgr', '1', setSbjtFiltered); { btnState.btnState04 = 1 }; }}><Text style={styles.middleButtonText}>1</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState04 === 2 ? styles.middleButtonShgr_Active : styles.middleButtonShgr} onPress={() => { clkCateBtn('shgr', '2', setSbjtFiltered); { btnState.btnState04 = 2 }; }}><Text style={styles.middleButtonText}>2</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState04 === 3 ? styles.middleButtonShgr_Active : styles.middleButtonShgr} onPress={() => { clkCateBtn('shgr', '3', setSbjtFiltered); { btnState.btnState04 = 3 }; }}><Text style={styles.middleButtonText}>3</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState04 === 4 ? styles.middleButtonShgr_Active : styles.middleButtonShgr} onPress={() => { clkCateBtn('shgr', '4', setSbjtFiltered); { btnState.btnState04 = 4 }; }}><Text style={styles.middleButtonText}>4</Text></TouchableOpacity>
							</View>
							<View style={styles.middleContainer}>
								<TouchableOpacity style={btnState.btnState05 === 0 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('seme', '전체', setSbjtFiltered); { btnState.btnState05 = 0 }; }}><Text style={styles.middleButtonTextAll}>전체</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState05 === 1 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('seme', '1', setSbjtFiltered); { btnState.btnState05 = 1 }; }}><Text style={styles.middleButtonText}>1학기</Text></TouchableOpacity>
								<TouchableOpacity style={btnState.btnState05 === 2 ? styles.middleButton_Active : styles.middleButton} onPress={() => { clkCateBtn('seme', '2', setSbjtFiltered); { btnState.btnState05 = 2 }; }}><Text style={styles.middleButtonText}>2학기</Text></TouchableOpacity>
							</View>
						</View>
				}
				<TouchableOpacity style={styles.collapseButton} onPress={() => clkCollapse()}>
					{
						isCollapsed
							? <AntDesign name="down" size={16} color="black" />
							: <AntDesign name="up" size={16} color="black" />
					}
				</TouchableOpacity>
			</View>
			<ScrollView style={styles.containerScroll}>
				{
					sbjtFiltered.map((content, i) => {
						// return (<Subject key={i} content={content} navigation={navigation} tip={tip} setTip={setTip} />)
						return (<Subject key={i} content={content} />)
					})
				}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20
	},
	cateContainer: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	btnContainer: {
		height: 210,
	},
	btnContainerClosed: {
		height: 40,
	},
	containerScroll: {
		marginTop: 15,
		marginBottom: 4,
		backgroundColor: "#fff"
	},
	collapseButton: {
		alignSelf: "flex-end",
		alignItems: "center",
		justifyContent: "center",
		width: 40,
		height: 40
	},
	middleContainer: {
		flexDirection: "row",
		marginTop: 3
	},
	middleButton: {
		width: 70,
		height: 40,
		marginRight: 4,
		borderWidth: 1,
		borderRadius: 4,
		borderStyle: 'solid',
		borderColor: "rgba(0,84,130, 1)",
		textAlign: "center",
		justifyContent: "center",
	},
	middleButton_Active: {
		width: 70,
		height: 40,
		marginRight: 4,
		borderWidth: 1,
		borderRadius: 4,
		backgroundColor: "rgba(127,202,219,0.5)",
		borderStyle: 'solid',
		borderColor: "rgba(127,202,219,0.5)",
		textAlign: "center",
		justifyContent: "center",
	},
	middleButtonShgr: {
		width: 55,
		height: 40,
		marginRight: 4,
		borderWidth: 1,
		borderRadius: 4,
		borderStyle: 'solid',
		borderColor: "rgba(0,84,130, 1)",
		textAlign: "center",
		justifyContent: "center",
	},
	middleButtonShgr_Active: {
		width: 55,
		height: 40,
		marginRight: 4,
		borderWidth: 1,
		borderRadius: 4,
		backgroundColor: "rgba(127,202,219,0.5)",
		borderStyle: 'solid',
		borderColor: "rgba(127,202,219,0.5)",
		textAlign: "center",
		justifyContent: "center",
	},
	middleButtonText: {
		color: "rgba(0,84,130, 1)",
		fontWeight: "700",
		textAlign: "center"
	},
	middleButtonTextAll: {
		color: "rgba(0,84,130, 1)",
		fontWeight: "700",
		textAlign: "center"
	},
	countRows: {
		alignSelf: "flex-end"
	}
});
