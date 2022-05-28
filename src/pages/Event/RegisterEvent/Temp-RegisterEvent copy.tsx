import React, { useEffect, useState } from "react";
import "./RegisterEvent.css";
import DatePicker, { registerLocale } from "react-datepicker";
// registerLocale("ko", ko);
import { Sports, Recruitment_method, Price_policy, Restriction_on_participation, Recruitment_Division, Location, Approve_Participants, Awaiter_Receipt, Participant_Info } from "../../../helper/Constant";
import Buttons from "../../../component/Buttons/Buttons";
import { Button } from "react-bootstrap";
import MessageCkEditor from "../../../component/MessageCkEditor";
import { ApiGet, ApiPost, ApiPut } from "../../../helper/API/ApiData";
import moment from "moment";
import { useParams } from "react-router";

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

const RegisterEvent1 = () => {
    // const { id }: any = useParams();
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id')?.toString() ?? "";

    const sports = Sports;
    const recruitment_method = Recruitment_method;
    const price_policy = Price_policy;
    const restriction_on_participation = Restriction_on_participation;
    const recruitment_Division = Recruitment_Division;
    const location = Location;
    const approve_participant = Approve_Participants;
    const awaiter_receipt = Awaiter_Receipt;
    const participant_info = Participant_Info;

    const settingRegisterEvent: Registerevent = {
        id: "",
        sport_name: "",
        recruitment: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        price_policy: "무료",
        bank_name: "",
        account_holder: "",
        ac_number: "",
        participation_athletes: "제한없음",
        participation_athletes_remark: "",
        is_temporarily: false,
        step_no: 2,
        basic_division: [],
        basic_award: [],
        participant_display_control: {},
        event_incharge: {},

    };

    const settingEventdetail: Eventdetail = {
        event_name: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        place: "오프라인",
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
    const [RegEventId, setRegEventId] = useState();
    const [EventInformationId, setEventInformationId] = useState();
    const [selectedImageFile, setSelectedImageFile] = useState<File>()
    const [selectedFile, setSelectedFile] = useState<File>();
    const [imgSrc, setImgSrc] = useState("");
    const [imageName, setImageName] = useState("");
    const [data, setData] = useState("");
    // const [dataObject, setDataObject] = useState<Tourinfo>(settingTourinfo);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [approveYes, setApproveYes] = useState(false);
    const [approveNo, setApproveNo] = useState(false);
    const [awaiterYes, setAwaiterYes] = useState(false);
    const [awaiterNo, setAwaiterNo] = useState(false);
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

    const [BasicSettingID, setBasicSettingID] = useState("");
    const [registerEventInfoId, setRegisterEventInfoId] = useState("")

    const [basicDivision, setBasicDivision] = useState([
        {
            recuitement_division: "개인",
            recuitement_division_name: "",
            volume_recruitment: "",
            Participation_fee: "",
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
    const [participantDisplay, setParticipantDisplay] = useState({
        participants_static_field: "",
        participants_other_field: "",
        approve_participants: "",
        awaiter_receipt: ""
    });

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

    // DropDown

    const sportsDropDown = [
        { label: sports.Football, value: "football" },
        { label: sports.Basketball, value: "basketball" },
        { label: sports.Baseball, value: "baseball" },
        { label: sports.Volley_Ball, value: "volleyball" },
        { label: sports.Marathon, value: "marathon" },
        { label: sports.Bike, value: "bike" },
        { label: sports.Swimming, value: "swimming" },
        { label: sports.Golf, value: "golf" },
        { label: sports.Tennis, value: "tennis" },
        { label: sports.Badminton, value: "badminton" },
        { label: sports.Table_Tennis, value: "table_Tennis" },
        { label: sports.Bowling, value: "bowling" },
        { label: sports.Billiards, value: "billiards" },
        { label: sports.Hado, value: "hado" },
        { label: sports.other, value: "other" },
    ];

    const recruitmentDropDown = [
        { label: recruitment_method.atSpoweek, value: "스포위크에서 모집" },
        { label: recruitment_method.From_outside, value: "외부에서 모집" },
    ]

    const pricepolicyDropDown = [
        { label: price_policy.Free, value: "free" },
        { label: price_policy.With_fee, value: "withFee" },
    ]

    const koreanBank = [
        { value: "국민은행", label: "국민은행" },
        { value: "우리은행", label: "우리은행" },
        { value: "신한은행", label: "신한은행" },
        { value: "하나은행", label: "하나은행" },
        { value: "농협은행", label: "농협은행" },
        { value: "기업은행", label: "기업은행" },
        { value: "케이뱅크", label: "케이뱅크" },
        { value: "새마을금고", label: "새마을금고" },
        { value: "대구은행", label: "대구은행" },
        { value: "부산은행", label: "부산은행" },
        { value: "SC은행", label: "SC은행" },
        { value: "광주은행", label: "광주은행" },
        { value: "신협", label: "신협" },
        { value: "전북은행", label: "전북은행" },
        { value: "수협", label: "수협" },
        { value: "산업은행", label: "산업은행" },
        { value: "제주은행", label: "제주은행" },
        { value: "카카오뱅크", label: "카카오뱅크" },
    ]

    const restrictionDropDown = [
        { label: restriction_on_participation.notRestricted, value: "제한없음" },
        { label: restriction_on_participation.Restricted, value: "제한있음" },
    ]

    const recruitmentDivisionDropDown = [
        { label: recruitment_Division.Individual, value: "개인" },
        { label: recruitment_Division.Group, value: "단체" },
        { label: recruitment_Division.From_outside, value: "외부에서 모집" },
    ]

    const participantInfoDropDown = [
        { label: participant_info.Name, value: "Name" },
        { label: participant_info.EmailAddress, value: "EmailAddress" },
        { label: participant_info.MobileNo, value: "MobileNo" },
        { label: participant_info.DateOfBirth, value: "DateOfBirth" },
        { label: participant_info.Gender, value: "Gender" },
        { label: participant_info.Affiliation, value: "Affiliation" },
        { label: participant_info.Address, value: "Address" },
        { label: participant_info.File, value: "File" },

    ]
    const locationDropDown = [
        { label: location.Offline, value: "Offline" },
        { label: location.Online, value: "Online" },
    ]

    const approveparticipantsDropDown = [
        { label: approve_participant.Auto, value: "Auto" },
        { label: approve_participant.Manual, value: "Manual" },
    ]

    const awaiterreceiptDropDown = [
        { label: awaiter_receipt.Yes, value: "Yes" },
        { label: awaiter_receipt.no, value: "No" },
    ]

    const handleInputChangeSettingRegisterEvent = (event: any) => {
        setRegisterEvent({ ...registerEvent, participation_athletes: event });
    };

    // value Push
    const handleAddRegistererFields = () => {
        const values = [...basicDivision];
        values.push({
            recuitement_division: "",
            recuitement_division_name: "",
            volume_recruitment: "",
            Participation_fee: "",
            // max_min_persons: ""
            min_persons: "",
            max_persons: ""
        });
        setBasicDivision(values);
    };

    const handleInputChangeOtherInfoField = (index: number, event: any) => {

        const values = [...addOtherInfo];
        values[index].fieldName = event.target.value;
        setAddOtherInfo(values);
    };
    const removeOtherInfoField = (index: number) => {
        if (addOtherInfo.length >= 1) {
            const values = [...addOtherInfo];
            values.splice(index, 1);
            setAddOtherInfo(values);
            if (addOtherInfo.length === 1) {
                setParticipantAdd(false)
            }
        }
    };

    const addOtherInfoField = () => {
        const values = [...addOtherInfo];
        values.push({
            fieldName: ""
        });
        setAddOtherInfo(values)
        setParticipantAdd(true);
    }

    const handleAddAwardInfo = () => {
        const values = [...basicAward];
        values.push({
            award_division: "",
            award_name: "",
            volume_award: ""
        });
        setBasicAward(values);
    };

    const handleRemoveAwardInfo = (index: number) => {
        if (basicAward.length > 1) {
            const values = [...basicAward];
            values.splice(index, 1);
            setBasicAward(values);
        }
    };

    const handleAddTourInfo = () => {
        const values = [...tourDetail];
        values.push({
            tour_spot_name: "",
            phone_number: "",
            main_address: "",
            detail_address: "",
            introduction: "",
            image: ""
        });
        setTourDetail(values);
    };
    const handleRemoveTourInfo = (index: number) => {
        if (tourDetail.length > 1) {
            const values = [...tourDetail];
            values.splice(index, 1);
            setTourDetail(values);
        }
    };

    const handleAddRestaurantInfo = () => {
        const values = [...restaurantInformation];
        values.push({
            restaurant_name: "",
            phone_number: "",
            main_address: "",
            detail_address: "",
            introduction: "",
            image: ""
        });
        setRestaurantInformation(values);
    };
    const handleRemoveRestaurantInfo = (index: number) => {
        if (restaurantInformation.length > 1) {
            const values = [...restaurantInformation];
            values.splice(index, 1);
            setRestaurantInformation(values);
        }
    };

    const handleAddaAccommodationInfo = () => {
        const values = [...accommodationInformation];
        values.push({
            accommodation_name: "",
            phone_number: "",
            main_address: "",
            detail_address: "",
            introduction: "",
            image: ""
        });
        setAccommodationInformation(values);
    };
    const handleRemoveAccommodationInfo = (index: number) => {
        if (accommodationInformation.length > 1) {
            const values = [...accommodationInformation];
            values.splice(index, 1);
            setAccommodationInformation(values);
        }
    };

    const handleInputChangeBasicDivision = (index: number, event: any, inputName: string) => {
        const values = [...basicDivision];
        if (inputName === "recuitement_division") {
            values[index].recuitement_division = event.target.value
        }
        if (inputName === "recuitement_division_name") {
            values[index].recuitement_division_name = event.target.value
        }
        if (inputName === "volume_recruitment") {
            values[index].volume_recruitment = event.target.value;
        }
        if (inputName === "Participation_fee") {
            values[index].Participation_fee = event.target.value;
        }
        // if (inputName === "max_min_persons") {
        //     values[index].max_min_persons = event.target.value;
        // }
        if (inputName === "min_persons") {
            values[index].min_persons = event.target.value;
        }
        if (inputName === "max_persons") {
            values[index].max_persons = event.target.value;
        }
        setBasicDivision(values);
    };

    const handleInputChangeBasicAward = (index: number, event: any, inputName: string) => {
        const values = [...basicAward];
        if (inputName === "award_division") {
            values[index].award_division = event.target.value
        }
        if (inputName === "award_name") {
            values[index].award_name = event.target.value
        }
        if (inputName === "volume_award") {
            values[index].volume_award = event.target.value;
        }
        setBasicAward(values);
    };

    const handleInputChangeTourDetail = (index: number, event: any, inputName: string) => {
        const values = [...tourDetail];
        if (inputName === "tour_spot_name") {
            values[index].tour_spot_name = event.target.value
        }
        if (inputName === "phone_number") {
            values[index].phone_number = event.target.value
        }
        if (inputName === "main_address") {
            values[index].main_address = event.target.value;
        }
        if (inputName === "detail_address") {
            values[index].detail_address = event.target.value;
        }
        if (inputName === "introduction") {
            values[index].introduction = event.target.value;
        }

        setTourDetail(values);
    };

    const handleInputChangeRestaurantInformation = (index: number, event: any, inputName: string) => {
        const values = [...restaurantInformation];
        if (inputName === "restaurant_name") {
            values[index].restaurant_name = event.target.value
        }
        if (inputName === "phone_number") {
            values[index].phone_number = event.target.value
        }
        if (inputName === "main_address") {
            values[index].main_address = event.target.value;
        }
        if (inputName === "detail_address") {
            values[index].detail_address = event.target.value;
        }
        if (inputName === "introduction") {
            values[index].introduction = event.target.value;
        }

        setRestaurantInformation(values);
    };

    const handleInputChangeAccommodationInformation = (index: number, event: any, inputName: string) => {
        const values = [...accommodationInformation];
        if (inputName === "accommodation_name") {
            values[index].accommodation_name = event.target.value
        }
        if (inputName === "phone_number") {
            values[index].phone_number = event.target.value
        }
        if (inputName === "main_address") {
            values[index].main_address = event.target.value;
        }
        if (inputName === "detail_address") {
            values[index].detail_address = event.target.value;
        }
        if (inputName === "introduction") {
            values[index].introduction = event.target.value;
        }

        setAccommodationInformation(values);
    };

    const attechImage = () => {
        document.getElementById("attechImage")?.click();
    };

    const attechImageNots = () => {
        document.getElementById("attechImageNots")?.click();
    };
    const sportImage = (id: any) => {
        document.getElementById(id)?.click();
    };

    const restaurantImage = (id: any) => {
        document.getElementById(id)?.click();
    };

    const accommodationImage = (ids: any) => {
        document.getElementById(ids)?.click();
    };

    const onDatePickerClick = (id: string) => {
        document.getElementById(id)?.click();
    };

    const onTimePickerClick = (id: string) => {
        document.getElementById(id)?.click();
    };


    useEffect(() => {
        if (!selectedFile) {
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setImgSrc(objectUrl);
        setImageName(selectedFile.name)

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleInputChangeImageTour = (index: number, file_url: File, inputName: string) => {
        if (file_url) {
            let tourData = new FormData();
            tourData.append('image', file_url);
            ApiPost("event/spoweekImage", tourData)
                .then((res: any) => {
                    const values = [...tourDetail];
                    if (inputName === "file") {
                        values[index].image = res.url;
                    }
                    setTourDetail(values);
                })
        }
    };

    const handleInputChangeImageRestaurant = (index: number, file_urls: File, inputName: string) => {
        if (file_urls) {
            let restaurantData = new FormData();
            restaurantData.append('image', file_urls);
            ApiPost("event/spoweekImage", restaurantData)
                .then((res: any) => {
                    const values = [...restaurantInformation];
                    if (inputName === "file") {
                        values[index].image = res.url;
                    }
                    setRestaurantInformation(values);
                })
        }
    };

    const handleInputChangeImageAcc = (index: number, file_url: File, inputName: string) => {
        if (file_url) {
            let accData = new FormData();
            accData.append('image', file_url);
            ApiPost("event/spoweekImage", accData)
                .then((res: any) => {
                    const values = [...accommodationInformation];
                    if (inputName === "file") {
                        values[index].image = res.url;
                    }
                    setAccommodationInformation(values);
                })
        }
    };

    const handleChange = (newData: any) => {
        setData(newData);
        setRegisterEventTourinfo({ ...registerEventTourinfo, event_info_content: newData })
    };

    const handleChangeBox = (e: any) => {

    }

    const AddParticipantCollectedInfo = (name: string) => {
        const findInfo = participantCollectedInfo.findIndex((data: any) => data?.fieldName === name)
        if (findInfo < 0) {
            setParticipantCollectedInfo([
                ...participantCollectedInfo,
                {
                    fieldName: name
                }
            ])
        } else {
            const values = [...participantCollectedInfo];
            values.splice(findInfo, 1);
            setParticipantCollectedInfo(values);
        }
    }


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
                console.log("error***", error);

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
    useEffect(() => {
        // let a = typeof (basicSettingsData)

        if (basicSettingsData) {
            fnOnChnageRecruitMethod(basicSettingsData.recruitment)
            setRegisterEvent({
                ...registerEvent,
                sport_name: basicSettingsData.sport_name,
                recruitment: basicSettingsData.recruitment,
                start_date: moment(basicSettingsData.start_date).format("YYYY.MM.DD"),
                start_time: moment(basicSettingsData.start_date).format('hh:mm A'),
                end_date: moment(basicSettingsData.end_date).format("YYYY.MM.DD"),
                end_time: moment(basicSettingsData.end_date).format('hh:mm A'),
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
                    Participation_fee: data.Participation_fee,
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

            setEventIncharge({
                // ...eventIncharge,
                name: basicSettingsData.name,
                email: basicSettingsData.email,
                phone_number: basicSettingsData.phone_number,
                inguiry_channel: basicSettingsData.inguiry_channel
            })

        }

    }, [basicSettingsData])


    const Save = () => {

        let approve_participants_val: string
        if (approveYes) {
            approve_participants_val = "Auto"
        } else if (approveNo) {
            approve_participants_val = "Manual"
        } else {
            approve_participants_val = ""
        }

        let awaiter_receipt_val: string
        if (awaiterYes) {
            awaiter_receipt_val = "Yes"
        } else if (awaiterNo) {
            awaiter_receipt_val = "No"
        } else {
            awaiter_receipt_val = ""
        }

        let ArrayParticipantCollectedInfo = participantCollectedInfo?.filter((d) => d.fieldName !== "").map((data) => data.fieldName).join(',')

        const body = {
            sport_name: registerEvent.sport_name,
            recruitment: registerEvent.recruitment,
            start_date: moment(registerEvent.start_date + " " + registerEvent.start_time).format("YYYY-MM-DD HH:mm"),
            end_date: moment(registerEvent.start_date + " " + registerEvent.start_time).format("YYYY-MM-DD HH:mm"),
            price_policy: registerEvent.price_policy,
            bank_name: registerEvent.bank_name,
            account_holder: registerEvent.account_holder,
            ac_number: registerEvent.ac_number,
            participation_athletes: registerEvent.participation_athletes,
            participation_athletes_remark: registerEvent.participation_athletes_remark,
            is_temporarily: false,
            step_no: 2,
            basic_division: basicDivision.map((data: any) => {
                return {
                    recuitement_division: data.recuitement_division,
                    recuitement_division_name: data.recuitement_division_name,
                    volume_recruitment: data.volume_recruitment,
                    Participation_fee: data.Participation_fee,
                    min_persons: data.min_persons,
                    max_persons: data.max_persons
                };
            }),
            basic_award: basicAward,
            participant_display_control: {
                ...participantDisplay,
                participants_static_field: ArrayParticipantCollectedInfo,
                approve_participants: participantDisplay.approve_participants,
                awaiter_receipt: participantDisplay.awaiter_receipt
            },
            event_incharge: eventIncharge
        }

        if (BasicSettingID) {
            ApiPut(`event/editEventBasicSetting/` + BasicSettingID, body)
                .then((res: any) => {
                    setRegEventId(res?.data?.id)
                }).catch((error: any) => {
                    console.log("error", error);

                })
        } else {
            ApiPost(`event/eventBasicSetting`, body)
                .then((res: any) => {
                    setRegEventId(res?.data?.id)
                }).catch((error: any) => {
                    console.log("error", error);
                })
        }


        const [first, rest] = registerEventDetail.main_address.split(/\s+(.*)/);
        const addevent = {

            event_name: registerEventDetail.event_name,
            start_date: moment(registerEventDetail.start_date + " " + registerEventDetail.start_time).format("YYYY-MM-DD HH:mm"),
            end_date: moment(registerEventDetail.end_date + " " + registerEventDetail.end_time).format("YYYY-MM-DD HH:mm"),
            place: registerEventDetail.place,
            // main_address: registerEventDetail.main_address,
            deatil_address: registerEventDetail.deatil_address,
            location: registerEventDetail.location,
            host: registerEventDetail.host,
            organizer: registerEventDetail.organizer,
            sponsor: registerEventDetail.sponsor,
            is_temporarily: false,
            summary: registerEventDetail.summary,
            region: first,
            step_no: 3,
            event_id: RegEventId,
        }
        if (registerEventInfoId) {
            ApiPut("event/editEventInformation/" + registerEventInfoId, addevent)
                .then((res: any) => {
                    saveImage(res.data.id)
                }).catch((error: any) => {
                    console.log("error", error);
                })

        } else {
            if (registerEvent.recruitment === "스포위크에서 모집") {
                ApiPost(`event/addEventInformation`, addevent)
                    .then((res: any) => {
                        saveImage(res.data.id)
                    }).catch((error: any) => {
                        console.log("error", error);
                    })
            }
        }

        const saveImage = (eventInfoId: string) => {

            let formData = new FormData();
            if (selectedFile) {
                formData.append('evnt_info_id', eventInfoId);
                if (selectedImageFile) {
                    formData.append('image', selectedImageFile);
                }
                if (selectedFile) {
                    formData.append('notes', selectedFile);
                }

                ApiPost(`event/eventInformationImageAndFile`, formData)
                    .then((res) => {

                    })
            }
        }
        const addEventtour = {
            event_info_content: registerEventTourinfo?.event_info_content,
            policy: registerEventTourinfo.policy,
            is_temporarily: false,
            step_no: 4,
            event_id: RegEventId,
            tour_detail: tourDetail.map((x: any) => {
                return {
                    tour_spot_name: x.tour_spot_name,
                    phone_number: x.phone_number,
                    main_address: x.main_address,
                    detail_address: x.detail_address,
                    introduction: x.introduction,
                    image: x.image
                };
            }),
            restaurant_information: restaurantInformation.map((r: any) => {
                return {
                    restaurant_name: r.restaurant_name,
                    phone_number: r.phone_number,
                    main_address: r.main_address,
                    detail_address: r.detail_address,
                    introduction: r.introduction,
                    image: r.image
                }
            }),
            accommodation_information: accommodationInformation.map((a: any) => {
                return {
                    accommodation_name: a.accommodation_name,
                    phone_number: a.phone_number,
                    main_address: a.main_address,
                    detail_address: a.detail_address,
                    introduction: a.introduction,
                    image: a.image
                }
            })
        }
        ApiPost(`event/addEventInformationDetail`, addEventtour)
            .then((res: any) => {
                setRegEventId(res?.data?.id)
            }).catch((error: any) => {
                console.log("error", error);

            })

        const success = {
            is_temporarily: true,
            event_id: RegEventId
        }
        ApiPost(`event/eventRegistrationSuccessfully`, success)
            .then((res: any) => {
            }).catch((error: any) => {
                console.log("error", error);
            })
    }

    useEffect(() => {
        setRegisterEvent({ ...registerEvent, recruitment: recruitmentDropDown[0].value });
    }, [])

    useEffect(() => {
        let ArrayParticipantCollectedInfo = participantCollectedInfo.filter((d) => d.fieldName !== "").map((data) => data.fieldName).join(',')
        if (participantCollectedInfo) {
            setParticipantDisplay({
                ...participantDisplay,
                participants_static_field: ArrayParticipantCollectedInfo
            })
        }
    }, [participantCollectedInfo])

    useEffect(() => {
        if (addOtherInfo) {
            let ArrayOtherInfo = addOtherInfo.filter((d: any) => d?.fieldName !== "").map((data: any) => data?.fieldName).join(',')
            setParticipantDisplay({
                ...participantDisplay,
                participants_other_field: ArrayOtherInfo
            })
        }
    }, [addOtherInfo])

    useEffect(() => {
        const [first, rest] = registerEventDetail.main_address.split(/\s+(.*)/);
        setRegisterEventDetail({
            ...registerEventDetail,
            location: rest
        })

    }, [registerEventDetail.main_address])

    return (
        <>
            <div className="registration-event">
                <div className="event-title-row">
                    <div className="event-main-title">
                        <h3>이벤트 등록하기</h3>
                    </div>
                    <div className="edit-back-btn">
                        <Buttons
                            type=""
                            ButtonStyle="BackBtn"
                            onClick={() => { }}
                        >이전으로</Buttons>
                        <Buttons
                            type=""
                            ButtonStyle="saveBtn"
                            onClick={() => { Save() }}>
                            저장
                        </Buttons>
                    </div>
                </div>
                <div className="border"></div>

                <div className="event-details">
                    <p>종목 선택</p>
                </div>

                <div className="single-details-lable">
                    <div className="lable-box">
                        <p>종목 선택</p>
                    </div>

                    <div className="select-box">
                        <div className="details-box1">
                            <select
                                className="selector-set minimal font-box"
                                name="sport"
                                value={registerEvent.sport_name}
                                onChange={(event: any) => {
                                    setRegisterEvent({ ...registerEvent, sport_name: event.target.value });
                                }}
                            >
                                {/* <option disabled selected>축구</option> */}
                                {sportsDropDown.map(({ value, label }) => (
                                    <option value={value}>{label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Recruitment info */}

                <div className="event-details line-info">
                    <div className="border"></div>
                    <p>모집 정보(Recruitment info)</p>
                </div>


                <div className="main-method-box">

                    <div className="single-details-lable ">
                        <div className="lable-box">
                            <p>모집 방법</p>
                        </div>
                        <div className="select-box method-box">
                            <div className="method-box2 ">
                                <select
                                    className="selector-set minimal"
                                    name="recruitments"
                                    value={registerEvent.recruitment}
                                    onChange={(event: any) => {
                                        setRegisterEvent({ ...registerEvent, recruitment: event.target.value });
                                    }}
                                >
                                    {recruitmentDropDown.map(({ value, label }) => (
                                        <option value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="single-details-lable ">
                        <div className="lable-box ">
                            <p>링크(Link)</p>
                        </div>
                        <div className="select-box  link-box">
                            <div className="method-box1">
                                <div className="link-input">
                                    <input
                                        type="text"
                                        name="link"
                                        placeholder="링크 입력(외부입력 시 활성화)"
                                        onChange={(e: any) => {
                                            // setRegisterEvent({ ...registerEvent, name: e.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-method-box">
                    <div className="single-details-lable ">
                        <div className="lable-box">
                            <p>모집 시작 일시</p>
                        </div>
                        <div className="select-box method-box">
                            <div className="method-box1 d-flex">
                                <div className="select-date">
                                    <DatePicker
                                        id="startDate"
                                        name="start_date"
                                        value={registerEvent.start_date}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="날짜선택"
                                        dateFormat="yyyy.MM.dd"
                                        onChange={(e: any) => {
                                            setRegisterEvent({ ...registerEvent, start_date: moment(e).format("YYYY.MM.DD") })
                                        }}
                                    />
                                    <img src="../../img/calneder.svg" alt="" onClick={() => { onDatePickerClick("startDate"); }} />
                                </div>
                                <div className="select-time">
                                    <DatePicker
                                        id="startTime"
                                        name="start_time"
                                        value={registerEvent.start_time}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={60}
                                        timeCaption="Time"
                                        dateFormat="h:mm"
                                        placeholderText="시간선택"
                                        onChange={(e: any) => {
                                            setRegisterEvent({ ...registerEvent, start_time: moment(e).format("hh:mm A") })
                                        }}
                                    />
                                    <img src="../../img/clock.svg" alt="" onClick={() => { onTimePickerClick("startTime"); }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="single-details-lable ">
                        <div className="lable-box ">
                            <p>모집 종료 일시</p>
                        </div>
                        <div className="select-box  link-box">
                            <div className="method-box1 d-flex">
                                <div className="select-date">
                                    <DatePicker
                                        id="endDate"
                                        name="end_date"
                                        value={registerEvent.end_date}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="날짜선택"
                                        dateFormat="yyyy.MM.dd"
                                        onChange={(e: any) => {
                                            setRegisterEvent({ ...registerEvent, end_date: moment(e).format("YYYY.MM.DD") })
                                        }}
                                    />

                                    <img src="../../img/calneder.svg" alt="" onClick={() => { onDatePickerClick("endDate"); }} />
                                </div>
                                <div className="select-time">
                                    <DatePicker
                                        id="endTime"
                                        name="end_time"
                                        value={registerEvent.end_time}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={60}

                                        timeCaption="Time"
                                        dateFormat="h:mm"
                                        placeholderText="시간선택"
                                        onChange={(e: any) => {
                                            setRegisterEvent({ ...registerEvent, end_time: moment(e).format("hh:mm A") })
                                        }}
                                    />
                                    <img src="../../img/clock.svg" alt="" onClick={() => { onTimePickerClick("endTime"); }} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="single-details-lable">
                    <div className="lable-box">
                        <p>가격 정책</p>
                    </div>

                    <div className="select-box">
                        <div className="details-box3">
                            <select
                                className="selector-set minimal"
                                name="policy"
                                value={registerEvent.price_policy}
                                onChange={(event: any) => {
                                    setRegisterEvent({ ...registerEvent, price_policy: event.target.value });
                                }}
                            >

                                {pricepolicyDropDown.map(({ value, label }) => (
                                    <option value={value}>{label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {registerEvent.price_policy === price_policy.With_fee &&
                        <div className="single-detail-lable-restriction">
                            <div className="lable-box ">
                                <p>참가비 입금 은행</p>
                            </div>
                            <div className="select-box  link-box">
                                <div className="details-box3">
                                    <select
                                        className="selector-set minimal"
                                        name="bank"
                                        value={registerEvent.bank_name}
                                        onChange={(event: any) => {
                                            setRegisterEvent({ ...registerEvent, bank_name: event.target.value });
                                        }}
                                    >
                                        <option selected>은행 선택</option>
                                        {koreanBank.map(({ value, label }) => (
                                            <option value={value}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {registerEvent.price_policy === price_policy.With_fee &&
                    <div className="main-method-box">
                        <div className="single-details-lable ">
                            <div className="lable-box">
                                <p>참가비 입금 예금주</p>
                            </div>
                            <div className="select-box method-box">
                                <div className="method-box1 ">
                                    <div className="link-input">
                                        <input
                                            type="text"
                                            name="accountholder"
                                            placeholder="참가비 입금 예금주"
                                            value={registerEvent.account_holder}
                                            onChange={(e: any) => {
                                                setRegisterEvent({ ...registerEvent, account_holder: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single-details-lable ">
                            <div className="lable-box ">
                                <p>참가비 입금 계좌번호</p>
                            </div>
                            <div className="select-box  link-box">
                                <div className="method-box1">
                                    <div className="link-input">
                                        <input
                                            type="text"
                                            name="bankaccount"
                                            placeholder="참가비 입금 계좌번호"
                                            value={registerEvent.ac_number}
                                            onChange={(e: any) => {
                                                setRegisterEvent({ ...registerEvent, ac_number: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="single-details-lable">
                    <div className="lable-box">
                        <p>선수출신 참가 제한</p>
                    </div>

                    <div className="select-box method-box">
                        <div className="details-box1">
                            <select
                                className="selector-set minimal"
                                name="restriction"
                                value={registerEvent.participation_athletes}
                                onChange={(event: any) => {
                                    handleInputChangeSettingRegisterEvent(event.target.value);

                                }}
                            >
                                {restrictionDropDown.map(({ value, label }) => (
                                    <option value={value}>{label}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                    {registerEvent.participation_athletes === restriction_on_participation.Restricted &&
                        <div className="single-detail-lable-restriction">
                            <div className="lable-box ">
                                <p>모집 종료 일시</p>
                            </div>
                            <div className="select-box  link-box">
                                <div className="method-box1">
                                    <div className="link-input">
                                        <input
                                            type="text"
                                            name="Restriction_participation"
                                            placeholder="제한 입력"
                                            value={registerEvent.participation_athletes_remark}
                                            onChange={(e: any) => {
                                                setRegisterEvent({ ...registerEvent, participation_athletes_remark: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {/* Division info */}
                {registerEvent.recruitment === recruitment_method.atSpoweek &&
                    <div className="add-row-main">
                        <div className="event-details line-info">
                            <div className="border"></div>
                            <p>부문 정보(Division info)</p>
                        </div>

                        {basicDivision.map((basicDivisionData, index) => (
                            <div className="add-row-main-content" id="registerer-list">
                                <div className="main-method-box">
                                    <div className="single-details-lable ">
                                        <div className="lable-box">
                                            <p>모집 부문(Division to recruit)</p>
                                        </div>
                                        <div className="select-box method-box">
                                            <div className="method-box2">
                                                <select
                                                    className="selector-set minimal"
                                                    name="recuitementdivision"
                                                    value={basicDivisionData.recuitement_division}
                                                    onChange={(event: any) => {
                                                        handleInputChangeBasicDivision(index, event, "recuitement_division");
                                                    }}
                                                >
                                                    {recruitmentDivisionDropDown.map(({ value, label }) => (
                                                        <option value={value}>{label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-details-lable ">
                                        <div className="lable-box ">
                                            <p>모집 부문</p>
                                        </div>
                                        <div className="select-box  link-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        placeholder="모집 부문"
                                                        value={basicDivisionData.recuitement_division_name}
                                                        onChange={(event: any) => {
                                                            handleInputChangeBasicDivision(index, event, "recuitement_division_name");
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="main-method-box">
                                    <div className="single-details-lable ">
                                        <div className="lable-box">
                                            <p>모집 인원</p>
                                        </div>
                                        <div className="select-box method-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="number"
                                                        placeholder="모집 인원"
                                                        value={basicDivisionData.volume_recruitment}
                                                        onChange={(event: any) => {
                                                            handleInputChangeBasicDivision(index, event, "volume_recruitment");
                                                        }}

                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {/* {registerEvent.recruitment === recruitment_Division.Group && */}
                                    <div className="single-details-lable ">
                                        <div className="lable-box ">
                                            <p>최소 - 최대 참가 인원</p>
                                        </div>
                                        <div className="select-box  link-box">
                                            <div className="method-box1">
                                                <div className="min-max-person-ctn">
                                                    <input
                                                        className="min-persons-input"
                                                        type="text"
                                                        placeholder="00"
                                                        value={basicDivisionData.min_persons}
                                                        onChange={(event: any) => {
                                                            handleInputChangeBasicDivision(index, event, "min_persons");
                                                        }}
                                                        maxLength={2}
                                                    />
                                                    <span>명</span>

                                                    <span className="input-separator">-</span>

                                                    <input
                                                        className="max-persons-input"
                                                        type="text"
                                                        placeholder="00"
                                                        value={basicDivisionData.max_persons}
                                                        onChange={(event: any) => {
                                                            handleInputChangeBasicDivision(index, event, "max_persons");
                                                        }}
                                                    />
                                                    <span>명</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* } */}
                                </div>

                                {basicDivisionData.recuitement_division === recruitment_Division.Group &&
                                    <div className="single-details-lable">
                                        <div className="lable-box">
                                            <p>참가비(Participation fee)</p>
                                        </div>
                                        <div className="select-box">
                                            <div className="details-box4 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        placeholder="참가비 입력"
                                                        value={basicDivisionData.Participation_fee}
                                                        onChange={(event: any) => {
                                                            handleInputChangeBasicDivision(index, event, "Participation_fee");
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="add-btn">
                                    <Buttons
                                        type=""
                                        ButtonStyle="addBtn"
                                        onClick={() => { handleAddRegistererFields(); }}>
                                        추가하기
                                    </Buttons>
                                </div>

                            </div>
                        ))}
                    </div>
                }

                {/* Award info */}
                <div className="add-row-main">
                    <div className="event-details line-info">
                        <div className="border"></div>
                        <p>시상 정보(Award info)</p>
                    </div>
                    {basicAward.map((basicAwardData, index) => (
                        <div className="" id="registerer-list">

                            <div className="main-method-box">
                                <div className="single-details-lable ">
                                    <div className="lable-box">
                                        <p>시상 부문</p>
                                    </div>
                                    <div className="select-box method-box">
                                        <div className="method-box1 ">
                                            <div className="link-input">
                                                <input
                                                    type="text"
                                                    placeholder="시상 부문"
                                                    value={basicAwardData.award_division}
                                                    onChange={(event: any) => {
                                                        handleInputChangeBasicAward(index, event, "award_division");
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="single-details-lable ">
                                    <div className="lable-box ">
                                        <p>시상 명칭(Award name)</p>
                                    </div>
                                    <div className="select-box  link-box">
                                        <div className="method-box1">
                                            <div className="link-input">
                                                <input
                                                    type="text"
                                                    placeholder="시상 명칭"
                                                    value={basicAwardData.award_name}
                                                    onChange={(event: any) => {
                                                        handleInputChangeBasicAward(index, event, "award_name");
                                                    }}
                                                />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="single-details-lable">
                                <div className="lable-box">
                                    <p>시상 수량</p>
                                </div>

                                <div className="select-box">
                                    {/* <div className="details-box"> */}
                                    <div className="details-box2 ">
                                        <div className="link-input">
                                            <input
                                                type="text"
                                                placeholder="시상 수량"
                                                value={basicAwardData.volume_award}
                                                onChange={(event: any) => {
                                                    handleInputChangeBasicAward(index, event, "volume_award");
                                                }}
                                            />
                                        </div>

                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>

                            <div className="add-btn">
                                {
                                    basicAward.length > 1 && (
                                        <div>
                                            <Buttons
                                                type=""
                                                ButtonStyle="deleteBtn"
                                                onClick={() => { handleRemoveAwardInfo(index); }}
                                            >삭제하기</Buttons>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))}
                    <div className="add-btn">
                        <Buttons type=""
                            ButtonStyle="addBtn"
                            onClick={() => { handleAddAwardInfo(); }}
                        >추가하기</Buttons>
                    </div>
                </div>

                {/* Participant info */}
                {registerEvent.recruitment === recruitment_method.atSpoweek &&
                    <div className="add-row-main">
                        <div className="event-details line-info">
                            <div className="border"></div>
                            <p>참가자 정보(Participant info)</p>
                        </div>
                        {/* {participantDisplay.map((participantDisplayData, index) => ( */}
                        <div className="" id="registerer-list">
                            <div className="main-method-box">
                                <div className="single-details-lable ">
                                    <div className="lable-box">
                                        <p>참가자 수집 정보1</p>
                                    </div>
                                    <div className="select-box method-box">
                                        <div className="method-box1 participant-info">
                                            <div className="link-input">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="이름"
                                                // value={participantDisplay.participants_static_field}
                                                // onChange={(e: any) => {
                                                //     setParticipantDisplay({ ...participantDisplay, participants_static_field: e.target.value });
                                                // }}
                                                />

                                            </div>
                                            <input
                                                type="checkbox"
                                                name="registermember"
                                                onChange={(e) => {
                                                    handleChangeBox(e);
                                                    setParticipantName(e.target.checked);
                                                    AddParticipantCollectedInfo(participant_info.Name)
                                                }}
                                                className="checkbox-input"
                                                checked={participantName}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="single-details-lable ">
                                    <div className="lable-box ">
                                        <p>참가자 수집 정보2</p>
                                    </div>
                                    <div className="select-box  link-box">
                                        <div className="method-box1 participant-info">
                                            <div className="link-input">
                                                <input
                                                    type="text"
                                                    name="email_add"
                                                    placeholder="이메일 주소"

                                                />
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="registermember"
                                                onChange={(e) => {
                                                    handleChangeBox(e);
                                                    setParticipantEmail(e.target.checked);
                                                    AddParticipantCollectedInfo(participant_info.EmailAddress)
                                                }}
                                                className="checkbox-input"
                                                checked={participantEmail}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="main-method-box">
                                <div className="single-details-lable ">
                                    <div className="lable-box">
                                        <p>참가자 수집 정보3</p>
                                    </div>
                                    <div className="select-box method-box">
                                        <div className="method-box1 participant-info">
                                            <div className="link-input">
                                                <input type="text" placeholder="휴대폰 번호" />
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="registermember"
                                                onChange={(e) => {
                                                    handleChangeBox(e);
                                                    setParticipantMobile(e.target.checked);
                                                    AddParticipantCollectedInfo(participant_info.MobileNo)
                                                }}
                                                className="checkbox-input"
                                                checked={participantMobile}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="single-details-lable ">
                                    <div className="lable-box ">
                                        <p>참가자 수집 정보4</p>
                                    </div>
                                    <div className="select-box  link-box">
                                        <div className="method-box1 participant-info">
                                            <div className="link-input">
                                                <input type="text" placeholder="생년월일" />
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="registermember"
                                                onChange={(e) => {
                                                    handleChangeBox(e);
                                                    setParticipantDob(e.target.checked);
                                                    AddParticipantCollectedInfo(participant_info.DateOfBirth)
                                                }}
                                                className="checkbox-input"
                                                checked={participantDob}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="main-method-box">
                                <div className="single-details-lable ">
                                    <div className="lable-box">
                                        <p>참가자 수집 정보5</p>
                                    </div>
                                    <div className="select-box method-box">
                                        <div className="method-box1 participant-info">
                                            <div className="link-input">
                                                <input type="text" placeholder="성별" />
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="registermember"
                                                onChange={(e) => {
                                                    handleChangeBox(e);
                                                    setParticipantGender(e.target.checked);
                                                    AddParticipantCollectedInfo(participant_info.Gender)
                                                }}
                                                className="checkbox-input"
                                                checked={participantGender}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="single-details-lable ">
                                    <div className="lable-box ">
                                        <p>참가자 수집 정보6</p>
                                    </div>
                                    <div className="select-box  link-box">
                                        <div className="method-box1 participant-info">
                                            <div className="link-input">
                                                <input type="text" placeholder="소속" />
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="registermember"
                                                onChange={(e) => {
                                                    handleChangeBox(e);
                                                    setParticipantAffiliation(e.target.checked);
                                                    AddParticipantCollectedInfo(participant_info.Affiliation)
                                                }}
                                                className="checkbox-input"
                                                checked={participantAffiliation}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="main-method-box">
                                <div className="single-details-lable ">
                                    <div className="lable-box">
                                        <p>참가자 수집 정보7</p>
                                    </div>
                                    <div className="select-box method-box">
                                        <div className="method-box1 participant-info">
                                            <div className="link-input">
                                                <input type="text" placeholder="주소" />
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="registermember"
                                                onChange={(e) => {
                                                    handleChangeBox(e);
                                                    setParticipantAddress(e.target.checked);
                                                    AddParticipantCollectedInfo(participant_info.Address)
                                                }}
                                                className="checkbox-input"
                                                checked={participantAddress}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="single-details-lable ">
                                    <div className="lable-box ">
                                        <p>참가자 수집 정보8</p>
                                    </div>
                                    <div className="select-box  link-box">
                                        <div className="method-box1 participant-info">
                                            <div className="link-input">
                                                <input type="text" placeholder="파일" />
                                            </div>
                                            {/* <div className="link-input"> */}
                                            <input
                                                type="checkbox"
                                                name="registermember"
                                                onChange={(e) => {
                                                    handleChangeBox(e);
                                                    setParticipantFile(e.target.checked);
                                                    AddParticipantCollectedInfo("파일")
                                                }}

                                                checked={participantFile}
                                            />
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single-details-lable ">
                                <div className="lable-box">
                                    <p>참가자 수집 정보9</p>
                                </div>
                                <input
                                    type="text"
                                    name="otherInfo"
                                    // value={field?.fieldName}
                                    onChange={(e) => {
                                        // handleInputChangeOtherInfoField()
                                    }}
                                    className="add-other add-other-input-basicSettings "
                                    placeholder="기타 추가"
                                />
                                <div className="add-btn participant-del">
                                    <Buttons
                                        type=""
                                        ButtonStyle="deleteBtn"
                                        onClick={() => { }}
                                    >추가하기
                                    </Buttons>
                                </div>
                                <div className="method-box1 participant-info">
                                    <input
                                        type="checkbox"
                                        name="registermember"
                                        onChange={(e) => {
                                            handleChangeBox(e);
                                        }}
                                        className="checkbox-input"

                                    />
                                </div>
                            </div>

                            {participantAdd && addOtherInfo.map((find: any, index: number) => (
                                <div className="single-details-lable ">
                                    <div className="lable-box">
                                        <p>{`참가자 수집 정보${index + 9}`}</p>
                                    </div>
                                    <input
                                        type="text"
                                        name="otherInfo"
                                        value={find?.fieldName}
                                        onChange={(e) => {
                                            handleInputChangeOtherInfoField(index, e)
                                        }}
                                        className="add-other add-other-input-basicSettings "
                                        placeholder="기타 추가"
                                    />
                                    <div className="add-btn participant-del">
                                        <Buttons
                                            type=""
                                            ButtonStyle="deleteBtn"
                                            onClick={() => { removeOtherInfoField(index); }}
                                        >추가하기
                                        </Buttons>
                                    </div>
                                    <div className="method-box1 participant-info">
                                        <input
                                            type="checkbox"
                                            name="registermember"
                                            value={find?.fieldName}
                                            onChange={(e) => {
                                                handleChangeBox(e);
                                                // handleInputChangeOtherInfoField(index, e)
                                            }}
                                            className="checkbox-input"
                                        />
                                    </div>
                                </div>
                            ))
                            }

                            <div className="add-btn">
                                <Buttons type=""
                                    ButtonStyle="addBtn"
                                    onClick={addOtherInfoField}
                                > 추가하기</Buttons>
                            </div>


                        </div>
                        {/* ))} */}
                    </div>
                }
                {registerEvent.recruitment === recruitment_method.atSpoweek &&
                    <div className="main-method-box  main-boxline">
                        <div className="single-details-lable ">
                            <div className="lable-box">
                                <p>참가자 승인방법(Approving participants)</p>
                            </div>
                            <div className="select-box method-box">
                                <div className="method-box2">
                                    <select
                                        className="selector-set minimal"
                                        value={participantDisplay.approve_participants}
                                        onChange={(event: any) => {
                                            setParticipantDisplay({ ...participantDisplay, approve_participants: event.target.value });

                                        }}
                                    >
                                        {approveparticipantsDropDown.map(({ value, label }) => (
                                            <option value={value}>{label}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="single-details-lable ">
                            <div className="lable-box">
                                <p>대기자 접수(Awaiters reception)</p>
                            </div>
                            <div className="select-box method-box">
                                <div className="method-box2">
                                    <select
                                        className="selector-set minimal"
                                        value={participantDisplay.awaiter_receipt}
                                        onChange={(event: any) => {
                                            setParticipantDisplay({ ...participantDisplay, awaiter_receipt: event.target.value });
                                        }}
                                    >
                                        {awaiterreceiptDropDown.map(({ value, label }) => (
                                            <option value={value}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {/* ))} */}

                {/* Person in Charge */}

                <div className="event-details line-info">
                    <div className="border"></div>
                    <p>담당자 정보(Person in Charge)</p>
                </div>
                <div className="main-method-box">
                    <div className="single-details-lable ">
                        <div className="lable-box">
                            <p>이름</p>
                        </div>
                        <div className="select-box method-box">
                            <div className="method-box1 ">
                                <div className="link-input">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="이름"
                                        value={eventIncharge.name}
                                        onChange={(e: any) => {
                                            setEventIncharge({ ...eventIncharge, name: e.target.value });
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="single-details-lable ">
                        <div className="lable-box ">
                            <p>이메일 주소</p>
                        </div>
                        <div className="select-box  link-box">
                            <div className="method-box1 ">
                                <div className="link-input">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="이메일 주소"
                                        value={eventIncharge.email}
                                        onChange={(e: any) => {
                                            setEventIncharge({ ...eventIncharge, email: e.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-method-box">
                    <div className="single-details-lable ">
                        <div className="lable-box">
                            <p>전화번호</p>
                        </div>
                        <div className="select-box method-box">
                            <div className="method-box1 ">
                                <div className="link-input">
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="전화번호"
                                        value={eventIncharge.phone_number}
                                        onChange={(e: any) => {
                                            setEventIncharge({ ...eventIncharge, phone_number: e.target.value });
                                        }}
                                        maxLength={11}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="single-details-lable ">
                        <div className="lable-box ">
                            <p>실시간 문의채널</p>
                        </div>
                        <div className="select-box  link-box">
                            <div className="method-box1 ">
                                <div className="link-input">
                                    <input
                                        type="text"
                                        placeholder="실시간 문의채널"
                                        name="inguiry_channel"
                                        value={eventIncharge.inguiry_channel}
                                        onChange={(e: any) => {
                                            setEventIncharge({ ...eventIncharge, inguiry_channel: e.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event detail */}
                {registerEvent.recruitment === recruitment_method.atSpoweek &&
                    <div>
                        <div className="event-details line-info">
                            <div className="border"></div>
                            <p>이벤트 세부 정보(Event detail)</p>
                        </div>

                        <div className="single-details-lable">
                            <div className="lable-box">
                                <p>이벤트명(Event Name)</p>
                            </div>

                            <div className="select-box">
                                {/* <div className="details-box"> */}
                                <div className="details-box4 ">
                                    <div className="link-input">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="이벤트명"
                                            value={registerEventDetail.event_name}
                                            onChange={(e: any) => {
                                                setRegisterEventDetail({ ...registerEventDetail, event_name: e.target.value });
                                            }}
                                        />
                                    </div>

                                </div>
                                {/* </div> */}
                            </div>
                        </div>

                        <div className="main-method-box">
                            <div className="single-details-lable ">
                                <div className="lable-box">
                                    <p>시작 일시</p>
                                </div>
                                <div className="select-box method-box">
                                    <div className="method-box1 d-flex">
                                        <div className="select-date">
                                            <DatePicker
                                                id="startDate"
                                                name="start_date"
                                                value={registerEventDetail.start_date}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                placeholderText="날짜선택"
                                                dateFormat="yyyy.MM.dd"
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, start_date: moment(e).format("YYYY.MM.DD") })
                                                }}
                                            />

                                            <img src="../../img/calneder.svg" alt="" onClick={() => { onDatePickerClick("startDate"); }} />
                                        </div>
                                        <div className="select-time">
                                            <DatePicker
                                                id="startTime"
                                                name="start_time"
                                                value={registerEventDetail.start_time}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                                placeholderText="시간선택"
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, start_time: moment(e).format("hh:mm A") })
                                                }}
                                            />
                                            <img src="../../img/clock.svg" alt="" onClick={() => { onTimePickerClick("startTime"); }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="single-details-lable ">
                                <div className="lable-box ">
                                    <p>종료 일시</p>
                                </div>
                                <div className="select-box  link-box">
                                    <div className="method-box1 d-flex">
                                        <div className="select-date">
                                            <DatePicker
                                                id="endDate"
                                                name="end_date"
                                                value={registerEventDetail.end_date}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                placeholderText="날짜선택"
                                                dateFormat="yyyy.MM.dd"
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, end_date: moment(e).format("YYYY.MM.DD") })
                                                }}
                                            />
                                            <img src="../../img/calneder.svg" alt="" onClick={() => { onDatePickerClick("endDate"); }} />
                                        </div>
                                        <div className="select-time">
                                            <DatePicker
                                                id="endTime"
                                                name="end_time"
                                                value={registerEventDetail.end_time}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                                placeholderText="시간선택"
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, end_time: moment(e).format("hh:mm A") })
                                                }}
                                            />
                                            <img src="../../img/clock.svg" alt="" onClick={() => { onTimePickerClick("endTime"); }} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="single-details-lable">
                            <div className="lable-box">
                                <p>장소(Location)</p>
                            </div>

                            <div className="select-box">
                                <div className="details-box1">
                                    <select
                                        className="selector-set minimal  font-box"
                                        name="place"
                                        value={registerEventDetail.place}
                                        onChange={(event: any) => {
                                            setRegisterEventDetail({ ...registerEventDetail, place: event.target.value });
                                        }}
                                    >
                                        {locationDropDown.map(({ value, label }) => (
                                            <option value={value}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="main-method-box">
                            <div className="single-details-lable ">
                                <div className="lable-box">
                                    <p>주소(address)</p>
                                </div>
                                <div className="select-box method-box">
                                    <div className="method-box1  search-position">
                                        <div className="link-input">
                                            <input type="text"
                                                placeholder="주소 입력"
                                                name="mainaddress"
                                                value={registerEventDetail.main_address}
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, main_address: e.target.value });
                                                }}
                                            />
                                            <img src="../../img/2345.png" className="searchbar" alt="icon" />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="single-details-lable ">
                                <div className="lable-box ">
                                    <p>상세 주소(detail address)</p>
                                </div>
                                <div className="select-box  link-box">
                                    <div className="method-box1 ">
                                        <div className="link-input">
                                            <input
                                                type="text"
                                                placeholder="상세 주소 입력"
                                                value={registerEventDetail.deatil_address}
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, deatil_address: e.target.value });
                                                }}
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="main-method-box">
                            <div className="single-details-lable ">
                                <div className="lable-box">
                                    <p>장소명(Location)</p>
                                </div>
                                <div className="select-box method-box">
                                    <div className="method-box1 ">
                                        <div className="link-input">
                                            <input
                                                type="text"
                                                name="location"
                                                placeholder="장소명 입력"
                                                value={registerEventDetail.location}
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, location: e.target.value });
                                                }}
                                            />

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="single-details-lable ">
                                <div className="lable-box ">
                                    <p>주최(Host)</p>
                                </div>
                                <div className="select-box  link-box">
                                    <div className="method-box1 ">
                                        <div className="link-input">
                                            <input
                                                type="text"
                                                name="host"
                                                placeholder="주최명 입력"
                                                value={registerEventDetail.host}
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, host: e.target.value });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-method-box">
                            <div className="single-details-lable ">
                                <div className="lable-box">
                                    <p>주관(Organizer)</p>
                                </div>
                                <div className="select-box method-box">
                                    <div className="method-box1 ">
                                        <div className="link-input">
                                            <input
                                                type="text"
                                                name="organizer"
                                                placeholder="주관명 입력"
                                                value={registerEventDetail.organizer}
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, organizer: e.target.value });
                                                }}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="single-details-lable ">
                                <div className="lable-box ">
                                    <p>후원(Sponsor)</p>
                                </div>
                                <div className="select-box  link-box">
                                    <div className="method-box1 ">
                                        <div className="link-input">
                                            <input
                                                type="text"
                                                name="sponsor"
                                                placeholder="후원명 입력"
                                                value={registerEventDetail.sponsor}
                                                onChange={(e: any) => {
                                                    setRegisterEventDetail({ ...registerEventDetail, sponsor: e.target.value });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single-details-lable">
                            <div className="lable-box">
                                <p>이벤트 소개(Event summary)</p>
                            </div>

                            <div className="select-box">
                                {/* <div className="details-box"> */}
                                <div className="details-box4 ">
                                    <div className="link-input">
                                        <input
                                            type="text"
                                            name="summary"
                                            placeholder="이벤트 소개 입력"
                                            value={registerEventDetail.summary}
                                            onChange={(e: any) => {
                                                setRegisterEventDetail({ ...registerEventDetail, summary: e.target.value });
                                            }}
                                        />
                                    </div>

                                </div>
                                {/* </div> */}
                            </div>
                        </div>



                        <div className="main-method-box">
                            <div className="single-details-lable ">
                                <div className="lable-box">
                                    <p>이벤트 이미지</p>
                                </div>
                                <div className="select-box method-box">
                                    <div className="method-box1 btn-position">
                                        <div className="link-input">
                                            <input
                                                id="attechImage"
                                                type="file"
                                                placeholder="이벤트 이미지 업로드"
                                                hidden
                                                src={imgSrc}
                                                onChange={(e: any) => {
                                                    if (!e.target.files || e.target.files.length === 0) {
                                                        setSelectedImageFile(undefined);
                                                        return;
                                                    }
                                                    setSelectedImageFile(e.target.files[0]);
                                                }}
                                                alt="img"
                                            />
                                            <div>
                                                {/* <span className={imageName ? "" : "placeholder-color"}>{(input.image.split("/")[input.image.split("/").length - 1]).split("?")[0]}</span> */}
                                            </div>
                                        </div>
                                        <div className="attach-btn">
                                            <Button className="addBtn" onClick={attechImage} children="파일 첨부"></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="single-details-lable ">
                                <div className="lable-box ">
                                    <p>규정 및 유의사항</p>
                                </div>
                                <div className="select-box  link-box">
                                    <div className="method-box1 btn-position">
                                        <div className="link-input">
                                            <input
                                                id="attechImageNots"
                                                type="file"
                                                placeholder="규정 및 유의사항 업로드"
                                                src={imageName}
                                                // value={registerEventDetail.notes}
                                                onChange={(e: any) => {
                                                    if (!e.target.files || e.target.files.length === 0) {
                                                        setSelectedFile(undefined);
                                                        return;
                                                    }
                                                    setSelectedFile(e.target.files[0]);
                                                }}
                                            />

                                        </div>
                                        <div className="attach-btn">
                                            <Button className="addBtn" onClick={attechImageNots} children="파일첨부"></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {/* Event info detail */}

                <div className="event-details line-info">
                    <div className="border"></div>
                    <p>이벤트 상세 정보(Event info detail)</p>
                </div>
                <div className="edit-information">
                    <MessageCkEditor
                        onChange={handleChange}
                        data={data}
                    />
                </div>
                {registerEvent.recruitment === recruitment_method.atSpoweek &&
                    <div className="single-details-lable">
                        <div className="lable-box">
                            <p>취소 및 환불규정(Policy for cancel)</p>
                        </div>

                        <div className="select-box">
                            {/* <div className="details-box"> */}
                            <div className="details-box4 ">
                                <div className="link-input">
                                    <input
                                        type="text"
                                        name="policy"
                                        placeholder="취소 및 환불규정 입력"
                                        value={registerEventTourinfo.policy}
                                        onChange={(e: any) => {
                                            setRegisterEventTourinfo({ ...registerEventTourinfo, policy: e.target.value });
                                        }}
                                    />
                                </div>

                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                }

                {/* Tour info */}
                {registerEvent.recruitment === recruitment_method.atSpoweek &&
                    <div className="add-row-main">
                        <div className="event-details line-info">
                            <div className="border"></div>
                            <p>관광 정보(Tour info)</p>
                        </div>
                        {tourDetail.map((tourDetailData, index) => (
                            <div className="add-row-main-content" id="registerer-list">
                                <div className="main-method-box">
                                    <div className="single-details-lable ">
                                        <div className="lable-box">
                                            <p>상호명</p>
                                        </div>
                                        <div className="select-box method-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        name="tour_spot"
                                                        placeholder="상호명 입력"
                                                        value={tourDetailData.tour_spot_name}
                                                        onChange={(event: any) => {
                                                            handleInputChangeTourDetail(index, event, "tour_spot_name");
                                                        }}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-details-lable ">
                                        <div className="lable-box ">
                                            <p>연락처(phone)</p>
                                        </div>
                                        <div className="select-box  link-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        placeholder="연락처 입력"
                                                        value={tourDetailData.phone_number}
                                                        onChange={(event: any) => {
                                                            handleInputChangeTourDetail(index, event, "phone_number");
                                                        }}
                                                        maxLength={11}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="main-method-box">
                                    <div className="single-details-lable ">
                                        <div className="lable-box">
                                            <p>주소(address)</p>
                                        </div>
                                        <div className="select-box method-box">
                                            <div className="method-box1  search-position">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        name="main_add"
                                                        placeholder="주소 입력"
                                                        value={tourDetailData.main_address}
                                                        onChange={(event: any) => {
                                                            handleInputChangeTourDetail(index, event, "main_address");
                                                        }}
                                                    />
                                                    <img src="../../img/2345.png" className="searchbar" alt="icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-details-lable ">
                                        <div className="lable-box ">
                                            <p>상세 주소(detail_add)</p>
                                        </div>
                                        <div className="select-box  link-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        name="detail_add"
                                                        placeholder="상세 주소 입력"
                                                        value={tourDetailData.detail_address}
                                                        onChange={(event: any) => {
                                                            handleInputChangeTourDetail(index, event, "detail_address");
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="single-details-lable">
                                    <div className="lable-box">
                                        <p>관광지 소개(introduction)</p>
                                    </div>

                                    <div className="select-box">
                                        {/* <div className="details-box"> */}
                                        <div className="details-box4 ">
                                            <div className="link-input">
                                                <input
                                                    type="text"
                                                    placeholder="관광지 소개 입력"
                                                    value={tourDetailData.introduction}
                                                    onChange={(event: any) => {
                                                        handleInputChangeTourDetail(index, event, "introduction");
                                                    }}
                                                />
                                            </div>

                                        </div>
                                        {/* </div> */}
                                    </div>
                                </div>

                                <div className="single-details-lable ">
                                    <div className="lable-box ">
                                        <p>관광지 이미지</p>
                                    </div>
                                    <div className="method-box1 btn-position">
                                        <div className="link-input">
                                            <input
                                                id={`tour-file${index}`}
                                                type="file"
                                                placeholder="관광지 이미지 업로드"
                                                src={tourDetailData.image}
                                                onChange={(e: any) => {
                                                    handleInputChangeImageTour(index, e.target.files[0], "file");
                                                }}
                                                alt="img"
                                            />
                                            <div>
                                                <span>{(tourDetailData.image.split("/")[tourDetailData.image.split("/").length - 1]).split("?")[0]}</span>
                                            </div>
                                        </div>
                                        <div className="attach-btn">
                                            <Buttons
                                                type=""
                                                ButtonStyle="addBtn"
                                                onClick={() => { sportImage(`tour-file${index}`) }} >파일첨부</Buttons>
                                        </div>
                                    </div>
                                </div>

                                <div className="add-btn">
                                    {
                                        tourDetail.length > 1 && (
                                            <div>
                                                <Buttons
                                                    type=""
                                                    ButtonStyle="deleteBtn"
                                                    onClick={() => { handleRemoveTourInfo(index); }}
                                                >삭제하기</Buttons>
                                            </div>
                                        )}
                                </div>
                            </div>
                        ))}
                        <div className="add-btn">
                            <Buttons type=""
                                ButtonStyle="addBtn"
                                onClick={() => { handleAddTourInfo(); }}
                            >추가하기</Buttons>
                        </div>
                    </div>
                }
                {/* Restaurant info */}
                {registerEvent.recruitment === recruitment_method.atSpoweek &&
                    <div>
                        <div className="event-details line-info">
                            <div className="border"></div>
                            <p>맛집 정보(Restaurant info)</p>
                        </div>
                        {restaurantInformation.map((restaurantInformationData, index) => (
                            <div className="add-row-main-content" id="registerer-list">
                                <div className="main-method-box">
                                    <div className="single-details-lable ">
                                        <div className="lable-box">
                                            <p>상호명</p>
                                        </div>
                                        <div className="select-box method-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        placeholder="상호명 입력"
                                                        value={restaurantInformationData.restaurant_name}
                                                        onChange={(event: any) => {
                                                            handleInputChangeRestaurantInformation(index, event, "restaurant_name");
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-details-lable ">
                                        <div className="lable-box ">
                                            <p>연락처</p>
                                        </div>
                                        <div className="select-box  link-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="number"
                                                        name="phone"
                                                        placeholder="연락처 입력"
                                                        value={restaurantInformationData.phone_number}
                                                        onChange={(event: any) => {
                                                            handleInputChangeRestaurantInformation(index, event, "phone_number");
                                                        }}
                                                        maxLength={11}
                                                    />
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="main-method-box">
                                    <div className="single-details-lable ">
                                        <div className="lable-box">
                                            <p>주소</p>
                                        </div>
                                        <div className="select-box method-box">
                                            <div className="method-box1  search-position">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        placeholder="주소 입력"
                                                        value={restaurantInformationData.main_address}
                                                        onChange={(event: any) => {
                                                            handleInputChangeRestaurantInformation(index, event, "main_address");
                                                        }}
                                                    />
                                                    <img src="../../img/2345.png" className="searchbar" alt="icon" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-details-lable ">
                                        <div className="lable-box ">
                                            <p>상세 주소</p>
                                        </div>
                                        <div className="select-box  link-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        placeholder="상세 주소 입력"
                                                        value={restaurantInformationData.detail_address}
                                                        onChange={(event: any) => {
                                                            handleInputChangeRestaurantInformation(index, event, "detail_address");
                                                        }}
                                                    />
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="single-details-lable">
                                    <div className="lable-box">
                                        <p>맛집 소개</p>
                                    </div>

                                    <div className="select-box">
                                        {/* <div className="details-box"> */}
                                        <div className="details-box4 ">
                                            <div className="link-input">
                                                <input
                                                    type="text"
                                                    placeholder="맛집 소개 입력"
                                                    value={restaurantInformationData.introduction}
                                                    onChange={(event: any) => {
                                                        handleInputChangeRestaurantInformation(index, event, "introduction");
                                                    }}
                                                />
                                            </div>

                                        </div>
                                        {/* </div> */}
                                    </div>
                                </div>


                                <div className="single-details-lable ">
                                    <div className="lable-box ">
                                        <p>맛집 이미지</p>
                                    </div>
                                    {/* <div className="select-box  "> */}
                                    <div className="method-box1 btn-position">
                                        <div className="link-input">
                                            <input
                                                id={`restaurant-file${index}`}
                                                type="file"
                                                placeholder="맛집 이미지 업로드"
                                                src={restaurantInformationData.image}
                                                onChange={(e: any) => {
                                                    handleInputChangeImageRestaurant(index, e.target.files[0], "file");
                                                }}
                                                alt="img"
                                            />
                                            <div>
                                                <span>{(restaurantInformationData.image.split("/")[restaurantInformationData.image.split("/").length - 1]).split("?")[0]}</span>
                                            </div>
                                        </div>
                                        <div className="attach-btn">
                                            <Buttons
                                                type=""
                                                ButtonStyle="addBtn"
                                                onClick={() => { restaurantImage(`restaurant-file${index}`) }} >파일첨부</Buttons>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </div>

                                <div className="add-btn">
                                    {
                                        restaurantInformation.length > 1 && (
                                            <div>
                                                <Buttons
                                                    type=""
                                                    ButtonStyle="deleteBtn"
                                                    onClick={() => { handleRemoveRestaurantInfo(index); }}
                                                >삭제하기</Buttons>
                                            </div>
                                        )}
                                </div>
                            </div>
                        ))}
                        <div className="add-btn">
                            <Buttons type=""
                                ButtonStyle="addBtn"
                                onClick={() => { handleAddRestaurantInfo(); }}
                            >추가하기</Buttons>
                        </div>
                    </div>
                }
                {/* Accommodation Info */}
                {registerEvent.recruitment === recruitment_method.atSpoweek &&
                    <div>
                        <div className="event-details line-info">
                            <div className="border"></div>
                            <p>숙박 정보(Accommodation Info)</p>
                        </div>
                        {accommodationInformation.map((accommodationInformationData, index) => (
                            <div className="add-row-main-content" id="registerer-list">
                                <div className="main-method-box">
                                    <div className="single-details-lable ">
                                        <div className="lable-box">
                                            <p>상호명</p>
                                        </div>
                                        <div className="select-box method-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        name="accommodation"
                                                        placeholder="상호명 입력"
                                                        value={accommodationInformationData.accommodation_name}
                                                        onChange={(event: any) => {
                                                            handleInputChangeAccommodationInformation(index, event, "accommodation_name");
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-details-lable ">
                                        <div className="lable-box ">
                                            <p>연락처</p>
                                        </div>
                                        <div className="select-box  link-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        placeholder="연락처 입력"
                                                        value={accommodationInformationData.phone_number}
                                                        onChange={(event: any) => {
                                                            handleInputChangeAccommodationInformation(index, event, "phone_number");
                                                        }}
                                                        maxLength={11}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="main-method-box">
                                    <div className="single-details-lable ">
                                        <div className="lable-box">
                                            <p>주소</p>
                                        </div>
                                        <div className="select-box method-box">
                                            <div className="method-box1  search-position">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        name="main_add"
                                                        placeholder="주소 입력"
                                                        value={accommodationInformationData.main_address}
                                                        onChange={(event: any) => {
                                                            handleInputChangeAccommodationInformation(index, event, "main_address");
                                                        }}
                                                    />
                                                    <img src="../../img/2345.png" className="searchbar" alt="icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-details-lable ">
                                        <div className="lable-box ">
                                            <p>상세 주소</p>
                                        </div>
                                        <div className="select-box  link-box">
                                            <div className="method-box1 ">
                                                <div className="link-input">
                                                    <input
                                                        type="text"
                                                        name="detail_add"
                                                        placeholder="상세 주소 입력"
                                                        value={accommodationInformationData.detail_address}
                                                        onChange={(event: any) => {
                                                            handleInputChangeAccommodationInformation(index, event, "detail_address");
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="single-details-lable">
                                    <div className="lable-box">
                                        <p>숙박 소개</p>
                                    </div>
                                    <div className="select-box">
                                        {/* <div className="details-box"> */}
                                        <div className="details-box4 ">
                                            <div className="link-input">
                                                <input
                                                    type="text"
                                                    placeholder="숙박 소개 입력"
                                                    value={accommodationInformationData.introduction}
                                                    onChange={(event: any) => {
                                                        handleInputChangeAccommodationInformation(index, event, "introduction");
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* </div> */}
                                    </div>
                                </div>

                                <div className="single-details-lable ">
                                    <div className="lable-box ">
                                        <p>숙박 이미지</p>
                                    </div>
                                    <div className="method-box1 btn-position">
                                        <div className="link-input">
                                            <input
                                                // id="accommodationImage"
                                                id={`accommodation-file${index}`}
                                                type="file"
                                                placeholder="숙박 이미지 업로드"
                                                // hidden
                                                // src={imgAccommodation}
                                                src={accommodationInformationData.image}
                                                onChange={(e: any) => {
                                                    handleInputChangeImageAcc(index, e.target.files[0], "file");
                                                }
                                                }
                                                alt="img"
                                            />
                                            <div>
                                                <span>{(accommodationInformationData.image.split("/")[accommodationInformationData.image.split("/").length - 1]).split("?")[0]}</span>
                                            </div>
                                        </div>
                                        <div className="attach-btn">
                                            <Buttons
                                                type=""
                                                ButtonStyle="addBtn"
                                                onClick={() => { accommodationImage(`accommodation-file${index}`) }}
                                            >파일첨부</Buttons>
                                        </div>
                                    </div>
                                </div>

                                <div className="add-btn">
                                    {
                                        accommodationInformation.length > 1 && (
                                            <div>
                                                <Buttons
                                                    type=""
                                                    ButtonStyle="deleteBtn"
                                                    onClick={() => { handleRemoveAccommodationInfo(index); }}
                                                >삭제하기</Buttons>
                                            </div>
                                        )}
                                </div>
                            </div>
                        ))}
                        <div className="add-btn">
                            <Buttons type=""
                                ButtonStyle="addBtn"
                                onClick={() => { handleAddaAccommodationInfo(); }}
                            >추가하기</Buttons>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default RegisterEvent1