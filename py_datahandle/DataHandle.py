import requests
# import json
import firebase_admin
from firebase_admin import db, credentials
from datetime import datetime

ROOT = "c:\py_datahandle"
CRED = "credentials.json"
DB_URL = "https://firebasedatabase.app"

def request_haksa(hakgi, year, major) :
	row_max = 1000

	# 1차 조회 후 records 수 확인
	url = fr'https://haksa.knou.ac.kr/haksa/ale/cour/retrieveEstbSbjtInfo.data?yosa={year}&seme={hakgi}&sbjtNo=&deptMajrCd={major}&shgr=&pttmAtlcPsblYn=&rows={row_max}&_search=false&sidx=&sord=asc'
	requestData = requests.get(url)
	jsonData = None
	if requestData.status_code == 200 :
		jsonData = requestData.json()

	# row가 1000보다 많다면 최대 row로 다시 조회
	if row_max < int(jsonData.get("records")) :
		row_max = jsonData.get("records")
		url = fr'https://haksa.knou.ac.kr/haksa/ale/cour/retrieveEstbSbjtInfo.data?yosa={year}&seme={hakgi}&sbjtNo=&deptMajrCd={major}&shgr=&pttmAtlcPsblYn=&rows={row_max}&_search=false&sidx=&sord=asc'
		requestData = requests.get(url)
		jsonData = None
		if requestData.status_code == 200 :
			jsonData = requestData.json()

	for row in jsonData['rows'] :
		if row['sbjtDc'] == '1' :
			row['sbjtDc'] = '교양'
		if row['sbjtDc'] == '3' :
			row['sbjtDc'] = '전공'
		if row['sbjtDc'] == '5' :
			row['sbjtDc'] = '일반선택'

		if 'trenexPrpbTc' in row :
			if row['trenexPrpbTc'] == '0' :
				row['trenexPrpbTc'] = '기말시험'
			if row['trenexPrpbTc'] == '4' :
				row['trenexPrpbTc'] = '기말과제물'
		else :
			row['trenexPrpbTc'] = "none"

		if 'hmwkOnlDc' in row :
			pass
		else :
			row['hmwkOnlDc'] = "none"

		if row['lesnTpDc'] == '1' :
			row['lesnTpDc'] = '출석수업'
		if row['lesnTpDc'] == '5' :
			row['lesnTpDc'] = '중간과제물'
		if row['lesnTpDc'] == 'A' :
			row['lesnTpDc'] = '웹강의'

	tmp_dic = {}

	for row in jsonData['rows'] :
		tmp_dic[row['sbjtNo']] = row

	return tmp_dic

dic_Mjcode = {
	"10" : "국어국문학과",
	"11" : "영어영문학과",
	"12" : "중어중문학과",
	"13" : "프랑스언어문화학과",
	"14" : "일본학과",
	"21" : "법학과",
	"22" : "행정학과",
	"23" : "경제학과",
	"24" : "경영학과",
	"25" : "무역학과",
	"26" : "미디어영상학과",
	"27" : "관광학과",
	"28" : "사회복지학과",
	"31" : "농학과",
	"33" : "생활과학부",
	"34" : "컴퓨터과학과",
	"35" : "통계·데이터과학과",
	"36" : "보건환경학과",
	"37" : "간호학과",
	"42" : "유아교육과",
	"43" : "문화교양학과",
	"44" : "교육학과",
	"45" : "청소년교육과",
	"46" : "생활체육지도과",
	"51" : "생활과학부(가정복지상담학전공)",
	"52" : "생활과학부(식품영양학전공)",
	"53" : "생활과학부(의류패션학전공)"
}

key_list = {
	'sbjtDc' : '교과구분',
	'deptMajrCd' : '개설학과',
	'atndLesnExamEnfrYn' : '출석시험 시험유형',
	'atndLesnDc' : '대체구분',
	'gpa' : '학점',
	'crrcGdcYn' : '연계전공여부',
	'lesnTpDc' : '수업 유형',
	'sbjtNm' : '교과목명',
	'sbjtNo' : '교과목 번호',
	'trenexPrpbTc' : '기말시험 유형',
	'seme' : '학기',
	'pttmAtlcPsblYn' : '시간제 개설 여부',
	'yosa' : '학년도',
	'shgr' : '개설학년',
	'lesnDtlDc' : '출석수업유형'
}


hakgis = [1, 2] # 1학기 2학기 하계 동계
year = datetime.today().year # 당해 조회
# major = [34] # 컴퓨터과학과
result_dic = {}

cred = credentials.Certificate(ROOT+"\\"+CRED)
firebase_admin.initialize_app(cred, options={'databaseURL' : DB_URL})
ref = db.reference("/subjects")

for hakgi in hakgis :
	for mj in dic_Mjcode.keys() :
		result_dic = request_haksa(hakgi, year, mj)
		ref = db.reference(f'/subjects/{mj}')
		ref.update(result_dic)
		print(f'{dic_Mjcode[mj]} : {len(ref.get())}과목')


# json 파일로 저장
# file_path = './knou_app/data.json'
# with open(file_path, 'w', encoding = 'utf-8') as file:
#     json.dump(result_dic, file, indent="\t", ensure_ascii=False)