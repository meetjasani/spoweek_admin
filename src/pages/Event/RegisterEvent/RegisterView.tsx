import { useEffect, useState } from "react";
import "./RegisterEvent.css";
import { Recruitment_method, Price_policy, Restriction_on_participation, Recruitment_Division, Sports } from "../../../helper/Constant";
import Buttons from "../../../component/Buttons/Buttons";
import MessageCkEditor from "../../../component/MessageCkEditor";
import { ApiGet } from "../../../helper/API/ApiData";
import moment from "moment";
import { useHistory } from "react-router";
import AuthStorage from "../../../helper/AuthStorage";

interface Registerevent {
    id: string,
    sport_name: string,
    recruitment: string,
    start_date: string,
    start_time: string,
    end_date: string,
    end_time: string,
    price_policy: string,
    bank_name: string,
    account_holder: string,
    ac_number: string,
    participation_athletes: string,
    participation_athletes_remark: string,
    is_temporarily: boolean,
    step_no: number,
    basic_division: [],
    basic_award: [],
    participant_display_control: {},
    event_incharge: {},
    link: string
}

interface Eventdetail {
    event_name: string,
    start_date: string,
    start_time: string,
    end_date: string,
    end_time: string,
    place: string,
    main_address: string,
    deatil_address: string,
    location: string,
    host: string,
    organizer: string,
    sponsor: string,
    is_temporarily: boolean,
    summary: string,
    notes: string,
    image: string,
    region: string,
    step_no: string,
    event_id: string
}

interface Tourinfo {
    event_info_content: string,
    policy: string,
    is_temporarily: boolean,
    step_no: string,
    event_id: string,
    tour_detail: [],
    restaurant_information: [],
    accommodation_information: []
}

