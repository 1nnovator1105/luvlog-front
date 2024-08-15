import React from 'react';
import moment from 'moment';
import {classifyParam} from "../../common/commonUtil";

function Part({ history, title, contents, author, date, postId }) {

    const moveToPost = (pid) => {
        const pageGroup = classifyParam(window.location.search);
        // window.location.href = `/post/${pid}`;
        history.push(`/post/${pid}?page=${pageGroup.page}`)
    }

    return (
        <>
            <div className="contents-summary" onClick={() => moveToPost(postId)}>
                <h2>{title}</h2>
                <p>{contents}</p>
                <div className="contents-info">
                    <p className="contents-author">{author}</p>
                    <p className="contents-date">{moment(date, "YYYY-MM-DD hh:mm:ss").format("YYYY.MM.DD HH:mm:ss")}</p>
                </div>
            </div>
        </>
    )
}

export default Part;