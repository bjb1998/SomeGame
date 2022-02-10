class Song {
    constructor(audioPath) {
        this.song = new Audio(audioPath);
        this.song.loop = true;
    }
}

class SFX {
    constructor(sfxPath) {
        this.sfx = new Audio(sfxPath);
    }
}

function changeSfxVolume(val) {
    sfxVol = val;
}

function changeMusicVolume(val) {
    musicVol = val;
    currentSong.song.volume = musicVol;
}

function changeSong(song) {
    if (currentSong != null) {
        currentSong.song.pause();
        currentSong.song.currentTime = 0;
    }
    currentSong = song;
    currentSong.song.volume = musicVol;
    if (song != null) currentSong.song.play();
}

function playSfx(sound) {
    sound.sfx.volume = sfxVol;
    sound.sfx.play();
}

const musicWorld = new Song('./assets/audio/music/song_test_1.mp3');
const musicBattle = new Song('./assets/audio/music/song_test_2.mp3');

const test = new SFX('./assets/audio/sfx/test.mp3');
const step = new SFX('./assets/audio/sfx/step.mp3');
const no_option = new SFX('./assets/audio/sfx/no_option.mp3');
const attack_phys = new SFX('./assets/audio/sfx/attack_phys.mp3');
const sfx_confirm = new SFX('./assets/audio/sfx/confirm.mp3');
const sfx_open = new SFX('./assets/audio/sfx/menuOpen.mp3');
const sfx_select = new SFX('./assets/audio/sfx/select.mp3');

const sfx_phone = new SFX('./assets/audio/sfx/phone.mp3');
const sfx_microwave = new SFX('./assets/audio/sfx/Microwave.mp3');
const sfx_vacuum = new SFX('./assets/audio/sfx/Vacuum.mp3');
const sfx_Plunger = new SFX('./assets/audio/sfx/Plunger.mp3');
const sfx_washer = new SFX('./assets/audio/sfx/washer.mp3');
