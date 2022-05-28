import React, { useEffect, useState } from 'react'
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
// import './registerevent.css'
// import AuthStorage from '../../helper/AuthStorage';
import moment from "moment";
import { DynamicControlField } from '../../../helper/Constant';
import NumberInput from '../../../component/NumberInput/NumberInput';
import { Gender, Participate_Status, Attendance, Vaccination, Covid_Symptoms } from "../../../helper/Constant";
import NumberFormat from 'react-number-format';
// import $ from 'jquery';

// registerLocale("ko", ko);

const DynamicApplication = ({ applicationEmptyFiled, applicationInfo, getDynamicData, keyId, mainIndex }: any) => {
    const gender = Gender;
    const participate_status = Participate_Status;
    const attendance = Attendance;
    const vaccination = Vaccination;
    const covid_symptoms = Covid_Symptoms;

    const [dynamicApplication, setDynamicApplication] = useState(applicationEmptyFiled);
    const [inputFieldDataObj, setInputFieldDataObj] = useState<any>(applicationInfo);
    const [date, setDate] = useState<Date | null>();

    useEffect(() => {
        setDate((inputFieldDataObj?.DateOfBirth == "" || inputFieldDataObj?.DateOfBirth == null ||
            inputFieldDataObj?.DateOfBirth == undefined) ? null : new Date(inputFieldDataObj?.DateOfBirth) || null)
    }, [applicationInfo])

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

    useEffect(() => {
        getDynamicData(inputFieldDataObj, keyId)
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


    return (
        <>
            <div className="custom-full-table">
                <section className="border-bottom-application">
                    <>
                        <div className="section-row">
                            <div className="table-header-title double-row flex-wrap">
                                {/* <div className="form-title-row">
<h3>신청자 정보</h3>
</div> */}
                                {
                                    dynamicApplication.map((x: any, index: number) => {
                                        return (
                                            <div className="repeatable-row" key={index}>
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
                                                                        type={x.control_type}
                                                                        name={x.control_lable_enum}
                                                                        placeholder={x.control_placeholder_ko}
                                                                        value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
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
                                                                        type={x.control_type}
                                                                        name={x.control_lable_enum}
                                                                        placeholder={x.control_placeholder_ko}
                                                                        value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
                                                                        onChange={(e: any) => {
                                                                            handleChange(e)
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* {x.control_type == "number" && ( */}
                                                <div className="table-full-row">
                                                    {(x.control_lable_enum == "MobileNo") && (
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>휴대폰 번호</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <NumberFormat
                                                                        className="border-less-input"
                                                                        placeholder={x.control_placeholder_ko}
                                                                        name={x.control_lable_enum}
                                                                        autoComplete="off"
                                                                        format="###-####-####"
                                                                        value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
                                                                        onValueChange={(values) => {
                                                                            setInputFieldDataObj({ ...inputFieldDataObj, [x.control_lable_enum]: values.value })
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="table-full-row">
                                                        {(x.control_lable_enum == "DateOfBirth") && (
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>생년월일</label>
                                                                </div>
                                                                <div className="table-custom-result">

                                                                    <div className="input-custom">
                                                                        <ReactDatePicker
                                                                            className="border-less-input"
                                                                            onChange={(inputDate: Date | null) => {
                                                                                handleDate(inputDate);
                                                                            }}
                                                                            isClearable
                                                                            dateFormat="yyyy.MM.dd"
                                                                            placeholderText='생년월일 입력'
                                                                            // placeholderText={Languages.en == AuthStorage.getLang() ? x.control_placeholder : x.control_placeholder_ko}
                                                                            // placeholderText={x.control_placeholder_ko}
                                                                            locale="ko"
                                                                            // selected={((applicationInfo?.id == divisionCount && isValue && type == "participants" && participantCount == 0) ? dateDefult : date)}
                                                                            selected={date}
                                                                        />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>



                                                <div className="table-full-row">
                                                    {(x.control_lable_enum == "Gender") && (
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>성별</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="select-custom position-relative selector-set-main">
                                                                    <select
                                                                        className="selector-set-gray minimal form-custom-select"
                                                                        name={x.control_lable_enum}
                                                                        value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
                                                                        onChange={(e: any) => {
                                                                            handleChange(e)
                                                                        }}
                                                                    >
                                                                        <option selected value="">선수출신 참가 제한</option>
                                                                        {genderDropDown.map(({ value, label }) => (
                                                                            <option value={value}>{label}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {(x.control_lable_enum == "group_name") && (
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>그룹 이름</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom">
                                                                        <input
                                                                            className="border-less-input"
                                                                            type={x.control_type}
                                                                            name={x.control_lable_enum}
                                                                            placeholder={x.control_placeholder_ko}
                                                                            value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
                                                                            onChange={(e: any) => {
                                                                                handleChange(e)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="table-full-row">
                                                    {(x.control_lable_enum == "participant_approve_status") && (
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가상태</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="select-custom position-relative selector-set-main">
                                                                    <select
                                                                        className="selector-set-gray minimal form-custom-select"
                                                                        name={x.control_lable_enum}
                                                                        value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
                                                                        onChange={(e: any) => {
                                                                            handleChange(e)
                                                                        }}
                                                                    >
                                                                        <option selected value="">선택</option>
                                                                        {participate_statusDropDown.map(({ value, label }) => (
                                                                            <option value={value}>{label}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="table-full-row">
                                                    {(x.control_lable_enum == "is_Attendance") && (
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>출석확인</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="select-custom position-relative selector-set-main">
                                                                    <select
                                                                        className="selector-set-gray minimal form-custom-select"
                                                                        name={x.control_lable_enum}
                                                                        value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
                                                                        onChange={(e: any) => {
                                                                            handleChange(e)
                                                                        }}
                                                                    >
                                                                        <option selected value="">선택</option>
                                                                        {attendanceDropDown.map(({ value, label }) => (
                                                                            <option value={value}>{label}</option>

                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="table-full-row">
                                                    {(x.control_lable_enum == "vaccination") && (
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>접종</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="select-custom position-relative selector-set-main">
                                                                    <select
                                                                        className="selector-set-gray minimal form-custom-select"
                                                                        name={x.control_lable_enum}
                                                                        value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
                                                                        onChange={(e: any) => {
                                                                            handleChange(e)
                                                                        }}
                                                                    >
                                                                        <option selected value="">선택</option>
                                                                        {vaccinationDropDown.map(({ value, label }) => (
                                                                            <option value={value}>{label}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="table-full-row ">
                                                    {(x.control_lable_enum == "COVID_19_symptoms") && (
                                                        <div className="table-custom-full-row ">
                                                            <div className="table-custom-label border-covid-option">
                                                                <label>코로나 증상유무</label>
                                                            </div>
                                                            <div className="table-custom-result border-covid-option">
                                                                <div className="select-custom position-relative selector-set-main">
                                                                    <select
                                                                        className="selector-set-gray minimal form-custom-select"
                                                                        name={x.control_lable_enum}
                                                                        value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
                                                                        onChange={(e: any) => {
                                                                            handleChange(e)
                                                                        }}
                                                                    >
                                                                        <option selected value="">선택</option>
                                                                        {covid_symptomsDropDown.map(({ value, label }) => (
                                                                            <option value={value}>{label}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="table-full-row">
                                                    {(x.control_lable_enum == "temperature") && (
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>체온</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <input
                                                                        type={x.control_type}
                                                                        className="border-less-input"
                                                                        name={x.control_lable_enum}
                                                                        placeholder={x.control_placeholder_ko}
                                                                        value={inputFieldDataObj[x.control_lable_enum] == null ? "" : inputFieldDataObj[x.control_lable_enum]}
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
                                        )
                                    })}
                            </div>
                        </div>
                    </>
                </section>
            </div>
        </>
    )
}

export default DynamicApplication