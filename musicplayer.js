const songs = [
{
    title: "Lova Ya",
    artist: "Diljit Doshanj",
    src: "music/song1.mp3",
    cover: "IMG_20240309_141237_318.webp"
},
{
    title: "Nafrat",
    artist: "Darshan Raval",
    src: "music/song2.mp3",
    cover: "nafrat.webp"
},
{
    title: "Ratiyaan",
    artist: "Hansika",
    src: "music/song3.mp3",
    cover: "ratiyaan-hansika-pareek-translation.webp"
}
];

// Elements
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const volumeSlider = document.getElementById("volume");

const playlistItems = document.querySelectorAll("#playlist li");
const coverContainer = document.querySelector(".cover-container");

// State
let songIndex = 0;
let isShuffle = false;
let isRepeat = false;

// Load Song
function loadSong(index) {
    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;

    updatePlaylist(index);
}

// Update Active Playlist Item
function updatePlaylist(index) {
    playlistItems.forEach(item =>
        item.classList.remove("active")
    );

    playlistItems[index].classList.add("active");
}

// Play Song
function playSong() {
    audio.play();

    playBtn.innerHTML =
        '<i class="fas fa-pause"></i>';

    coverContainer.classList.add("playing");
}

// Pause Song
function pauseSong() {
    audio.pause();

    playBtn.innerHTML =
        '<i class="fas fa-play"></i>';

    coverContainer.classList.remove("playing");
}

// Toggle Play/Pause
playBtn.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});

// Next Song
function nextSong() {

    if (isShuffle) {
        songIndex =
            Math.floor(Math.random() * songs.length);
    } else {
        songIndex++;

        if (songIndex >= songs.length) {
            songIndex = 0;
        }
    }

    loadSong(songIndex);
    playSong();
}

// Previous Song
function prevSong() {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
}

// Buttons
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Progress Update
audio.addEventListener("timeupdate", (e) => {

    const { duration, currentTime } = e.srcElement;

    const progressPercent =
        (currentTime / duration) * 100;

    progress.style.width =
        `${progressPercent}%`;

    currentTimeEl.textContent =
        formatTime(currentTime);

});

// Duration Loaded
audio.addEventListener("loadedmetadata", () => {

    durationEl.textContent =
        formatTime(audio.duration);

});

// Seek Song
progressContainer.addEventListener("click", (e) => {

    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime =
        (clickX / width) * duration;

});

// Format Time
function formatTime(time) {

    if (isNaN(time)) return "0:00";

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

// Volume Control
volumeSlider.addEventListener("input", () => {

    audio.volume = volumeSlider.value;

});

// Playlist Click
playlistItems.forEach(item => {

    item.addEventListener("click", () => {

        songIndex =
            parseInt(item.dataset.index);

        loadSong(songIndex);
        playSong();

    });

});

// Song End
audio.addEventListener("ended", () => {

    if (isRepeat) {

        audio.currentTime = 0;
        playSong();

    } else {

        nextSong();

    }

});

// Shuffle Toggle
shuffleBtn.addEventListener("click", () => {

    isShuffle = !isShuffle;

    if (isShuffle) {

        shuffleBtn.style.background =
            "#1db954";

    } else {

        shuffleBtn.style.background =
            "#1e293b";
    }

});

// Repeat Toggle
repeatBtn.addEventListener("click", () => {

    isRepeat = !isRepeat;

    if (isRepeat) {

        repeatBtn.style.background =
            "#1db954";

    } else {

        repeatBtn.style.background =
            "#1e293b";
    }

});

// Keyboard Controls
document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }

    if (e.code === "ArrowRight") {
        nextSong();
    }

    if (e.code === "ArrowLeft") {
        prevSong();
    }

});

// Initial Load
loadSong(songIndex);
audio.volume = 1;