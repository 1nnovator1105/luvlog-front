import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';
import './Common.css';
import Write from './components/write/Write';
import List from "./components/list/List";
import Post from "./components/post/Post";
import Login from "./components/login/Login";
import "./static/video-react.css";
import { Player } from 'video-react';
import hiddenVideoThumbnail from "./static/love-ys-hidden-thumbnail.jpg";
import hiddenVideo from "./static/love-ys-hidden-video.mp4";

function App() {
    const [authInfo, setAuthInfo] = useState({
        username: '',
        role: ''
    });
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        if (authInfo.role !== '') {
            sessionStorage.setItem('username', authInfo.username);
            sessionStorage.setItem('role', authInfo.role);
            window.location.href = '/list?page=0';
        }
    }, [authInfo])

    const setGuestMode = () => {
        setAuthInfo({username: 'guest', role: 'guest'});
    }

    const onHiddenVideo = () => {
        const userRole = sessionStorage.getItem('role');
        if (userRole === '관리자') {
            setIsHidden(!isHidden);
        } else {
            alert('어~디서 그냥!');
        }
    }

    return (
        <BrowserRouter>
            <div style={{position: 'relative', margin: '0 auto 30px', width: 'calc(100% - 40px)'}}>
                {
                    sessionStorage.length === 0
                        ? <Login setAuthInfo={setAuthInfo} setGuestMode={setGuestMode}/>
                        :
                        <Switch>
                            <Route path="/list" render={(props) => (<List {...props}/>)}/>
                            <Route path="/write" component={Write}/>
                            <Route path="/post/" component={Post}/>
                            {/*<Route path="/post/:idx" component={Post}/>*/}
                            <Route path="/post/:idx" render={(...props) => (<Post {...props}/>)}/>
                            <Redirect path="*" to="/list?page=0"/>
                        </Switch>
                }
                <p style={{textAlign: 'center', color: '#fff'}}>&copy; 2020. <span className={'hidden-video'} onClick={onHiddenVideo}>ysms</span> All rights reserved.</p>
            </div>

            <div style={isHidden ? {display: 'none'} : {display: 'block'}}>
                <Player
                    playsInline
                    poster={hiddenVideoThumbnail}
                    src={hiddenVideo}
                />
            </div>
        </BrowserRouter>
  );
}

export default App;
