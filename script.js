// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
 
// Create the audio element for the player
let curr_track = document.createElement('audio');

//defining the track list that will be played within an object - Each of the tracks can then be accessed using its track index.
let track_list = [
  {
    name: "Dreamgirl",
    artist: "Tanerelle",
    image: "https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2F4d779061bdb1fb015d1295a3a2e90c1b.1000x1000x1.jpg",
    path: "1.Tanerélle - Dreamgirl.mp3"
  },
  {
    name: "CONVERSATION",
    artist: "Gwen Bunn",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7c/43/94/7c439479-cb0f-d100-8a5f-f43ddd705915/193436295390_GwenBunn.jpg/592x592bb.webp",
    path: "2.CONVERSATION.mp3"
  },
  {
    name: "UR_Room",
    artist: "Wesley Joesph",
    image: "https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2F726c8e56eab4a50d4731816c0a44227b.699x699x1.jpg",
    path: "3.UR_Room.mp3"
  },
  {
    name: "Summer lost",
    artist: "slenderbodies",
    image: "https://m.media-amazon.com/images/I/41Aji9EEMgS._UX716_FMwebp_QL85_.jpg",
    path: "4.summer lost.mp3"
  },
  {
    name: "Reason",
    artist: "Spooky Black",
    image: "https://f4.bcbits.com/img/a0595611915_16.jpg",
    path: "5.Spooky Black - Reason (Prod. Doc & Thestand4rd).mp3"
  },
  {
    name: "Guns & Roses",
    artist: "Loner",
    image: "https://t2.genius.com/unsafe/252x252/https%3A%2F%2Fimages.genius.com%2Fdca53842c550349f93824a64a267d35b.500x500x1.png",
    path: "6.guns & roses.mp3"
  },
  {
    name: "Perspectives",
    artist: "Orbit",
    image: "https://f4.bcbits.com/img/a2206225096_16.jpg",
    path: "7.Perspectives.mp3"
  },
  {
    name: "Channel 2",
    artist: "Slow Pulp",
    image: "https://f4.bcbits.com/img/a4107669691_16.jpg",
    path: "8.Channel 2.mp3"
  },
  {
    name: "A world of 100",
    artist: "Johnny Rain",
    image: "https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2F148e7068ebe2f5ed26770332a4b577f9.1000x1000x1.png",
    path: "9.Johnny Rain - A World of 100 feat. Quod Amoris.mp3"
  },
  {
    name: "MOOD",
    artist: "Lex Amor",
    image: "https://t2.genius.com/unsafe/175x175/https%3A%2F%2Fimages.genius.com%2Fee2f79a886151f0152f78e05b27f8df5.1000x1000x1.jpg",
    path: "10.MOOD (Prod. False Ego).mp3"
  },
  {
    name: "10.31",
    artist: "MNCE",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/96/99/48/9699483e-2f39-c598-2399-48247815abf5/artwork.jpg/592x592bb.webp",
    path: "11.10_31.mp3"
  },
  {
    name: "PT.II (Drake & Drive)",
    artist: "Ambre",
    image: "https://assets.audiomack.com/ambre/159c51034beccf8b29bdc08ab5f313bea08306d6c329f851e293827ba3c2734c.jpeg",
    path: "12.PT. II (DRAKE & DRIVE).mp3"
  },
  {
    name: "Stranger Things",
    artist: "Emerson",
    image: "https://i1.sndcdn.com/artworks-WdtnRJQ5To8nJ0vg-aqRcqQ-large.jpg",
    path: "13.Stranger Things.mp3"
  },
  {
    name: "KEHLANI",
    artist: "Jordan Adetunji",
    image: "https://t2.genius.com/unsafe/240x240/https%3A%2F%2Fimages.genius.com%2F16491c7ab8e7d987fee8a97dea37a819.1000x1000x1.jpg",
    path: "14.KEHLANI.mp3"
  },
  {
    name: "Female Energy",
    artist: "Willow Smith",
    image: "https://t2.genius.com/unsafe/240x240/https%3A%2F%2Fimages.genius.com%2F0a1a7058fdb5e83466d80227e737a91f.1000x1000x1.jpg",
    path: "15.Female Energy - Freestyle _ Prod. AzZi _ Willow.mp3"
  },

];

function random_bg_color() {
  // Get a random number 50 of 256
  // (for getting lighter colors (64+))
  let red = Math.floor(Math.random() * 256) + 50;
  let green = Math.floor(Math.random() * 256) + 50;
  let blue = Math.floor(Math.random() * 256) + 50;
 
  // Construct a color with the given values
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
 
  // Set the background to the new color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
 
  // Update details of the track
  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = `PLAYING ${track_index + 1} OF ${track_list.length}`;
 
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
 // Apply a random background color
  random_bg_color();
}
 
 
// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

//load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}
 

function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
 
  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
 
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
 
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
 
function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}
 
function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider 
  // and get the relative duration to the track
  let seekto = curr_track.duration * (seek_slider.value / 100);
  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}
 
function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}
 
function seekUpdate() {
  let seekPosition = 0;
 
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
 
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
