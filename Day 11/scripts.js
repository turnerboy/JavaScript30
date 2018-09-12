const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// TODO : functions
function togglePlay(){
    video[video.paused ? 'play' : 'pause']()
}

function buttonChange(){
    toggle.textContent = this.paused ? '►' : '▌▌'
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}

function slider(){
    video[this.name] = this.value
}

function updataeProgress(){
    const newTime = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${newTime}%`
}

function scrub(e){
    const scrubtime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubtime
}

// TODO : listeners
video.addEventListener('click',togglePlay)
video.addEventListener('play',buttonChange)
video.addEventListener('pause',buttonChange)
video.addEventListener("timeupdate",updataeProgress)

toggle.addEventListener('click',togglePlay)

skipButtons.forEach(button => button.addEventListener('click',skip))

ranges.forEach(range => range.addEventListener('change',slider))
ranges.forEach(range => range.addEventListener('mousemove',slider))

let mousedown = false
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',(e) => mousedown && scrub(e))
progress.addEventListener('mousedown',() => mousedown = true )
progress.addEventListener('mouseup',() => mousedown = false )