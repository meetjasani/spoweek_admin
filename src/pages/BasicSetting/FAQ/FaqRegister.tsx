import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import MessageCkEditor from '../../../component/MessageCkEditor'
import { ApiGet, ApiGetNoAuth, ApiPost, ApiPut } from '../../../helper/API/ApiData';

const FaqRegister = () => {

    const history = useHistory()
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id')?.toString();
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("");


    const handleChange = (newData: any) => {
        setAnswer(newData);
    };

    const saveNofification = () => {
        if (id) {
            ApiPut(`general/editFAQ/${id}`, {
                question: question,
                answer: answer,
            })
                .then((res: any) => {
                    history.push("/basicsettings/FAQ");
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            ApiPost("general/registerFAQ", {
                question: question,
                answer: answer,
            })
                .then((res: any) => {
                    history.push("/basicsettings/FAQ");
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    const backToList = () => {
        history.push("/basicsettings/FAQ");
    };

    useEffect(() => {
        if (id) {
            ApiGetNoAuth(
                `general/getFAQByIdByAdmin/${id}`
            ).then((res: any) => {
                setQuestion(res.data.question)
                setAnswer(res.data.answer)
            })
        }
    }, [])


    return (
        <>
            <div className="NotificationRegister">
                <div className="Register">
                    <div className="Register-title">
                        <h1>자주 묻는 질문 등록</h1>
                    </div>
                    <div className="back-btn">
                        <button className="back" onClick={backToList}>이전으로</button>
                        <button className="save" onClick={saveNofification}>저장</button>
                    </div>
                </div>
                <div className="boxline"></div>
                <div className="main-box">
                    <div className="label-box">
                        <div className="name">
                            <p>제목</p>
                        </div>
                        <div className="detail-box">
                            <div className="main-box-input">
                                <input
                                    type="text"
                                    value={question}
                                    placeholder="제목 입력"
                                    onChange={(e) => {
                                        setQuestion(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="boxline1"></div>

                <div className="ck-editor-div">

                    <MessageCkEditor
                        onChange={handleChange}
                        data={answer}
                        type="memorialMessage"
                        placeholder="답변 입력"
                    />

                </div>

            </div>

        </>
    )
}

export default FaqRegister
