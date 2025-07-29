import React, { useState, useEffect } from "react";
import axios from "axios";
import Part from "./Part";
import Header from "../layout/Header";
import "./list.css";
import { classifyParam } from "../../common/commonUtil";
import ReactPaginate from "react-paginate";
import TopButton from "../common/TopButton";

function List(props) {
  const [page, setPage] = useState(0);
  const [listStatus, setListStatus] = useState({});
  const [list, setList] = useState([]);
  const [readLimit, setReadLimit] = useState(5);
  const [load, setLoad] = useState(false);

  const love = () => {
    /* 터니니와의 러브로직인규 */
    let maxPage = listStatus.TOTAL_PAGE;
    let pageGroups = maxPage % 5;
    let nowPageGroup = Math.ceil((page + 1) / 5);
    let listNumberStr = [];
    for (let i = 1; i <= 5; i++) {
      if (i + (nowPageGroup - 1) * 5 > maxPage) break;
      listNumberStr.push(<span>{i + (nowPageGroup - 1) * 5}</span>);
    }
    return listNumberStr;
  };

  useEffect(() => {
    let isPageAccess = classifyParam(window.location.search);
    if (typeof isPageAccess.page === "undefined") {
      window.location.href = `/list?page=0`;
    }
  }, []);

  useEffect(() => {
    return () => setList([]);
  }, []);

  useEffect(() => {
    /* 초기값 init */
    const params = classifyParam(props.location.search);
    setPage(Number(params.page));
  }, [props.location.search]);

  useEffect(() => {
    getListStatus();
  }, [readLimit]);

  useEffect(() => {
    listStatus.TOTAL_PAGE && setLoad(true);
  }, [listStatus]);

  useEffect(() => {
    getList();
  }, [page, listStatus]);

  const getListStatus = () => {
    const URL = "https://luvlog-server.vercel.app/api/getListStatus";
    const PARAMS = {
      readLimit: readLimit,
      role: sessionStorage.getItem("role"),
    };
    axios({
      url: URL,
      params: PARAMS,
    })
      .then((res) => res.data)
      .then((data) => {
        setListStatus(data);
      });
  };

  const getList = () => {
    const URL = "https://luvlog-server.vercel.app/api/getList";
    const PARAMS = {
      readLimit: readLimit,
      totalCnt: listStatus.TOTAL_CNT || 0,
      page: Number(page),
      role: sessionStorage.getItem("role"),
    };
    axios({
      url: URL,
      params: PARAMS,
    })
      .then((res) => res.data)
      .then((data) => {
        setList(data);
      });
  };

  const onPageChangeHandler = ({ selected }) => {
    props.history.push(`/list?page=${selected}`);
    const params = classifyParam(window.location.search);
    setPage(Number(params.page));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <div>
        {list.map((value, idx) => {
          return (
            <Part
              {...props}
              title={value.CONTENTS_TITLE}
              contents={value.CONTENTS_SUMMARY}
              author={value.CONTENTS_AUTHOR}
              date={value.CREATE_DATE}
              key={value.CONTENTS_ID}
              postId={value.CONTENTS_ID}
            />
          );
        })}
      </div>
      <div className="list-number">
        {/* https://github.com/AdeleD/react-paginate#props */}
        {load ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={listStatus.TOTAL_PAGE}
            marginPagesDisplayed={5}
            pageRangeDisplayed={readLimit}
            forcePage={page}
            activeClassName={"active-page"}
            onPageChange={onPageChangeHandler}
          />
        ) : (
          ""
        )}
      </div>
      {load ? <TopButton /> : ""}
    </>
  );
}

export default List;
