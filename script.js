const PlayPauseIcon=document.getElementById("PLayPause-Icon")
const TracknameDOM=document.getElementById("Track-Name")
const ArtistnameDOM=document.getElementById("Artist-Name")
const CoverImg=document.getElementById("cover-img")
const seekSlider=document.getElementById("seek-slider")
const currentTimeDOM=document.getElementById("Current-time")
const totalTime=document.querySelector("#total_time")
const currentMusicDOM=document.getElementById("Current-musicID")
const totalMusicDOM=document.getElementById("Total-MusicID")
const repeatIconDOM=document.getElementById("repeat-icon")
let audio=document.getElementById("myAudio")
let playbackPosition=0
let currentMusic=0
let isPlaying=false
let isRepeat=false

const musicPlaylist=[

    {
        TrackName:'Soviet Connection',
        music:'/music/GTA4.mp3',
        artistName:"Michael Hunter",
        cover:"/images/gta4img.jpg"
    },
    {
        TrackName:"The Only Thing They Fear Is You [Doom Eternal Theme]",
        music:'/music/Doom.mp3',
        artistName:"Mick Gordon",
        cover:"/images/doomimg.jpeg"
    },
    {
        TrackName:"God of War theme",
        music:'/music/GOW.mp3',
        artistName:"Bear McCreary",
        cover:"/images/gowimg.jpg"
    },
    {
        TrackName:"The Rebel Path[Johnny Silverhand Theme]",
        music:'/music/cyberpunk.mp3',
        artistName:"P.T. Adamczyk",
        cover:"/images/cybimg.jpg"
    }
]

audio.addEventListener("loadedmetadata",()=>{getaudioDuration()})


audio.addEventListener("timeupdate",()=>{
    updateCurrentTime()
    updateSeeker()
    
})

//CHECKS IF MUSIC HAS ENDED AND SKIPS TO NEXT ONE
audio.addEventListener("ended",()=>nextMusic())



//RUNS THE PREVIOUS MUSIC
function prevMusic(){
    if (currentMusic<1) {
        currentMusic=musicPlaylist.length
    }

    else{
        currentMusic-=1
        playbackPosition=0
        playAudio()
        
    }
        
}


//RUNS NEXT MUSIC
function nextMusic(){

    if (currentMusic<(musicPlaylist.length)-1) {
        isRepeat ? currentMusic=currentMusic:currentMusic+=1
        playbackPosition=0
        playAudio()
    }
    else{
    currentMusic=0
    playAudio()
    }
}


function togglePlayPause(){
    if(audio.paused){
        playAudio()
        console.log(isPlaying)
    }
    else{
        pauseAudio()
    }
}

function playAudio(){
    audio.src=musicPlaylist[currentMusic].music
    currentMusicDOM.textContent=currentMusic+1
    totalMusicDOM.textContent=musicPlaylist.length
    TracknameDOM.textContent=musicPlaylist[currentMusic].TrackName
    ArtistnameDOM.textContent=musicPlaylist[currentMusic].artistName
    CoverImg.src=musicPlaylist[currentMusic].cover
    audio.currentTime=playbackPosition
    audio.play()
    PlayPauseIcon.className='bx bx-pause-circle bx-lg'
    isPlaying=true

}

function pauseAudio(){
    audio.pause()
    playbackPosition=audio.currentTime
    PlayPauseIcon.className='bx bx-play-circle bx-lg'
    isPlaying=false
}

function changeVolume(volume){
    audio.volume=volume
}

function changeSeek(seekValue){
    let newTime=(seekValue/100)*audio.duration
    audio.currentTime=newTime
    
}

function updateSeekSlider(){
    const seekVal=(audio.currentTime/audio.duration)*100
    seekSlider.value=seekVal
}

function getaudioDuration(){

    const minutes=Math.floor(audio.duration/60)
    const seconds = Math.floor(audio.duration % 60);
    const finalDuration=`${minutes}:${(seconds<10?0:"")}${seconds}`
    totalTime.textContent=finalDuration
    
}

function updateCurrentTime(){
    const minutes=Math.floor(audio.currentTime/60)
    const seconds = Math.floor(audio.currentTime % 60);
    const finalCurrentDuration=`${minutes}:${(seconds<10?0:"")}${seconds}`
    currentTimeDOM.textContent=finalCurrentDuration
}

function updateSeeker(){
    const currentTime=(audio.currentTime/audio.duration)*100
    seekSlider.value=currentTime
}


//SHUFFLE FUNCTION
function shuffle(){
    const RandomNumber=Math.floor(Math.random()*musicPlaylist.length)
    currentMusic=RandomNumber
    console.log("shuffling")
}

//REPEAT

function togglerepeat(){
    if (isRepeat) {
        isRepeat=false
        repeatIconDOM.style.color="black"
    }
    else{
        
        isRepeat=true
        repeatIconDOM.style.color="red"
    }
    
    
}

