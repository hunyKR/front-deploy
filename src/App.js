import React, { useEffect, useState } from "react";
import config from "./config";
import { Link, useParams } from "react-router-dom";
import Post from "./components/Post";
import axios from "axios";

const App = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState({ data: [], fetched: false });
  const [post, setPost] = useState({ undefined: true });
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (id) {
      axios
        .get(config.BACKEND_HOST + "/select/" + id)
        .then((response) => {
          setPost(response.data);
        })
        .catch(() => {});
    } else {
      axios
        .get(config.BACKEND_HOST + "/select")
        .then((response) => {
          setPosts({ data: response.data, fetched: true });
        })
        .catch(() => {
          alert("예기치 못한 오류가 발생했습니다. 나중에 다시 시도하세요.");
        });
    }
  }, [id, reload]);

  return id ? (
    !post.undefined && (
      <Post
        id={post._id}
        author={post.author}
        title={post.title}
        content={post.content}
        date={post.date}
        comments={post.comments}
        reload={() => {
          setReload(!reload)
        }}
      />
    )
  ) : (
    <div>
      <Link to="/insert">글쓰기</Link>
      <ul>
        {posts.data.map((element, i) => (
          <li key={i}>
            <Link to={element._id}>{element.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
