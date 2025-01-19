const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "Ini Laguku",
    name: "Mahalini",
    source:
      "MAHALINI - INI LAGUKU (OFFICIAL MUSIC VIDEO).mp4",
  },
  {
    title: "Mencintaimu",
    name: "Mahalini",
    source:
      "MAHALINI - MENCINTAIMU (LYRIC VIDEO) LIRIK LAGU TRENDING TERBARU.mp4",
  },
  {
    title: "Bermuara",
    name: "Rizky Febian Feat. Mahalini",
    source:
      "Rizky Febian Feat. Mahalini - Bermuara [Official Lyric Video].mp4",
  },
  {
    title: "Cinta Luar Biasa",
    name: "Andmesh",
    source:
      "Andmesh - Cinta Luar Biasa (Lirik Lagu).mp4",
  },
  {
    title: "Kau adalah orang favoritku nomor 1",
    name: "Sal Priadi",
    source:
      "Sal Priadi - I'd Like To Watch You Sleeping (Lirik Lagu) Kau adalah orang favoritku nomor 1.mp4",
  },

  {
    title: "Penjaga Hati",
    name: "Nadhif Basalamah",
    source:
      "nadhif basalamah - penjaga hati (Official Lyric Video).mp4",
  },
  {
    title: "Aku Yang Jatuh Cinta",
    name: "Dudy Oris",
    source:
      "Dudy Oris - Aku Yang Jatuh Cinta(Lyrics).mp4",
  },
];

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", () => {});
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex); 
  playSong(); 
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  playSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 3,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo(); 
  playPause(); 
});