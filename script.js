console.log("Welcome to the Spotify");

let songIndex = 1;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongInfo");
let songItems = Array.from(document.getElementsByClassName("songItem"));

audioElement.setAttribute("preload", "auto");

let songs = [
    {songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {songName: "Ram Siya Ram", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Blur", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg"},
    {songName: "Nishaana", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Chhalle Mundiyan", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Dil Vich Kho", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg"},
    {songName: "Chann Warga", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Maan Le", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg"},
    {songName: "Mera Love Main", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg"},
    {songName: "Waqt Ke Jungle", filePath: "songs/10.mp3", coverPath: "covers/10.jpeg"},
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play pause click
masterPlay.addEventListener("click", () => {
    // Audio is stopped
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        iconElement = document.getElementById(songIndex);
        iconElement.classList.remove("fa-circle-play");
        iconElement.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        iconElement = document.getElementById(songIndex);
        iconElement.classList.remove("fa-circle-pause");
        iconElement.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener("timeupdate", () => { 
    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("fa-circle-pause")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
    element.addEventListener("click", (event) => {
        if (element.classList.contains("fa-circle-pause")) {
            event.target.classList.remove("fa-circle-pause");
            event.target.classList.add("fa-circle-play");
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        } else {
            makeAllPlays();
            songIndex = parseInt(event.target.id);
            event.target.classList.remove("fa-circle-play");
            event.target.classList.add("fa-circle-pause");
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterSongName.innerText = songs[songIndex - 1].songName;
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }
    })
})

document.getElementById("next").addEventListener("click", () => {
    iconElement = document.getElementById(songIndex);
    iconElement.classList.remove("fa-circle-pause");
    iconElement.classList.add("fa-circle-play");
    if (songIndex >= 10) {
        songIndex = 1;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex - 1].songName;
    iconElement = document.getElementById(songIndex);
    iconElement.classList.remove("fa-circle-play");
    iconElement.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

document.getElementById("previous").addEventListener("click", () => {
    iconElement = document.getElementById(songIndex);
    iconElement.classList.remove("fa-circle-pause");
    iconElement.classList.add("fa-circle-play");
    if (songIndex <= 1) {
        songIndex = 10;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex - 1].songName;
    iconElement = document.getElementById(songIndex);
    iconElement.classList.remove("fa-circle-play");
    iconElement.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

audioElement.addEventListener("ended", () => {
    iconElement = document.getElementById(songIndex);
    iconElement.classList.remove("fa-circle-pause");
    iconElement.classList.add("fa-circle-play");
    songIndex = (songIndex + 10) % 10;
    songIndex++;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex - 1].songName;
    iconElement = document.getElementById(songIndex);
    iconElement.classList.remove("fa-circle-play");
    iconElement.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})