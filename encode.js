let imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', encodeImage, false);
let canvasImage = document.getElementById('imageCanvas');
let contextImage = canvasImage.getContext('2d');
let messageInput = document.getElementById('message');
let textCanvas = document.getElementById('textCanvas');
let txtContext = textCanvas.getContext('2d');
let button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    let dataURL = canvasImage.toDataURL('image/png');
    button.href = dataURL;
});
function encodeImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
        let img = new Image();
        img.onload = function(){
            canvasImage.width = img.width;
            canvasImage.height = img.height;
            textCanvas.width=img.width;
            textCanvas.height=img.height;
            txtContext.font = "30px Arial";
            let messageText = (messageInput.value.length) ? messageInput.value : 'Hello';
            txtContext.fillText(messageText,10,50);
            contextImage.drawImage(img,0,0);
            let imgData = contextImage.getImageData(0, 0, canvasImage.width, canvasImage.height);
            let textData = txtContext.getImageData(0, 0, canvasImage.width, canvasImage.height);
            let pixelsInMsg = 0;
                pixelsOutMsg = 0;
            for (let i = 0; i < textData.data.length; i += 4) {
                if (textData.data[i+3] !== 0) { //zwart in geheime tekst
                    if (imgData.data[i] % 10 == 2) {
                        //doe niets
                    }
                    else if (imgData.data[i] > 252) {
                        imgData.data[i] = 252; //begrens de waarde
                    }
                    else {
                        while (imgData.data[i] % 10 != 2) {
                            imgData.data[i]++;//zorg dat op 8 eindigt
                        }
                    }
                    pixelsInMsg++;
                }
                else {
                    if (imgData.data[i]%10 == 2) {
                        imgData.data[i]--;
                    }
                    pixelsOutMsg++;
                }
            }
            console.log('pixels within message borders: '+pixelsInMsg);
            console.log('pixels outside of message borders: '+pixelsOutMsg);
            contextImage.putImageData(imgData, 0, 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}
