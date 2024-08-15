import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './header.css';
import queryString from 'query-string';
import Write from "../write/Write";
import FunctionRenderer from "../common/FunctionRenderer";
import {classifyParam} from "../../common/commonUtil";
import pencilImg from '../../static/pencil.png';
import listImg from '../../static/list.png';
import logoutImg from '../../static/logout.png';

function Header(props) {
    const path = window.location.pathname || '';
    const pageGroup = classifyParam(window.location.search);

    const logout = () => {
        sessionStorage.clear();
        console.log(sessionStorage);
        window.location.href = '/';
    }
    const onClickLogo = () => {
        window.location.href = '/';
    }

    return (
        <div className="header">
            <div className="contents">
                <div onClick={logout}><img src={logoutImg} alt="logout"/><p>로그아웃</p></div>
                <FunctionRenderer>
                    {
                        () => {
                            if (path === '/list') {
                                return <Link to={`/write?page=${pageGroup.page}`}><img src={pencilImg} alt="write"/><p>글쓰기</p></Link>
                            } else {
                                return <Link to={`/list?page=${pageGroup.page}`}><img src={listImg} alt="list"/><p>글목록</p></Link>
                            }
                        }
                    }
                </FunctionRenderer>
                <ul onClick={onClickLogo}>
                    <li>L</li>
                    <li>U</li>
                    <li>V</li>
                    <li>L</li>
                    <li>O</li>
                    <li>G</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;