const RegisterView = () => {
    // const { id }: any = useParams();
    const history = useHistory()
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id')?.toString() ?? "";

    const recruitment_method = Recruitment_method;
    const price_policy = Price_policy;
    const restriction_on_participation = Restriction_on_participation;
    const recruitment_Division = Recruitment_Division;

    const settingRegisterEvent: Registerevent = {
        id: "",
        sport_name: "",
        recruitment: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        price_policy: "",
        bank_name: "",
        account_holder: "",
        ac_number: "",
        participation_athletes: "",
        participation_athletes_remark: "",
        is_temporarily: false,
        step_no: 2,
        basic_division: [],
        basic_award: [],
        participant_display_control: {},
        event_incharge: {},
        link: ""
    };

    const settingEventdetail: Eventdetail = {
        event_name: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        place: "????????????",
        main_address: "",
        deatil_address: "",
        location: "",
        host: "",
        organizer: "",
        sponsor: "",
        is_temporarily: false,
        summary: "",
        notes: "",
        image: "",
        region: "",
        step_no: "",
        event_id: ""
    }

    const settingTourinfo: Tourinfo = {
        event_info_content: "",
        policy: "",
        is_temporarily: false,
        step_no: "",
        event_id: "",
        tour_detail: [],
        restaurant_information: [],
        accommodation_information: []
    }

    const [basicSettingsData, setBasicSettingsData] = useState<any>(null);
    const [registerEvent, setRegisterEvent] = useState(settingRegisterEvent);
    const [registerEventDetail, setRegisterEventDetail] = useState(settingEventdetail)
    const [registerEventTourinfo, setRegisterEventTourinfo] = useState(settingTourinfo)
    const [data, setData] = useState("");
    const [participantName, setParticipantName] = useState(false);
    const [participantEmail, setParticipantEmail] = useState(false);
    const [participantMobile, setParticipantMobile] = useState(false);
    const [participantDob, setParticipantDob] = useState(false);
    const [participantGender, setParticipantGender] = useState(false);
    const [participantAffiliation, setParticipantAffiliation] = useState(false);
    const [participantAddress, setParticipantAddress] = useState(false);
    const [participantFile, setParticipantFile] = useState(false);
    const [participantAdd, setParticipantAdd] = useState(false);
    const [recruitmentMethod, setRecruitmentMethod] = useState("");
    const [basicSettingID, setBasicSettingID] = useState("");
    const [allParticipantFileds, setAllParticipantFileds] = useState<any>([]);

    const [basicDivision, setBasicDivision] = useState([
        {
            recuitement_division: "",
            recuitement_division_name: "",
            volume_recruitment: "",
            participation_fee: "",
            max_persons: "",
            min_persons: ""
        }
    ]);

    const [basicAward, setBasicAward] = useState([
        {
            award_division: "",
            award_name: "",
            volume_award: ""
        }
    ]);
    const [addOtherInfo, setAddOtherInfo] = useState<any>([])

    const [participantCollectedInfo, setParticipantCollectedInfo] = useState([
        {
            fieldName: ""
        }
    ])
    const [eventIncharge, setEventIncharge] = useState({
        name: "",
        email: "",
        phone_number: "",
        inguiry_channel: ""
    })
    const [tourDetail, setTourDetail] = useState([
        {
            tour_spot_name: "",
            phone_number: "",
            main_address: "",
            detail_address: "",
            introduction: "",
            image: ""
        }
    ]);

    const [restaurantInformation, setRestaurantInformation] = useState([
        {
            restaurant_name: "",
            phone_number: "",
            main_address: "",
            detail_address: "",
            introduction: "",
            image: ""
        }
    ]);

    const [accommodationInformation, setAccommodationInformation] = useState([
        {
            accommodation_name: "",
            phone_number: "",
            main_address: "",
            detail_address: "",
            introduction: "",
            image: ""
        }
    ]);

    const handleChange = (newData: any) => {
        // setData(newData);
        // setRegisterEventTourinfo({ ...registerEventTourinfo, event_info_content: newData })
    };

    // GET Call

    const getRegisterEventByID = () => {
        ApiGet(`event/getEventByID/${id}`)
            .then((res: any) => {
                if (res.data.eventRegistrationStep_1_2) {
                    setBasicSettingID(res.data.eventRegistrationStep_1_2.id)
                    setBasicSettingsData(res.data.eventRegistrationStep_1_2)
                }
                if (res.data.eventRegistrationStep_3) {
                    const data = res.data.eventRegistrationStep_3
                    // setRegisterEventInfoId(data.id)

                    setRegisterEventDetail({
                        ...registerEventDetail,
                        event_name: data.event_name,
                        start_date: moment(data.start_date).format("YYYY.MM.DD"),
                        start_time: moment(data.start_date).format('hh:mm A'),
                        end_date: moment(data.end_date).format("YYYY.MM.DD"),
                        end_time: moment(data.end_date).format('hh:mm A'),
                        place: data.place,
                        main_address: data.region + " " + data.location,
                        summary: data.summary,
                        deatil_address: data.deatil_address,
                        location: data.location,
                        host: data.host,
                        organizer: data.organizer,
                        sponsor: data.sponsor,
                        image: data.image,
                        notes: data.notes,
                        region: data.region
                    })
                    const notesName: any = data?.notes.split('images/')[1]

                    if (notesName) {

                        // setSelectedFileName(`${notesName}`)
                        // setSelectedFileNameStr(notesName)
                    }
                }
                if (res.data.eventRegistrationStep_4) {
                    const data = res.data.eventRegistrationStep_4
                    setRegisterEventTourinfo({
                        ...registerEventTourinfo,
                        event_info_content: data.event_info_content,
                        policy: data.policy,
                    })
                    setData(data.event_info_content)
                    setAccommodationInformation(data.accommodation_information)
                    setRestaurantInformation(data.restaurant_information)
                    setTourDetail(data.tour_detail)
                }
            }).catch((error: any) => {
                console.log("error", error);

            })
    }

    useEffect(() => {
        getRegisterEventByID()
    }, [])

    const setParticipantsInfoTags = (name: string) => {
        let nameArr = name && name.split(',')
        nameArr && nameArr.map((x) => {
            if (x === "Name") {
                setParticipantName(true)
            }
            if (x === "EmailAddress") {
                setParticipantEmail(true)
            }
            if (x === "MobileNo") {
                setParticipantMobile(true)
            }
            if (x === "DateOfBirth") {
                setParticipantDob(true)
            }
            if (x === "Gender") {
                setParticipantGender(true)
            }
            if (x === "Affiliation") {
                setParticipantAffiliation(true)
            }
            if (x === "Address") {
                setParticipantAddress(true)
            }
            if (x === "File") {
                setParticipantFile(true)
            }
        })
    }

    const setParticipantsInfoOtherTags = (name: string) => {
        let nameArr: any = name && name.split(',')
        if (nameArr) {
            const val = nameArr.map((x: any) => {
                return {
                    fieldName: x
                }
            })
            setAddOtherInfo(val)
            setParticipantAdd(true)
        }
    }

    const fnOnChnageRecruitMethod = (name: string) => {
        setRecruitmentMethod(name);
    }

    function numberWithCommas(x: any) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    const [eventinfo, setEventInfo] = useState([])

    useEffect(() => {
        if (basicSettingsData) {
            fnOnChnageRecruitMethod(basicSettingsData.recruitment)
            setRegisterEvent({
                ...registerEvent,
                sport_name: GetSportName(basicSettingsData.sport_name),
                recruitment: basicSettingsData.recruitment,
                start_date: moment(basicSettingsData.start_date).format("YYYY.MM.DD"),
                // start_time: moment(basicSettingsData.start_date).format('hh:mm A'),
                end_date: moment(basicSettingsData.end_date).format("YYYY.MM.DD"),
                // end_time: moment(basicSettingsData.end_date).format('hh:mm A'),
                price_policy: basicSettingsData.price_policy,
                bank_name: basicSettingsData.bank_name,
                account_holder: basicSettingsData.account_holder,
                ac_number: basicSettingsData.ac_number,
                participation_athletes: basicSettingsData.participation_athletes,
                participation_athletes_remark: basicSettingsData.participation_athletes_remark,
            })
            let Basic_DivisionInfo = basicSettingsData.basic_division && basicSettingsData.basic_division.map((data: any) => {
                return {
                    recuitement_division: data.recuitement_division,
                    recuitement_division_name: data.recuitement_division_name,
                    volume_recruitment: data.volume_recruitment,
                    participation_fee: numberWithCommas(data.participation_fee),
                    min_persons: data.min_persons,
                    max_persons: data.max_persons
                }
            })
            setBasicDivision(Basic_DivisionInfo)
            let basicAward = basicSettingsData.basic_award ? basicSettingsData.basic_award.map((data: any) => {
                return {
                    award_division: data.award_division,
                    award_name: data.award_name,
                    volume_award: data.volume_award
                }
            }) : [{
                award_division: "",
                award_name: "",
                volume_award: ""
            }]
            setBasicAward(basicAward)

            if (basicSettingsData?.participant_display_control?.participants_static_field) {
                let participant = basicSettingsData?.participant_display_control?.participants_static_field?.split(",").map((data: any) => {
                    return {
                        fieldName: data
                    }
                })

                setParticipantCollectedInfo(participant)
            }
            // setBasicAward(basicSettingsData?.basic_award)


            setParticipantsInfoTags(basicSettingsData?.participant_display_control?.participants_static_field)
            setParticipantsInfoOtherTags(basicSettingsData?.participant_display_control?.participants_other_field)
            setEventInfo(basicSettingsData?.participant_display_control_information)


            setEventIncharge(basicSettingsData.event_incharge)

        }

    }, [basicSettingsData])


    const GetSportName = (sport_name: any) => {
        // let sport_name_ko = ""   
        switch (sport_name) {
            case "football":
                sport_name = "??????"
                break;
            case "basketball":
                sport_name = "??????"
                break;
            case "baseball":
                sport_name = "??????"
                break;
            case "volleyball":
                sport_name = "??????"
                break;
            case "marathon":
                sport_name = "?????????"
                break;
            case "bike":
                sport_name = "?????????"
                break;
            case "swimming":
                sport_name = "??????"
                break;
            case "golf":
                sport_name = "??????"
                break;
            case "tennis":
                sport_name = "?????????"
                break;
            case "badminton":
                sport_name = "????????????"
                break;
            case "table_Tennis":
                sport_name = "??????"
                break;
            case "bowling":
                sport_name = "??????"
                break;
            case "billiards":
                sport_name = "??????"
                break;
            case "hado":
                sport_name = "??????"
                break;
            case "other":
                sport_name = "????????????"
                break;
            default:
                break;
        }
        return sport_name
    }

    useEffect(() => {

        const val = participantCollectedInfo && participantCollectedInfo.map((x) => {
            if (x.fieldName === "Name") {
                return {
                    fieldName: "??????"
                }
            }
            if (x.fieldName === "EmailAddress") {
                return { fieldName: "????????? ??????" }
            }
            if (x.fieldName === "MobileNo") {
                return { fieldName: "????????? ??????" }
            }
            if (x.fieldName === "DateOfBirth") {
                return { fieldName: "????????????" }
            }
            if (x.fieldName === "Gender") {
                return { fieldName: "??????" }
            }
            if (x.fieldName === "Affiliation") {
                return { fieldName: "??????" }
            }
            if (x.fieldName === "Address") {
                return { fieldName: "??????" }
            }
            if (x.fieldName === "File") {
                return { fieldName: "??????" }
            }
        })

        setAllParticipantFileds([...val, ...addOtherInfo])
    }, [participantCollectedInfo, addOtherInfo])

    const edit = () => {
        history.push(`/event/register-event?id=${basicSettingID}`);
    }

    return (
        <>
            <div className="register-event-page">
                <div className="register-event-page-inner">
                    <div className="page-title-btn">
                        <div className="header-page">
                            <h3>????????? ????????????</h3>
                        </div>
                        <div className="edit-back-btn ml-auto">
                            <Buttons
                                type=""
                                ButtonStyle="BackBtn"
                                onClick={() => { history.push("/event/manage-event") }}
                            >????????????</Buttons>
                            <Buttons
                                type=""
                                ButtonStyle="saveBtn"
                                onClick={edit}>
                                ??????
                            </Buttons>
                        </div>
                    </div>


                    <div className="custom-full-table">

                        {/* ====== Start Select sports========== */}
                        <section>
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>????????? ???????????? ??????</h3>
                                    </div>

                                    <div className="repeatable-row">
                                        <div className="single-form-row">
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>?????? ??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="select-custom">
                                                            <div className="register-view">
                                                                <p className="SpoqaHanSans">{registerEvent.sport_name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ====== End Select sports========== */}


                        {/* ====== Start Recruitment info========== */}
                        <section>
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>?????? ??????</h3>
                                    </div>

                                    <div className="repeatable-row">
                                        <div className="single-form-row">

                                            <div className="double-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>?????? ??????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom">
                                                                <div className="register-view">
                                                                    <p className="SpoqaHanSans">{registerEvent.recruitment === "atSpoweek" ? "?????????????????? ??????" : "???????????? ??????"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {registerEvent.recruitment === Recruitment_method.From_outside &&
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{registerEvent.link}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-form-row">
                                        <div className="double-row">
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>?????? ?????? ??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="select-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEvent.start_date}  {registerEvent.start_time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>?????? ?????? ??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="select-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEvent.end_date}  {registerEvent.end_time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-form-row">
                                        <div className={registerEvent.price_policy === "withFee" ? 'double-row' : ''}>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>?????? ??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{registerEvent.price_policy === "free" ? "??????" : "??????"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {registerEvent.bank_name &&
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>????????? ?????? ??????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{registerEvent.bank_name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            } */}
                                        </div>
                                    </div>

                                    <div className="single-form-row">
                                        <div className="double-row">
                                            {/* {registerEvent.account_holder &&
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>????????? ?????? ?????????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{registerEvent.account_holder}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            } */}
                                            {registerEvent.ac_number &&
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>????????? ?????? ????????????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{registerEvent.ac_number}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="single-form-row">
                                        <div className={registerEvent.participation_athletes === "restricted" ? 'double-row' : ''}>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>???????????? ?????? ??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="select-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEvent.participation_athletes === "notRestricted" ? "????????????" : "????????????"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {registerEvent.participation_athletes_remark &&
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>?????? ???????????? ??????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{registerEvent.participation_athletes_remark}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            } */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                        {/* ====== End Recruitment info========== */}


                        {/* ====== Start Division info========== */}


                        <section>
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>?????? ??????</h3>
                                    </div>
                                    {basicDivision && basicDivision.map((basicDivisionData, index) => (
                                        <div className="repeatable-row">
                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????? ??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="select-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{basicDivisionData?.recuitement_division === "Individual" ? "??????" : "??????"}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????? ??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{basicDivisionData?.recuitement_division_name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="single-form-row">
                                                <div className={basicDivisionData.recuitement_division === recruitment_Division.Group ? 'double-row' : ''}>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????? ??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{basicDivisionData?.volume_recruitment} {basicDivisionData?.volume_recruitment && "???"}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* </div>
                                                    </div> */}
                                                            {/* <div className="table-full-row">
                                                                <div className="table-custom-full-row"> */}
                                                            <div className="table-custom-label">
                                                                <label>?????? - ?????? ?????? ??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{basicDivisionData?.min_persons} ??? - {basicDivisionData?.max_persons} ???</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="single-form-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>?????????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{basicDivisionData?.participation_fee} {basicDivisionData?.participation_fee && "???"}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* ====== End Division info========== */}

                        {/* ====== Start Award info========== */}

                        <section>
                            <div className="section-row">
                                <>
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>?????? ??????</h3>
                                        </div>
                                        {basicAward.map((basicAwardData, index) => (
                                            <div className="repeatable-row">

                                                <div className="single-form-row">
                                                    <div className="double-row">
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>?????? ??????</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom">
                                                                        <div className="register-view">
                                                                            <p className="Roboto">{basicAwardData.award_division}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>?????? ??????</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom">
                                                                        <div className="register-view">
                                                                            <p className="Roboto">{basicAwardData.award_name}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-form-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????? ??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{basicAwardData.volume_award}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                </>

                            </div>
                        </section>
                        {/* ====== End Award info========== */}


                        {/* ====== Start Participant info========== */}

                        <section>
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>????????? ??????</h3>
                                    </div>


                                    {/* <div className="repeatable-row"> */}
                                    <div className="single-form-row">
                                        <div className={allParticipantFileds.length >= 2 ? 'double-row loop-row-add' : 'loop-row-add'}>
                                            {/* <div className="double-row loop-row-add"> */}
                                            {/* {allParticipantFileds && allParticipantFileds.map((data: any, index: number) => ( */}
                                            {eventinfo && eventinfo.map((c: any, index: number) => (

                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>????????? ?????? ??????{index + 1}</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom ">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{c.control_lable_ko}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>????????? ?????? ??????2</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom ">
                                                            <div className="register-view">
                                                                <p className="Roboto">??????</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="single-form-row">
                                        <div className="double-row">
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>????????? ?????? ??????1</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom ">
                                                            <div className="register-view">
                                                                <p className="Roboto">??????</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>????????? ?????? ??????2</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom ">
                                                            <div className="register-view">
                                                                <p className="Roboto">??????</p>
                                                            </div>
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
                                                        <label>????????? ?????? ??????3</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">??????</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>????????? ?????? ??????4</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom ">
                                                            <div className="register-view">
                                                                <p className="Roboto">??????</p>
                                                            </div>
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
                                                        <label>????????? ?????? ??????5</label>
                                                    </div>
                                                    <div className="table-custom-result">

                                                        <div className="input-custom ">
                                                            <div className="register-view">
                                                                <p className="Roboto">??????</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>????????? ?????? ??????6</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom ">
                                                            <div className="register-view">
                                                                <p className="Roboto">??????</p>
                                                            </div>
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
                                                        <label>????????? ?????? ??????7</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom ">
                                                            <div className="register-view">
                                                                <p className="Roboto">??????</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>????????? ?????? ??????8</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom ">
                                                            <div className="register-view">
                                                                <p className="Roboto">??????</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                {/* {participantAdd && addOtherInfo.map((find: any, index: number) => (
                                        <div className="single-form-row">
                                            <div className="double-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>{`????????? ?????? ??????${index + 9}`}</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">??????</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))} */}

                            </div>
                        </section>

                        {/* ====== End Participant info========== */}

                        {/* ====== Start Approving info========== */}
                        <section>
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="repeatable-row">
                                        <div className="single-form-row">
                                            <div className="double-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>????????? ????????????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{basicSettingsData?.participant_display_control?.approve_participants === "Auto" ? "??????" : "??????"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>????????? ??????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{basicSettingsData?.participant_display_control?.awaiter_receipt === "Yes" ? "??????" : "?????? ??? ???"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ====== End Approving info========== */}


                        {/* ====== Start Person in Charge ========== */}
                        <section>
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>????????? ??????</h3>
                                    </div>

                                    <div className="repeatable-row">
                                        <div className="single-form-row">
                                            <div className="double-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>??????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{eventIncharge?.name}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>????????? ??????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{eventIncharge?.email}</p>
                                                                </div>
                                                            </div>
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
                                                        <label>????????????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{eventIncharge?.phone_number}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>????????? ????????????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{eventIncharge?.inguiry_channel}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ====== End Person in Charge ========== */}


                        {/* ====== Start Event detail ========== */}

                        <section>
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>????????? ?????? ??????</h3>
                                    </div>

                                    <div className="repeatable-row">
                                        <div className="single-form-row">
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>????????????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEventDetail.event_name}</p>
                                                            </div>
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
                                                        <label>?????? ??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEventDetail.start_date} {registerEventDetail.start_time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>?????? ??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEventDetail.end_date} {registerEventDetail.end_time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-form-row">
                                        <div className="table-full-row">
                                            <div className="table-custom-full-row">
                                                <div className="table-custom-label">
                                                    <label>??????</label>
                                                </div>
                                                <div className="select-custom pt-0">
                                                    <div className="location-view">
                                                        <p className="Roboto">{registerEventDetail.place === "Online" ? "?????????" : "????????????"}</p>
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
                                                        <label>??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEventDetail.main_address}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>?????? ??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <u><p className="Roboto">{registerEventDetail.deatil_address}</p></u>
                                                            </div>
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
                                                        <label>?????????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEventDetail.location}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEventDetail.host}</p>
                                                            </div>
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
                                                        <label>??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEventDetail.organizer}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>??????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">
                                                            <div className="register-view">
                                                                <p className="Roboto">{registerEventDetail.sponsor}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="single-form-row">
                                        <div className="table-full-row">
                                            <div className="table-custom-full-row">
                                                <div className="table-custom-label">
                                                    <label>????????? ??????</label>
                                                </div>
                                                <div className="table-custom-result">
                                                    <div className="input-custom">
                                                        <div className="register-view">
                                                            <p className="Roboto">{registerEventDetail.summary}</p>
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
                                                        <label>????????? ?????????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom">

                                                            <div className="register-view">
                                                                <u><p className="Roboto">{registerEventDetail?.image?.split('/')[registerEventDetail?.image?.split('/').length - 1]}</p></u>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>?????? ??? ????????????</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom position-relative">
                                                            <div className="register-view">
                                                                <u><p className="Roboto">{registerEventDetail?.notes?.split('/')[registerEventDetail?.notes?.split('/').length - 1]}</p></u>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>


                        {/* ====== End Event detail ========== */}


                        {/* ====== Start Event info detail ========== */}

                        <section className="ck-editor-section">
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>????????? ?????? ??????</h3>
                                    </div>

                                    <div className="editor-section-view">
                                        <MessageCkEditor
                                            onChange={handleChange}
                                            data={data}
                                        />
                                    </div>

                                    <div className="single-form-row">
                                        <div className="table-full-row">
                                            <div className="table-custom-full-row">
                                                <div className="table-custom-label">
                                                    <label>?????? ??? ????????????</label>
                                                </div>
                                                <div className="table-custom-result">
                                                    <div className="input-custom">
                                                        <div className="register-view">
                                                            <p className="Roboto">{registerEventTourinfo?.policy}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ====== End Event info detail ========== */}

                        {/* ====== Start Tour info ========== */}
                        {/* {registerEvent.recruitment === "atSpoweek" && */}
                        <section>
                            {tourDetail.map((tourDetailData, index) => (
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>?????? ??????</h3>
                                        </div>

                                        <div className="repeatable-row">


                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{tourDetailData?.tour_spot_name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{tourDetailData?.phone_number}</p>
                                                                    </div>
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
                                                                <label>??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="SpoqaHanSans">{tourDetailData?.main_address}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????? ??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="SpoqaHanSans">{tourDetailData?.detail_address}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="single-form-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>????????? ??????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{tourDetailData?.introduction}</p>
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
                                                                <label>????????? ?????????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <u><p className="Roboto">{tourDetailData?.image.split('/')[tourDetailData?.image.split('/').length - 1]}</p></u>
                                                                        {/* <u><p className="Roboto">{tourDetailData?.image.split('/')[tourDetailData?.image.split('/').length - 1]}</p></u> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                        {/* } */}
                        {/* ====== End Tour info ========== */}


                        {/* ====== Start Restaurant info ========== */}
                        {/* {registerEvent.recruitment === "atSpoweek" && */}
                        <section>
                            {restaurantInformation.map((restaurantInformationData, index) => (
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>?????? ??????</h3>
                                        </div>
                                        <div className="repeatable-row">


                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{restaurantInformationData?.restaurant_name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{restaurantInformationData?.phone_number}</p>
                                                                    </div>
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
                                                                <label>??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom position-relative">
                                                                    <div className="register-view">
                                                                        <p className="SpoqaHanSans">{restaurantInformationData?.main_address}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????? ??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="SpoqaHanSans">{restaurantInformationData?.detail_address}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="single-form-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>?????? ??????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom ">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{restaurantInformationData?.introduction}</p>
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
                                                                <label>?????? ?????????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom position-relative">
                                                                    <div className="register-view">
                                                                        <u><p className="Roboto">{restaurantInformationData?.image.split('/')[restaurantInformationData?.image.split('/').length - 1]}</p></u>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </section>
                        {/* } */}
                        {/* ====== End Restaurant info ========== */}


                        {/* ====== Start Accommodation Info ========== */}

                        {/* {registerEvent.recruitment === "atSpoweek" && */}
                        { }
                        <section>
                            {accommodationInformation.map((accommodationInformationData, index) => (
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>?????? ??????</h3>
                                        </div>

                                        <div className="repeatable-row">


                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{accommodationInformationData?.accommodation_name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="Roboto">{accommodationInformationData?.phone_number}</p>
                                                                    </div>
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
                                                                <label>??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="SpoqaHanSans">{accommodationInformationData?.main_address}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>?????? ??????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <p className="SpoqaHanSans">{accommodationInformationData?.detail_address}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="single-form-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>?????? ??????</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <div className="register-view">
                                                                    <p className="Roboto">{accommodationInformationData?.introduction}</p>
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
                                                                <label>?????? ?????????</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <div className="register-view">
                                                                        <u><p className="Roboto">{accommodationInformationData?.image.split('/')[accommodationInformationData?.image.split('/').length - 1]}</p></u>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </section>
                        {/* } */}
                        {/* ====== End Accommodation Info ========== */}

                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterView