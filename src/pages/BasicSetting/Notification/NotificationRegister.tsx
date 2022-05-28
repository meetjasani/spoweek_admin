import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import MessageCkEditor from "../../../component/MessageCkEditor";
import { ApiGetNoAuth, ApiPost, ApiPut } from "../../../helper/API/ApiData";

const NotificationRegister = () => {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id")?.toString();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleChange = (newData: any) => {
    setContent(newData);
  };

  const saveNofification = () => {
    if (id) {
      ApiPut(`general/editNotice/${id}`, {
        title: title,
        content: content,
      })
        .then((res: any) => {
          history.push("/basicsettings/notification");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      ApiPost("general/registerNotice", {
        title: title,
        content: content,
      })
        .then((res: any) => {
          history.push("/basicsettings/notification");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const backToList = () => {
    history.push("/basicsettings/notification");
  };

  useEffect(() => {
    if (id) {
      ApiGetNoAuth(`general/getNoticeById/${id}`).then((res: any) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, []);

  return (
    <>
      <div className="NotificationRegister">
        <div className="Register">
          <div className="Register-title">
            <h1> 공지사항 등록</h1>
          </div>
          <div className="back-btn">
            <button className="back" onClick={backToList}>
              이전으로
            </button>
            <button className="save" onClick={saveNofification}>
              저장
            </button>
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
                  value={title}
                  placeholder="제목 입력"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="boxline1"></div>

        <div className="ck-editor-div pm-editor-detailsctn">
          <MessageCkEditor
            onChange={handleChange}
            data={content}
            type="memorialMessage"
            placeholder="공지사항 내용 입력"
          />
        </div>
      </div>
    </>
  );
};

export default NotificationRegister;
