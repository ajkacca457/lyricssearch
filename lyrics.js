const form = document.querySelector(".searchhere");
const input = document.querySelector("input");
const result = document.querySelector("#result");
const more = document.querySelector("#more");



async function showcontent(term) {
  const res = await fetch(`https://api.lyrics.ovh/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showsong(data);
}


async function moresongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showsong(data);
  }


async function getlyrics(artist,title) {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await res.json();
    const lyrics=data.lyrics.replace(/(\r\n|\r|\n)/g,"<br>")
    result.innerHTML=
      `<h2>Band/Artist:${artist}</h2> <br>
      <h3>Song Name:${title}</h3><br>
      <p>${lyrics}</p>
      `
    }




function showsong(data) {
  result.innerHTML = `<ul>
${data.data.map((song)=>{
  return`
      <li>
      <div><strong>${song.artist.name}</strong>-${song.title}</div>
      <div><button class="linkbtn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Lyrics</button></div>
    </li>
  `;
})
.join("")}
</ul>`;

if(data.prev || data.next) {
    more.innerHTML =`
${data.prev?`<button class="prev" onclick="moresongs('${data.prev}')">Prev</button>`:""}
${data.next?`<button class="next" onclick="moresongs('${data.next}')">Next</button>`:""}
`;
}
else {
    more.innerHTML = "";
  }
}


form.addEventListener("submit", function(e){
  e.preventDefault();
  const searchterm = input.value.trim("");

  if (!searchterm) {
    alert("please enter song or artistname in the input feild")
  } else {
    showcontent(searchterm);
  }
});

result.addEventListener("click",function(e){
const clicked=e.target;

console.log(clicked);

if(clicked.classList.contains("linkbtn")){
  const artist=clicked.getAttribute("data-artist");
  const title= clicked.getAttribute("data-songtitle");

getlyrics(artist,title);

}


})
