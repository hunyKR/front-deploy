import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import axios from "axios";

const Edit = ({ method }) => {
  const { id } = useParams();

  const titleRef = useRef();
  const authorRef = useRef();
  const contentRef = useRef();
  const passwordRef = useRef();

  if (method === "update") {
    axios
      .get(config.BACKEND_HOST + "/select")
      .then((response) => {
        response.data.forEach((element) => {
          if (element._id === id) {
            titleRef.current.value = element.title;
            contentRef.current.value = element.content;
          }
        });
      })
      .catch(() => {
        alert("예기치 못한 오류가 발생했습니다. 나중에 다시 시도하세요.");
      });
  }
  function edit() {
    if (passwordRef.current.value) {
      switch (method) {
        case "insert":
          axios
            .post(config.BACKEND_HOST + "/insert", {
              author: authorRef.current.value,
              password: passwordRef.current.value,
              title: titleRef.current.value,
              content: contentRef.current.value,
            })
            .then((response) => {
              alert("성공적으로 글을 작성했습니다.");
              window.location.href = "/" + response.data;
            })
            .catch(() => {
              alert("예기치 못한 오류가 발생했습니다. 나중에 다시 시도하세요.");
            });
          break;
        case "update":
          axios
            .post(config.BACKEND_HOST + "/update", {
              ObjectId: id,
              title: titleRef.current.value,
              content: contentRef.current.value,
              password: passwordRef.current.value,
            })
            .then(() => {
              alert("성공적으로 수정되었습니다.");
              window.location.href = "/" + id;
            })
            .catch((response) => {
              if (response?.response?.data === "password-error") {
                passwordRef.current.value = "";
                alert("비밀번호가 잘못되었습니다.");
              } else {
                alert("예기치 못한 오류입니다. 나중에 다시 시도해 주세요.");
              }
            });
          break;

        default:
          break;
      }
    } else {
      alert("비밀번호를 입력해주세요.");
    }
  }
  return (
    <>
      <div>
        <button
          onClick={() => {
            window.history.back();
          }}
        >
          이전
        </button>
      </div>
      <input type="text" placeholder="제목" ref={titleRef} />
      {method === "insert" && (
        <input type="text" placeholder="글쓴이" ref={authorRef} />
      )}
      <textarea
        style={{ resize: "none", width: "90%", height: "500px" }}
        placeholder="내용"
        ref={contentRef}
      ></textarea>
      <input type="password" placeholder="비밀번호" ref={passwordRef} />
      <button onClick={edit}>
        {method === "insert" ? "글쓰기" : method === "update" && "편집"}
      </button>
    </>
  );
};

export default Edit;
