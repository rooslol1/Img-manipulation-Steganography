
//handle decoding
let decodeCanvas = document.getElementById('imageCanvas2');
let decodeContext = decodeCanvas.getContext('2d');
let imageLoader2 = document.getElementById('imageLoader2');
    imageLoader2.addEventListener('change', decodeImage, false);


function decodeImage(e){
    console.log('handle image 2');
    let reader2 = new FileReader();
    reader2.onload = function(event){
        console.log('reader2 loaded');
        let img2 = new Image();
        img2.onload = function(){
            console.log('img2 loaded');
            decodeCanvas.width = img2.width;
            decodeCanvas.height = img2.height;
            decodeContext.drawImage(img2,0,0);
            let decodeData = decodeContext.getImageData(0, 0, decodeCanvas.width, decodeCanvas.height);
            for (let i = 0; i < decodeData.data.length; i += 4) {
                if (decodeData.data[i+0] % 10 == 2) {
                    decodeData.data[i] = 0;
                    decodeData.data[i+1] = 0;
                    decodeData.data[i+2] = 0;
                    decodeData.data[i+3] = 255;
                }
                else {
                    decodeData.data[i+3] = 0;
                }
            }
            decodeContext.putImageData(decodeData, 0, 0);
        };
        img2.src = event.target.result;
    };
    reader2.readAsDataURL(e.target.files[0]);
}
