// script.js
async function checkPNR() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });
    
    xhr.open('GET', 'https://irctc1.p.rapidapi.com/api/v3/getPNRStatusDetail?pnrNumber=2714116346');
    xhr.setRequestHeader('x-rapidapi-key', '3e1d48eab4mshd0a99ba5b443864p151acbjsn1bd99f397aac');
    xhr.setRequestHeader('x-rapidapi-host', 'irctc1.p.rapidapi.com');
        xhr.send(data);
}

  