import React, { useEffect, useRef, useState } from "react";
import "./RegisterEvent.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { Sports, Recruitment_method, Price_policy, Restriction_on_participation, Recruitment_Division, Location, Approve_Participants, Awaiter_Receipt, Participant_Info } from "../../../helper/Constant";
import Buttons from "../../../component/Buttons/Buttons";
import { Button, Form, Modal } from "react-bootstrap";
import MessageCkEditor from "../../../component/MessageCkEditor";
import { ApiGet, ApiPost, ApiPut } from "../../../helper/API/ApiData";
import moment from "moment";
import { useHistory } from "react-router";
import NumberFormat from "react-number-format";
import Select from 'react-select'
import AutosizeInput from 'react-input-autosize';

import DynamicFormData from "../ManageEventApplication/DynamicFormData";
import DynamicApplication from "../ManageEventApplication/DynamicApplication";

import DaumPostcode from 'react-daum-postcode';

interface Registerevent {
    id: string,
    sport_name: string,
    recruitment: string,
    link: string,
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

const RegisterEvent = () => {
    // const { id }: any = useParams();
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id')?.toString() ?? "";

    const sports = Sports;
    const recruitment_method = Recruitment_method;
    const price_policy = Price_policy;
    const restriction_on_participation = Restriction_on_participation;
    const recruitment_Division = Recruitment_Division;
    const locations = Location;
    const approve_participant = Approve_Participants;
    const awaiter_receipt = Awaiter_Receipt;
    const participant_info = Participant_Info;

    const settingRegisterEvent: Registerevent = {
        id: "",
        sport_name: "",
        recruitment: "",
        link: "",
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

    };

    const settingEventdetail: Eventdetail = {
        event_name: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        place: "",
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
    const history = useHistory();
    const [basicSettingsData, setBasicSettingsData] = useState<any>(null);
    const [registerEvent, setRegisterEvent] = useState(settingRegisterEvent);
    const [registerEventDetail, setRegisterEventDetail] = useState(settingEventdetail)
    const [registerEventTourinfo, setRegisterEventTourinfo] = useState(settingTourinfo)
    const [EventInformationId, setEventInformationId] = useState();
    const [selectedImageFile, setSelectedImageFile] = useState<File>()
    const [selectedFile, setSelectedFile] = useState<File>();
    const [imgSrc, setImgSrc] = useState("");
    const [imageName, setImageName] = useState("");
    const [notiesName, setNotiesName] = useState("");
    const [data, setData] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
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

    const [BasicSettingId, setBasicSettingId] = useState("");
    const [registerEventInfoId, setRegisterEventInfoId] = useState("")
    const [eventInfoDetailsId, setEventInfoDetailsId] = useState("");

    const [basicDivision, setBasicDivision] = useState<any>([
        {
            recuitement_division: "",
            recuitement_division_name: "",
            volume_recruitment: "",
            participation_fee: "",
            max_persons: 0,
            min_persons: 0
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
    const sportdefalt = [
        { label: "종목 선택", value: "종목 선택" }
    ]


    const recruitmentDropDown = [
        { label: recruitment_method.atSpoweek, value: "atSpoweek" },
        { label: recruitment_method.From_outside, value: "fromOutside" },
    ]
    const recruitmentdefalt = [
        { label: "모집 방법", value: "모집 방법" }
    ]

    const pricepolicyDropDown = [
        { label: price_policy.Free, value: "free" },
        { label: price_policy.With_fee, value: "withFee" },
    ]
    const policydefalt = [
        { label: "가격 정책", value: "가격 정책" }
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
    const bankdefault = [
        { label: "은행 선택", value: "은행 선택" }
    ]

    const restrictionDropDown = [
        { label: restriction_on_participation.notRestricted, value: "notRestricted" },
        { label: restriction_on_participation.Restricted, value: "restricted" },
    ]
    const restrictiondefault = [
        { label: "선수출신 참가 제한", value: "선수출신 참가 제한" }
    ]

    const recruitmentDivisionDropDown = [
        { label: recruitment_Division.Individual, value: "Individual" },
        { label: recruitment_Division.Group, value: "Group" }
    ]
    const recruitmentdefault = [
        { label: "모집 부문", value: "모집 부문" }
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
        { label: locations.Online, value: "Online" },
        { label: locations.Offline, value: "Offline" },
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
            participation_fee: "",
            min_persons: "0",
            max_persons: "0"
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

    const handleRemoveRegistererFields = (index: number) => {
        if (basicDivision.length > 1) {
            const values = [...basicDivision];
            values.splice(index, 1);
            setBasicDivision(values);
        }
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
        if (inputName === "recuitementdivision") {
            values[index].recuitement_division = event.value
        }
        if (inputName === "recuitement_division_name") {
            values[index].recuitement_division_name = event.target.value
        }
        if (inputName === "volume_recruitment") {
            values[index].volume_recruitment = event.target.value;
        }
        if (inputName === "participation_fee") {
            values[index].participation_fee = event.target.value;

        }
        if (inputName === "min_persons") {
            values[index].min_persons = event.target.value;
        }
        if (inputName === "max_persons") {
            values[index].max_persons = event.target.value;
        }
        setBasicDivision(values);
    };

    //type number enter
    const handleChangeBasicDivision = (index: number, event: any, inputName: string) => {
        const value = event.target.value;

        const re = /^[0-9\b]+$/;

        if (!value || value === "" || re.test(value)) {
            handleInputChangeBasicDivision(index, event, inputName);
        }
    }

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

    //Event Handle

    const handleChangeEventInfo = (e: any, name: string) => {
        if (name === "start_date" || name === "end_date") {
            setRegisterEventDetail({
                ...registerEventDetail,
                [name]: moment(e).format("YYYY.MM.DD")
            })
        } else if (name === "start_time" || name === "end_time") {
            setRegisterEventDetail({
                ...registerEventDetail,
                [name]: moment(e).format("hh:mm A")
            })
        } else if (name === "place") {
            setRegisterEventDetail({
                ...registerEventDetail,
                [name]: e.value
            })
        } else {
            setRegisterEventDetail({
                ...registerEventDetail,
                [name]: e.target.value
            })
        }

    }

    //type number enter
    // const handleChangeBasicAward = (index: number, event: any, inputName: string) => {
    //     const value = event.target.value;
    //     const re = /^[0-9\b]+$/;

    //     if (!value || value === "" || re.test(value)) {
    //         handleInputChangeBasicAward(index, event, inputName);
    //     }
    // }

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

    //type number enter
    // const handleChangeNumber = (index: number, event: any, inputName: string) => {
    //     const value = event.target.value;
    //     const re = /^[0-9\b]+$/;

    //     if (!value || value === "" || re.test(value)) {
    //         handleInputChangeTourDetail(index, event, inputName);
    //     }
    // }

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

    //type number enter
    // const handleChangeRestaurantNumber = (index: number, event: any, inputName: string) => {
    //     const value = event.target.value;
    //     const re = /^[0-9\b]+$/;

    //     if (!value || value === "" || re.test(value)) {
    //         handleInputChangeRestaurantInformation(index, event, inputName);
    //     }
    // }

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

    //type number enter
    // const handleChangeAccommodationNumber = (index: number, event: any, inputName: string) => {
    //     const value = event.target.value;
    //     const re = /^[0-9\b]+$/;

    //     if (!value || value === "" || re.test(value)) {
    //         handleInputChangeAccommodationInformation(index, event, inputName);
    //     }
    // }
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
        // setImageName(selectedFile.name)
        setImageName(selectedFile.name)


        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);


    useEffect(() => {
        if (!selectedImageFile) {
            return;
        }
        const objectUrl = URL.createObjectURL(selectedImageFile);
        setImgSrc(objectUrl);
        setNotiesName(selectedImageFile.name)

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedImageFile]);


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
                    setBasicSettingId(res.data.eventRegistrationStep_1_2.id)
                    setBasicSettingsData(res.data.eventRegistrationStep_1_2)
                }
                if (res.data.eventRegistrationStep_3) {
                    const data = res.data.eventRegistrationStep_3
                    setRegisterEventInfoId(data.id)

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
                        region: data.region,
                        is_temporarily: data.is_temporarily
                    })

                    const label = (data.image).split('/')
                    const files = label[label.length - 1].split('?')[0]
                    setImageName(files)

                    // const label = (data.image).split('/')[(data.image).split('/') - 1]
                    // setImageName(label)

                    const note = (data.notes).split('/')
                    const pdf = note[note.length - 1].split('?')[0]
                    setNotiesName(pdf)

                    // const note = (data.notes).split('/')[(data.notes).split('/') - 1]
                    // setNotiesName(note)

                }
                if (res.data.eventRegistrationStep_4) {
                    const data = res.data.eventRegistrationStep_4
                    setEventInfoDetailsId(data.id)
                    setRegisterEventTourinfo({
                        ...registerEventTourinfo,
                        event_info_content: data.event_info_content,
                        policy: data.policy,
                        is_temporarily: data.is_temporarily
                    })
                    setData(data.event_info_content)
                    setAccommodationInformation(data.accommodation_information)
                    setRestaurantInformation(data.restaurant_information)
                    setTourDetail(data.tour_detail)
                }
            }).catch((error: any) => {
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

    // Get Api Step 1_2

    useEffect(() => {
        // let a = typeof (basicSettingsData)

        if (basicSettingsData) {
            fnOnChnageRecruitMethod(basicSettingsData.recruitment)
            setRegisterEvent({
                ...registerEvent,
                sport_name: basicSettingsData.sport_name,
                recruitment: basicSettingsData.recruitment,
                link: basicSettingsData.link,
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
                is_temporarily: basicSettingsData.is_temporarily
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

            setParticipantsInfoTags(basicSettingsData?.participant_display_control?.participants_static_field)
            setParticipantsInfoOtherTags(basicSettingsData?.participant_display_control?.participants_other_field)

            setParticipantDisplay({
                ...participantDisplay,
                approve_participants: basicSettingsData?.participant_display_control?.approve_participants,
                awaiter_receipt: basicSettingsData?.participant_display_control?.awaiter_receipt,
            })

            setEventIncharge(basicSettingsData.event_incharge)
        }

    }, [basicSettingsData])


    // Post Call
    const Save = () => {

        let ArrayParticipantCollectedInfo = participantCollectedInfo?.filter((d) => d.fieldName !== "").map((data) => data.fieldName).join(',')

        const body = {
            sport_name: registerEvent.sport_name,
            recruitment: registerEvent.recruitment,
            link: registerEvent.link,
            start_date: moment(registerEvent.start_date + " " + registerEvent.start_time).format("YYYY-MM-DD HH:mm"),
            end_date: moment(registerEvent.end_date + " " + registerEvent.end_time).format("YYYY-MM-DD HH:mm"),
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
                    participation_fee: data.participation_fee,
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

        if (BasicSettingId) {
            ApiPut(`event/editEventBasicSetting/` + BasicSettingId, body)
                .then((res: any) => {
                    if (res.status == 200) {
                        if (registerEvent.recruitment === "fromOutside") {
                            Eventinfodetail(res?.data?.id)
                        } else {
                            addEvent(res?.data?.id)
                        }
                    }
                }).catch((error: any) => {
                })
        } else {
            ApiPost(`event/eventBasicSetting`, body)
                .then((res: any) => {
                    if (registerEvent.recruitment === "fromOutside") {
                        Eventinfodetail(res?.data?.id)
                    } else {
                        addEvent(res?.data?.id)
                    }
                }).catch((error: any) => {
                })
        }

        // step 2
        const addEvent = (event_id: string) => {
            const [first, rest] = registerEventDetail.main_address.split(/\s+(.*)/);
            const addevent = {

                event_name: registerEventDetail.event_name,
                start_date: moment(registerEventDetail.start_date + " " + registerEventDetail.start_time).format("YYYY-MM-DD HH:mm"),
                end_date: moment(registerEventDetail.end_date + " " + registerEventDetail.end_time).format("YYYY-MM-DD HH:mm"),
                place: registerEventDetail.place,
                deatil_address: registerEventDetail.deatil_address,
                location: registerEventDetail.location ? registerEventDetail.location : "",
                host: registerEventDetail.host,
                organizer: registerEventDetail.organizer,
                sponsor: registerEventDetail.sponsor,
                is_temporarily: false,
                summary: registerEventDetail.summary,
                region: first,
                step_no: 3,
                event_id: event_id,
            }

            if (registerEventInfoId) {
                ApiPut("event/editEventInformation/" + registerEventInfoId, addevent)
                    .then((res: any) => {
                        if (res.status == 200) {
                            saveImage(res.data.id)
                            Eventinfodetail(res?.data?.event_id)
                        }
                    }).catch((error: any) => {
                    })

            } else {

                ApiPost(`event/addEventInformation`, addevent)
                    .then((res: any) => {

                        setEventInformationId(res?.data?.event_id)
                        if (res.status == 200) {
                            saveImage(res.data.id)
                            Eventinfodetail(res?.data?.event_id)
                        }
                    }).catch((error: any) => {
                    })
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
        }


        // step 3
        const Eventinfodetail = (event_id: string) => {
            const addEventtour = {
                event_info_content: registerEventTourinfo?.event_info_content,
                policy: registerEventTourinfo.policy,
                is_temporarily: false,
                step_no: 4,
                event_id: event_id,
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

            if (eventInfoDetailsId) {
                ApiPut("event/editEventInformationDetail/" + eventInfoDetailsId, addEventtour)
                    .then((res: any) => {
                        SuccessSave(res?.data?.event_id)
                    })
                    .catch((error) => {
                    });
            } else {
                ApiPost(`event/addEventInformationDetail`, addEventtour)
                    .then((res: any) => {
                        SuccessSave(res?.data?.event_id)
                        history.push("/event/manage-event")
                    }).catch((error: any) => {
                    })
            }
            // step 4
            const SuccessSave = (id: string) => {
                const success = {
                    is_temporarily: true,
                    event_id: id
                }
                ApiPost(`event/eventRegistrationSuccessfully`, success)
                    .then((res: any) => {
                        history.push("/event/manage-event")
                    }).catch((error: any) => {
                    })
            }
        }
    }

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

    // useEffect(() => {
    //     const [first, rest] = registerEventDetail.main_address.split(/\s+(.*)/);
    //     setRegisterEventDetail({
    //         ...registerEventDetail,
    //         location: rest
    //     })

    // }, [registerEventDetail.main_address])


    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowTour, setModalShowTour] = React.useState(false);
    const [modalShowRes, setModalShowRes] = React.useState(false);
    const [modalShowAcc, setModalShowAcc] = React.useState(false);


    const addCommas = (num: any) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, "");

    const handleComplete = (data: any) => {
        setModalShow(false);
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setRegisterEventDetail({
            ...registerEventDetail,
            main_address: fullAddress
        })

    };

    const KaKaoAddressAPIModal = (props: any) => {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <DaumPostcode style={{ display: "block", position: "relative", top: "0", width: "100%", height: "500px", padding: "7px", }} onComplete={handleComplete} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const selectOption = (label: string, dropDownName: string) => {
        let list: any = []
        if (dropDownName === "place") {
            list = locationDropDown
        }
        if (dropDownName === "sport") {
            list = sportsDropDown
        }
        if (dropDownName === "recruitmentDropDown") {
            list = recruitmentDropDown
        }
        if (dropDownName === "policy") {
            list = pricepolicyDropDown
        }
        if (dropDownName === "bank") {
            list = koreanBank
        }
        if (dropDownName === "restriction") {
            list = restrictionDropDown
        }
        if (dropDownName === "recuitementdivision") {
            list = recruitmentDivisionDropDown
        }
        if (dropDownName === "places") {
            list = locationDropDown
        }
        let findData = list.find((data: any) => data?.value === label)

        let dataObj = undefined;
        if (findData?.value) {
            dataObj = {
                label: findData?.label,
                value: findData?.value,
            }
        }
        return dataObj;
    }
    return (
        <div className="register-event-fullpage">
            <div className="register-event-page mj-selectdropDown">
                <div className="register-event-page-inner">
                    <div className="page-title-btn">
                        <div className="header-page">
                            <h3>이벤트 등록하기</h3>
                        </div>
                        <div className="edit-back-btn ml-auto">
                            <Buttons
                                type=""
                                ButtonStyle="BackBtn"
                                onClick={() => {
                                    if (BasicSettingId) {
                                        history.push(`/event/register-view?id=${BasicSettingId}`);
                                    } else {
                                        history.push(`/event/manage-event`)
                                    }
                                }}
                            >이전으로</Buttons>
                            <Buttons
                                type=""
                                ButtonStyle="saveBtn"
                                onClick={() => { Save() }}>
                                저장
                            </Buttons>
                        </div>
                    </div>

                    <div className="custom-full-table">

                        {/* ====== Start Select sports========== */}
                        <section>
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>종목 선택</h3>
                                    </div>
                                    <div className="repeatable-row">
                                        <div className="single-form-row">
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>종목 선택</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="select-custom position-relative selector-set-main mj-selectdropDown register-dropdow">
                                                            <select
                                                                className={`${registerEvent.sport_name === "" ? "selector-set" : "selector-set-gray"} minimal form-custom-select`}
                                                                name="sport"
                                                                value={registerEvent.sport_name}
                                                                onChange={(event: any) => {
                                                                    setRegisterEvent({ ...registerEvent, sport_name: event.target.value });
                                                                }}>
                                                                <option selected>종목 선택</option>
                                                                {sportsDropDown.map(({ value, label }) => (
                                                                    <option value={value}>{label}</option>
                                                                ))}

                                                            </select>
                                                            {/* <Select
                                                                id="sport"
                                                                name="sport"
                                                                options={sportsDropDown}
                                                                defaultValue={sportdefalt}
                                                                value={selectOption(registerEvent.sport_name, "sport")}
                                                                onChange={(e: any) => {
                                                                    setRegisterEvent({ ...registerEvent, sport_name: e.value });
                                                                }}
                                                            />
                                                            <img src="/img/123.png" alt="" className="dropdown-img" /> */}
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
                                        <h3>모집 정보</h3>
                                    </div>
                                    <div className="repeatable-row">
                                        <div className="single-form-row">
                                            <div className="double-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>모집 방법</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom position-relative selector-set-main mj-selectdropDown register-dropdow">
                                                                {/* <select
                                                                    className={`${registerEvent.recruitment === "" ? "selector-set" : "selector-set-gray"} minimal form-custom-select`}
                                                                    name="recruitments"
                                                                    value={registerEvent.recruitment}
                                                                    onChange={(event: any) => {
                                                                        setRegisterEvent({ ...registerEvent, recruitment: event.target.value });
                                                                    }}>
                                                                    <option selected>모집 방법</option>
                                                                    {recruitmentDropDown.map(({ value, label }) => (
                                                                        <option value={value}>{label}</option>
                                                                    ))}

                                                                </select> */}
                                                                <Select
                                                                    id="recruitments"
                                                                    className="minimal"
                                                                    name="recruitments"
                                                                    options={recruitmentDropDown}
                                                                    defaultValue={recruitmentdefalt}
                                                                    value={selectOption(registerEvent.recruitment, "recruitments")}
                                                                    onChange={(e: any) => {
                                                                        setRegisterEvent({ ...registerEvent, recruitment: e.value });
                                                                    }}
                                                                />
                                                                {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(registerEvent.recruitment === "fromOutside" || registerEvent.recruitment === " ") &&
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>링크</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <input
                                                                        className="border-less-input"
                                                                        type="text"
                                                                        name="link"
                                                                        value={registerEvent.link}
                                                                        placeholder="링크 입력(외부입력 시 활성화)"
                                                                        autoComplete="off"
                                                                        onChange={(e: any) => {
                                                                            setRegisterEvent({ ...registerEvent, link: e.target.value });
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="single-form-row">
                                            <div className="double-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>모집 시작 일시</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="date-and-time-row">
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
                                                                        autoComplete="off"
                                                                        onChange={(e: any) => {
                                                                            setRegisterEvent({ ...registerEvent, start_date: moment(e).format("YYYY.MM.DD") })
                                                                        }}
                                                                    />
                                                                    <img src="/img/date-calender.svg" alt="" onClick={() => { onDatePickerClick("startDate"); }} />
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
                                                                        autoComplete="off"
                                                                        placeholderText="시간선택"
                                                                        onChange={(e: any) => {
                                                                            setRegisterEvent({ ...registerEvent, start_time: moment(e).format("hh:mm A") })
                                                                        }}
                                                                    />
                                                                    <img src="/img/time-calender.svg" alt="" onClick={() => { onTimePickerClick("startTime"); }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>모집 종료 일시</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="date-and-time-row">
                                                                <div className="select-date">
                                                                    <DatePicker
                                                                        id="endDate"
                                                                        name="end_date"
                                                                        value={registerEvent.end_date}
                                                                        selectsStart
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        // minDate={startDate}
                                                                        autoComplete="off"
                                                                        placeholderText="날짜선택"
                                                                        dateFormat="yyyy.MM.dd"
                                                                        onChange={(e: any) => {
                                                                            setRegisterEvent({ ...registerEvent, end_date: moment(e).format("YYYY.MM.DD") })
                                                                        }}
                                                                    />

                                                                    <img src="/img/date-calender.svg" alt="" onClick={() => { onDatePickerClick("endDate"); }} />
                                                                </div>
                                                                <div className="select-time">
                                                                    <DatePicker
                                                                        id="endTime"
                                                                        name="end_time"
                                                                        value={registerEvent.end_time}
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={60}
                                                                        autoComplete="off"
                                                                        timeCaption="Time"
                                                                        dateFormat="h:mm"
                                                                        placeholderText="시간선택"
                                                                        onChange={(e: any) => {
                                                                            setRegisterEvent({ ...registerEvent, end_time: moment(e).format("hh:mm A") })
                                                                        }}
                                                                    />
                                                                    <img src="/img/time-calender.svg" alt="" onClick={() => { onTimePickerClick("endTime"); }} />
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
                                                            <label>가격 정책</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom position-relative selector-set-main section-row">
                                                                {/* <select
                                                                    className={`${registerEvent.price_policy === "" ? "selector-set" : "selector-set-gray"} minimal form-custom-select`}
                                                                    name="policy"
                                                                    value={registerEvent.price_policy}
                                                                    onChange={(event: any) => {
                                                                        setRegisterEvent({ ...registerEvent, price_policy: event.target.value });
                                                                    }}
                                                                >
                                                                    <option selected>가격 정책</option>
                                                                    {pricepolicyDropDown.map(({ value, label }) => (
                                                                        <option value={value}>{label}</option>
                                                                    ))}
                                                                </select> */}
                                                                <Select
                                                                    id="policy"
                                                                    className="minimal"
                                                                    name="policy"
                                                                    options={pricepolicyDropDown}
                                                                    defaultValue={policydefalt}
                                                                    value={selectOption(registerEvent.price_policy, "policy")}
                                                                    onChange={(e: any) => {
                                                                        setRegisterEvent({ ...registerEvent, price_policy: e.value });
                                                                    }}
                                                                />
                                                                {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {registerEvent.price_policy === "withFee" &&
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가비 입금 은행</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="select-custom position-relative selector-set-main at-dropdown">
                                                                    {/* <select
                                                                        className={`${registerEvent.bank_name === "" ? "selector-set" : "selector-set-gray"} minimal form-custom-select`}
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
                                                                    </select> */}
                                                                    <Select
                                                                        id="bank"
                                                                        className="minimal"
                                                                        name="bank"
                                                                        options={koreanBank}
                                                                        defaultValue={bankdefault}
                                                                        value={selectOption(registerEvent.bank_name, "bank")}
                                                                        onChange={(e: any) => {
                                                                            setRegisterEvent({ ...registerEvent, bank_name: e.value });
                                                                        }}
                                                                    />
                                                                    {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                        {registerEvent.price_policy === "withFee" &&
                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가비 입금 예금주</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <input
                                                                        className="border-less-input"
                                                                        type="text"
                                                                        name="accountholder"
                                                                        placeholder="참가비 입금 예금주"
                                                                        value={registerEvent.account_holder}
                                                                        autoComplete="off"
                                                                        onChange={(e: any) => {
                                                                            setRegisterEvent({ ...registerEvent, account_holder: e.target.value });
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가비 입금 계좌번호</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <input
                                                                        className="border-less-input"
                                                                        type="text"
                                                                        name="bankaccount"
                                                                        placeholder="참가비 입금 계좌번호"
                                                                        value={registerEvent.ac_number}
                                                                        autoComplete="off"
                                                                        onChange={(e: any) => {
                                                                            const value = e.target.value;
                                                                            const re = /^[0-9\b]+$/;

                                                                            if (!value || value === "" || re.test(value)) {
                                                                                setRegisterEvent({ ...registerEvent, ac_number: e.target.value });
                                                                            }

                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        <div className="single-form-row">
                                            {/* <div className={registerEvent.participation_athletes === restriction_on_participation.Restricted ? 'double-row' : ''}> */}
                                            <div className={registerEvent.participation_athletes === "restricted" ? 'double-row' : ''}>
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>선수출신 참가 제한</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="select-custom position-relative selector-set-main at-dropdown">
                                                                {/* <select
                                                                    className={`${registerEvent.participation_athletes === "" ? "selector-set" : "selector-set-gray"} minimal form-custom-select`}
                                                                    name="restriction"
                                                                    value={registerEvent.participation_athletes}
                                                                    onChange={(event: any) => {
                                                                        handleInputChangeSettingRegisterEvent(event.target.value);
                                                                    }}
                                                                >
                                                                    <option selected>선수출신 참가 제한</option>
                                                                    {restrictionDropDown.map(({ value, label }) => (
                                                                        <option value={value}>{label}</option>
                                                                    ))}
                                                                </select> */}
                                                                <Select
                                                                    id="restriction"
                                                                    className="minimal"
                                                                    name="restriction"
                                                                    options={restrictionDropDown}
                                                                    defaultValue={restrictiondefault}
                                                                    value={selectOption(registerEvent.participation_athletes, "restriction")}
                                                                    onChange={(e: any) => {
                                                                        setRegisterEvent({ ...registerEvent, participation_athletes: e.value });
                                                                    }}
                                                                />
                                                                {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* {registerEvent.participation_athletes === restriction_on_participation.Restricted && */}
                                                {registerEvent.participation_athletes === "restricted" &&
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label> 제한 입력</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <input
                                                                        className="border-less-input"
                                                                        type="text"
                                                                        name="Restriction_participation"
                                                                        placeholder="제한 입력"
                                                                        value={registerEvent.participation_athletes_remark}
                                                                        autoComplete="off"
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ====== End Recruitment info========== */}


                        {/* ====== Start Division info========== */}
                        {registerEvent.recruitment != "fromOutside" &&
                            <section>
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>부문 정보</h3>
                                        </div>
                                        {basicDivision.map((basicDivisionData: any, index: number) => (
                                            <>
                                                <div className="repeatable-row">
                                                    <div className="single-form-row">
                                                        <div className="double-row">
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>모집 부문</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="select-custom position-relative selector-set-main">
                                                                            {/* <select
                                                                                className={`${basicDivisionData.recuitement_division === "" ? "selector-set" : "selector-set-gray"} minimal form-custom-select`}
                                                                                name="recuitementdivision"
                                                                                value={basicDivisionData.recuitement_division}
                                                                                onChange={(event: any) => {
                                                                                    handleInputChangeBasicDivision(index, event, "recuitement_division");
                                                                                }}>
                                                                                <option selected>모집 부문</option>
                                                                                {recruitmentDivisionDropDown.map(({ value, label }) => (
                                                                                    <option value={value}>{label}</option>
                                                                                ))}

                                                                            </select> */}
                                                                            <Select
                                                                                id="recuitementdivision"
                                                                                className="minimal"
                                                                                name="recuitementdivision"
                                                                                options={recruitmentDivisionDropDown}
                                                                                defaultValue={recruitmentdefault}
                                                                                value={selectOption(basicDivisionData.recuitement_division, "recuitementdivision")}
                                                                                onChange={(e: any) => {
                                                                                    // setRegisterEvent({ ...basicDivisionData, recuitement_division: e.value });
                                                                                    handleInputChangeBasicDivision(index, e, "recuitementdivision");
                                                                                }}
                                                                            />
                                                                            {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>모집 부문</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
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
                                                    </div>


                                                    <div className="single-form-row">
                                                        <div className="double-row">
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>모집 인원</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom won-text-ctn">
                                                                            {/* <input
                                                                                className={`border-less-input won-text-blank-input ${basicDivisionData.participation_fee.length > 0 && "won-text-input"}`}
                                                                                type="text"
                                                                                placeholder="모집 인원"
                                                                                // style={{ width: width + 'ch' }}
                                                                                value={basicDivisionData.volume_recruitment}
                                                                                onChange={(event: any) => {
                                                                                    handleChangeBasicDivision(index, event, "volume_recruitment");
                                                                                    // changeHandler(event)
                                                                                }}
                                                                            /> */}

                                                                            <AutosizeInput
                                                                                // name="form-field-name"
                                                                                className={`border-less-input won-text-blank-input ${basicDivisionData.participation_fee.length > 0 && "won-text-input"}`}
                                                                                placeholder="모집 인원"
                                                                                value={basicDivisionData.volume_recruitment}
                                                                                onChange={(event: any) => {
                                                                                    handleChangeBasicDivision(index, event, "volume_recruitment");
                                                                                }}

                                                                            />
                                                                            {basicDivisionData.volume_recruitment &&
                                                                                <span className="participation-fee won-text">원</span>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>




                                                            {(basicDivisionData.recuitement_division === "Group" || basicDivisionData.recuitement_division === "") &&
                                                                <div className="table-full-row">
                                                                    <div className="table-custom-full-row">
                                                                        <div className="table-custom-label">
                                                                            <label>최소 - 최대 참가 인원</label>
                                                                        </div>
                                                                        <div className="table-custom-result">
                                                                            <div className="input-custom person-input d-flex align-items-center">
                                                                                <input
                                                                                    className="border-less-input"
                                                                                    type="text"
                                                                                    placeholder="00"
                                                                                    value={basicDivisionData.min_persons == 0 ? "" : basicDivisionData.min_persons}
                                                                                    onChange={(event: any) => {
                                                                                        handleChangeBasicDivision(index, event, "min_persons");

                                                                                    }}
                                                                                    maxLength={2}
                                                                                />
                                                                                <span>명</span>

                                                                                <span className="input-separator"> &nbsp; -  &nbsp; </span>

                                                                                <input
                                                                                    className="border-less-input"
                                                                                    type="text"
                                                                                    placeholder="00"
                                                                                    value={basicDivisionData.max_persons == 0 ? "" : basicDivisionData.max_persons}
                                                                                    onChange={(event: any) => {
                                                                                        handleChangeBasicDivision(index, event, "max_persons");
                                                                                    }}
                                                                                    maxLength={2}
                                                                                />
                                                                                <span>명</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                basicDivisionData.recuitement_division === "Individual" &&
                                                                // <div className="single-form-row">
                                                                <div className="table-full-row">
                                                                    <div className="table-custom-full-row">
                                                                        <div className="table-custom-label">
                                                                            <label>참가비</label>
                                                                        </div>
                                                                        <div className="table-custom-result">
                                                                            <div className="input-custom won-text-ctn">
                                                                                {/* <input
                                                                                    className="border-less-input"
                                                                                    type="text"
                                                                                    placeholder="참가비 입력"
                                                                                    value={basicDivisionData.participation_fee}
                                                                                    onChange={(event: any) => {
                                                                                        handleChangeBasicDivision(index, event, "participation_fee");
                                                                                    }}
                                                                                /> */}

                                                                                <NumberFormat
                                                                                    thousandsGroupStyle="thousand"
                                                                                    // value={2456981}
                                                                                    className={`border-less-input at-blank-input  ${basicDivisionData.participation_fee.length > 0 && "won-text-input"}`}
                                                                                    decimalSeparator="."
                                                                                    value={basicDivisionData.participation_fee}
                                                                                    displayType="input"
                                                                                    type="text"
                                                                                    placeholder="참가비 입력"
                                                                                    thousandSeparator={true}
                                                                                    allowNegative={true}
                                                                                    onChange={(event: any) => {
                                                                                        handleChangeBasicDivision(index, event, "participation_fee");
                                                                                    }}
                                                                                    suffix="원" />
                                                                                {/* <AutosizeInput

                                                                                    className={`border-less-input won-text-blank-input ${basicDivisionData.participation_fee.length > 0 && "won-text-input"}`}
                                                                                    placeholder="참가비 입력"
                                                                                    value={basicDivisionData.participation_fee}

                                                                                    onChange={(event: any) => {
                                                                                        handleChangeBasicDivision(index, event, "participation_fee");
                                                                                    }}
                                                                              
                                                                                /> */}
                                                                                {/* {basicDivisionData.participation_fee &&
                                                                                    <span className="participation-fee won-text">원</span>
                                                                                } */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                // </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    {(basicDivisionData.recuitement_division === "Group" || basicDivisionData.recuitement_division === "") &&
                                                        <div className="single-form-row">
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>참가비</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom won-text-ctn">
                                                                            {/* <input
                                                                                className={`border-less-input won-text-blank-input ${basicDivisionData.participation_fee.length > 0 && "won-text-input"}`}
                                                                                type="text"
                                                                                // style={{ width: width + 'ch' }}
                                                                                placeholder="참가비 입력"
                                                                                value={basicDivisionData.participation_fee}
                                                                                onChange={(event: any) => {
                                                                                    handleChangeBasicDivision(index, event, "participation_fee");
                                                                                    // changeHandler(event)
                                                                                }}
                                                                            /> */}
                                                                            <NumberFormat
                                                                                thousandsGroupStyle="thousand"
                                                                                // value={2456981}
                                                                                className={`border-less-input at-blank-input ${basicDivisionData.participation_fee.length > 0 && "won-text-input"}`}
                                                                                decimalSeparator="."
                                                                                value={basicDivisionData.participation_fee}
                                                                                displayType="input"
                                                                                type="text"
                                                                                placeholder="참가비 입력"
                                                                                thousandSeparator={true}
                                                                                allowNegative={true}
                                                                                onChange={(event: any) => {
                                                                                    handleChangeBasicDivision(index, event, "participation_fee");
                                                                                }}
                                                                                suffix="원" />
                                                                            {/* <AutosizeInput
                                                                                className={`border-less-input won-text-blank-input ${basicDivisionData.participation_fee.length > 0 && "won-text-input"}`}
                                                                                placeholder="참가비 입력"
                                                                                value={basicDivisionData.participation_fee}
                                                                                onChange={(event: any) => {
                                                                                    handleChangeBasicDivision(index, event, "participation_fee");
                                                                                }}
                                                                            // onInput={(event: any) => {
                                                                            //     handleChangeBasicDivision(index, event, "participation_fee");
                                                                            // }}

                                                                            /> */}
                                                                            {/* {basicDivisionData.participation_fee &&
                                                                                <span className="participation-fee won-text">원</span>
                                                                            } */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="add-btn">
                                                    {
                                                        basicDivision.length > 1 && (
                                                            <div>
                                                                <Buttons
                                                                    type=""
                                                                    ButtonStyle="deleteBtn pm_addBtn"
                                                                    onClick={() => { handleRemoveRegistererFields(index); }}>
                                                                    {/* // onClick={() => { handleRemoveRegistererFields(); }}> */}
                                                                    삭제하기
                                                                </Buttons>

                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        basicDivision.length - 1 === index && (
                                                            <Buttons
                                                                type=""
                                                                ButtonStyle="addBtn pm_addBtn"
                                                                onClick={() => { handleAddRegistererFields(); }}>
                                                                추가하기
                                                            </Buttons>
                                                        )}
                                                </div>

                                            </>
                                        ))}
                                    </div>
                                </div>

                            </section>
                        }
                        {/* ====== End Division info========== */}

                        {/* ====== Start Award info========== */}

                        <section>
                            <div className="section-row">
                                <>
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>시상 정보</h3>
                                        </div>
                                        {basicAward.map((basicAwardData, index) => (
                                            <>
                                                <div className="repeatable-row">
                                                    <div className="single-form-row">
                                                        <div className="double-row">
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>시상 부문</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
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
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>시상 명칭</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
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
                                                    </div>
                                                    <div className="single-form-row">
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>시상 수량</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom">
                                                                        {/* <input
                                                                            className="border-less-input"
                                                                            type="text"
                                                                            placeholder="시상 수량"
                                                                            value={basicAwardData.volume_award}
                                                                            onChange={(event: any) => {
                                                                                handleInputChangeBasicAward(index, event, "volume_award");
                                                                            }}
                                                                        /> */}
                                                                        <NumberFormat
                                                                            className="custom-full-input"
                                                                            placeholder="시상 수량"
                                                                            name="volume_award"
                                                                            autoComplete="off"
                                                                            value={basicAwardData.volume_award}
                                                                            onChange={(event: any) => {
                                                                                handleInputChangeBasicAward(index, event, "volume_award");
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                    {
                                                        basicAward.length - 1 === index && (
                                                            <Buttons type=""
                                                                ButtonStyle="addBtn"
                                                                onClick={() => { handleAddAwardInfo(); }}>
                                                                추가하기
                                                            </Buttons>)}
                                                </div>
                                            </>
                                        ))}
                                    </div>

                                </>

                            </div>
                        </section>
                        {/* ====== End Award info========== */}


                        {/* ====== Start Participant info========== */}

                        <section>
                            {registerEvent.recruitment != "fromOutside" &&
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>참가자 정보</h3>
                                        </div>
                                        <div className="repeatable-row">
                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가자 수집 정보1</label>
                                                            </div>
                                                            <div className="table-custom-result">

                                                                <div className="input-custom d-flex justify-content-between">
                                                                    <label>이름</label>
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
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가자 수집 정보2</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom d-flex justify-content-between">
                                                                    <label>이메일 주소</label>
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
                                                </div>
                                            </div>

                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가자 수집 정보3</label>
                                                            </div>
                                                            <div className="table-custom-result">

                                                                <div className="input-custom d-flex justify-content-between">
                                                                    <label>휴대폰 번호</label>
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
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가자 수집 정보4</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom d-flex justify-content-between">
                                                                    <label>생년월일</label>
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
                                                </div>
                                            </div>

                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가자 수집 정보5</label>
                                                            </div>
                                                            <div className="table-custom-result">

                                                                <div className="input-custom d-flex justify-content-between">
                                                                    <label>성별</label>
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
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가자 수집 정보6</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom d-flex justify-content-between">
                                                                    <label>소속</label>
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
                                                </div>
                                            </div>

                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가자 수집 정보7</label>
                                                            </div>
                                                            <div className="table-custom-result">

                                                                <div className="input-custom d-flex justify-content-between">
                                                                    <label>주소</label>
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
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가자 수집 정보8</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom d-flex justify-content-between">
                                                                    <label>파일</label>
                                                                    <input
                                                                        type="checkbox"
                                                                        name="registermember"
                                                                        onChange={(e) => {
                                                                            handleChangeBox(e);
                                                                            setParticipantFile(e.target.checked);
                                                                        }}
                                                                        className="checkbox-input"
                                                                        checked={participantFile}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {participantAdd && addOtherInfo.map((find: any, index: number) => (
                                                <div className="single-form-row">
                                                    <div className="double-row">
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>{`참가자 수집 정보${index + 9}`}</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom">
                                                                        <div className="d-flex">
                                                                            <input
                                                                                type="text"
                                                                                name="otherInfo"
                                                                                autoComplete="off"
                                                                                value={find?.fieldName}
                                                                                onChange={(e) => {
                                                                                    handleInputChangeOtherInfoField(index, e)
                                                                                }}
                                                                                className="border-less-input"
                                                                                placeholder="기타 추가"
                                                                            />
                                                                            <input
                                                                                type="checkbox"
                                                                                name="registermember"
                                                                                // value={find?.fieldName}
                                                                                onChange={(e) => {
                                                                                    handleChangeBox(e);
                                                                                }}
                                                                                className="checkbox-input"

                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="table-full-row-with-btn">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-result inline-del-btn">
                                                                    <Buttons
                                                                        type=""
                                                                        ButtonStyle="deleteBtn"
                                                                        onClick={() => { removeOtherInfoField(index); }}
                                                                    >삭제하기
                                                                    </Buttons>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="ml-auto add-btn">
                                            <Buttons
                                                type=""
                                                ButtonStyle="addBtn"
                                                onClick={addOtherInfoField}
                                            >추가하기
                                            </Buttons>
                                        </div>
                                    </div>
                                </div>
                            }
                        </section>

                        {/* ====== End Participant info========== */}

                        {/* ====== Start Approving info========== */}
                        {registerEvent.recruitment != "fromOutside" &&
                            <section>
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="repeatable-row">
                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>참가자 승인방법</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="select-custom position-relative selector-set-main">
                                                                    {/* <select
                                                                        className={`${participantDisplay.approve_participants === "" ? "selector-set" : "selector-set-gray"} minimal form-custom-select`}
                                                                        value={participantDisplay.approve_participants}
                                                                        onChange={(event: any) => {
                                                                            setParticipantDisplay({ ...participantDisplay, approve_participants: event.target.value });
                                                                        }}
                                                                    >
                                                                        <option selected>선택</option>
                                                                        {approveparticipantsDropDown.map(({ value, label }) => (
                                                                            <option value={value}>{label}</option>
                                                                        ))}
                                                                    </select> */}
                                                                    <Select
                                                                        // className={`${registerEvent.sport_name === "종목 선택" ? "selector-set-gray" : "selector-set"} minimal form-custom-select`}
                                                                        id="appoveparticipant"
                                                                        className="minimal"
                                                                        placeholder="선택"
                                                                        name="appoveparticipant"
                                                                        options={approveparticipantsDropDown}
                                                                        value={selectOption(participantDisplay.approve_participants, "appoveparticipant")}
                                                                        onChange={(e: any) => {
                                                                            setParticipantDisplay({ ...participantDisplay, approve_participants: e.value });
                                                                        }}
                                                                    />
                                                                    {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>대기자 접수</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="select-custom position-relative selector-set-main">
                                                                    {/*    <select
                                                                        className={`${participantDisplay.awaiter_receipt === "" ? "selector-set" : "selector-set-gray"} minimal form-custom-select`}
                                                                        value={participantDisplay.awaiter_receipt}
                                                                        onChange={(event: any) => {
                                                                            setParticipantDisplay({ ...participantDisplay, awaiter_receipt: event.target.value });
                                                                        }}
                                                                    >
                                                                        <option selected>선택</option>
                                                                        {awaiterreceiptDropDown.map(({ value, label }) => (
                                                                            <option value={value}>{label}</option>

                                                                        ))}
                                                                    </select> */}
                                                                    <Select
                                                                        // className={`${registerEvent.sport_name === "종목 선택" ? "selector-set-gray" : "selector-set"} minimal form-custom-select`}
                                                                        id="awaiter"
                                                                        name="awaiter"
                                                                        className="minimal"
                                                                        placeholder="선택"
                                                                        options={awaiterreceiptDropDown}
                                                                        value={selectOption(participantDisplay.awaiter_receipt, "awaiter")}
                                                                        onChange={(e: any) => {
                                                                            setParticipantDisplay({ ...participantDisplay, awaiter_receipt: e.value });
                                                                        }}
                                                                    />
                                                                    {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
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
                        }
                        {/* ====== End Approving info========== */}


                        {/* ====== Start Person in Charge ========== */}
                        <section>
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>담당자 정보</h3>
                                    </div>
                                    <div className="repeatable-row">
                                        <div className="single-form-row">
                                            <div className="double-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>이름</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name="name"
                                                                    placeholder="이름"
                                                                    value={eventIncharge.name}
                                                                    autoComplete="off"
                                                                    onChange={(e: any) => {
                                                                        setEventIncharge({ ...eventIncharge, name: e.target.value });
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>이메일 주소</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name="email"
                                                                    placeholder="이메일 주소"
                                                                    value={eventIncharge.email}
                                                                    autoComplete="off"
                                                                    onChange={(e: any) => {
                                                                        setEventIncharge({ ...eventIncharge, email: e.target.value });
                                                                    }}
                                                                />
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
                                                            <label>전화번호</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name="phone"
                                                                    placeholder="전화번호"
                                                                    value={eventIncharge.phone_number}
                                                                    autoComplete="off"
                                                                    onChange={(e: any) => {
                                                                        const value = e.target.value;
                                                                        const re = /^[0-9\b]+$/;

                                                                        if (!value || value === "" || re.test(value)) {
                                                                            setEventIncharge({ ...eventIncharge, phone_number: e.target.value });
                                                                        }
                                                                    }}
                                                                    maxLength={11}
                                                                />
                                                                {/* <NumberFormat
                                                                    // format="###-####-####"
                                                                    className="custom-full-input"
                                                                    placeholder="전화번호"
                                                                    name="phone_number"
                                                                    autoComplete="off"
                                                                    value={eventIncharge.phone_number}
                                                                    onChange={(e: any) => { setEventIncharge({ ...eventIncharge, phone_number: e.target.value }); }}
                                                                    maxLength={11}
                                                                /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>실시간 문의채널</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    placeholder="실시간 문의채널"
                                                                    name="inguiry_channel"
                                                                    value={eventIncharge.inguiry_channel}
                                                                    autoComplete="off"
                                                                    onChange={(e: any) => {
                                                                        setEventIncharge({ ...eventIncharge, inguiry_channel: e.target.value });
                                                                    }}
                                                                />
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
                        {registerEvent.recruitment != "fromOutside" &&
                            <section>
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>이벤트 세부 정보</h3>
                                        </div>
                                        <div className="repeatable-row">
                                            <div className="single-form-row">
                                                <div className="table-full-row">
                                                    <div className="table-custom-full-row">
                                                        <div className="table-custom-label">
                                                            <label>이벤트명</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name="name"
                                                                    placeholder="이벤트명"
                                                                    value={registerEventDetail.event_name}
                                                                    autoComplete="off"
                                                                    onChange={(e) => handleChangeEventInfo(e, "event_name")}
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
                                                                <div className="date-and-time-row">
                                                                    <div className="select-date">
                                                                        <DatePicker
                                                                            id="startDate"
                                                                            name="start_date"
                                                                            value={registerEventDetail.start_date}
                                                                            selectsEnd
                                                                            startDate={startDate}
                                                                            endDate={endDate}
                                                                            minDate={startDate}
                                                                            autoComplete="off"
                                                                            placeholderText="날짜선택"
                                                                            dateFormat="yyyy.MM.dd"
                                                                            onChange={(e: Date | null) => {
                                                                                setStartDate(e)
                                                                                handleChangeEventInfo(e, "start_date")
                                                                            }}
                                                                        />
                                                                        <img src="/img/date-calender.svg" alt="" onClick={() => { onDatePickerClick("startDate"); }} />
                                                                    </div>
                                                                    <div className="select-time">
                                                                        <DatePicker
                                                                            id="startTime"
                                                                            name="start_time"
                                                                            value={registerEventDetail.start_time}
                                                                            showTimeSelect
                                                                            showTimeSelectOnly
                                                                            timeIntervals={15}
                                                                            autoComplete="off"
                                                                            timeCaption="Time"
                                                                            dateFormat="h:mm aa"
                                                                            placeholderText="시간선택"
                                                                            onChange={(e) => handleChangeEventInfo(e, "start_time")}
                                                                        />
                                                                        <img src="/img/time-calender.svg" alt="" onClick={() => { onTimePickerClick("startTime"); }} />
                                                                    </div>
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
                                                                <div className="date-and-time-row">
                                                                    <div className="select-date">
                                                                        <DatePicker
                                                                            id="endDate"
                                                                            name="end_date"
                                                                            value={registerEventDetail.end_date}
                                                                            selectsEnd
                                                                            startDate={startDate}
                                                                            endDate={endDate}
                                                                            minDate={startDate}
                                                                            autoComplete="off"
                                                                            placeholderText="날짜선택"
                                                                            dateFormat="yyyy.MM.dd"
                                                                            onChange={(e: Date | null) => {
                                                                                setStartDate(e)
                                                                                handleChangeEventInfo(e, "end_date")
                                                                            }}
                                                                        />

                                                                        <img src="/img/date-calender.svg" alt="" onClick={() => { onDatePickerClick("endDate"); }} />
                                                                    </div>
                                                                    <div className="select-time">
                                                                        <DatePicker
                                                                            id="endTime"
                                                                            name="end_time"
                                                                            value={registerEventDetail.end_time}
                                                                            showTimeSelect
                                                                            showTimeSelectOnly
                                                                            timeIntervals={15}
                                                                            autoComplete="off"
                                                                            timeCaption="Time"
                                                                            dateFormat="h:mm aa"
                                                                            placeholderText="시간선택"
                                                                            onChange={(e) => handleChangeEventInfo(e, "end_time")}
                                                                        />
                                                                        <img src="/img/time-calender.svg" alt="" onClick={() => { onTimePickerClick("endTime"); }} />
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
                                                            <label>장소</label>
                                                        </div>
                                                        <div className="selected-custom-input position-relative selector-set-main">
                                                            {/* <select
                                                                className="minimal  font-box"
                                                                name="place"
                                                                value={registerEventDetail.place}
                                                                onChange={(e) => setRegisterEventDetail({ ...registerEventDetail, place: e.target.value })}
                                                            >
                                                            {locationDropDown.map(({ value, label }) => (
                                                                <option value={value}>{label}</option>
                                                            ))}
                                                        </select> */}
                                                            <Select
                                                                // className={`${registerEvent.sport_name === "종목 선택" ? "selector-set-gray" : "selector-set"} minimal form-custom-select`}
                                                                id="places"
                                                                name="places"
                                                                className="minimal"

                                                                options={locationDropDown}
                                                                defaultValue={locationDropDown[0]}
                                                                value={selectOption(registerEventDetail.place, "places")}
                                                                onChange={(e: any) => {
                                                                    setRegisterEventDetail({ ...registerEventDetail, place: e.value });
                                                                }}
                                                            />
                                                            {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {registerEventDetail.place === "Offline" &&
                                                <div className="single-form-row">
                                                    <div className="double-row">
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>주소</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom position-relative">
                                                                        <input
                                                                            className="border-less-input"
                                                                            type="text"
                                                                            placeholder="주소 입력"
                                                                            name="mainaddress"
                                                                            value={registerEventDetail.main_address}
                                                                            autoComplete="off"
                                                                            onChange={(e) => {
                                                                                handleChangeEventInfo(e, "main_address")
                                                                            }
                                                                            }
                                                                            onClick={() => { setModalShow(true) }}
                                                                        />
                                                                        <img src="../../img/2345.png" className="searchbar" onClick={() => { setModalShow(true) }} alt="icon" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <KaKaoAddressAPIModal
                                                            show={modalShow}
                                                            onHide={() => setModalShow(false)}
                                                        />
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>상세 주소</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom">
                                                                        <input
                                                                            className="border-less-input"
                                                                            type="text"
                                                                            placeholder="상세 주소 입력"
                                                                            value={registerEventDetail.deatil_address}
                                                                            autoComplete="off"
                                                                            onChange={(e) => handleChangeEventInfo(e, "deatil_address")}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            }

                                            <div className="single-form-row">
                                                <div className="double-row">
                                                    {registerEventDetail.place === "Offline" &&
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>장소명</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom position-relative">
                                                                        <input
                                                                            className="border-less-input"
                                                                            type="text"
                                                                            name="location"
                                                                            placeholder="장소명 입력"
                                                                            value={registerEventDetail.main_address.split(" ")[0]}
                                                                            autoComplete="off"
                                                                            onChange={(e) => {
                                                                                handleChangeEventInfo(e, "location");
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>주최</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <input
                                                                        className="border-less-input"
                                                                        type="text"
                                                                        name="host"
                                                                        placeholder="주최명 입력"
                                                                        value={registerEventDetail.host}
                                                                        autoComplete="off"
                                                                        onChange={(e) => handleChangeEventInfo(e, "host")}
                                                                    />
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
                                                                <label>주관</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom position-relative">
                                                                    <input
                                                                        className="border-less-input"
                                                                        type="text"
                                                                        name="organizer"
                                                                        placeholder="주관명 입력"
                                                                        value={registerEventDetail.organizer}
                                                                        autoComplete="off"
                                                                        onChange={(e) => handleChangeEventInfo(e, "organizer")}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>후원</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom">
                                                                    <input
                                                                        className="border-less-input"
                                                                        type="text"
                                                                        name="sponsor"
                                                                        placeholder="후원명 입력"
                                                                        value={registerEventDetail.sponsor}
                                                                        autoComplete="off"
                                                                        onChange={(e) => handleChangeEventInfo(e, "sponsor")}
                                                                    />
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
                                                            <label>이벤트 소개</label>
                                                        </div>
                                                        <div className="table-custom-result">
                                                            <div className="input-custom position-relative">
                                                                <input
                                                                    className="border-less-input"
                                                                    type="text"
                                                                    name="summary"
                                                                    placeholder="이벤트 소개 입력"
                                                                    value={registerEventDetail.summary}
                                                                    autoComplete="off"
                                                                    onChange={(e) => handleChangeEventInfo(e, "summary")}
                                                                    maxLength={300}
                                                                // chars={10}
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
                                                                <label>이벤트 이미지</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom position-relative">
                                                                    {/* <p>{imageName ? (imageName.split("/")[imageName.split("/").length - 1]).split("?")[0] : '규정 및 유의사항 업로드'}</p> */}
                                                                    <p className={imageName === "" ? "placeholder-color" : ""}>{imageName ? "" : "이벤트 이미지 업로드"}{(imageName) ? (imageName) : ``}</p>
                                                                    <input
                                                                        className="border-less-input"
                                                                        id="attechImage"
                                                                        type="file"
                                                                        placeholder="이벤트 이미지 업로드"
                                                                        hidden
                                                                        src={imgSrc}
                                                                        onChange={(e: any) => {
                                                                            if (!e.target.files || e.target.files.length === 0) {
                                                                                setSelectedFile(undefined);
                                                                                return;
                                                                            }
                                                                            setSelectedFile(e.target.files[0]);
                                                                        }}
                                                                        alt="img"
                                                                    />
                                                                    <Button className="uploadBtn" onClick={attechImage} children="파일첨부"></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-full-row">
                                                        <div className="table-custom-full-row">
                                                            <div className="table-custom-label">
                                                                <label>규정 및 유의사항</label>
                                                            </div>
                                                            <div className="table-custom-result">
                                                                <div className="input-custom position-relative">
                                                                    {/* <p>규정 및 유의사항 업로드</p> */}
                                                                    <p className={notiesName === "" ? "placeholder-color" : ""}>{notiesName ? "" : "규정 및 유의사항 업로드"}{(notiesName) ? (notiesName) : ``}</p>
                                                                    {/* <div className={accommodationInformationData.image ? "" : "placeholder-color"}>{accommodationInformationData.image ? (accommodationInformationData.image.split("/")[accommodationInformationData.image.split("/").length - 1]).split("?")[0] : '규정 및 유의사항 업로드'}</div> */}
                                                                    <input
                                                                        className="border-less-input"
                                                                        id="attechImageNots"
                                                                        type="file"
                                                                        placeholder="규정 및 유의사항 업로드"
                                                                        hidden
                                                                        src={imageName}
                                                                        // value={registerEventDetail.notes}
                                                                        onChange={(e: any) => {
                                                                            if (!e.target.files || e.target.files.length === 0) {
                                                                                setSelectedImageFile(undefined);
                                                                                return;
                                                                            }
                                                                            setSelectedImageFile(e.target.files[0]);
                                                                        }}
                                                                    />
                                                                    <Button className="uploadBtn" onClick={attechImageNots} children="파일첨부"></Button>
                                                                    {/* <div>
                                                                    <span>{(registerEventDetail.notes.split("/")[registerEventDetail.notes.split("/").length - 1]).split("?")[0]}</span>
                                                                </div> */}
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
                        }
                        {/* ====== End Event detail ========== */}


                        {/* ====== Start Event info detail ========== */}

                        <section className="ck-editor-section">
                            <div className="section-row">
                                <div className="table-header-title">
                                    <div className="form-title-row">
                                        <h3>이벤트 상세 정보</h3>
                                    </div>
                                    <div className="b-1"></div>

                                    <div className="editor-section-view">
                                        <MessageCkEditor
                                            onChange={handleChange}
                                            data={data}
                                            placeholder="이곳에 행사 정보를 입력하세요."
                                        />
                                    </div>
                                    {registerEvent.recruitment != "fromOutside" &&
                                        <div className="single-form-row">
                                            <div className="table-full-row">
                                                <div className="table-custom-full-row">
                                                    <div className="table-custom-label">
                                                        <label>취소 및 환불규정</label>
                                                    </div>
                                                    <div className="table-custom-result">
                                                        <div className="input-custom position-relative">
                                                            <input
                                                                className="border-less-input"
                                                                type="text"
                                                                name="policy"
                                                                placeholder="취소 및 환불규정 입력"
                                                                autoComplete="off"
                                                                value={registerEventTourinfo.policy}
                                                                onChange={(e: any) => {
                                                                    setRegisterEventTourinfo({ ...registerEventTourinfo, policy: e.target.value });
                                                                }}
                                                                maxLength={200}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </section>

                        {/* ====== End Event info detail ========== */}

                        {/* ====== Start Tour info ========== */}
                        {registerEvent.recruitment != "fromOutside" &&
                            <section>
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>관광 정보</h3>
                                        </div>
                                        {tourDetail.map((tourDetailData, index) => (
                                            <>
                                                <div className="repeatable-row">
                                                    <div className="single-form-row">
                                                        <div className="double-row">
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>상호명</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
                                                                                type="text"
                                                                                name="tour_spot"
                                                                                placeholder="상호명 입력"
                                                                                autoComplete="off"
                                                                                value={tourDetailData.tour_spot_name}
                                                                                onChange={(event: any) => {
                                                                                    handleInputChangeTourDetail(index, event, "tour_spot_name");
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>연락처</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
                                                                                type="text"
                                                                                name="phone"
                                                                                placeholder="연락처 입력"
                                                                                autoComplete="off"
                                                                                value={tourDetailData.phone_number}
                                                                                onChange={(e: any) => {
                                                                                    const value = e.target.value;
                                                                                    const re = /^[0-9\b]+$/;

                                                                                    if (!value || value === "" || re.test(value)) {
                                                                                        handleInputChangeTourDetail(index, e, "phone_number");
                                                                                    }
                                                                                }}
                                                                                maxLength={11}
                                                                            />
                                                                            {/* <NumberFormat
                                                                                // format="###-####-####"
                                                                                className="custom-full-input"
                                                                                placeholder="연락처 입력"
                                                                                name="phone_number"
                                                                                autoComplete="off"
                                                                                value={tourDetailData.phone_number}
                                                                                onChange={(event: any) => {
                                                                                    handleInputChangeTourDetail(index, event, "phone_number");
                                                                                }}
                                                                                maxLength={11}
                                                                            /> */}
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
                                                                        <label>주소</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom position-relative">
                                                                            <input
                                                                                className="border-less-input"
                                                                                type="text"
                                                                                name="main_add"
                                                                                placeholder="주소 입력"
                                                                                autoComplete="off"
                                                                                value={tourDetailData.main_address}
                                                                                onChange={(event: any) => {
                                                                                    handleInputChangeTourDetail(index, event, "main_address");
                                                                                }}
                                                                                onClick={() => { setModalShowTour(true) }}
                                                                            />
                                                                            <img src="../../img/2345.png" className="searchbar" onClick={() => { setModalShowTour(true) }} alt="icon" />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>상세 주소</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
                                                                                type="text"
                                                                                name="detail_add"
                                                                                placeholder="상세 주소 입력"
                                                                                autoComplete="off"
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
                                                    </div>
                                                    <KaKaoAddressAPIModal
                                                        show={modalShowTour}
                                                        onHide={() => setModalShowTour(false)}
                                                    />
                                                    {/* <KaKaoAddressAPIModal
                                                        show={modalShow}
                                                        onHide={() => setModalShow(false)}
                                                    /> */}


                                                    <div className="single-form-row">
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>관광지 소개</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom position-relative">
                                                                        <input
                                                                            className="border-less-input"
                                                                            type="text"
                                                                            placeholder="관광지 소개 입력"
                                                                            autoComplete="off"
                                                                            value={tourDetailData.introduction}
                                                                            onChange={(event: any) => {
                                                                                handleInputChangeTourDetail(index, event, "introduction");
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
                                                                        <label>관광지 이미지</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom position-relative">
                                                                            {/* <p>관광지 이미지 업로드</p> */}
                                                                            <input
                                                                                id={`tour-file${index}`}
                                                                                type="file"
                                                                                placeholder="관광지 이미지 업로드"
                                                                                autoComplete="off"
                                                                                src={tourDetailData.image}
                                                                                hidden
                                                                                onChange={(e: any) => {
                                                                                    handleInputChangeImageTour(index, e.target.files[0], "file");
                                                                                }}
                                                                                alt="img"
                                                                            />
                                                                            <Button className="uploadBtn" onClick={() => { sportImage(`tour-file${index}`) }} children="파일 첨부"></Button>
                                                                            <div>
                                                                                {/* <span>{(tourDetailData.image.split("/")[tourDetailData.image.split("/").length - 1]).split("?")[0]}</span> */}
                                                                                <div className={tourDetailData.image ? "" : "placeholder-color"}>{tourDetailData.image ? (tourDetailData.image.split("/")[tourDetailData.image.split("/").length - 1]).split("?")[0] : '관광지 이미지 업로드'}</div>
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


                                                <div className="add-btn">
                                                    {
                                                        tourDetail.length > 1 && (
                                                            <div>
                                                                <Buttons
                                                                    type=""
                                                                    ButtonStyle="deleteBtn"
                                                                    onClick={() => { handleRemoveTourInfo(index); }}>삭제하기
                                                                </Buttons>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        tourDetail.length - 1 === index && (
                                                            <Buttons type=""
                                                                ButtonStyle="addBtn"
                                                                onClick={() => { handleAddTourInfo(); }}
                                                            >추가하기</Buttons>
                                                        )}
                                                </div>

                                            </>
                                        ))}
                                    </div>
                                </div>

                            </section>
                        }
                        {/* ====== End Tour info ========== */}


                        {/* ====== Start Restaurant info ========== */}
                        {registerEvent.recruitment != "fromOutside" &&
                            <section>
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>맛집 정보</h3>
                                        </div>
                                        {restaurantInformation.map((restaurantInformationData, index) => (
                                            <>
                                                <div className="repeatable-row">
                                                    <div className="single-form-row">
                                                        <div className="double-row">
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>상호명</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
                                                                                type="text"
                                                                                placeholder="상호명 입력"
                                                                                autoComplete="off"
                                                                                value={restaurantInformationData.restaurant_name}
                                                                                onChange={(event: any) => {
                                                                                    handleInputChangeRestaurantInformation(index, event, "restaurant_name");
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>연락처</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
                                                                                type="text"
                                                                                name="phone"
                                                                                placeholder="연락처 입력"
                                                                                autoComplete="off"
                                                                                value={restaurantInformationData.phone_number}
                                                                                onChange={(e: any) => {
                                                                                    const value = e.target.value;
                                                                                    const re = /^[0-9\b]+$/;

                                                                                    if (!value || value === "" || re.test(value)) {
                                                                                        handleInputChangeRestaurantInformation(index, e, "phone_number");
                                                                                    }
                                                                                }}
                                                                                maxLength={11}
                                                                            />
                                                                            {/* <NumberFormat
                                                                                // format="###-####-####"
                                                                                className="custom-full-input"
                                                                                placeholder="연락처 입력"
                                                                                name="phone_number"
                                                                                autoComplete="off"
                                                                                value={restaurantInformationData.phone_number}
                                                                                onChange={(event: any) => { handleInputChangeRestaurantInformation(index, event, "phone_number") }}
                                                                                maxLength={11}
                                                                            /> */}
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
                                                                        <label>주소</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom position-relative">
                                                                            <input
                                                                                className="border-less-input"
                                                                                type="text"
                                                                                placeholder="주소 입력"
                                                                                autoComplete="off"
                                                                                value={restaurantInformationData.main_address}
                                                                                onChange={(event: any) => {
                                                                                    handleInputChangeRestaurantInformation(index, event, "main_address");
                                                                                }}
                                                                                onClick={() => { setModalShowRes(true) }}
                                                                            />
                                                                            <img src="../../img/2345.png" className="searchbar" onClick={() => { setModalShowRes(true) }} alt="icon" />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>상세 주소</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
                                                                                type="text"
                                                                                placeholder="상세 주소 입력"
                                                                                autoComplete="off"
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
                                                    </div>
                                                    <KaKaoAddressAPIModal
                                                        show={modalShowRes}
                                                        onHide={() => setModalShowRes(false)}
                                                    />

                                                    <div className="single-form-row">
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>맛집 소개</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom position-relative">
                                                                        <input
                                                                            type="text"
                                                                            className="border-less-input"
                                                                            placeholder="맛집 소개 입력"
                                                                            autoComplete="off"
                                                                            value={restaurantInformationData.introduction}
                                                                            onChange={(event: any) => {
                                                                                handleInputChangeRestaurantInformation(index, event, "introduction");
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
                                                                        <label>맛집 이미지</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom position-relative">
                                                                            {/* <p>맛집 이미지 업로드</p> */}
                                                                            <input
                                                                                id={`restaurant-file${index}`}
                                                                                type="file"
                                                                                placeholder="맛집 이미지 업로드"
                                                                                autoComplete="off"
                                                                                src={restaurantInformationData.image}
                                                                                hidden
                                                                                onChange={(e: any) => {
                                                                                    handleInputChangeImageRestaurant(index, e.target.files[0], "file");
                                                                                }}
                                                                                alt="img"
                                                                            />
                                                                            <Button className="uploadBtn" onClick={() => { restaurantImage(`restaurant-file${index}`) }} children="파일 첨부"></Button>
                                                                            <div>
                                                                                <div className={restaurantInformationData.image ? "" : "placeholder-color"}>{restaurantInformationData.image ? (restaurantInformationData.image.split("/")[restaurantInformationData.image.split("/").length - 1]).split("?")[0] : '맛집 이미지 업로드'}</div>
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

                                                <div className="add-btn">
                                                    {
                                                        restaurantInformation.length > 1 && (
                                                            <div>
                                                                <Buttons
                                                                    type=""
                                                                    ButtonStyle="deleteBtn"
                                                                    onClick={() => { handleRemoveRestaurantInfo(index); }}>삭제하기
                                                                </Buttons>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        restaurantInformation.length - 1 === index && (
                                                            <Buttons type=""
                                                                ButtonStyle="addBtn"
                                                                onClick={() => { handleAddRestaurantInfo(); }}
                                                            >추가하기</Buttons>
                                                        )}
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        }
                        {/* ====== End Restaurant info ========== */}


                        {/* ====== Start Accommodation Info ========== */}

                        {registerEvent.recruitment != "fromOutside" &&
                            <section>
                                <div className="section-row">
                                    <div className="table-header-title">
                                        <div className="form-title-row">
                                            <h3>숙박 정보</h3>
                                        </div>
                                        {accommodationInformation.map((accommodationInformationData, index, input: any) => (
                                            <>
                                                <div className="repeatable-row">
                                                    <div className="single-form-row">
                                                        <div className="double-row">
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>상호명</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                type="text"
                                                                                name="accommodation"
                                                                                className="border-less-input"
                                                                                placeholder="상호명 입력"
                                                                                autoComplete="off"
                                                                                value={accommodationInformationData.accommodation_name}
                                                                                onChange={(event: any) => {
                                                                                    handleInputChangeAccommodationInformation(index, event, "accommodation_name");
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>연락처</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                className="border-less-input"
                                                                                type="text"
                                                                                name="phone"
                                                                                placeholder="연락처 입력"
                                                                                autoComplete="off"
                                                                                value={accommodationInformationData.phone_number}
                                                                                onChange={(e: any) => {
                                                                                    const value = e.target.value;
                                                                                    const re = /^[0-9\b]+$/;

                                                                                    if (!value || value === "" || re.test(value)) {
                                                                                        handleInputChangeAccommodationInformation(index, e, "phone_number");
                                                                                    }
                                                                                }}
                                                                                maxLength={11}
                                                                            />
                                                                            {/* <NumberFormat
                                                                                // format="###-####-####"
                                                                                className="custom-full-input"
                                                                                placeholder="연락처 입력"
                                                                                name="phone_number"
                                                                                autoComplete="off"
                                                                                value={accommodationInformationData.phone_number}
                                                                                onChange={(event: any) => handleInputChangeAccommodationInformation(index, event, "phone_number")}
                                                                                maxLength={11}
                                                                            /> */}
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
                                                                        <label>주소</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom position-relative">
                                                                            <input
                                                                                type="text"
                                                                                className="border-less-input"
                                                                                name="main_add"
                                                                                placeholder="주소 입력"
                                                                                autoComplete="off"
                                                                                value={accommodationInformationData.main_address}
                                                                                onChange={(event: any) => {
                                                                                    handleInputChangeAccommodationInformation(index, event, "main_address");
                                                                                }}
                                                                                onClick={() => { setModalShowAcc(true) }}
                                                                            />
                                                                            <img src="../../img/2345.png" className="searchbar" onClick={() => { setModalShowAcc(true) }} alt="icon" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="table-full-row">
                                                                <div className="table-custom-full-row">
                                                                    <div className="table-custom-label">
                                                                        <label>상세 주소</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom">
                                                                            <input
                                                                                type="text"
                                                                                name="detail_add"
                                                                                className="border-less-input"
                                                                                placeholder="상세 주소 입력"
                                                                                autoComplete="off"
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
                                                    </div>
                                                    <KaKaoAddressAPIModal
                                                        show={modalShowAcc}
                                                        onHide={() => setModalShowAcc(false)}
                                                    />

                                                    <div className="single-form-row">
                                                        <div className="table-full-row">
                                                            <div className="table-custom-full-row">
                                                                <div className="table-custom-label">
                                                                    <label>숙박 소개</label>
                                                                </div>
                                                                <div className="table-custom-result">
                                                                    <div className="input-custom position-relative">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="숙박 소개 입력"
                                                                            className="border-less-input"
                                                                            autoComplete="off"
                                                                            value={accommodationInformationData.introduction}
                                                                            onChange={(event: any) => {
                                                                                handleInputChangeAccommodationInformation(index, event, "introduction");
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
                                                                        <label>숙박 이미지</label>
                                                                    </div>
                                                                    <div className="table-custom-result">
                                                                        <div className="input-custom position-relative">
                                                                            {/* <p>맛집 이미지 업로드</p> */}
                                                                            <input
                                                                                id={`accommodation-file${index}`}
                                                                                type="file"
                                                                                placeholder="숙박 이미지 업로드"
                                                                                autoComplete="off"
                                                                                hidden
                                                                                src={accommodationInformationData.image}
                                                                                onChange={(e: any) => {
                                                                                    handleInputChangeImageAcc(index, e.target.files[0], "file");
                                                                                }
                                                                                }
                                                                                alt="img"
                                                                            />
                                                                            <Button className="uploadBtn" onClick={() => { accommodationImage(`accommodation-file${index}`) }} children="파일 첨부"></Button>
                                                                            <div>
                                                                                <div className={accommodationInformationData.image ? "" : "placeholder-color"}>{accommodationInformationData.image ? (accommodationInformationData.image.split("/")[accommodationInformationData.image.split("/").length - 1]).split("?")[0] : '숙박 이미지 업로드'}</div>
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

                                                <div className="add-btn">
                                                    {
                                                        accommodationInformation.length > 1 && (
                                                            <div>
                                                                <Buttons
                                                                    type=""
                                                                    ButtonStyle="deleteBtn event"
                                                                    onClick={() => { handleRemoveAccommodationInfo(index); }}>삭제하기
                                                                </Buttons>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        accommodationInformation.length - 1 === index && (
                                                            <Buttons type=""
                                                                ButtonStyle="addBtn"
                                                                onClick={() => { handleAddaAccommodationInfo(); }}
                                                            >추가하기</Buttons>
                                                        )}
                                                </div>

                                            </>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        }
                        {/* ====== End Accommodation Info ========== */}

                    </div>
                </div>
            </div>
        </div >
    );
};

export default RegisterEvent