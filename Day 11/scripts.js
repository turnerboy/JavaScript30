const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// TODO : functions
function togglePlay(){
    this[this.paused ? 'play' : 'pause']()
}

function buttonChange(){
    this.textContent = video.paused ? '►' : '▌▌'
}
// TODO : listeners
video.addEventListener('click',togglePlay)
toggle.addEventListener('click',togglePlay)
