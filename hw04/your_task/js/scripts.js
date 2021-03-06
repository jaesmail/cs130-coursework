const baseURL = "https://www.apitutor.org/spotify/simple/v1/search";

// Note: AudioPlayer is defined in audio-player.js
const audioFile =
  "https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c";
const audioPlayer = AudioPlayer(".player", audioFile);

const search = (ev) => {
  const term = document.querySelector("#search").value;
  console.log("search for:", term);
  // issue three Spotify queries at once...
  getTracks(term);
  getAlbums(term);
  getArtist(term);
  if (ev) {
    ev.preventDefault();
  }
};

const getTracks = async (term) => {
  const res = await fetch(
    `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}`
  );
  const data = await res.json();

  const outputContainer = document.querySelector("#tracks");

  if (data.length === 0) {
    outputContainer.innerHTML = "<p>No tracks found</p>";
    return;
  }

  const tracks = data.slice(0, 5);

  outputContainer.innerHTML = tracks
    .map(
      (track) => `
        <section class="track-item preview" data-preview-track="${
          track.preview_url
        }">
            <img src=${track.album.image_url}>
            <i class="fas play-track fa-play" aria-hidden="true"></i>
            <div class="label">
                <h3>${track.name}</h3>
                <p>
                    ${track.artist.name} ${
        track.preview_url ? "" : "(no preview available)"
      }
                </p>
            </div>
        </section>
    `
    )
    .join("");

  const tracksContainers = document.querySelectorAll(".track-item");

  for (const trackContainer of tracksContainers) {
    trackContainer.addEventListener("click", (e) => {
      const previewTrack = e.currentTarget.dataset.previewTrack;
      if (!previewTrack) {
        return;
      }

      audioPlayer.setAudioFile(previewTrack);
      audioPlayer.play();
    });
  }
};

const getAlbums = async (term) => {
  console.log("HELKLKO");

  console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);

  const res = await fetch(
    `https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${term}`
  );
  const albums = await res.json();

  const outputContainer = document.querySelector("#albums");

  if (albums.length === 0) {
    outputContainer.innerHTML = "<p>No albums were returned.</p>";
    return;
  }

  outputContainer.innerHTML = albums
    .map(
      (album) => `
        <section class="album-card" id="2lATw9ZAVp7ILQcOKPCPqp">
            <div>
                <img src=${album.image_url}>
                <h3>${album.name}</h3>
                <div class="footer">
                    <a href="${album.spotify_url}" target="_blank">
                        view on spotify
                    </a>
                </div>
            </div>
        </section>
    `
    )
    .join("");
};

const getArtist = async (term) => {
  const res = await fetch(
    `https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}`
  );
  const data = await res.json();

  const outputContainer = document.querySelector("#artist");

  if (data.length === 0) {
    outputContainer.innerHTML = "<p>No artists found</p>";
    return;
  }

  const artist = data[0];

  outputContainer.innerHTML = `
    <section class="artist-card" id=${artist.id}>
        <div>
            <img src=${artist.image_url}>
            <h3>${artist.name}</h3>
            <div class="footer">
                <a href=${artist.spotify_url} target="_blank">
                    view on spotify
                </a>
            </div>
        </div>
    </section>
    `;
};

document.querySelector("#search").onkeyup = (ev) => {
  // Number 13 is the "Enter" key on the keyboard
  console.log(ev.keyCode);
  if (ev.keyCode === 13) {
    ev.preventDefault();
    search();
  }
};
