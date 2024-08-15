import React, { useState, useEffect, useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import './write.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from 'axios';

import { Editor } from '@toast-ui/react-editor';
import chart from '@toast-ui/editor-plugin-chart';
import 'tui-chart/dist/tui-chart.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'highlight.js/styles/github.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Header from "../layout/Header";
import uncheckedImg from '../../static/checkbox_unchecked.png'
import checkedImg from '../../static/checkbox_checked.png'

import Resizer from 'react-image-file-resizer';

function Write(prop) {
    const editorRef = useRef();
    const [title, setTitle] = useState('');
    const [readMode, setReadMode] = useState(false);

    const IMAGE_RESIZER = (file, fileFormat, outputType) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 800, 600, fileFormat, 100, 0,
        uri => {
            resolve(uri);
        }, outputType)
    })
    
    const blobToFile = (blob, filename) => {
        let nowDate = new Date();
        blob.lastModifiedDate = nowDate;
        blob.name = 's3_images_' + blob.lastModifiedDate;
        return blob;
    }

    const saveBtnClickListener = () => {
      const editorInstance = editorRef.current.getInstance();
      const getMarkdown = editorInstance.getMarkdown();
      const getHtml = editorInstance.getHtml();

      if (!title) {
          return alert('제목을 입력해줘~!');
      } else if (!getHtml) {
          return alert('내용을 입력해줘~!');
      }

      const URL = '/api/write';
      const PARAMS = {
          'title': title,
          'author': 'ysms',
          'contents': getHtml,
          'accessLevel': readMode
      };
      const HEADERS = {
          'Content-Type': 'application/json'
      };

      axios({
          method: 'post',
          url: URL,
          data: PARAMS,
          headers: HEADERS
      }).then(res => {
          prop.history.push('/list');
      });
    };

    const tileBoxChangeListener = (e) => {
        setTitle(e.currentTarget.value);
    }

    const modeHandler = (e) => {
        setReadMode(e.target.checked);
    }

    const uploadImage = async (blobFile, filename) => {

        let formData = new FormData();
        formData.append('data', blobFile, filename);

        const URL = '/api/upload';
        const PARAMS = {
            data: formData
        };
        const HEADERS = {
            'Content-Type': 'multipart/form-data'
        };

        const getS3ImageUrl = await axios({
            method: 'post',
            url: URL,
            data: formData,
            /*headers: HEADERS*/
        }).then(res => {
            return res.data;
        });

        return getS3ImageUrl;
    }

    return (
        <>
            <Header/>
            <div style={{maxWidth: '1024px', margin:'20px auto 0'}}>
                <input className='titleBox' type="text" placeholder="제목" onChange={tileBoxChangeListener} maxLength="80"/>
                <Editor
                    style={{color:'unset'}}
                    placeholder="여기에 입력해줘~"
                    previewStyle="vertical"
                    height="calc(100vh - 300px)"
                    initialEditType="wysiwyg"
                    plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                    useCommandShortcut={true}
                    usageStatistics={false}
                    ref={editorRef}
                    hooks={{
                        addImageBlobHook: async (file, callback) => {
                            const resizedImageBlob = await IMAGE_RESIZER(file, 'png', 'blob');
                            let s3uploadUrl = await uploadImage(resizedImageBlob, file.name);
                            callback(s3uploadUrl, 'alt text');
                            return false;
                        }
                    }}
                    language='ko-KR'
                />

                <div className='checkBox'>
                    <input type="checkbox" id="read_for" name="read_for" value="ADMIN" onChange={modeHandler}/>
                    <label htmlFor="read_for">
                        <img src={readMode ? checkedImg : uncheckedImg} alt="checkbox"/>
                        ONLY FOR ADMIN
                    </label>
                </div>
                <button className='saveBtn' onClick={saveBtnClickListener}>글저장</button>
            </div>
        </>
    )

}

export default Write;