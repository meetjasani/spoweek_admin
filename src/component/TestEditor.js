import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API } from "../config/API/api.config";

const TestEditor = (props) => {
  // const [inputData, setInputData] = useState();
  useEffect(() => { }, []);

  const handleChange = (event, editor) => {
    const data = editor.getData();
    props.onChange(data);
  };

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={props.data}
        onChange={handleChange}
        config={{
          ckfinder: {
            // uploadUrl: `${API.endpoint}/memorialHall/memorialHallPostImage?user_id=${props?.userData?.id}&memorial_id=${props.hallData.id}&lang=ko`,
            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: true,
            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
              "X-CSRF-TOKEN": "CSFR-Token",
              Authorization: "Bearer <JSON Web Token>",
            },
          },
        }}
      />
    </>
  );
};

export default TestEditor;
