import React, { useEffect, useState } from 'react'
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import { DynamicControlField } from '../../../helper/Constant';
// import './registerevent.css'
// import AuthStorage from '../../helper/AuthStorage';
import moment from "moment";
import NumberInput from '../../../component/NumberInput/NumberInput';
// import $ from 'jquery';


registerLocale("ko", ko);
interface Props {
    // onChnage: () => void;
    type: any;
    value: any;
    getDynamicData: (data: any, idx: number, index: any, divisionName: any, amount: any) => void;
    participantCount: any;
    divisionCount: any;
    divisionName: any;
    amount: any,
    applicationInfo?: any
}

const DynamicControl: React.FC<Props> = ({
    type = "participants", value, getDynamicData, participantCount, divisionCount, divisionName, amount, applicationInfo
}) => {

    // const { t } = useTranslation();
    const defaultDynamicControlList = [{
        control_lable: "Name",
        control_placeholder: "Name",
        control_type: "text",
        control_order: 1,
        control_status: "TRUE",
        participant_approve: "Manual",
        awaiter_receipt: "Yes",
        field_status: "Static",
        control_lable_ko: "이름",
        control_placeholder_ko: "이름",
        control_lable_enum: "Name",
    },
    {
        control_lable: "Name",
        control_placeholder: "Name",
        control_type: "date",
        control_order: 1,
        control_status: "TRUE",
        participant_approve: "Manual",
        awaiter_receipt: "Yes",
        field_status: "Static",
        control_lable_ko: "이름",
        control_placeholder_ko: "이름",
        control_lable_enum: "Name",
    },
    {
        control_lable: "Name",
        control_placeholder: "Name",
        control_type: "file",
        control_order: 1,
        control_status: "TRUE",
        participant_approve: "Manual",
        awaiter_receipt: "Yes",
        field_status: "Static",
        control_lable_ko: "이름",
        control_placeholder_ko: "이름",
        control_lable_enum: "Name",
    },
    {
        control_lable: "Name",
        control_placeholder: "Name",
        control_type: "number",
        control_order: 1,
        control_status: "TRUE",
        participant_approve: "Manual",
        awaiter_receipt: "Yes",
        field_status: "Static",
        control_lable_ko: "이름",
        control_placeholder_ko: "이름",
        control_lable_enum: "Name",
    },
    {
        control_lable: "Name",
        control_placeholder: "Name",
        control_type: "email",
        control_order: 1,
        control_status: "TRUE",
        participant_approve: "Manual",
        awaiter_receipt: "Yes",
        field_status: "Static",
        control_lable_ko: "이름",
        control_placeholder_ko: "이름",
        control_lable_enum: "Name",
    }]

    const [dynamicControlList, setDynamicControlList] = useState(defaultDynamicControlList);
    const [inputFieldDataObj, setInputFieldDataObj] = useState<any>({});
    const [isFemale, setIsFemale] = useState<boolean>(false);
    const [date, setDate] = useState<Date | null>();
    const [dateDefult, setDateDefult] = useState<Date | null>();
    const [isMale, setIsMale] = useState<boolean>(false);
    const [fileValue, setFileValue] = useState<any>()
    const [isValue, setIsValue] = useState(false)
    const getIsValue = () => {
        if (participantCount == 0) {
            if (applicationInfo?.registerName != undefined || applicationInfo?.registerName != null) {
                applicationInfo?.registerName ? setFileValue(true) : setFileValue(false)
                if (applicationInfo?.registerName) {
                    if (applicationInfo?.id == divisionCount) {
                        setIsValue(true)
                        setDateDefult((applicationInfo?.DateOfBirth == "" || applicationInfo?.DateOfBirth == null ||
                            applicationInfo?.DateOfBirth == undefined) ? null : new Date(applicationInfo?.DateOfBirth) || null)
                        if (applicationInfo?.Gender == "FEMALE") {
                            setIsFemale(true)
                            setIsMale(false)
                        }
                        if (applicationInfo?.Gender == "MALE") {
                            setIsFemale(false)
                            setIsMale(true)
                        }
                    }
                }
            }
        }
    }

    useEffect(() => {
        getIsValue()
    }, [applicationInfo])


    useEffect(() => {
        setDynamicControlList(value)
    }, [dynamicControlList])


    useEffect(() => {
        getDynamicData(inputFieldDataObj, participantCount, divisionCount, divisionName, amount)
    }, [inputFieldDataObj])

    const handleChange = (event: any) => {
        setIsValue(false)
        setInputFieldDataObj({ ...inputFieldDataObj, [event.target.name]: event.target.value })
    }

    const attechImage = () => {
        setFileValue(false)
        // $("#attechImage").trigger("click");
    };

    const handleDate = (inputDate: Date | null) => {
        setIsValue(false)
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

    const handleChangeGenderInfo = (e: any, name: string) => {
        setIsValue(false)
        if (name === "Female") {
            setInputFieldDataObj({
                ...inputFieldDataObj,
                Gender: "FEMALE"
            })
        } else if (name === "Male") {
            setInputFieldDataObj({
                ...inputFieldDataObj,
                Gender: "MALE"
            })
        }
    }

    const handleFileUpload = (event: any) => {
        let file = event.target.files[0];
        if (file) {
            setInputFieldDataObj({ ...inputFieldDataObj, [event.target.name]: event.target.files[0] });
        }
        setIsValue(false)
    }

    return (
        <div className=''>
            <div className="">
                {
                    dynamicControlList.map((x: any, index: number) => {
                        return (
                            <>
                                {x.field_status == DynamicControlField.static &&
                                    <>
                                        <>
                                            {(x.control_type == "text" || x.control_type == "email") && (
                                                <div className="repeatable-row">
                                                    <div className="single-form-row">
                                                        <div className="double-row">
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        {/* <label>{Languages.en == AuthStorage.getLang() ? x.control_lable : x.control_lable_ko}</label> */}
                                                                        <label>{x.control_lable_ko}</label>
                                                                        <div className="required"></div>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="select-custom position-relative selector-set-main">
                                                                            <input
                                                                                type={x.control_type}
                                                                                // placeholder={Languages.en == AuthStorage.getLang() ? x.control_placeholder : x.control_placeholder_ko}
                                                                                placeholder={x.control_placeholder_ko}
                                                                                className="custom-full-input"
                                                                                name="email"
                                                                                value={""}
                                                                                // name={x.control_lable_enum}
                                                                                // value={inputFieldDataObj[x.control_lable_enum]}
                                                                                onChange={(e: any) => handleChange(e)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </>

                                        <>
                                            {x.control_type == "number" && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            {/* <label>{Languages.en == AuthStorage.getLang() ? x.control_lable : x.control_lable_ko}</label> */}
                                                            <label>{x.control_lable_ko}</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <NumberInput
                                                                    name={x.control_lable_enum}
                                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                                    // placeholder={Languages.en == AuthStorage.getLang() ? x.control_placeholder : x.control_placeholder_ko}
                                                                    placeholder={x.control_placeholder_ko}
                                                                    InputstyleClass="custom-full-input"
                                                                    onChange={(e: any) => handleChange(e)}
                                                                    maxLength={11}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </>

                                        <>
                                            {x.control_type == "date" && (
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            {/* <label>{Languages.en == AuthStorage.getLang() ? x.control_lable : x.control_lable_ko}</label> */}
                                                            <label>{x.control_lable_ko}</label>
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
                                                                        value={inputFieldDataObj[x.control_lable_enum]}
                                                                        locale="ko"
                                                                        // selected={((applicationInfo?.id == divisionCount && isValue && type == "participants" && participantCount == 0) ? dateDefult : date)}
                                                                        selected={date}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </>

                                        <>
                                            {x.control_type == "textarea" && (
                                                <div className="customform-row-box">
                                                    <div className="form-box-control area-search">
                                                        <div className="label-row">
                                                            {/* <label>{Languages.en == AuthStorage.getLang() ? x.control_lable : x.control_lable_ko}</label> */}
                                                            <label>{x.control_lable_ko}</label>
                                                        </div>
                                                        <div className="custom-input position-relative">
                                                            <input
                                                                className="custom-full-input"
                                                                // placeholder={Languages.en == AuthStorage.getLang() ? x.control_placeholder : x.control_placeholder_ko}
                                                                placeholder={x.control_placeholder_ko}
                                                                type="text"
                                                                name="Search_address"
                                                                onChange={(e: any) => handleChange(e)}
                                                                value={((applicationInfo?.id == divisionCount && type == "participants" && participantCount == 0) ? (index == 8 && applicationInfo?.Search_address) : inputFieldDataObj[x.control_lable_enum])}
                                                            />
                                                            <img src="../../img/search-img.svg" className="updown-arrow" />
                                                        </div>
                                                        <div className="custom-input position-relative">
                                                            <input
                                                                className="custom-full-input"
                                                                // placeholder={Languages.en == AuthStorage.getLang() ? x.control_placeholder : x.control_placeholder_ko}
                                                                type="text"
                                                                name="address"
                                                                onChange={(e: any) => handleChange(e)}
                                                                value={((applicationInfo?.id == divisionCount && isValue && type == "participants" && participantCount == 0) ? (index == 8 && applicationInfo?.address) : inputFieldDataObj[x.control_lable_enum])}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                        <>
                                            {x.control_type == "radio" && (
                                                <div className="form-box d-flex justify-content-between">
                                                    <div className="input-label">
                                                        {/* <label>{Languages.en == AuthStorage.getLang() ? x.control_lable : x.control_lable_ko}</label> */}
                                                        <label>{x.control_lable_ko}</label>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="radio-btn-Select">
                                                            <label
                                                                className={
                                                                    isFemale
                                                                        ? "is-agree-checked"
                                                                        :
                                                                        "is-agree"
                                                                }>
                                                                <input
                                                                    type="checkbox"
                                                                    name="registermember"
                                                                    onChange={(e) => {
                                                                        setIsFemale(e.target.checked);
                                                                        setIsMale(false);
                                                                        handleChangeGenderInfo(e, "Female")
                                                                    }}
                                                                    className="checkbox-input"
                                                                    checked={isFemale}
                                                                />
                                                                <p className="checkbox-agree">Female</p>
                                                            </label>
                                                        </div>
                                                        <div className="radio-btn-Select">
                                                            <label
                                                                className={
                                                                    isMale
                                                                        ?
                                                                        "reg-member-checked"
                                                                        :
                                                                        "reg-member"
                                                                }
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    name="registermember"
                                                                    onChange={(e) => {
                                                                        setIsMale(e.target.checked);
                                                                        setIsFemale(false);
                                                                        handleChangeGenderInfo(e, "Male")
                                                                    }}
                                                                    className="checkbox-input"
                                                                    checked={isMale}
                                                                />
                                                                <p>Male</p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                        <>
                                            {x.control_type == "file" && (
                                                <div className="customform-row-box">
                                                    <div className="form-box-control">
                                                        <div className="label-row">
                                                            {/* <label>{Languages.en == AuthStorage.getLang() ? x.control_lable : x.control_lable_ko}</label> */}
                                                            <label>{x.control_lable_ko}</label>
                                                        </div>
                                                        <div className="custom-input position-relative">
                                                            {(applicationInfo?.id == divisionCount && isValue && type == "participants" && participantCount == 0 && fileValue) ?
                                                                (<div onClick={attechImage}>
                                                                    <input
                                                                        type="text"
                                                                        name={x.control_lable_enum}
                                                                        className="custom-full-input"
                                                                        placeholder={x.control_placeholder_ko}
                                                                        // placeholder={Languages.en == AuthStorage.getLang() ? x.control_placeholder : x.control_placeholder_ko}
                                                                        value={applicationInfo?.File?.name}
                                                                        autoComplete="off"
                                                                        disabled
                                                                    />
                                                                </div>)
                                                                :
                                                                (
                                                                    <input
                                                                        className="custom-full-input"
                                                                        id="attechImage"
                                                                        // placeholder={Languages.en == AuthStorage.getLang() ? x.control_placeholder : x.control_placeholder_ko}
                                                                        placeholder={x.control_placeholder_ko}
                                                                        type="file"
                                                                        name={x.control_lable_enum}
                                                                        onChange={(e: any) => handleFileUpload(e)}
                                                                    />
                                                                )
                                                            }
                                                            <span>파일첨부</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    </>
                                }
                                {/* {x.field_status == DynamicControlField.other &&
                                    <>
                                        <div className="form-box">
                                            <div className="label-row">
                                                <label>{Languages.en == AuthStorage.getLang() ? x.control_lable : x.control_lable_ko}</label>
                                            </div>
                                            <div className="custom-input">
                                                <input
                                                    type="text"
                                                    placeholder={Languages.en == AuthStorage.getLang() ? x.control_placeholder : x.control_placeholder_ko}
                                                    className="custom-full-input"
                                                    name={x.control_lable_enum}
                                                    value={inputFieldDataObj[x.control_lable_enum]}
                                                    onChange={(e: any) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                    </>

                                } */}
                            </>
                        )


                    })
                }
            </div>
        </div >
    )
}

export default DynamicControl
