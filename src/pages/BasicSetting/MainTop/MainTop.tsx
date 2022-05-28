import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Select from "react-select";
import Buttons from "../../../component/Buttons/Buttons";
import InputField from "../../../component/InputField/InputField";
import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "../../../helper/API/ApiData";
import SaveBanner from "../../../modal/SaveBanner";

import "./MainTop.css";

interface mainTop {
  id: string;
  title: string;
  detail: string;
  start_date: string;
  end_date: string;
  deadline: string;
  city: string;
  district: string;
  image: string;
  link: string;
}

const MainTop = () => {
  const [mainTop, setMainTop] = useState<mainTop[]>([
    {
      id: "",
      title: "",
      detail: "",
      start_date: "",
      end_date: "",
      deadline: "",
      city: "",
      district: "",
      image: "",
      link: ""
    },
  ]);
  const [isSaveBanner, setIsSaveBanner] = useState(false);
  const [districtSelect, setdistrictselect] = useState<any>([]);

  const districtselect = [
    { label: "전체", value: "전체", main: "서울시" },
    { label: "종로구", value: "종로구", main: "서울시" },
    { label: "중구", value: "중구", main: "서울시" },
    { label: "용산구", value: "용산구", main: "서울시" },
    { label: "성동구", value: "성동구", main: "서울시" },
    { label: "광진구", value: "광진구", main: "서울시" },
    { label: "동대문구", value: "동대문구", main: "서울시" },
    { label: "중랑구", value: "중랑구", main: "서울시" },
    { label: "성북구", value: "성북구", main: "서울시" },
    { label: "강북구", value: "강북구", main: "서울시" },
    { label: "도봉구", value: "도봉구", main: "서울시" },
    { label: "노원구", value: "노원구", main: "서울시" },
    { label: "은평구", value: "은평구", main: "서울시" },
    { label: "서대문구", value: "서대문구", main: "서울시" },
    { label: "마포구", value: "마포구", main: "서울시" },
    { label: "양천구", value: "양천구", main: "서울시" },
    { label: "강서구", value: "강서구", main: "서울시" },
    { label: "강서구", value: "강서구", main: "서울시" },
    { label: "금천구", value: "금천구", main: "서울시" },
    { label: "영등포구", value: "영등포구", main: "서울시" },
    { label: "동작구", value: "동작구", main: "서울시" },
    { label: "관악구", value: "관악구", main: "서울시" },
    { label: "서초구", value: "서초구", main: "서울시" },
    { label: "강남구", value: "강남구", main: "서울시" },
    { label: "송파구", value: "송파구", main: "서울시" },
    { label: "강동구", value: "강동구", main: "서울시" },

    { label: "전체", value: "전체", main: "인천시" },
    { label: "중구", value: "중구", main: "인천시" },
    { label: "동구", value: "동구", main: "인천시" },
    { label: "추미홀구", value: "추미홀구", main: "인천시" },
    { label: "연수구", value: "연수구", main: "인천시" },
    { label: "남동구", value: "남동구", main: "인천시" },
    { label: "부평구", value: "부평구", main: "인천시" },
    { label: "계양구", value: "계양구", main: "인천시" },
    { label: "서구", value: "서구", main: "인천시" },
    { label: "강화군", value: "강화군", main: "인천시" },
    { label: "옹진군", value: "옹진군", main: "인천시" },

    { label: "전체", value: "전체", main: "경기도" },
    { label: "수원시", value: "수원시", main: "경기도" },
    { label: "성남시", value: "성남시", main: "경기도" },
    { label: "의정부시", value: "의정부시", main: "경기도" },
    { label: "안양시", value: "안양시", main: "경기도" },
    { label: "부천시", value: "부천시", main: "경기도" },
    { label: "광명시", value: "광명시", main: "경기도" },
    { label: "평택시", value: "평택시", main: "경기도" },
    { label: "동두천시", value: "동두천시", main: "경기도" },
    { label: "안산시", value: "안산시", main: "경기도" },
    { label: "고양시", value: "고양시", main: "경기도" },
    { label: "과천시", value: "과천시", main: "경기도" },
    { label: "구리시", value: "구리시", main: "경기도" },
    { label: "남양주시", value: "남양주시", main: "경기도" },
    { label: "오산시", value: "오산시", main: "경기도" },
    { label: "시흥시", value: "시흥시", main: "경기도" },
    { label: "군포시", value: "군포시", main: "경기도" },
    { label: "의왕시", value: "의왕시", main: "경기도" },
    { label: "하남시", value: "하남시", main: "경기도" },
    { label: "용인시", value: "용인시", main: "경기도" },
    { label: "파주시", value: "파주시", main: "경기도" },
    { label: "이천시", value: "이천시", main: "경기도" },
    { label: "안성시", value: "안성시", main: "경기도" },
    { label: "김포시", value: "김포시", main: "경기도" },
    { label: "화성시", value: "화성시", main: "경기도" },
    { label: "광주시", value: "광주시", main: "경기도" },
    { label: "양주시", value: "양주시", main: "경기도" },
    { label: "포천시", value: "포천시", main: "경기도" },
    { label: "여주시", value: "여주시", main: "경기도" },
    { label: "연천군", value: "연천군", main: "경기도" },
    { label: "가평군", value: "가평군", main: "경기도" },
    { label: "양평군", value: "양평군", main: "경기도" },

    { label: "전체", value: "전체", main: "부산시" },
    { label: "중구", value: "중구", main: "부산시" },
    { label: "서구", value: "서구", main: "부산시" },
    { label: "동구", value: "동구", main: "부산시" },
    { label: "영도구", value: "영도구", main: "부산시" },
    { label: "부산진구", value: "부산진구", main: "부산시" },
    { label: "동래구", value: "동래구", main: "부산시" },
    { label: "남구", value: "남구", main: "부산시" },
    { label: "북구", value: "북구", main: "부산시" },
    { label: "해운대구", value: "해운대구", main: "부산시" },
    { label: "사하구", value: "사하구", main: "부산시" },
    { label: "금정구", value: "금정구", main: "부산시" },
    { label: "강서구", value: "강서구", main: "부산시" },
    { label: "연제구", value: "연제구", main: "부산시" },
    { label: "수영구", value: "수영구", main: "부산시" },
    { label: "사상구", value: "사상구", main: "부산시" },
    { label: "기장군", value: "기장군", main: "부산시" },

    { label: "전체", value: "전체", main: "대구시" },
    { label: "중구", value: "중구", main: "대구시" },
    { label: "동구", value: "동구", main: "대구시" },
    { label: "서구", value: "서구", main: "대구시" },
    { label: "남구", value: "남구", main: "대구시" },
    { label: "북구", value: "북구", main: "대구시" },
    { label: "수성구", value: "수성구", main: "대구시" },
    { label: "달서구", value: "달서구", main: "대구시" },
    { label: "달성군", value: "달성군", main: "대구시" },

    { label: "전체", value: "전체", main: "광주시" },
    { label: "동구", value: "동구", main: "광주시" },
    { label: "서구", value: "서구", main: "광주시" },
    { label: "남구", value: "남구", main: "광주시" },
    { label: "북구	", value: "북구	", main: "광주시" },
    { label: "광산구", value: "광산구", main: "광주시" },

    { label: "전체", value: "전체", main: "대전시" },
    { label: "동구	", value: "동구	", main: "대전시" },
    { label: "중구	", value: "중구	", main: "대전시" },
    { label: "서구	", value: "서구	", main: "대전시" },
    { label: "유성구	", value: "유성구	", main: "대전시" },
    { label: "대덕구", value: "대덕구", main: "대전시" },

    { label: "전체", value: "전체", main: "울산시" },
    { label: "중구	", value: "중구	", main: "울산시" },
    { label: "동구", value: "동구", main: "울산시" },
    { label: "동구	", value: "동구	", main: "울산시" },
    { label: "북구	", value: "북구	", main: "울산시" },
    { label: "울주군	", value: "울주군	", main: "울산시" },

    { label: "전체", value: "전체", main: "강원도" },
    { label: "춘천시", value: "춘천시", main: "강원도" },
    { label: "원주시", value: "원주시", main: "강원도" },
    { label: "강릉시", value: "강릉시", main: "강원도" },
    { label: "동해시", value: "동해시", main: "강원도" },
    { label: "태백시", value: "태백시", main: "강원도" },
    { label: "속초시", value: "속초시", main: "강원도" },
    { label: "삼척시", value: "삼척시", main: "강원도" },
    { label: "홍천군", value: "홍천군", main: "강원도" },
    { label: "횡성군", value: "횡성군", main: "강원도" },
    { label: "영월군", value: "영월군", main: "강원도" },
    { label: "평창군", value: "평창군", main: "강원도" },
    { label: "정선군", value: "정선군", main: "강원도" },
    { label: "철원군", value: "철원군", main: "강원도" },
    { label: "화천군", value: "화천군", main: "강원도" },
    { label: "양구군", value: "양구군", main: "강원도" },
    { label: "인제군", value: "인제군", main: "강원도" },
    { label: "고성군", value: "고성군", main: "강원도" },
    { label: "양양군", value: "양양군", main: "강원도" },

    { label: "전체", value: "전체", main: "충북시" },
    { label: "청주시", value: "청주시", main: "충북시" },
    { label: "충주시", value: "충주시", main: "충북시" },
    { label: "제천시", value: "제천시", main: "충북시" },
    { label: "보은군", value: "보은군", main: "충북시" },
    { label: "옥천군", value: "옥천군", main: "충북시" },
    { label: "영동군", value: "영동군", main: "충북시" },
    { label: "증평군", value: "증평군", main: "충북시" },
    { label: "진천군", value: "진천군", main: "충북시" },
    { label: "괴산군", value: "괴산군", main: "충북시" },
    { label: "음성군", value: "음성군", main: "충북시" },
    { label: "단양군", value: "단양군", main: "충북시" },

    { label: "전체", value: "전체", main: "충남시" },
    { label: "천안시", value: "천안시", main: "충남시" },
    { label: "공주시 ", value: "공주시 ", main: "충남시" },
    { label: "보령시", value: "보령시", main: "충남시" },
    { label: "아산시", value: "아산시", main: "충남시" },
    { label: "서산시", value: "서산시", main: "충남시" },
    { label: "논산시", value: "논산시", main: "충남시" },
    { label: "계룡시", value: "계룡시", main: "충남시" },
    { label: "당진시", value: "당진시", main: "충남시" },
    { label: "금산군", value: "금산군", main: "충남시" },
    { label: "부여군", value: "부여군", main: "충남시" },
    { label: "서천군", value: "서천군", main: "충남시" },
    { label: "청양군", value: "청양군", main: "충남시" },
    { label: "홍성군", value: "홍성군", main: "충남시" },
    { label: "예산군", value: "예산군", main: "충남시" },
    { label: "태안군", value: "태안군", main: "충남시" },

    { label: "전체", value: "전체", main: "전북시" },
    { label: "전주시", value: "전주시", main: "전북시" },
    { label: "군산시", value: "군산시", main: "전북시" },
    { label: "익산시", value: "익산시", main: "전북시" },
    { label: "정읍시", value: "정읍시", main: "전북시" },
    { label: "남원시", value: "남원시", main: "전북시" },
    { label: "김제시", value: "김제시", main: "전북시" },
    { label: "완주군", value: "완주군", main: "전북시" },
    { label: "진안군", value: "진안군", main: "전북시" },
    { label: "무주군", value: "무주군", main: "전북시" },
    { label: "장수군", value: "장수군", main: "전북시" },
    { label: "임실군", value: "임실군", main: "전북시" },
    { label: "순창군", value: "순창군", main: "전북시" },
    { label: "고창군", value: "고창군", main: "전북시" },
    { label: "부안군", value: "부안군", main: "전북시" },

    { label: "전체", value: "전체", main: "전남시" },
    { label: "목포시", value: "목포시", main: "전남시" },
    { label: "여수시", value: "여수시", main: "전남시" },
    { label: "순천시", value: "순천시", main: "전남시" },
    { label: "나주시", value: "나주시", main: "전남시" },
    { label: "광양시", value: "광양시", main: "전남시" },
    { label: "담양군", value: "담양군", main: "전남시" },
    { label: "곡성군", value: "곡성군", main: "전남시" },
    { label: "구례군", value: "구례군", main: "전남시" },
    { label: "고흥군", value: "고흥군", main: "전남시" },
    { label: "보성군", value: "보성군", main: "전남시" },
    { label: "화순군", value: "화순군", main: "전남시" },
    { label: "장흥군", value: "장흥군", main: "전남시" },
    { label: "강진군", value: "강진군", main: "전남시" },
    { label: "해남군", value: "해남군", main: "전남시" },
    { label: "영암군", value: "영암군", main: "전남시" },
    { label: "무안군", value: "무안군", main: "전남시" },
    { label: "함평군", value: "함평군", main: "전남시" },
    { label: "영광군", value: "영광군", main: "전남시" },
    { label: "장성군", value: "장성군", main: "전남시" },
    { label: "완도군", value: "완도군", main: "전남시" },
    { label: "진도군", value: "진도군", main: "전남시" },
    { label: "신안군", value: "신안군", main: "전남시" },

    { label: "전체", value: "전체", main: "경북시" },
    { label: "포항시", value: "포항시", main: "경북시" },
    { label: "경주시", value: "경주시", main: "경북시" },
    { label: "김천시", value: "김천시", main: "경북시" },
    { label: "안동시", value: "안동시", main: "경북시" },
    { label: "구미시", value: "구미시", main: "경북시" },
    { label: "영주시", value: "영주시", main: "경북시" },
    { label: "영천시", value: "영천시", main: "경북시" },
    { label: "상주시", value: "상주시", main: "경북시" },
    { label: "문경시", value: "문경시", main: "경북시" },
    { label: "경산시", value: "경산시", main: "경북시" },
    { label: "군위군", value: "군위군", main: "경북시" },
    { label: "의성군", value: "의성군", main: "경북시" },
    { label: "청송군", value: "청송군", main: "경북시" },
    { label: "영양군", value: "영양군", main: "경북시" },
    { label: "영덕군", value: "영덕군", main: "경북시" },
    { label: "청도군", value: "청도군", main: "경북시" },
    { label: "고령군", value: "고령군", main: "경북시" },
    { label: "성주군", value: "성주군", main: "경북시" },
    { label: "칠곡군", value: "칠곡군", main: "경북시" },
    { label: "예천군", value: "예천군", main: "경북시" },
    { label: "봉화군", value: "봉화군", main: "경북시" },
    { label: "울진군", value: "울진군", main: "경북시" },
    { label: "울릉군", value: "울릉군", main: "경북시" },

    { label: "전체", value: "전체", main: "경남시" },
    { label: "창원시", value: "창원시", main: "경남시" },
    { label: "진주시", value: "진주시", main: "경남시" },
    { label: "통영시", value: "통영시", main: "경남시" },
    { label: "사천시", value: "사천시", main: "경남시" },
    { label: "김해시", value: "김해시", main: "경남시" },
    { label: "밀양시", value: "밀양시", main: "경남시" },
    { label: "거제시", value: "거제시", main: "경남시" },
    { label: "양산시", value: "양산시", main: "경남시" },
    { label: "의령군", value: "의령군", main: "경남시" },
    { label: "함안군", value: "함안군", main: "경남시" },
    { label: "창녕군", value: "창녕군", main: "경남시" },
    { label: "고성군", value: "고성군", main: "경남시" },
    { label: "남해군", value: "남해군", main: "경남시" },
    { label: "하동군", value: "하동군", main: "경남시" },
    { label: "산청군", value: "산청군", main: "경남시" },
    { label: "함양군", value: "함양군", main: "경남시" },
    { label: "거창군", value: "거창군", main: "경남시" },
    { label: "합천군", value: "합천군", main: "경남시" },

    { label: "전체", value: "전체", main: "제주시" },
    { label: "제주시", value: "제주시", main: "제주시" },
    { label: "서귀포시", value: "서귀포시", main: "제주시" },

  ];

  const cityselect = [
    { value: "서울시", label: "서울시" },
    { value: "인천시", label: "인천시" },
    { value: "경기도", label: "경기도" },
    { value: "부산시", label: "부산시" },
    { value: "대구시", label: "대구시" },
    { value: "광주시", label: "광주시" },
    { value: "대전시", label: "대전시" },
    { value: "울산시", label: "울산시" },
    { value: "세종시", label: "세종시" },
    { value: "강원도", label: "강원도" },
    { value: "충북시", label: "충북시" },
    { value: "충남시", label: "충남시" },
    // { value: "신협", label: "신협" },
    { value: "전북시", label: "전북시" },
    // { value: "수협", label: "수협" },
    { value: "전남시", label: "전남시" },
    { value: "경북시", label: "경북시" },
    { value: "경남시", label: "경남시" },
    { value: "제주시", label: "제주시" },
  ];

  const handleInputChangeMainTop = (index: number, event: any, inputName: string) => {
    const values = [...mainTop];
    if (inputName === "title") {
      values[index].title = event.target.value;
    }
    if (inputName === "detail") {
      values[index].detail = event.target.value;
    }
    if (inputName === "start_date") {
      values[index].start_date = moment(event).format("YYYY-MM-DD");
    }
    if (inputName === "end_date") {
      values[index].end_date = moment(event).format("YYYY-MM-DD");
    }
    if (inputName === "deadline") {
      values[index].deadline = event.target.value;
    }
    if (inputName === "city") {
      values[index].city = event.value;
    }
    if (inputName === "District") {
      values[index].district = event.value;
    }
    if (inputName === "image") {
      values[index].image = event.target.value;
    }
    if (inputName === "link") {
      values[index].link = event.target.value;
    }
    setMainTop(values);
  };

  const handleInputChangeImage = (index: number, file_url: File, inputName: string) => {
    if (file_url) {
      let formData = new FormData();
      formData.append('image', file_url);
      ApiPost("event/spoweekImage", formData)
        .then((res: any) => {
          const values = [...mainTop];
          if (inputName === "file") {
            values[index].image = res.url;
          }
          setMainTop(values);
        })
    }
  };

  const handleAddMainTopFields = () => {
    const values = [...mainTop];
    values.push({
      id: "",
      title: "",
      detail: "",
      start_date: "",
      end_date: "",
      deadline: "",
      city: "",
      district: "",
      image: "",
      link: "",
    });
    setMainTop(values);
  };

  const handleRemoveMainTopFields = (id: any, index: any) => {
    ApiDelete(`general/deleteMainTop/${id}`)
      .then((res: any) => {
        getData()
      })
    if (mainTop.length > 1) {
      const values = [...mainTop];
      values.splice(index, 1);
      setMainTop(values);
    }

  };

  const getData = () => {
    ApiGet(`general/getAllMainTop`)
      .then((res: any) => {
        if (res.data.mainTop.length > 0) {
          setMainTop(res.data.mainTop)
        }
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const Save = () => {
    ApiPost(`general/createMainTop`, {
      main_top: mainTop.map((data: any) => {
        return {
          // ...data,
          id: data.id,
          title: data?.title,
          detail: data.detail,
          start_date: data.start_date,
          end_date: data.end_date,
          deadline: data.deadline,
          city: data.city,
          district: data.district,
          image: data.image,
          link: data?.link
        }
      })
    })
      .then((res: any) => {
        setIsSaveBanner(true)
      })
  }

  const attechImage = (id: any) => {
    document.getElementById(id)?.click();
  };

  const DeleteImg = (index: any) => {
    if (mainTop.length > 0) {
      const values = [...mainTop];
      values[index].image = ""
      setMainTop(values);
    }

  }

  const customStyles = {
    option: (provided: any, state: { isSelected: any; }) => ({
      ...provided,
      color: '#1C1C1C',
      // paddingTop: 20,
      // paddingBottom: 30,
      paddingLeft: 20,
      paddingRight: 20,
      padding: 0,
      paddingTop: 10,
      paddingBottom: 10,
      width: 'auto',
      fontSize: 12,
      backgroundColor: '#fff',
      cursor: 'pointer',

    }),
    // menu: () => ({
    //   border: 'none',
    //   borderRadius: 6,
    //   backgroundColor: '#fff',
    //   boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.1)',
    //   maxHeight: 200,
    //   height: '100%',
    //   overflow: 'auto',

    // }),
    menuList: () => ({
      border: '1px solid #CACACA',
      borderRadius: 6,
      backgroundColor: '#fff',
      boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.1)',
      paddingTop: 20,
      paddingBottom: 20,
      maxHeight: 200,
      height: '100%',
      overflow: 'auto',
    }),

  }

  const selectOption = (label: string, dropDownName: string) => {
    let list: any = []

    if (dropDownName === "city") {
      list = cityselect
    }
    if (dropDownName === "District") {
      list = districtselect
    }

    let findData = list.find((data: any) => data?.value === label)
    // console.log("findData", findData);

    let dataObj = undefined

    if (findData?.value) {
      dataObj = {
        label: findData?.label,
        value: findData?.value,
      }
    }
    { console.log("dataObj", dataObj) }
    return dataObj;


  }

  return (
    <>

      <div className="register-event-page">
        <div className="register-event-page-inner">
          <div className="page-title-btn">
            <div className="header-page">
              <h3>메인 설정</h3>
            </div>
            <div className="edit-back-btn ml-auto">
              <Buttons
                type=""
                ButtonStyle="saveBtn"
                onClick={Save}>
                저장
              </Buttons>
            </div>
          </div>

          <div className="custom-full-table">

            {/* ====== Start Select sports========== */}

            <section className="mb-0">
              <div className="section-row">
                <div className="table-header-title">
                  <div className="form-title-row">
                    <h3>상단 배너</h3>
                  </div>
                  {mainTop.map((input: any, index: number) => (
                    <div className="repeatable-row">


                      <div key={index} >

                        <div className="single-form-row">
                          <div className="table-full-row">
                            <div className="table-custom-full-row">
                              <div className="table-custom-label">
                                <label>타이틀</label>
                              </div>
                              <div className="table-custom-result">
                                <div className="input-custom">
                                  <input
                                    className="border-less-input"
                                    type="text"
                                    placeholder="타이틀 입력(40자 미만)"
                                    name="title"
                                    value={input.title}
                                    onChange={(event) => {
                                      handleInputChangeMainTop(index, event, "title");
                                    }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="single-form-row">
                          <div className="table-full-row">
                            <div className="table-custom-full-row">
                              <div className="table-custom-label">
                                <label>상세 내용</label>
                              </div>
                              <div className="table-custom-result">
                                <div className="input-custom">
                                  <input
                                    className="border-less-input"
                                    type="text"
                                    placeholder="상세 내용 입력(100자 미만)"
                                    name="detail"
                                    value={input.detail}
                                    autoComplete="off"
                                    onChange={(event) => {
                                      handleInputChangeMainTop(index, event, "detail");
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="single-form-row">
                          <div className="double-row">
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>시작 일시</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="input-custom">
                                    <DatePicker
                                      id="startDate"
                                      name="start_date"
                                      value={input.start_date}
                                      autoComplete="off"
                                      onChange={(startDate: any) => { handleInputChangeMainTop(index, startDate, "start_date"); }}
                                      dateFormat="yyyy.MM.dd"
                                      placeholderText="YYYY.MM.DD"
                                      className="border-less-input"
                                      locale="ko"
                                    ></DatePicker>

                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>종료 일시</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="input-custom">
                                    <DatePicker
                                      id="endDate"
                                      name="end_date"
                                      // selected={registerer.end_date}
                                      value={input.end_date}
                                      autoComplete="off"
                                      onChange={(endtDate: any) => { handleInputChangeMainTop(index, endtDate, "end_date"); }}
                                      dateFormat="yyyy.MM.dd"
                                      placeholderText="YYYY.MM.DD"
                                      className="border-less-input"
                                      locale="ko"
                                    ></DatePicker>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="single-form-row">
                          <div className="double-row">
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>마감 일시</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="input-custom">
                                    <input
                                      className="border-less-input pm-input-firstletter-bold"
                                      type="text"
                                      placeholder="D - DD"
                                      name="deadline"
                                      value={input.deadline}
                                      autoComplete="off"
                                      onChange={(event) => {
                                        handleInputChangeMainTop(index, event, "deadline");
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>장소(시/구)</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="add-city-row">
                                    <div className="location-city position-relative">
                                      <Select
                                        id="district"
                                        styles={customStyles}
                                        className="minimal"
                                        name="District"
                                        options={cityselect}
                                        placeholder="시"
                                        value={selectOption(input?.city, "city")}
                                        onChange={(event) => {
                                          handleInputChangeMainTop(index, event, "city");

                                          setdistrictselect(districtselect.filter(x => x.main === event?.value))

                                        }}
                                      />
                                      {/* <img src="../../img/12345.png" /> */}
                                    </div>

                                    <div className="location-city position-relative">


                                      <Select
                                        id="city"
                                        className="minimal"
                                        styles={customStyles}
                                        name="recruitment"
                                        options={districtSelect}
                                        placeholder="구"
                                        value={selectOption(input?.district, "District")}
                                        onChange={(event: any) => {
                                          handleInputChangeMainTop(index, event, "District");
                                        }}
                                      />
                                      {/* <img src="../../img/12345.png" /> */}
                                    </div>

                                    {/* <select
                                    className="CitySelect Rel-select"
                                    name="city"

                                    value={input.city}
                                    onChange={(event) => {
                                      handleInputChangeMainTop(index, event, "city");
                                    }}
                                  >
                                    <option> 시/도 </option>
                                    {cityselect.map(({ value, label }) =>
                                      <option className="redText" value={value} >{label}</option>
                                    )}
                                  </select> */}

                                    {/* <select
                                    className="DistrictSelect Rel-select"
                                    name="District"
                                    value={input.district}
                                    onChange={(event) => { handleInputChangeMainTop(index, event, "District"); }}
                                  >
                                    <option> 구 </option>
                                    {districtselect.map(({ value, label }) =>
                                      <option className="redText" value={value} >{label}</option>
                                    )}
                                  </select> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="single-form-row">
                          <div className="double-row">
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>이벤트 이미지</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="input-custom position-relative">
                                    <input
                                      className="border-less-input"
                                      id={`choose-file${index}`}
                                      type="file"
                                      hidden
                                      src={input.image}
                                      onChange={(e: any) => {
                                        handleInputChangeImage(index, e.target.files[0], "file");
                                      }}
                                      alt="img"
                                      accept="*"
                                    />
                                    <div>
                                      <div className={input.image ? "image-name-slice" : "placeholder-color"}>{input.image ? (input.image.split("/")[input.image.split("/").length - 1]).split("?")[0] : '이벤트 이미지 첨부(1장 첨부 가능)'}</div>
                                    </div>
                                    <div className="attach-imgbtn">
                                      <button className="roboto" onClick={() => { attechImage(`choose-file${index}`) }}>파일첨부</button>
                                    </div>
                                    {input.image &&
                                      <div>
                                        <div className="attach-close-btn">
                                          <img src="../img/close.svg" onClick={() => DeleteImg(index)} />
                                        </div>
                                      </div>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>링크</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="input-custom sliced-inputs">
                                    <input
                                      className="border-less-input"
                                      type="text"
                                      placeholder="링크 입력"
                                      name="link"
                                      autoComplete="off"
                                      value={input.link}
                                      onChange={(event) => {
                                        handleInputChangeMainTop(index, event, "link");
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="final-btn">
                          {
                            mainTop.length > 0 && (
                              <button className="delete" onClick={() => {
                                handleRemoveMainTopFields(input.id, index);
                              }}>삭제하기</button>
                            )
                          }
                          {mainTop.length - 1 === index && (
                            <button className="add" onClick={() => { handleAddMainTopFields(); }}>추가하기</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ====== End Select sports========== */}

          </div>
        </div>
      </div>
      {isSaveBanner && <SaveBanner show={isSaveBanner} onHide={() => setIsSaveBanner(false)} />}
      {/* {isSaveBanner && <SaveBanner show={isSaveBanner} onHide={() => setIsSaveBanner(false)} SaveBannerModal={Save} />} */}
      {/* <div className="main-title-box">
        <div className="event-heading">
          <div className="main-title-1">
            <h3> 메인 설정 </h3>
          </div>
          <div className="event-setting">
            <button className="setting-btn" onClick={() => {
              Save()
            }}>저장</button>
          </div>
        </div>
        <div className="setting-details">
          <p> 상단 배너 </p>
        </div>
        {
          mainTop.map((input: any, index: number) =>
          (
            <div key={index} >

              <div className="setting-label-box">
                <div className="setting-box">
                  <p> 타이틀 </p>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="타이틀 입력(40자 미만)"
                    name="title"
                    value={input.title}
                    onChange={(event) => {
                      handleInputChangeMainTop(index, event, "title");
                    }} />
                </div>
              </div>
              <div className="setting-label-box">
                <div className="setting-box">
                  <p> 상세 내용 </p>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="상세 내용 입력(100자 미만)"
                    name="detail"
                    value={input.detail}
                    onChange={(event) => {
                      handleInputChangeMainTop(index, event, "detail");
                    }}
                  />
                </div>
              </div>
              <div className="main-div">
                <div className="setting-label-box">
                  <div className="setting-box">
                    <p> 시작 일시 </p>
                  </div>
                  <div className="input-box-1">
                    <DatePicker
                      id="startDate"
                      name="start_date"
                      value={input.start_date}
                      onChange={(startDate: any) => { handleInputChangeMainTop(index, startDate, "start_date"); }}
                      dateFormat="yyyy.MM.dd"
                      placeholderText="YYYY.MM.DD"
                      className="input-date-box"
                      locale="ko"
                    ></DatePicker>
                  </div>
                  <div className="setting-box">
                    <p> 종료 일시 </p>
                  </div>
                  <div className="input-box-1">
                    <DatePicker
                      id="endDate"
                      name="end_date"
                      // selected={registerer.end_date}
                      value={input.end_date}
                      onChange={(endtDate: any) => { handleInputChangeMainTop(index, endtDate, "end_date"); }}
                      dateFormat="yyyy.MM.dd"
                      placeholderText="YYYY.MM.DD"
                      className="input-date-box"
                      locale="ko"
                    ></DatePicker>
                  </div>
                </div>
              </div>
              <div className="main-div">
                <div className="setting-label-box">
                  <div className="setting-box">
                    <p> 마감 일시 </p>
                  </div>
                  <div className="input-box-1">
                    <input
                      type="text"
                      placeholder=" D - DD"
                      name="deadline"
                      value={input.deadline}
                      onChange={(event) => {
                        handleInputChangeMainTop(index, event, "deadline");
                      }}
                    />
                  </div>
                  <div className="setting-box">
                    <p> 장소(시/구) </p>
                  </div>
                  <div className="input-box-1">
                    <div className="C-D-selector">
                      <select
                        className="CitySelect Rel-select"
                        name="city"
                       
                        value={input.city}
                        onChange={(event) => {
                          handleInputChangeMainTop(index, event, "city");
                        }}
                      >
                        <option> 시/도 </option>
                        {cityselect.map(({ value, label }) =>
                          <option className="redText" value={value} >{label}</option>
                        )}
                      </select>
                      <select
                        className="DistrictSelect Rel-select"
                        name="District"
                        value={input.district}
                        onChange={(event) => { handleInputChangeMainTop(index, event, "District"); }}
                      >
                        <option> 구 </option>
                        {districtselect.map(({ value, label }) =>
                          <option className="redText" value={value} >{label}</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-div">
                <div className="setting-label-box">
                  <div className="setting-box">
                    <p> 이벤트 이미지 </p>
                  </div>
                  <div className="input-box-1 relative">
                    <input
                      id={`choose-file${index}`}
                      type="file"
                      hidden
                      src={input.image}
                      onChange={(e: any) => {
                        handleInputChangeImage(index, e.target.files[0], "file");
                      }}
                      alt="img"
                      accept="*"
                      className="login-input"
                    />
                    <div>
                      <div className={input.image ? "img-name" : "placeholder-color"}>{input.image ? (input.image.split("/")[input.image.split("/").length - 1]).split("?")[0] : '이벤트 이미지 첨부(1장 첨부 가능)'}</div>
                    </div>
                    <div className="abs">
                      <button onClick={() => { attechImage(`choose-file${index}`) }}>파일첨부</button>

                    </div>
                    {input.image &&
                      <div>
                        <div className="i-box">
                          <img src="../img/close.svg" onClick={() => DeleteImg(index)} />
                        </div>
                      </div>
                    }

                  </div>
                  <div className="setting-box">
                    <p> 링크 </p>
                  </div>
                  <div className="input-box-1 main-top-btn">
                    <input
                      type="text"
                      placeholder="상세 내용 입력(100자 미만)"
                      name="link"
                      autoComplete="off"
                      value={input.link}
                      onChange={(event) => {
                        handleInputChangeMainTop(index, event, "link");
                      }}
                    />
                    <div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="final-btn">
                {
                  mainTop.length > 0 && (
                    <button className="delete" onClick={() => {
                      handleRemoveMainTopFields(input.id, index);
                    }}>삭제하기</button>
                  )
                }
                {mainTop.length - 1 === index && (
                  <button className="add" onClick={() => { handleAddMainTopFields(); }}>추가하기</button>
                )}
              </div>
            </div>
          )
          )
        }

      </div> */}
    </>
  );
};

export default MainTop;
