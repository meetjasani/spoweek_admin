import DynamicApplication from './DynamicApplication'
import DynamicFormData from './DynamicFormData'
import { v4 as uuidv4 } from 'uuid';
import { isEmpty, numberWithCommas } from '../../../helper/util';
import { useEffect, useState } from 'react';

const AllDivisionEditInfo = ({ mainItem, viewTourSection, setViewTourSection, mainIndex, individualApplicationData, individualParticipantData, applicationEmptyFiled, allFiledData, handleDivisionAdd, handleDivisionMinus, handleDivisionMinusAll, minNumberGroup }: any) => {

    let ApplicationFormData = { is_defination_by: mainItem?.information[0]?.applicationInfo?.is_defination_by, ...mainItem?.information[0]?.applicationInfo?.information, vaccination: mainItem?.information[0]?.applicationInfo?.information.vaccination == null ? null : (mainItem?.information[0]?.applicationInfo?.information.vaccination ? "Vaccinated" : "Unvaccinated"), is_Attendance: mainItem?.information[0]?.applicationInfo?.information.is_Attendance == null ? null : (mainItem?.information[0]?.applicationInfo?.information.is_Attendance ? "Attended" : "Absent"), COVID_19_symptoms: mainItem?.information[0]?.applicationInfo?.information.COVID_19_symptoms == null ? null : (mainItem?.information[0]?.applicationInfo?.information.COVID_19_symptoms ? "Yes" : "No") }

    const queryParams = new URLSearchParams(window.location.search);
    const ename = queryParams.get('ename')?.toString();
    const [totalCount, setTotalCount] = useState(mainItem?.totalCount || 0)
    const [totalParticipateFee, setTotalParticipateFee] = useState<any>([])
    const [viewDirectionSection, setViewDirectionSection] = useState(() => {
        let list: any = [];
        for (let i = 0; i < mainItem.length; i++) {
            list[i] = false;
        }
        return list;
    });

    useEffect(() => {
        setTotalCount(mainItem?.totalCount)
    }, [mainItem])

    useEffect(() => {
        setTotalParticipateFee(totalCount * parseFloat(mainItem?.application_amount))
    }, [totalCount])

    return (
        <>
            <div className="custom-full-table alldividtion-page">
                <div className="form-title-row">
                </div>
                <div className="btn-3 align-items-center">
                    <div className="heading-2">
                        <h5> {ename} </h5>
                    </div>
                    {/* <div className="edit-back-btn ml-auto">
                    <Buttons
                        type=""
                        ButtonStyle="saveBtn "
                        onClick={() => {
                            let divisionAdd = !(selectDivision.filter((data: any) => data == "").length > 0)
                            if (divisionAdd) {
                                setAllDivision([...allDivision, "New"])
                                setAllSelectData([...allSelectData, { isShow: true }])
                                setSelectDivision([...selectDivision, ""])
                            }
                        }}
                    >부문 추가</Buttons>
                </div> */}

                </div>
                <section>
                    <div className="section-row">
                        <div className="table-header-title">
                            <div className="repeatable-row">
                                <div className="single-form-row">
                                    <div className="double-row">

                                        <div className="table-full-row">
                                            <div className="table-custom-full-row">
                                                <div className="table-custom-label">
                                                    <label>부문</label>
                                                </div>
                                                <div className="table-custom-result">
                                                    <div className="select-custom position-relative selector-set-main pm-select-customctnbox">
                                                        <p className="selector-set-gray minimal form-custom-select pm-selectorset-gray">{mainItem?.recuitement_division_name}</p>
                                                        <p className="colorwon-currency position-currency">{(mainItem?.application_amount == undefined || mainItem?.application_amount == null) ? "0" : numberWithCommas(mainItem?.application_amount, ",")}<span>원/단체</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="table-full-row">
                                            <div className="table-custom-full-row">
                                                <div className="table-custom-label">
                                                    <label>수량</label>
                                                </div>
                                                <div className="table-custom-result">
                                                    <div className="input-custom plus-minus-btn">
                                                        <button type="button" onClick={handleDivisionMinus}><img src="../img/minus-minus.png" alt="" /></button>
                                                        <p>{totalCount}</p>
                                                        <button type="button" onClick={() => handleDivisionAdd(mainItem?.division_id, mainItem?.event_id)}><img src="../img/plus-plus.png" alt="" /></button>
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
                                                <label>참가비</label>
                                            </div>
                                            <div className="table-custom-result">
                                                <div className="input-custom position-relative">
                                                    <p className="colorwon-currency">{numberWithCommas(totalParticipateFee, ",")}<span>원</span></p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="custom-full-table">
                <div className="table-header-title">
                    <div className="form-title-row title-with-arrow">
                        <h3>신청자 정보</h3>
                        {isEmpty(viewTourSection) ? null :
                            <div className={viewTourSection[mainIndex] ? 'modal-dropdown-arrow-up' : 'modal-dropdown-arrow-down'} >
                                <img src="../img/arrow-modal.png" onClick={() => setViewTourSection({
                                    ...viewTourSection,
                                    [mainIndex]: !viewTourSection[mainIndex]
                                })} />
                            </div>}
                    </div>
                </div>
            </div>
            {viewTourSection && !(isEmpty(mainItem?.information[0]?.applicationInfo)) && viewTourSection[mainIndex] &&
                <>
                    <DynamicApplication applicationEmptyFiled={applicationEmptyFiled} applicationInfo={ApplicationFormData} getDynamicData={individualApplicationData} keyId={mainItem?.keyId} mainIndex={mainIndex} />
                </>
            }
            {
                !(isEmpty(mainItem?.information)) && mainItem?.information.map((info: any) => (
                    !(isEmpty(info?.participantInfo)) && info?.participantInfo.map((participantInfo: any, idx: number) => {
                        let participantFormInfo = { is_defination_by: participantInfo?.is_defination_by, ...participantInfo?.information, vaccination: participantInfo?.information.vaccination == null ? null : (participantInfo?.information.vaccination ? "Vaccinated" : "Unvaccinated"), is_Attendance: participantInfo?.information.is_Attendance == null ? null : (participantInfo?.information.is_Attendance ? "Attended" : "Absent"), COVID_19_symptoms: participantInfo?.information.COVID_19_symptoms == null ? null : (participantInfo?.information.COVID_19_symptoms ? "Yes" : "No") }
                        return (
                            <div >
                                <div className="custom-full-table">
                                    <div className="table-header-title">
                                        <div className="form-title-row title-with-arrow">
                                            <h3>단체 참가자 정보 {idx + 1}</h3>
                                            {/* {isEmpty(viewDirectionSection) ?null: */}
                                            <div className={viewDirectionSection[idx] ? 'modal-dropdown-arrow-up' : 'modal-dropdown-arrow-down'} >
                                                <img src="../img/arrow-modal.png" onClick={() => setViewDirectionSection({
                                                    ...viewDirectionSection,
                                                    [idx]: !viewDirectionSection[idx]
                                                })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {viewDirectionSection && viewDirectionSection[idx] &&
                                    <DynamicFormData key={idx} allFiledData={allFiledData} participateIndex={idx} keyId={mainItem?.keyId} getDynamicData={individualParticipantData} participateInfo={participantFormInfo} mainIndex={mainIndex} />
                                }


                                <div className="dynamic-form-data pm-dynamicform-data">
                                    {(mainItem?.recuitement_division == "Group" && mainItem?.information[0]?.participantInfo.length == idx + 1) && minNumberGroup && minNumberGroup[mainIndex] && <p className="error-slove-form pm-errorslove-form">{("해당 부문의 참가인원은 최소 %min%명, 최대 %max%명입니다.").replace("%min%", mainItem?.min_persons).replace("%max%", mainItem?.max_persons)}</p>}
                                    {(mainItem?.recuitement_division == "Group" && mainItem?.information[0]?.participantInfo.length == idx + 1) && ((mainItem?.max_persons == idx) ? null : <button className="participent-minus-btn pm-participentminus-btn-ctn" onClick={handleDivisionMinusAll}
                                    >참가자 정보 항목 삭제 </button>)}

                                    {(mainItem?.recuitement_division == "Group" && mainItem?.information[0]?.participantInfo.length == idx + 1) && ((mainItem?.max_persons == idx + 1) ? null : <button className="participent-plus-btn"
                                        onClick={() => handleDivisionAdd(mainItem?.division_id, mainItem?.event_id)}
                                    >참가자 정보 항목 추가 </button>)}
                                </div>
                            </div>
                        )
                    })
                ))
            }

            {minNumberGroup && minNumberGroup[mainIndex] && <p className="error-slove-form">{("해당 부문의 참가인원은 최소 %min%명, 최대 %max%명입니다.").replace("%min%", mainItem?.min_persons).replace("%max%", mainItem?.max_persons)}</p>}
        </>
    )
}

export default AllDivisionEditInfo