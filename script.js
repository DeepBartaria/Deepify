console.log("Welcome to Deepify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Din Shagna Da - Phillauri", filePath: "songs/1.mp3", coverPath: "https://c.saavncdn.com/873/Phillauri-Full-Hindi-2017-500x500.jpg"},
    {songName: "Kudmayi - Rocky aur Rani", filePath: "songs/2.mp3", coverPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSkddlckA7M6mbs2zZ-9mnbVz8e8MS63PKDg&s"},
    {songName: "Oonchi Oonchi Deewarein - Yaariyan 2", filePath: "songs/3.mp3", coverPath: "https://c.saavncdn.com/471/Oonchi-Oonchi-Deewarein-From-Yaariyan-2-Hindi-2023-20230919183037-500x500.jpg"},
    {songName: "Ranjha - Shershaah", filePath: "songs/4.mp3", coverPath: "https://c.saavncdn.com/630/Ranjha-Sid-X-Kiara-Version-Hindi-2023-20230627151217-500x500.jpg"},
    {songName: "Aaj Sajeya - Goldie Sohel", filePath: "songs/5.mp3", coverPath: "https://m.media-amazon.com/images/M/MV5BYmJkM2NlYzctODAwYi00Y2NkLTliMDItYjI1MGEwNmUxNzkwXkEyXkFqcGdeQXVyMTA5NzIyMDY5._V1_.jpg"},
    {songName: "Ve Kamleya - Solo", filePath: "songs/6.mp3", coverPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmnjbD1rpoNVsYHIfREwjfyaVa738X1dwHg&s"},
    {songName: "Mudke Na Dekho Dilbaro", filePath: "songs/7.mp3", coverPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLAUhPTFG-bHMamyA0JReXoTNf_l641h7MCg&s"},
    {songName: "Dekha Tenu Pehli Pehli Baar Ve", filePath: "songs/8.mp3", coverPath: "https://static.theprint.in/wp-content/uploads/2024/05/ANI-20240515101811.jpg"},
    {songName: "Tum Hi Ho - Aashiqui 2", filePath: "songs/9.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b2736404721c1943d5069f0805f3"},
    {songName: "Tum Se Hi - Jab We Met", filePath: "songs/10.mp3", coverPath: "https://pagalnew.com/coverimages/Tum-Se-Hi-Jab-We-Met-500-500.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})