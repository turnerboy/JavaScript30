const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const ghosting = document.querySelector('[id = "ghosting"]')
const rgb = document.querySelector('#rgbshift')
const red = document.querySelector('#redshift')

// PhotoIndexing
let i = 0

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(blob => {
            video.srcObject = blob
            video.play()
        })
        .catch(err => {
            console.error("The follwing happend :\n",err)
        })
}

function paintCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0,0, width,height);
        // Choosing filters
        if (rgb.checked){
            pixels = rgbSplit(pixels)
            ctx.putImageData(pixels, 0, 0)
        }
        if(red.checked){
            pixels = redShift(pixels)
            ctx.putImageData(pixels, 0, 0)
        }
        ctx.globalAlpha = ghosting.checked ? 0.1 : 1


    }, 15)
}

//Filters

// 1) Red Shift:
function redShift(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i + 0] += 100
        pixels.data[i + 1] -= 50
        pixels.data[i + 2] *= 0.5
    }
    return pixels
}

// 2) RGB Split:
function rgbSplit(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i + 0] = pixels.data[i + 150]
        pixels.data[i + 1] = pixels.data[i - 100] 
        pixels.data[i + 2] = pixels.data[i + 350] 
    }
    return pixels

}

function takePhoto(){

    // Play Sound
    snap.currentTime = 0
    snap.play()

    // Provide Photo for download
    const data = canvas.toDataURL('image/jpeg')
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download',`img_booth[${++i}].jpeg`)
    link.innerHTML = `<img src ='${data}'>`
    strip.insertBefore(link,strip.firstChild)

}

getVideo()

video.addEventListener('canplay',paintCanvas)