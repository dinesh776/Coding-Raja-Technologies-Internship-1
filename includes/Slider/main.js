const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");


const songs = [
  {
    title: "Symphony",
    name: "Clean Bandit ft. Zara Larsson",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Clean-Bandit-Symphony.mp3",
  },
  {
    title: "Pawn It All",
    name: "Alicia Keys",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Pawn-It-All.mp3",
  },
  {
    title: "Seni Dert Etmeler",
    name: "Madrigal",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Madrigal-Seni-Dert-Etmeler.mp3",
  },
  {
    title: "Instant Crush",
    name: "Daft Punk ft. Julian Casablancas",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Daft-Punk-Instant-Crush.mp3",
  },
  {
    title: "As It Was",
    name: "Harry Styles",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Harry-Styles-As-It-Was.mp3",
  },

  {
    title: "Physical",
    name: "Dua Lipa",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Dua-Lipa-Physical.mp3",
  },
  {
    title: "Delicate",
    name: "Taylor Swift",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Taylor-Swift-Delicate.mp3",
  },
];

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
  song.play(); // Play the song
  song.addEventListener("loadeddata", function () {});
 }

song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
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

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
  playSong();
});

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playSong();
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playSong();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  initialSlide: 5,
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 350,
      modifier: 1,
      slideShadows: true
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
  simulateTouch: false,
});


// Shuffle functionality
const shuffleButton = document.querySelector(".shuffle");
const repeatButton = document.querySelector(".repeat");
let shuffleMode = false;
let repeatMode = false;

function shuffleSongs() {
 for (let i = songs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songs[i], songs[j]] = [songs[j], songs[i]];
 }
 currentSongIndex = 0;
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
 updateSongInfo();
}

// Repeat functionality
function toggleRepeat() {
 repeatMode = !repeatMode;
 repeatButton.classList.toggle("fa-repeat-1", repeatMode);
 if (repeatMode) {
    song.addEventListener("ended", function () {
      playSong();
    });
 } else {
    song.removeEventListener("ended", playNextSong());
 }
}

shuffleButton.addEventListener("click", shuffleSongs);
repeatButton.addEventListener("click", toggleRepeat);



// Function to play the next song when the current song ends
function playNextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
     currentSongIndex = 0; // Loop back to the beginning of the playlist
  }
  updateSongInfo();
 }
 
 
 // Add event listener for the ended event
 song.addEventListener("ended", playNextSong);
 
 // Existing event listeners...
 
 // Initialize song and shuffle mode
 updateSongInfo();
 if (shuffleMode) {
  shuffleSongs();
 }
 
 
// Inspiration: https://dribbble.com/shots/5455156-Car-HMI-assistant-Album-switching
