export let topBtnStyle = topBtnToggle();


export function classifyParam(_param) {
    let optParam = _param.replace("?","").replace("&");
    let paramsArray = optParam.split("=");
    let classifiedParams = {};
    classifiedParams[paramsArray[0]] = paramsArray[1];
    return classifiedParams;
}

export function topBtnToggle() {
    let style = {
        display: 'block'
    }

    if (window.scrollX === 0 && window.scrollY === 0) {
        style.display = 'none';
    }

    console.log(style);
}