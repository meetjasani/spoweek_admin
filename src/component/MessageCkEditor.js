import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API } from "../config/API/api.config";

const MessageCkEditor = (props) => {
  const [wordCount, setWordCount] = useState(0);
  const [totalChars, setTotalChars] = useState(0);

  const handleChange = (event, editor) => {
    const data = editor.getData();
    var regex = /\s+/gi;
    const strippedString = data.replace(/(<([^>]+)>)/gi, "");
    var wordCount = strippedString.trim().replace(regex, " ").split(" ").length;
    var totalChars = strippedString.length;
    setWordCount(wordCount);
    setTotalChars(totalChars);
    props.onChange(data);
  };

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={props.data}
        onChange={handleChange}
        languages={{ id: "ko", label: "korean" }}
        // getAllMemorialHallMessage={props.getAllMemorialHallMessage}
        config={{
          language: { ui: "ko", content: "ko" },
          placeholder: `${props.placeholder}`,
          ckfinder: {
            uploadUrl: `${API.endpoint}/event/spoweekImage?lang=ko`,
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
      {/* <div className="word-counter">
        <p className="mx-2">Words: {wordCount}</p>
        <p>Characters: {totalChars}</p>
      </div> */}
    </>
  );
};

export default MessageCkEditor;
