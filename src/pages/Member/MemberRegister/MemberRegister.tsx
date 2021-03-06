import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ApiGet, ApiPatch, ApiPost } from "../../../helper/API/ApiData";
import moment from "moment";
import { useHistory } from "react-router";
import "./MemberRegister.css";
import NumberFormat from "react-number-format";
import Buttons from "../../../component/Buttons/Buttons";
import Select from "react-select";

interface userDataField {
  id: string;
  user_type: string;
  markating_info: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  bank_phone_number: string;
  gender: string;
  dob: string;
  affiliation: string;
  rest_address: string;
  interests: string;
  company_name: string;
  department: string;
  position: string;
  bank_name: string;
  acount_holder: string;
  ac_number: string;
}

const MemberRegister = () => {
  let totalSelectedData: any = [];
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id")?.toString() ?? "";
  const userDataField: userDataField = {
    id: "",
    markating_info: "",
    user_type: "General",
    name: "",
    email: "",
    password: "",
    phone_number: "",
    bank_phone_number: "",
    gender: "",
    dob: "",
    affiliation: "",
    rest_address: "",
    interests: "",
    company_name: "",
    department: "",
    position: "",
    bank_name: "",
    acount_holder: "",
    ac_number: "",
  };
  const [interestsLableList, setInterestsLableList] = useState({
    football: false,
    basketball: false,
    baseball: false,
    volleyball: false,
    marathon: false,
    bike: false,
    swimming: false,
    golf: false,
    tennis: false,
    badminton: false,
    table_Tennis: false,
    bowling: false,
    billiards: false,
    hado: false,
  });
  const [specificInterestData, setSpecificInterestData] = useState<any[]>([]);
  const [addOtherInfo, setAddOtherInfo] = useState<any[]>([]);
  const [selectedInterestsData, setSelectedInterestsData] = useState<any[]>([]);
  const history = useHistory();
  const [userData, setUserData] = useState(userDataField);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>();
  const [isAddOtherIntrest, setIsAddOtherIntrest] = useState(false);
  const [emailValidator, setEmailValidator] = useState(false);

  const memberType = [
    { value: "General", label: "?????? ??????" },
    { value: "Business", label: "?????? ??????" },
  ];

  const markatingInfo = [
    { value: "Agree", label: "??????" },
    { value: "Disagree", label: "????????? " },
  ];

  const gender = [
    { value: "MALE", label: "??????" },
    { value: "FEMALE", label: "??????" },
  ];

  const bankList = [
    { value: "????????????", label: "????????????" },
    { value: "????????????", label: "????????????" },
    { value: "????????????", label: "????????????" },
    { value: "????????????", label: "????????????" },
    { value: "????????????", label: "????????????" },
    { value: "????????????", label: "????????????" },
    { value: "????????????", label: "????????????" },
    { value: "???????????????", label: "???????????????" },
    { value: "????????????", label: "????????????" },
    { value: "????????????", label: "????????????" },
    { value: "SC??????", label: "SC??????" },
    { value: "????????????", label: "????????????" },
    { value: "??????", label: "??????" },
    { value: "????????????", label: "????????????" },
    { value: "??????", label: "??????" },
    { value: "????????????", label: "????????????" },
    { value: "????????????", label: "????????????" },
    { value: "???????????????", label: "???????????????" },
  ];


  const errors = {
    nameError: "",
    emailError: "",
    passwordError: "",
    phoneNumberError: "",
    bankPhoneNumberError: "",
    dobError: "",
    affiliationError: "",
    restAddressError: "",
    interestsError: "",
    companyNameError: "",
    departmentError: "",
    positionError: "",
    bankNameError: "",
    acountHolderError: "",
    acNumberError: "",
  };

  const [validationError, setValidationError] = useState(errors);

  // useEffect(() => {
  //   userData.user_type = memberType[0].value;
  //   userData.markating_info = markatingInfo[0].value;
  //   userData.gender = gender[0].value;
  // }, []);

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // const handleSelect = (e: any) => {
  //   setUserData({ ...userData, [e.name]: e.target.value });
  // };

  const handleBirthDate = (dateOfBirth: Date | null) => {
    setDateOfBirth(dateOfBirth);
    if (!dateOfBirth) {
      setUserData({ ...userData, dob: "" });
    } else {
      setUserData({
        ...userData,
        dob: moment(dateOfBirth).format("YYYY-MM-DD"),
      });
    }
  };

  const handleCheckboxChange = (e: any) => {
    setInterestsLableList({
      ...interestsLableList,
      [e.target.name]: e.target.checked,
    });

    setValidationError({
      ...validationError,
      interestsError: "",
    });

    //[+] Selected Interest added into array and use when data post
    let interestName: any = e.target.name;
    if (specificInterestData.includes(interestName)) {
      let deletedUncheckedInterest = specificInterestData.filter(
        (interest) => interest !== interestName
      );
      setSpecificInterestData(deletedUncheckedInterest);
    } else {
      setSpecificInterestData([...specificInterestData, interestName]);
    }
  };

  const setCheckboxValue = () => {
    let getInterestList: any = {};

    if (specificInterestData.length > 0) {
      specificInterestData.forEach((interest: any) => {
        Object.assign(getInterestList, { [interest]: true });
      });
      setInterestsLableList({ ...interestsLableList, ...getInterestList });
    }
  };

  const handleInputChangeOtherInfoField = (
    index: number,
    event: any
  ) => {
    setValidationError({
      ...validationError,
      interestsError: "",
    });
    const values = [...addOtherInfo];
    values[index].label = event.target.value;
    values[index].value = event.target.value;

    setAddOtherInfo(values);
  };


  const addOtherInfoField = () => {
    setIsAddOtherIntrest(true)
    const values = [...addOtherInfo];
    values.push({
      label: "",
      checked: true,
      value: ""
    });
    setAddOtherInfo(values)
  }


  const removeOtherInfoField = (index: number) => {
    if (addOtherInfo.length >= 1) {
      const values = [...addOtherInfo];
      values.splice(index, 1);
      setAddOtherInfo(values);
      if (addOtherInfo.length === 1) {
        setIsAddOtherIntrest(false)
      }
    }
  };


  const setOtherInterest = () => {
    let afterFilterInterest = [];
    let interestsLableListArr = Object.keys(interestsLableList);
    let otherIntArr = [];
    let specificIntArr = [];
    for (let interest of selectedInterestsData) {
      if (!interestsLableListArr.includes(interest)) {
        afterFilterInterest.push(interest);
        otherIntArr.push({ label: interest, checked: true, value: interest })
      } else {
        specificIntArr.push(interest);
      }
    }

    setAddOtherInfo(otherIntArr);
    setSpecificInterestData(specificIntArr);
    otherIntArr.length > 0 && setIsAddOtherIntrest(true);
    setCheckboxValue();

  };

  //[+] GET API - Get Specific User Data By id
  const getMemberDataByID = () => {
    ApiGet(`user/${id}`)
      .then((res: any) => {
        setUserData(
          res.data && {
            ...userData,
            user_type: res.data.user_type,
            rest_address: res.data.rest_address,
            affiliation: res.data.affiliation,
            email: res.data.email,
            dob: res.data.dob,
            gender: res.data.gender,
            interests: res.data.interests,
            markating_info: res.data.markating_info,
            name: res.data.name,
            password: res.data.password,
            phone_number: res.data.phone_number,
            bank_phone_number: res.data.bank_phone_number,
            acount_holder: res.data.acount_holder,
            ac_number: res.data.ac_number,
            bank_name: res.data.bank_name,
            company_name: res.data.company_name,
            department: res.data.department,
            position: res.data.position,
          }
        );
        setDateOfBirth(new Date(res.data.dob));

        if (res.data.interests !== "") {
          setSelectedInterestsData(res.data.interests.split(","));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMemberDataByID();
  }, []);

  useEffect(() => {
    if (selectedInterestsData.length > 0) {
      setOtherInterest();
    }
  }, [selectedInterestsData]);
  useEffect(() => {
    if (specificInterestData.length > 0) {
      setCheckboxValue();
    }
  }, [specificInterestData]);

  //[+] Validate Form
  const validateForm = () => {
    let flag = true;
    if (userData.phone_number.length < 11) {
      setValidationError({
        ...validationError,
        // phoneNumberError: "Please enter valid mobile number.",
        phoneNumberError: "????????? ?????????  ?????? ????????? ?????????.",
      });
      flag = false;
    }
    // if (userData.name === "") {
    //   setValidationError({
    //     ...validationError,
    //     // nameError: "This is a required information.",
    //     nameError: "??? ????????? ???????????????."
    //   });
    //   flag = false;
    // }

    const validEmail: any = new RegExp(
      "^[a-z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    if (!validEmail.test(userData.email)) {
      setValidationError({
        ...validationError,
        // emailError: "Please enter valid email address.",
        emailError: "???????????? ?????? ????????? ?????????.",
      });
      flag = false;
    }
    if (userData.password.length < 8) {
      setValidationError({
        ...validationError,
        passwordError: "??????????????? 8??? ?????? ??????????????????."
        // passwordError: "Please enter password at least 8 character."
      });
      flag = false;
    }


    // if (totalSelectedData.length <= 0) {
    //   setValidationError({
    //     ...validationError,
    //     // interestsError: "This is a required information.",
    //     interestsError: "??? ????????? ???????????????."
    //   });
    //   flag = false;
    // }


    if (userData.user_type === "General") {
      if (userData.dob === "") {
        setValidationError({
          ...validationError,
          // dobError: "This is a required information.",
          dobError: "??? ????????? ???????????????."
        });
        flag = false;
      }
      if (userData.affiliation === "") {
        setValidationError({
          ...validationError,
          // affiliationError: "This is a required information.",
          affiliationError: "??? ????????? ???????????????."
        });
        flag = false;
      }
      if (userData.rest_address === "") {
        setValidationError({
          ...validationError,
          restAddressError: "??? ????????? ???????????????.",
        });
        flag = false;
      }
    }

    if (userData.user_type === "Business") {
      if (userData.bank_phone_number.length < 11) {
        setValidationError({
          ...validationError,
          // bankPhoneNumberError: "Please enter valid register mobile number with your bank.",
          bankPhoneNumberError: "????????? ????????? ?????? ????????? ????????? ???????????????."
        });
        flag = false;
      }
      if (userData.company_name === "") {
        setValidationError({
          ...validationError,
          // companyNameError: "This is a required information.",
          companyNameError: "??? ????????? ???????????????."
        });
        flag = false;
      }
      if (userData.department === "") {
        setValidationError({
          ...validationError,
          // departmentError: "This is a required information.",
          departmentError: "??? ????????? ???????????????."
        });
        flag = false;
      }
      if (userData.position === "") {
        setValidationError({
          ...validationError,
          // positionError: "This is a required information.",
          positionError: "??? ????????? ???????????????."
        });
        flag = false;
      }
      if (userData.bank_name === "") {
        setValidationError({
          ...validationError,
          // bankNameError: "This is a required information.",
          bankNameError: "??? ????????? ???????????????."
        });
        flag = false;
      }
      if (userData.acount_holder === "") {
        setValidationError({
          ...validationError,
          // acountHolderError: "This is a required information.",
          acountHolderError: "??? ????????? ???????????????."
        });
        flag = false;
      }
      if (userData.ac_number === "") {
        setValidationError({
          ...validationError,
          // acNumberError: "This is a required information.",
          acNumberError: "??? ????????? ???????????????."
        });
        flag = false;
      }
    }

    return flag;
  };

  const registerMember = () => {
    // combineInterestData();
    let otherInterestDataValue = []
    for (const interest of addOtherInfo) {
      otherInterestDataValue.push(interest.value);
    }
    let val = [...otherInterestDataValue, ...specificInterestData];

    totalSelectedData = val;
    setSelectedInterestsData(val);

    if (validateForm() === true) {
      if (id !== "") {
        //[+] PATCH API - Edit User Data
        if (userData.user_type === "General") {
          ApiPatch("admin/editGeneral", {
            id: id,
            user_type: userData.user_type,
            name: userData.name,
            phone_number: userData.phone_number,
            password: userData.password,
            gender: userData.gender,
            dob: userData.dob,
            affiliation: userData.affiliation,
            address: userData.rest_address,
            rest_address: userData.rest_address,
            interests: val.join(","),
            markating_info: userData.markating_info,
          })
            .then((res: any) => {
              history.push("/member/member-list");
              setUserData(userDataField);
            })
            .catch((error: any) => {
              console.error(error);
            });
        }

        if (userData.user_type === "Business") {
          ApiPatch("admin/editBusiness", {
            id: id,
            user_type: userData.user_type,
            name: userData.name,
            phone_number: userData.phone_number,
            bank_phone_number: userData.bank_phone_number,
            password: userData.password,
            company_name: userData.company_name,
            department: userData.department,
            position: userData.position,
            bank_name: userData.bank_name,
            ac_number: userData.ac_number,
            acount_holder: userData.acount_holder,
            interests: val.join(","),
            markating_info: userData.markating_info,
          })
            .then((res: any) => {
              history.push("/member/member-list");
              setUserData(userDataField);
            })
            .catch((error: any) => {
              console.error(error);
            });
        }
      } else {
        //[+] POST API - Register User

        if (userData.user_type === "General") {
          ApiPost("admin/registerGeneralByAdmin", {
            user_type: userData.user_type,
            name: userData.name,
            phone_number: userData.phone_number,
            password: userData.password,
            gender: userData.gender,
            dob: userData.dob,
            affiliation: userData.affiliation,
            email: userData.email,
            address: userData.rest_address,
            rest_address: userData.rest_address,
            interests: val.join(","),
            markating_info: userData.markating_info,
          })
            .then((res: any) => {
              history.push("/member/member-list");
              setUserData(userDataField);
            })
            .catch((error: any) => {
              if (error == "Email Already Exist!") {
                setEmailValidator(true)
              }
            });
        }

        if (userData.user_type === "Business") {
          ApiPost("admin/registerBusinessByAdmin", {
            user_type: userData.user_type,
            name: userData.name,
            phone_number: userData.phone_number,
            bank_phone_number: userData.bank_phone_number,
            password: userData.password,
            email: userData.email,
            company_name: userData.company_name,
            department: userData.department,
            position: userData.position,
            bank_name: userData.bank_name,
            ac_number: userData.ac_number,
            acount_holder: userData.acount_holder,
            interests: val.join(","),
            markating_info: userData.markating_info,
          })
            .then((res: any) => {
              history.push("/member/member-list");
              setUserData(userDataField);
            })
            .catch((error: any) => {
              console.error(error);
            });
        }
      }
    }
  };
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
    if (dropDownName === "user") {
      list = memberType
    }
    if (dropDownName === "markating_info") {
      list = markatingInfo
    }
    if (dropDownName === "gender") {
      list = gender
    }
    if (dropDownName === "bank_name") {
      list = bankList
    }

    let findData = list.find((data: any) => data?.value === label)
    // debugger;

    let dataObj = undefined
    if (findData?.value) {
      dataObj = {
        label: findData?.label,
        value: findData?.value,
      }
    }
    return dataObj;
  }

  return (
    <>
      <div className="register-event-page">
        <div className="register-event-page-inner">
          <div className="page-title-btn">
            <div className="header-page">
              {id ? <h3>?????? ??????</h3> : <h3>?????? ??????</h3>}
            </div>
            <div className="edit-back-btn ml-auto">
              <button
                className="BackBtn"
                onClick={() => {
                  history.push("/member/member-list");
                }}
              >
                ????????????
              </button>
              <button className="saveBtn" onClick={registerMember}>
                ??????
              </button>

            </div>
          </div>
          <div className="custom-full-table">

            <section>
              <div className="section-row">
                <div className="table-header-title">
                  <div className="form-title-row">
                    {id ? <h3>?????? ?????? ??????</h3> : <h3>?????? ??????</h3>}
                  </div>
                  <div className="repeatable-row select-dropdown mj-selectdropDown">

                    <div className="single-form-row">
                      <div className="double-row">
                        <div className="table-full-row">
                          <div className="table-custom-full-row">
                            <div className="table-custom-label">
                              <label>?????? ??????</label>
                            </div>
                            <div className="table-custom-result">
                              <div className="selected-custom-full position-relative selector-set-main">
                                {/* <select
                                  className=" selector-set-gray minimal"
                                  name="user_type"
                                  value={userData.user_type}
                                  onChange={(e: any) => {
                                    handleChange(e);
                                  }}
                                >
                                  {memberType.map(({ value, label }) => (
                                    <option value={value}>{label}</option>
                                  ))}
                                </select> */}


                                <Select
                                  className="minimal"
                                  id="user_type"
                                  name="user"
                                  placeholder="??????"
                                  options={memberType}
                                  // styles={customStyles}
                                  // defaultValue={memberType[0]}
                                  value={selectOption(userData.user_type, "user")}
                                  onChange={(e: any) => {
                                    setUserData({ ...userData, user_type: e.value });
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
                              <label>????????? ????????????</label>
                            </div>
                            <div className="table-custom-result">
                              <div className="selected-custom-full position-relative selector-set-main">
                                {/* <select
                                  name="markating_info"
                                  className=" selector-set-gray minimal"
                                  value={userData.markating_info}
                                  onChange={(e: any) => {
                                    handleChange(e);
                                  }}
                                >
                                  {markatingInfo.map(({ value, label }) => (
                                    <option value={value}>{label}</option>
                                  ))}
                                </select> */}


                                {/* <Select
                                  id="markating_info"
                                  name="markating"
                                  options={markatingInfo}
                                  defaultValue={markatingInfo[0]}
                                  value={selectOption(userData.markating_info, "markating")}
                                  className="minimal"
                                  // value={userData.markating_info === "" ? markatingInfo : userData.markating_info}
                                  onChange={(e: any) => {
                                    setUserData({ ...userData, markating_info: e.value });
                                  }}
                                /> */}


                                <Select
                                  id="markating_info"
                                  className="minimal"
                                  // styles={customStyles}
                                  name="markating_info"
                                  placeholder="??????"
                                  options={markatingInfo}
                                  value={selectOption(userData.markating_info, "markating_info")}
                                  onChange={(e: any) => {
                                    setUserData({ ...userData, markating_info: e.value });
                                  }}
                                />

                                {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
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
                                <input
                                  className="border-less-input"
                                  name="name"
                                  type="text"
                                  placeholder="????????? ??????????????????."
                                  value={userData.name}
                                  autoComplete="off"
                                  onChange={(e: any) => {
                                    handleChange(e);
                                    setValidationError({ ...validationError, nameError: "" });
                                  }}
                                />
                                {validationError.nameError !== "" && (
                                  <p className="error-message bottom-errors">{validationError.nameError}</p>
                                )}


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
                              <div className="input-custom position-relative">



                                <input
                                  className="border-less-input"
                                  name="email"
                                  type="email"
                                  placeholder="???????????? ??????????????????."
                                  value={userData.email}
                                  autoComplete="off"
                                  onChange={(e: any) => {
                                    handleChange(e);
                                    setValidationError({ ...validationError, emailError: "" });
                                  }}
                                />
                                {validationError.emailError !== "" && (
                                  <p className="error-message  bottom-errors">{validationError.emailError}</p>
                                )}
                                {emailValidator && (
                                  <p className="error-message bottom-errors red-msg">???????????? ?????? ???????????????!</p>
                                )}
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
                              <div className="input-custom position-relative">
                                <input
                                  className="border-less-input"
                                  name="password"
                                  type="password"
                                  placeholder="??????????????? ??????????????????."
                                  value={userData.password}
                                  onChange={(e: any) => {
                                    handleChange(e);
                                    setValidationError({
                                      ...validationError,
                                      passwordError: "",
                                    });
                                  }}
                                />
                                {validationError.passwordError !== "" && (
                                  <p className="error-message  bottom-errors">
                                    {validationError.passwordError}
                                  </p>
                                )}
                                {/* {id && ( */}
                                <div className="abs-1">
                                  <button
                                    className="uploadBtn "
                                    onClick={() => setUserData({ ...userData, password: "" })}
                                  >
                                    ?????????
                                  </button>
                                </div>
                                {/* )} */}
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
                                {/* <NumberFormat
                                  className="border-less-input"
                                  placeholder="????????? ??????"
                                  name="phone_number"
                                  autoComplete="off"
                                  value={userData.phone_number}
                                  onChange={(e: any) => {
                                    handleChange(e);
                                    setValidationError({
                                      ...validationError,
                                      phoneNumberError: "",
                                    });
                                  }}
                                  maxLength={11}
                                /> */}
                                <input
                                  type="text"
                                  className="border-less-input"
                                  placeholder="????????? ????????? ??????????????????."
                                  name="phone_number"
                                  autoComplete="off"
                                  value={userData.phone_number}
                                  // onChange={(e: any) => {
                                  //   handleChange(e);
                                  //   setValidationError({
                                  //     ...validationError,
                                  //     phoneNumberError: "",

                                  //   });
                                  // }}
                                  onChange={(e: any) => {
                                    const value = e.target.value;
                                    const re = /^[0-9\b]+$/;

                                    if (!value || value === "" || re.test(value)) {
                                      handleChange(e);
                                    }
                                    setValidationError({
                                      ...validationError,
                                      phoneNumberError: "",

                                    });
                                  }}
                                  maxLength={11}
                                />
                                {validationError.phoneNumberError !== "" && (
                                  <p className="error-message  bottom-errors">
                                    {validationError.phoneNumberError}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    {userData.user_type === "Business" && (
                      <>
                        <div className="single-form-row">
                          <div className="double-row">
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>?????????(??????)</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="input-custom position-relative">
                                    <input
                                      className="border-less-input"
                                      name="company_name"
                                      type="text"
                                      placeholder="?????????(??????)??? ??????????????????."
                                      value={userData.company_name}
                                      autoComplete="off"
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setValidationError({
                                          ...validationError,
                                          companyNameError: "",
                                        });
                                      }}
                                    />
                                    {validationError.companyNameError !== "" && (
                                      <p className="error-message  bottom-errors">
                                        {validationError.companyNameError}
                                      </p>
                                    )}
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
                                  <div className="input-custom position-relative">
                                    <input
                                      className="border-less-input"
                                      name="department"
                                      type="text"
                                      placeholder="???????????? ??????????????????."
                                      value={userData.department}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setValidationError({
                                          ...validationError,
                                          departmentError: "",
                                        });
                                      }}
                                    />
                                    {validationError.departmentError !== "" && (
                                      <p className="error-message bottom-errors">
                                        {validationError.departmentError}
                                      </p>
                                    )}
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
                              <div className="table-custom-result">
                                <div className="input-custom position-relative">
                                  <input
                                    className="border-less-input"
                                    name="position"
                                    type="text"
                                    placeholder="????????? ??????????????????."
                                    value={userData.position}
                                    onChange={(e: any) => {
                                      handleChange(e);
                                      setValidationError({
                                        ...validationError,
                                        positionError: "",
                                      });
                                    }}
                                  />
                                  {validationError.positionError !== "" && (
                                    <p className="error-message bottom-errors">
                                      {validationError.positionError}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </>
                    )}

                  </div>
                </div>
              </div>
            </section>

            {userData.user_type === "General" && (
              <>
                <div  >
                  <div className="section-row">
                    <div className="table-header-title">
                      <div className="form-title-row">
                        <h3>????????????</h3>
                      </div>
                      <div className="repeatable-row mj-selectdropDown">

                        <div className="single-form-row">
                          <div className="double-row">
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>??????</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="selected-custom-full position-relative selector-set-main">

                                    {/* <select
                                      name="gender"
                                      className=" selector-set-gray minimal"
                                      value={userData.gender}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                      }}
                                    >
                                      {gender.map(({ value, label }) => (
                                        <option value={value}>{label}</option>
                                      ))}
                                    </select> */}

                                    <Select
                                      id="gender"
                                      name="gender"
                                      className="minimal"
                                      placeholder="??????"
                                      options={gender}
                                      // defaultValue={gender[0]}
                                      value={selectOption(userData.gender, "gender")}
                                      onChange={(e: any) => {
                                        setUserData({ ...userData, gender: e.value });
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
                                  <label>????????????</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="input-custom">
                                    <DatePicker
                                      id="startDate"
                                      selected={dateOfBirth}
                                      onChange={(dateOfBirth: Date | null) => {
                                        handleBirthDate(dateOfBirth);
                                        setValidationError({ ...validationError, dobError: "" });
                                      }}
                                      dateFormat="yyyy.MM.dd"
                                      placeholderText="YYYY.MM.DD"
                                      className="border-less-input"
                                      locale="ko"
                                      maxDate={new Date()}
                                      isClearable={false}
                                      autoComplete="off"
                                    ></DatePicker>
                                    {validationError.dobError !== "" && (
                                      <p className="error-message  bottom-errors">{validationError.dobError}</p>
                                    )}
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
                                    <input
                                      className="border-less-input"
                                      name="affiliation"
                                      type="text"
                                      placeholder="????????? ??????????????????."
                                      value={userData.affiliation}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setValidationError({
                                          ...validationError,
                                          affiliationError: "",
                                        });
                                      }}
                                    />
                                    {validationError.affiliationError !== "" && (
                                      <p className="error-message bottom-errors">
                                        {validationError.affiliationError}
                                      </p>
                                    )}
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
                                  <div className="input-custom position-relative">
                                    <input
                                      className="border-less-input"
                                      name="rest_address"
                                      type="text"
                                      placeholder="????????? ??????????????????."
                                      value={userData.rest_address}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setValidationError({
                                          ...validationError,
                                          restAddressError: "",
                                        });
                                      }}
                                    />
                                    {validationError.restAddressError !== "" && (
                                      <p className="error-message bottom-errors">
                                        {validationError.restAddressError}
                                      </p>
                                    )}
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
              </>
            )}


            {userData.user_type === "Business" && (
              <>
                <div>
                  <div className="section-row">
                    <div className="table-header-title">
                      <div className="form-title-row">
                        <h3>????????????</h3>
                      </div>
                      <div className="repeatable-row mj-selectdropDown">

                        <div className="single-form-row">
                          <div className="double-row">
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>?????????</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="selected-custom-full position-relative selector-set-main">
                                    {/* <select
                                      name="bank_name"
                                      className=" selector-set-gray minimal"
                                      value={userData.bank_name}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setValidationError({
                                          ...validationError,
                                          bankNameError: "",
                                        });
                                      }}
                                    >
                                      <option selected>?????? ??????</option>
                                      {bankList.map(({ value, label }) => (
                                        <option value={value}>{label}</option>
                                      ))}
                                    </select> */}
                                    <Select
                                      id="bank_name"
                                      className="minimal"
                                      name="bank_name"
                                      placeholder="??????"
                                      options={bankList}
                                      // defaultValue={bankList[0]}
                                      value={selectOption(userData.bank_name, "bank_name")}
                                      onChange={(e: any) => {
                                        setUserData({ ...userData, bank_name: e.value });
                                      }}
                                    />

                                    {/* <img src="/img/123.png" alt="" className="dropdown-img" /> */}
                                    <p className="error-message bottom-errors">
                                      {validationError.bankNameError}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>????????????</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="input-custom">
                                    <input
                                      className="border-less-input"
                                      placeholder="??????????????? ??????????????????."
                                      name="ac_number"
                                      autoComplete="off"
                                      value={userData.ac_number}
                                      onChange={(e: any) => {
                                        const value = e.target.value;
                                        const re = /^[0-9\b]+$/;

                                        if (!value || value === "" || re.test(value)) {
                                          handleChange(e)
                                        }
                                        setValidationError({
                                          ...validationError,
                                          acNumberError: "",
                                        });
                                      }}
                                    />
                                    {validationError.acNumberError !== "" && (
                                      <p className="error-message  bottom-errors">
                                        {validationError.acNumberError}
                                      </p>
                                    )}
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
                                    <input
                                      className="border-less-input"
                                      name="acount_holder"
                                      type="text"
                                      placeholder="???????????? ??????????????????."
                                      value={userData.acount_holder}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setValidationError({
                                          ...validationError,
                                          acountHolderError: "",
                                        });
                                      }}
                                    />
                                    {validationError.acountHolderError !== "" && (
                                      <p className="error-message bottom-errors">
                                        {validationError.acountHolderError}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-full-row">
                              <div className="table-custom-full-row">
                                <div className="table-custom-label">
                                  <label>????????????</label>
                                </div>
                                <div className="table-custom-result">
                                  <div className="input-custom position-relative">
                                    {/* <NumberFormat
                                      // format="###-####-####"
                                      className="border-less-input"
                                      placeholder="??????????????? ??????????????????."
                                      name="bank_phone_number"
                                      autoComplete="off"
                                      value={userData.bank_phone_number}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setValidationError({
                                          ...validationError,
                                          bankPhoneNumberError: "",
                                        });
                                      }}
                                      maxLength={11}
                                    /> */}
                                    <input
                                      className="border-less-input"
                                      placeholder="??????????????? ??????????????????."
                                      name="bank_phone_number"
                                      autoComplete="off"
                                      value={userData.bank_phone_number}
                                      onChange={(e: any) => {
                                        const value = e.target.value;
                                        const re = /^[0-9\b]+$/;

                                        if (!value || value === "" || re.test(value)) {
                                          handleChange(e)
                                        }
                                        setValidationError({
                                          ...validationError,
                                          bankPhoneNumberError: "",
                                        });
                                      }}
                                      maxLength={11}
                                    />
                                    {validationError.bankPhoneNumberError !== "" && (
                                      <p className="error-message  bottom-errors">
                                        {validationError.bankPhoneNumberError}
                                      </p>
                                    )}
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
              </>
            )}

          </div>
        </div>
      </div>


      <div className="MemberRegister">
        <div className="main-box2">
          <div className="label-box2 interest-input-lable-ctn">
            <div className="Interest">
              <p>????????????</p>
            </div>
          </div>


          <div className="choose-category select-interest">
            <label
              className={
                interestsLableList.football
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="football"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                // checked={true}
                checked={interestsLableList.football}
              />
              <p>??????</p>
            </label>

            <label
              className={
                interestsLableList.basketball
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="basketball"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.basketball}
              />
              <p>??????</p>
            </label>

            <label
              className={
                interestsLableList.baseball
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="baseball"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.baseball}
              />
              <p>??????</p>
            </label>

            <label
              className={
                interestsLableList.volleyball
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="volleyball"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.volleyball}
              />
              <p>??????</p>
            </label>

            <label
              className={
                interestsLableList.marathon
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="marathon"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.marathon}
              />
              <p>?????????</p>
            </label>

            <label
              className={
                interestsLableList.bike
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="bike"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.bike}
              />
              <p>?????????</p>
            </label>

            <label
              className={
                interestsLableList.swimming
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="swimming"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.swimming}
              />
              <p>??????</p>
            </label>

            <label
              className={
                interestsLableList.golf ? "btn-checkbox-checked" : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="golf"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.golf}
              />
              <p>??????</p>
            </label>

            <label
              className={
                interestsLableList.tennis
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="tennis"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.tennis}
              />
              <p>?????????</p>
            </label>

            <label
              className={
                interestsLableList.badminton
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="badminton"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.badminton}
              />
              <p>????????????</p>
            </label>

            <label
              className={
                interestsLableList.table_Tennis
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="table_Tennis"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.table_Tennis}
              />
              <p>??????</p>
            </label>

            <label
              className={
                interestsLableList.bowling
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="bowling"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.bowling}
              />
              <p>??????</p>
            </label>

            <label
              className={
                interestsLableList.billiards
                  ? "btn-checkbox-checked"
                  : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="billiards"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.billiards}
              />
              <p>??????</p>
            </label>

            <label
              className={
                interestsLableList.hado ? "btn-checkbox-checked" : "btn-checkbox"
              }
            >
              <input
                type="checkbox"
                name="hado"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="checkbox-input"
                checked={interestsLableList.hado}
              />
              <p>??????</p>
            </label>

            {/* <label
            className={
              interestsLableList.others
                ? "btn-checkbox-checked"
                : "btn-checkbox"
            }
          >
            <input
              type="checkbox"
              name="others"
              onChange={(e) => {
                handleCheckboxChange(e);
              }}
              className="checkbox-input"
              checked={interestsLableList.others}
            />
            <p>??????</p>
          </label> */}

            <label
              className={isAddOtherIntrest ? "add-other-checked" : "add-other"}
            >
              <input
                type="checkbox"
                name="others"
                onChange={(e) => {
                  if (!(addOtherInfo.length > 1)) {
                    setIsAddOtherIntrest(e.target.checked);
                  }
                }}
                className="checkbox-input"
                checked={isAddOtherIntrest}
              />
              <p>??????</p>
              <img
                src="../../img/blank-plus.svg"
                alt=""
                className="add-other-plus"
                onClick={addOtherInfoField}
              />
              <img
                src="../../img/add-plus.svg"
                alt=""
                className="add-color-plus"
                onClick={addOtherInfoField}
              />
            </label>
            {isAddOtherIntrest &&
              addOtherInfo.map((field: any, index: number) => (
                <div className="position-relative  add-other-interest-input">
                  <input
                    type="text"
                    name="otherInfo"
                    value={field?.value}
                    onChange={(e: any) => {
                      handleInputChangeOtherInfoField(index, e)
                    }}
                    className="add-other add-other-input-basicSettings"
                    placeholder="??????"
                  />
                  <img
                    src="../../img/minus.svg"
                    alt=""
                    className="add-other-plus remove-icon"
                    onClick={() => removeOtherInfoField(index)}
                  />
                </div>
              ))}
            {validationError.interestsError !== "" && (
              <div className="interests-ctn">
                <p className="error-message">{validationError.interestsError}</p>
              </div>
            )}

            {/* <div className="detail-box2 interests-ctn">
            <input
              name="interests"
              type="text"
              placeholder="????????? ??????????????????."
              value={userData.interests}
              onChange={(e: any) => {
                handleChange(e);
                setValidationError({ ...validationError, interestsError: "" });
              }}
            />
          </div> */}
          </div>
        </div>

        <div className="boxline1"></div>
      </div>

    </>

  );
};

export default MemberRegister;