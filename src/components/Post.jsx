import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";

const Post = ({ author, title, content, date, id, comments, reload }) => {
  const [subMenu, setSubMenu] = useState();

  const passwordRef = useRef();
  const commentAuthorRef = useRef();
  const commentRef = useRef();

  function deletePost() {
    setSubMenu(
      <>
        <input type="password" placeholder="비밀번호" ref={passwordRef} />
        <button
          onClick={() => {
            if (passwordRef.current.value) {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                axios
                  .post(config.BACKEND_HOST + "/delete", {
                    ObjectId: id,
                    password: passwordRef.current.value,
                  })
                  .then(() => {
                    alert("삭제가 완료되었습니다.");
                    window.location.href = "/";
                  })
                  .catch((response) => {
                    if (response.response.data === "password-error") {
                      passwordRef.current.value = "";
                      alert("비밀번호가 잘못되었습니다.");
                    } else {
                      alert(
                        "예기치 못한 오류가 발생했습니다. 나중에 다시 시도하세요."
                      );
                    }
                  });
              }
            } else {
              alert("비밀번호를 입력해주세요.");
            }
          }}
        >
          삭제
        </button>
        <button
          onClick={() => {
            setSubMenu();
          }}
        >
          취소
        </button>
      </>
    );
  }
  const autoPre = { fontFamily: "auto" };
  return (
    <>
      <div style={{ display: "flex", gap: "5px", alignItems: "flex-end" }}>
        <span style={{ display: "inline", fontSize: "2em" }}>{title}</span>
        <Link to={`/update/${id}`}>
          <button>편집</button>
        </Link>
        <button onClick={deletePost}>삭제</button>
      </div>
      {subMenu}
      <h4>작성자: {author}</h4>
      <h4>작성일: {date}</h4>
      <fieldset>
        <legend>내용</legend>
        <pre style={autoPre}>{content}</pre>
      </fieldset>
      <fieldset>
        <legend>댓글</legend>
        {comments.length === 0
          ? "댓글이 없습니다."
          : comments.map((comment, i) => (
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
                key={i}
              >
                <pre style={autoPre}>
                  {comment.author + ": " + comment.content}
                </pre>
                <code style={{marginBottom: "3px"}}>{comment.date}</code>
              </div>
            ))}
        <div
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <input type="text" placeholder="댓글 글쓴이" ref={commentAuthorRef} />
          <textarea
            placeholder="댓글을 입력하세요."
            style={{ width: "253px", height: "44px", resize: "none" }}
            ref={commentRef}
          ></textarea>
          <button
            onClick={() => {
              if (commentAuthorRef.current.value && commentRef.current.value) {
                axios
                  .post(config.BACKEND_HOST + "/comment", {
                    ObjectId: id,
                    author: commentAuthorRef.current.value,
                    content: commentRef.current.value,
                  })
                  .then(() => {
                    reload();
                    commentRef.current.value = "";
                    alert("댓글을 달았습니다.");
                  })
                  .catch(() => {
                    alert(
                      "예기치 못한 오류가 발생했습니다. 나중에 다시 시도하세요."
                    );
                  });
              } else if (
                !commentAuthorRef.current.value &&
                !commentRef.current.value
              ) {
                alert("댓글 작성자, 댓글을 입력해주세요.");
              } else if (!commentAuthorRef.current.value) {
                alert("댓글 작성자를 입력해주세요.");
              } else if (!commentRef.current.value) {
                alert("댓글을 입력해주세요.");
              }
            }}
          >
            댓글 달기
          </button>
        </div>
        <button
          onClick={() => {
            reload();
          }}
        >
          댓글 새로고침
        </button>
      </fieldset>
    </>
  );
};

export default Post;
