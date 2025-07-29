import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsNc,
  faCreativeCommonsNd,
} from "@fortawesome/free-brands-svg-icons";
import "./post.css";
import TopButton from "../common/TopButton";

function Post(props) {
  const [post, setPost] = useState({});
  const postId = props.location.pathname.replace(props.match.path, "");

  useEffect(() => {
    const URL = `https://luvlog-server.vercel.app/api/post/${postId}`;
    axios({
      url: URL,
    })
      .then((res) => res.data)
      .then((data) => {
        let sessionRole = sessionStorage.getItem("role");

        if (sessionRole !== "관리자" && data.ACCESS_LEVEL === 1) {
          props.history.push("/list");
        }

        setPost(data);
      });
  }, [postId]);

  return (
    <>
      <Header />
      <div className={"container"}>
        <h1 className={"post-title"}>{post.TITLE}</h1>
        <div className={"post-edit"}>
          <span>수정</span>
          <span>삭제</span>
        </div>
        <div
          className={"post-contents"}
          dangerouslySetInnerHTML={{ __html: post.CONTENTS }}
        />
        <div className={"post-footer"}>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faCreativeCommons} size="lg" />
            <FontAwesomeIcon icon={faCreativeCommonsBy} size="lg" />
            <FontAwesomeIcon icon={faCreativeCommonsNc} size="lg" />
            <FontAwesomeIcon icon={faCreativeCommonsNd} size="lg" />
          </a>
          <p>
            Written by <span>{post.AUTHOR}</span> at{" "}
            <span>{post.CREATE_DATE}</span>
          </p>
        </div>
      </div>
      <TopButton />
    </>
  );
}

export default Post;
