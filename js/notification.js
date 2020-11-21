export function showInfo(message) {
    const info = document.getElementById('successBox');
    if(info){
        info.textContent = message;
        info.style.display = 'block';
        info.addEventListener('click', hideInfo);
        setTimeout(hideInfo, 3000);
    }
    
}

export function showError(message) {
    const error = document.getElementById('errorBox');
    error.textContent = message;
    error.style.display = 'block';
    error.addEventListener('click', hideError);
}

let requests = 0;

export function beginRequest() {
    requests ++;
    let elem = document.getElementById('loadingBox');
    if(elem){elem.style.display = 'block';}
}

export function endRequest() {
    requests--;
    if (requests === 0){
        let elem = document.getElementById('loadingBox');
        if(elem){elem.style.display = 'none'};
    }
}

function hideInfo(){
    document.getElementById('successBox').style.display = 'none';
}

function hideError(){
    document.getElementById('errorBox').style.display = 'none';
}