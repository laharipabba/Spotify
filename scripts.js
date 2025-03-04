console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio();  
let masterplay = document.getElementById("masterplay");
let myprogress = document.getElementById("progress");
let gif = document.getElementById("gif");
let mas = document.getElementById("mas");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let audio = [
    {
      songName: "Nenu Nenuga",
      filepath: "audio/1.mp3",
      coverPath: "cover/1.jpg",
    },
    {
      songName: "Naalona Pongenu",
      filepath: "audio/2.mp3",
      coverPath: "cover/2.jpg",
    },
    {
      songName: "Hoyna Hoyna",
      filepath: "audio/3.mp3",
      coverPath: "cover/3.jpeg",
    },
    {
      songName: "Hello Ramante",
      filepath: "audio/4.mp3",
      coverPath: "cover/4.jpeg",
    },
    {
      songName: "Gaaju Bomma",
      filepath: "audio/5.mp3",
      coverPath: "cover/5.webp",
    },
    {
      songName: "Nijanga Nenena",
      filepath: "audio/6.mp3",
      coverPath: "cover/6.jpeg",
    },
    {
      songName: "Neeti Mullai",
      filepath: "audio/7.mp3",
      coverPath: "cover/7.jpeg",
    },
    {
      songName: "Gundu Sudhi",
      filepath: "audio/8.mp3",
      coverPath: "cover/8.jpg",
    },
    {
      songName: "Newyork Nagaram",
      filepath: "audio/9.mp3",
      coverPath: "cover/9.jpeg",
    },
    {
      songName: "Kanni Ipudu",
      filepath: "audio/10.mp3",
      coverPath: "cover/10.jpeg",
    },
    {
      songName: "Em sandheham ledhu",
      filepath: "audio/11.mp3",
      coverPath: "cover/11.jpg",
    },{
      songName: "Chandamama Okati",
      filepath: "audio/12.mp3",
      coverPath: "cover/12.jpg",
    },
  
  ];


songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = audio[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = audio[i].songName;
});

masterplay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong();
  } else {
    audioElement.pause();
    masterplay.classList.replace("fa-pause", "fa-play");
    gif.style.opacity = 0;
  }
});



audioElement.addEventListener("timeupdate", () => {
    if (!isNaN(audioElement.duration)) { // Ensure duration is valid
        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        myprogress.value = progress;
    }
});



myprogress.addEventListener("input", () => {
    if (!isNaN(audioElement.duration)) {
        let seekTime = (myprogress.value / 100) * audioElement.duration;
        audioElement.currentTime = seekTime;
    }
});


const playSong = () => {
    audioElement.src = audio[songIndex].filepath;
    mas.innerText = audio[songIndex].songName;
    audioElement.currentTime = 0;
    myprogress.value = 0; 
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.replace("fa-play", "fa-pause");
};




const makeAllPlays = () => {
  document.querySelectorAll(".songItemPlay").forEach((element) => {
    element.classList.replace("fa-pause", "fa-play");
  });
};


document.querySelectorAll(".songItemPlay").forEach((element, index) => {
  element.addEventListener("click", (e) => {
    if (songIndex === index && !audioElement.paused) {
      audioElement.pause();
      e.target.classList.replace("fa-pause", "fa-play");
      masterplay.classList.replace("fa-pause", "fa-play");
      gif.style.opacity = 0;
    } else {
      makeAllPlays();
      songIndex = index;
      playSong();
      e.target.classList.replace("fa-play", "fa-pause");
    }
  });
});


document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % audio.length;
  playSong();
});

document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + audio.length) % audio.length;
  playSong();
});


searchBar.addEventListener("input", () => {
    let query = searchBar.value.toLowerCase();
    document.querySelectorAll(".songItem").forEach(item => {
        let songName = item.querySelector(".songName").innerText.toLowerCase();
        item.style.display = songName.includes(query) ? "flex" : "none";
    });
});


shuffle.addEventListener("click", () => {
    songIndex = Math.floor(Math.random() * audio.length);
    playSong();
});

repeat.addEventListener("click", () => {
    audioElement.loop = !audioElement.loop;
    repeatBtn.style.color = audioElement.loop ? "green" : "white";
});

audioElement.volume = 0.5; // 50% default


document.getElementById("volume").addEventListener("input", function () {
    let volumeLevel = this.value / 100;
    audioElement.volume = volumeLevel;

    
    let volumeIcon = document.querySelector(".volumeControl i.fa-solid");
    if (volumeLevel === 0) {
        volumeIcon.classList.replace("fa-volume-down", "fa-volume-off");
    } else if (volumeLevel < 0.5) {
        volumeIcon.classList.replace("fa-volume-off", "fa-volume-down");
        volumeIcon.classList.replace("fa-volume-up", "fa-volume-down");
    } else {
        volumeIcon.classList.replace("fa-volume-down", "fa-volume-up");
    }
});

fetch("http://localhost:5000/songs")
  .then(response => response.json())
  .then(songs => {
    audio = songs;
    updateUI();
  })
  .catch(error => console.error("Error fetching songs:", error));

function updateUI() {
  songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = audio[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = audio[i].songName;
  });
}
