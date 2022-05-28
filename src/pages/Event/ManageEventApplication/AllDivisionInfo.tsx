import DynamicApplication from './DynamicApplication'
import DynamicFormData from './DynamicFormData'
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from '../../../helper/util';
import { useState } from 'react';

const AllDivisionInfo = ({ allData, mainIndex, totalCount, setTotalCount, selectDivision, setSelectDivision, allSelectData, setAllSelectData, item, allFiledData, emptyFiled, handleDivisionDelete, totalParticipateFee, setTotalParticipateFee, applicationEmptyFiled, individualApplicationData, participateAdd, emptyApplicationData, participateRemove, individualParticipantData, handleAddParticipateGroup, handleDeleteParticipateGroup, minNumberGroup, applicationInfoRequired, viewTourSection, showTourSection, allDivision, handleAddParticipateIndividual, handleDeleteParticipateIndividual }: any) => {
    let ApplicationEmptyData = allSelectData[mainIndex]?.recuitement_division == "Group" ? emptyApplicationData : emptyApplicationData
    const [viewDirectionSection, setViewDirectionSection] = useState(() => {
        let list: any = [];
        for (let i = 0; i < allSelectData.length; i++) {
            list[i] = false;
        }
        return list;
    });

    const handleDivisionAdd = (mainIndex: number, keyId: any) => {
        let tempData: any = [...totalCount]
        tempData[mainIndex] = tempData[mainIndex] + 1
        setTotalCount(tempData)

        let tempParticipateFee: any = [...totalParticipateFee]
        tempParticipateFee[mainIndex] = tempData[mainIndex] * parseFloat(allSelectData[mainIndex]?.participation_fee)
        setTotalParticipateFee(tempParticipateFee)
        participateAdd(mainIndex, tempData, tempParticipateFee, allSelectData, true)
    }

    const handleDivisionMinus = (mainIndex: number) => {
        if (totalCount[mainIndex] != 0) {
            let tempData: any = [...totalCount]
            tempData[mainIndex] = tempData[mainIndex] - 1
            setTotalCount(tempData)

            let tempParticipateFee: any = [...totalParticipateFee]
            tempParticipateFee[mainIndex] = tempData[mainIndex] * parseFloat(allSelectData[mainIndex]?.participation_fee)
            setTotalParticipateFee(tempParticipateFee)

            participateRemove(mainIndex, tempData, tempParticipateFee)
        } else {
            let tempData: any = [...totalCount]
            tempData[mainIndex] = 0
            setTotalCount(tempData)

            let tempParticipateFee: any = [...totalParticipateFee]
            tempParticipateFee[mainIndex] = 0
            setTotalParticipateFee(tempParticipateFee)

            participateRemove(mainIndex, tempData, tempParticipateFee)
        }
    }

    const handleParticipate = (key: any, mainIndex: number) => {
        if (key != "" || key != undefined || key != null) {
            if (selectDivision.filter((o: any) => o == key).length > 0) {
                // let tempDivisionData: any = [...selectDivision]
                // tempDivisionData[mainIndex] = ""
                // setSelectDivision(tempDivisionData)
            } else {
                let tempDivisionData: any = [...selectDivision]
                let tempDivisionDataKey = tempDivisionData[mainIndex]
                tempDivisionData = tempDivisionData.filter((o: any) => o != tempDivisionDataKey)
                tempDivisionData[mainIndex] = key
                setSelectDivision(tempDivisionData)
                let tempTotalData: any = [...totalCount]
                tempTotalData[mainIndex] = 0
                setTotalCount(tempTotalData)

                let tempParticipateFee: any = [...totalParticipateFee]
                tempParticipateFee[mainIndex] = 0
                setTotalParticipateFee(tempParticipateFee)

                const newElement = {
                    keyId: uuidv4() + Date.now(),
                    information: [
                        {
                            applicationInfo: Object.assign({}, ...ApplicationEmptyData),
                            participantInfo: []
                        }
                    ],
                    isShow: true
                }

                let tempData: any = [...allSelectData]

                let tempDataId = tempData[mainIndex].id
                tempData = tempData.filter((o: any) => o.id != tempDataId)

                tempData[mainIndex] = { ...allData.find((data: any) => data.id == key), ...newElement }
                setAllSelectData(tempData)

                participateAdd(mainIndex, tempTotalData, tempParticipateFee, tempData, false)
            }
        }
    }

    function numberWithCommas(x: any) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <>
            <div className="custom-full-table alldividtion-page">
                <div className="form-title-row">
                </div>
                {(allSelectData[mainIndex]?.isShow) &&
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
                                                        <div className="select-custom position-relative selector-set-main">
                                                            <select
                                                                // className="selector-set-gray minimal form-custom-select"
                                                                className={`${selectDivision[mainIndex] === "" ? "selector-set" : "selector-set-gray"}  minimal form-custom-select`}
                                                                name="gender"
                                                                value={selectDivision[mainIndex]}
                                                                onChange={(e: any) => {
                                                                    handleParticipate(e.target.value, mainIndex)
                                                                }}
                                                            >
                                                                <option value="" disabled selected hidden>부문 선택</option>
                                                                {allData.map((data: any, index: any) => {
                                                                    return <option key={index} value={data?.id}>{data?.recuitement_division_name}</option>
                                                                })}
                                                            </select>
                                                            <p className="colorwon-currency position-currency">{(allSelectData[mainIndex]?.participation_fee == undefined || allSelectData[mainIndex]?.participation_fee == null) ? "0" : numberWithCommas(allSelectData[mainIndex]?.participation_fee)}<span>원/단체</span></p>
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
                                                            {selectDivision[mainIndex] == "" || selectDivision[mainIndex] == undefined || selectDivision[mainIndex] == null ?
                                                                <>
                                                                    <button type="button" ><img src="../img/dark-minus.png" alt="" /></button>
                                                                    <p>0</p>
                                                                    <button type="button" ><img src="../img/plus-plus.png" alt="" /></button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button type="button" onClick={() => handleDivisionMinus(mainIndex)}><img src="../img/minus-minus.png" alt="" /></button>
                                                                    <p>{totalCount[mainIndex]}</p>
                                                                    <button type="button" onClick={() => handleDivisionAdd(mainIndex, allSelectData[mainIndex]?.keyId)}><img src="../img/plus-plus.png" alt="" /></button>
                                                                </>
                                                            }
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
                                                        {/* {selectDivision[mainIndex] == "" || selectDivision[mainIndex] == undefined || selectDivision[mainIndex] == null ?
                                                            "0원"
                                                            :
                                                            <>
                                                                <p className="colorwon-currency">{totalParticipateFee[mainIndex]}<span>원</span></p>
                                                            </>
                                                        } */}
                                                        <p className="colorwon-currency">
                                                            {(selectDivision[mainIndex] == undefined || selectDivision[mainIndex] == "" || selectDivision[mainIndex] == null ? "0" : numberWithCommas(totalParticipateFee[mainIndex]))}<span>원</span></p>
                                                        {mainIndex != 0 && <button type="button" className="delete-won-currency" onClick={() => handleDivisionDelete(mainIndex)}>부문 삭제</button>}
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

            </div>
            {selectDivision && selectDivision[mainIndex] != "" &&
                <>
                    <div className="custom-full-table">
                        <div className="table-header-title">
                            <div className="form-title-row title-with-arrow">
                                <h3>신청자 정보</h3>
                                <div className={viewTourSection ? 'modal-dropdown-arrow-up' : 'modal-dropdown-arrow-down'} ></div>
                                <img src="../img/arrow-modal.png" onClick={() => showTourSection({
                                    ...viewTourSection,
                                    [mainIndex]: !viewTourSection[mainIndex]
                                })} />
                            </div>
                        </div>
                    </div>
                    {viewTourSection && !(isEmpty(allSelectData[mainIndex]?.information[0]?.applicationInfo)) && viewTourSection[mainIndex] &&
                        <>
                            <DynamicApplication applicationEmptyFiled={applicationEmptyFiled} applicationInfo={allSelectData[mainIndex]?.information[0]?.applicationInfo} getDynamicData={individualApplicationData} keyId={allSelectData[mainIndex]?.keyId} mainIndex={mainIndex} />

                            {!isEmpty(applicationInfoRequired) && (applicationInfoRequired[mainIndex] && <p className="input-data-form-error">지원 세부 사항 필수.</p>)}
                        </>
                    }
                </>
            }

            <div className="all-dynamic-data ">
                {
                    (selectDivision && selectDivision[mainIndex] != "") &&
                    !(isEmpty(allSelectData[mainIndex]?.information[0].participantInfo)) && allSelectData[mainIndex]?.information[0].participantInfo.map((participantInfo: any, idx: number) => {

                        return (
                            <div className="single-dynamic-data">
                                <div className="custom-full-table">
                                    <div className="table-header-title">
                                        <div className="form-title-row title-with-arrow">
                                            <h3>단체 참가자 정보 {idx + 1}</h3>
                                            <div className={viewDirectionSection ? 'modal-dropdown-arrow-up' : 'modal-dropdown-arrow-down'} ></div>
                                            <img src="../img/arrow-modal.png" onClick={() => setViewDirectionSection({
                                                ...viewDirectionSection,
                                                [idx]: !viewDirectionSection[idx]
                                            })} />
                                        </div>
                                    </div>
                                </div>
                                {viewDirectionSection && viewDirectionSection[idx] &&
                                    <DynamicFormData key={idx} allFiledData={allFiledData} emptyFiled={emptyFiled} participateIndex={idx} keyId={allSelectData[mainIndex]?.keyId} getDynamicData={individualParticipantData} participateInfo={allSelectData[mainIndex]?.information[0].participantInfo[idx]} mainIndex={mainIndex} />
                                }

                                <div className="dynamic-form-data pm-alldynamic-data">
                                    {/* <p>해당 부문의 참가인원은 최소 1명, 최대 4명입니다.</p> */}
                                    <div className="button-ctn">
                                        {(allSelectData[mainIndex]?.recuitement_division == "Group" && allSelectData[mainIndex]?.information[0]?.participantInfo.length == idx + 1) && minNumberGroup && minNumberGroup[mainIndex] && <p className="error-slove-form">{("해당 부문의 참가인원은 최소 %min%명, 최대 %max%명입니다.").replace("%min%", allSelectData[mainIndex]?.min_persons).replace("%max%", allSelectData[mainIndex]?.max_persons)}</p>}
                                    </div>

                                    <div className='btn-rigth'>
                                        {(allSelectData[mainIndex]?.recuitement_division == "Group" && allSelectData[mainIndex]?.information[0]?.participantInfo.length == idx + 1) && ((allSelectData[mainIndex]?.max_persons == idx + 1) ? null : <button className="participent-plus-btn" onClick={() => handleAddParticipateGroup(allSelectData[mainIndex]?.keyId)}>참가자 정보 항목 추가 </button>)}
                                        {(allSelectData[mainIndex]?.recuitement_division == "Group" && allSelectData[mainIndex]?.information[0]?.participantInfo.length == idx + 1) && ((allSelectData[mainIndex]?.max_persons == idx) ? null : <button className="participent-minus-btn pm-participentminus-btn btn-delete" onClick={() => handleDeleteParticipateGroup(allSelectData[mainIndex]?.keyId)}>참가자 정보 항목 삭제 </button>)}

                                        {(allSelectData[mainIndex]?.recuitement_division == "Individual" && allSelectData[mainIndex]?.information[0]?.participantInfo.length == idx + 1) && <button className="participent-minus-btn pm-participentminus-btn" onClick={() => handleDeleteParticipateIndividual(allSelectData[mainIndex]?.keyId)}>참가자 정보 항목 삭제 </button>}

                                        {(allSelectData[mainIndex]?.recuitement_division == "Individual" && allSelectData[mainIndex]?.information[0]?.participantInfo.length == idx + 1) && <button className="participent-plus-btn" onClick={() => handleAddParticipateIndividual(allSelectData[mainIndex]?.keyId)}>참가자 정보 항목 추가 </button>}
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AllDivisionInfo
