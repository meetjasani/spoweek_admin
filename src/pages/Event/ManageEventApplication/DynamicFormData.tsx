import React, { useEffect, useState } from 'react'
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
// import './registerevent.css'
// import AuthStorage from '../../helper/AuthStorage';
import moment from "moment";
import { DynamicControlField } from '../../../helper/Constant';
import NumberInput from '../../../component/NumberInput/NumberInput';
import { Gender, Participate_Status, Attendance, Vaccination, Covid_Symptoms } from "../../../helper/Constant";
import { ApiPost } from '../../../helper/API/ApiData';
import NumberFormat from 'react-number-format';
// import $ from 'jquery';

// registerLocale("ko", ko);

const DynamicFormData = ({ allFiledData, emptyFiled, participateIndex, getDynamicData, keyId, participateInfo }: any) => {
    const gender = Gender;
    const participate_status = Participate_Status;
    const attendance = Attendance;
    const vaccination = Vaccination;
    const covid_symptoms = Covid_Symptoms;

    const [dynamicControlList, setDynamicControlList] = useState(allFiledData);
    const [inputFieldDataObj, setInputFieldDataObj] = useState<any>(participateInfo);
    const [isFemale, setIsFemale] = useState<boolean>(false);
    const [isMale, setIsMale] = useState<boolean>(false);
    const [date, setDate] = useState<Date | null>();

    useEffect(() => {
        setDate((inputFieldDataObj?.DateOfBirth == "" || inputFieldDataObj?.DateOfBirth == null ||
            inputFieldDataObj?.DateOfBirth == undefined) ? null : new Date(inputFieldDataObj?.DateOfBirth) || null)
    }, [participateInfo])

    const genderDropDown = [
        { label: gender.Male, value: "Male" },
        { label: gender.Female, value: "Female" },
    ]
    const participate_statusDropDown = [
        { label: participate_status.Confirmed, value: "Confirmed" },
        { label: participate_status.Waiting, value: "Waiting" },
    ]

    const attendanceDropDown = [
        { label: attendance.Attended, value: "Attended" },
        { label: attendance.Absent, value: "Absent" },
    ]
    const vaccinationDropDown = [
        { label: vaccination.Vaccinated, value: "Vaccinated" },
        { label: vaccination.Unvaccinated, value: "Unvaccinated" },
    ]
    const covid_symptomsDropDown = [
        { label: covid_symptoms.No, value: "No" },
        { label: covid_symptoms.Yes, value: "Yes" },
    ]

    const handleChange = (event: any) => {
        setInputFieldDataObj({ ...inputFieldDataObj, [event.target.name]: event.target.value })
    }

    const attechImage = (keyId: string, index: number) => {
        document.getElementById(`attechImage-${keyId}-${index}`)?.click();
    };

    useEffect(() => {
        getDynamicData(inputFieldDataObj, keyId, participateIndex)
    }, [inputFieldDataObj])

    const handleDate = (inputDate: Date | null) => {
        setDate(inputDate);
        if (!inputDate) {
            setInputFieldDataObj({ ...inputFieldDataObj, DateOfBirth: "" });
        } else {
            setInputFieldDataObj({
                ...inputFieldDataObj,
                DateOfBirth: moment(inputDate).format("YYYY-MM-DD"),
            });
        }
    };


    const handleFileUpload = async (event: any) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0])
        await ApiPost(`event/spoweekImage`, formData)
            .then((res: any) => {
                setInputFieldDataObj({ ...inputFieldDataObj, [event.target.name]: event.target.files[0].name });
            })
            .catch((error) => {
                console.log(error);
            });
    }



    return (
        <section className="border-bottom-application alldividtion-page">
            {/* ====== Start DynamicFormData Info ==========  */}
            <div className="custom-full-table">
                <div className="section-row">
                    <div className="table-header-title  double-row flex-wrap">
                        {
                            dynamicControlList.map((x: any, index: number) => {
                                return (
                                    <>
                                        <div className="repeatable-row">

                                            {(x.control_lable_enum == "Name") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>신청자 이름</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name={x.control_lable_enum}
                                                                    placeholder={x.control_placeholder_ko}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(x.control_lable_enum == "EmailAddress") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>이메일</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name={x.control_lable_enum}
                                                                    placeholder={x.control_placeholder_ko}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}




                                            {(x.control_lable_enum == "MobileNo") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>휴대폰 번호</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                {/* <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name={x.control_lable_enum}
                                                                    placeholder={x.control_placeholder_ko}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                /> */}
                                                                <NumberFormat
                                                                    className="border-less-input"
                                                                    placeholder={x.control_placeholder_ko}
                                                                    name={x.control_lable_enum}
                                                                    autoComplete="off"
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                    maxLength={11}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(x.control_lable_enum == "date") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>생년월일</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="date-and-time-row">
                                                                <div className="select-date">
                                                                    <ReactDatePicker
                                                                        className="custom-full-input"
                                                                        onChange={(inputDate: Date | null) => {
                                                                            handleDate(inputDate);
                                                                        }}
                                                                        isClearable
                                                                        dateFormat="yyyy.MM.dd"
                                                                        // placeholderText={Languages.en == AuthStorage.getLang() ? x.control_placeholder : x.control_placeholder_ko}
                                                                        placeholderText={x.control_placeholder_ko}
                                                                        locale="ko"
                                                                        // selected={((applicationInfo?.id == divisionCount && isValue && type == "participants" && participantCount == 0) ? dateDefult : date)}
                                                                        selected={date}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}




                                            {(x.control_lable_enum == "Gender") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>성별</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom position-relative selector-set-main">
                                                                <select
                                                                    className="selector-set-gray minimal form-custom-select"
                                                                    name={x.control_lable_enum}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                >
                                                                    <option selected>성별 선택</option>
                                                                    {genderDropDown.map(({ value, label }) => (
                                                                        <option value={value}>{label}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(x.control_lable_enum == "Affiliation") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>소속</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name={x.control_lable_enum}
                                                                    placeholder={x.control_placeholder_ko}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}



                                            {(x.control_lable_enum == "Landmark") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>경계표</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name={x.control_lable_enum}
                                                                    placeholder={x.control_placeholder_ko}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(x.control_lable_enum == "Address") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>주소</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name={x.control_lable_enum}
                                                                    placeholder={x.control_placeholder_ko}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(x.control_lable_enum == "File") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>파일</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div onClick={() => attechImage(keyId, participateIndex)}>
                                                                    <input
                                                                        type="text"
                                                                        className="custom-full-input"
                                                                        placeholder={x.control_placeholder_ko}
                                                                        value={inputFieldDataObj.File}
                                                                        autoComplete="off"
                                                                        disabled
                                                                    />
                                                                </div>
                                                                <input
                                                                    className="custom-full-input"
                                                                    id={`attechImage-${keyId}-${participateIndex}`}
                                                                    placeholder={x.control_placeholder_ko}
                                                                    type="file"
                                                                    hidden
                                                                    name={x.control_lable_enum}
                                                                    onChange={(e: any) => handleFileUpload(e)}
                                                                />
                                                                {/* <span className="open-file-btn" onClick={() => attechImage(keyId, participateIndex)}>파일첨부</span> */}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}



                                            {(x.control_lable_enum == "participant_approve_status") && inputFieldDataObj.is_defination_by === true && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>참가상태</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom position-relative selector-set-main">
                                                                <select
                                                                    className="selector-set-gray minimal form-custom-select"
                                                                    name={x.control_lable_enum}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                >
                                                                    <option selected>참가상태 선택</option>
                                                                    {participate_statusDropDown.map(({ value, label }) => (
                                                                        <option value={value}>{label}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(x.control_lable_enum == "is_Attendance") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>출석확인</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom position-relative selector-set-main">
                                                                <select
                                                                    className="selector-set-gray minimal form-custom-select"
                                                                    name={x.control_lable_enum}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                >
                                                                    <option selected>출석확인 선택</option>
                                                                    {attendanceDropDown.map(({ value, label }) => (
                                                                        <option value={value}>{label}</option>

                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}



                                            {(x.control_lable_enum == "vaccination") && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>접종</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom position-relative selector-set-main">
                                                                <select
                                                                    className="selector-set-gray minimal form-custom-select"
                                                                    name={x.control_lable_enum}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                >
                                                                    <option selected>접종 유무 선택</option>
                                                                    {vaccinationDropDown.map(({ value, label }) => (
                                                                        <option value={value}>{label}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(x.control_lable_enum == "COVID_19_symptoms") && (
                                                <div className="table-full-row border-bottom-application">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>코로나 증상유무</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom position-relative selector-set-main">
                                                                <select
                                                                    className="selector-set-gray minimal form-custom-select"
                                                                    name={x.control_lable_enum}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                >
                                                                    <option selected>증상유무 선택</option>
                                                                    {covid_symptomsDropDown.map(({ value, label }) => (
                                                                        <option value={value}>{label}</option>

                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)}




                                            <div className="table-full-row">
                                                {(x.control_lable_enum == "temperature") && (
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>체온</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    type="text"
                                                                    className="border-less-input"
                                                                    name={x.control_lable_enum}
                                                                    placeholder={x.control_placeholder_ko}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    onChange={(e: any) => {
                                                                        handleChange(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DynamicFormData


