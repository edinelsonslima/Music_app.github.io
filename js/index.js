const audio = document.querySelector('#audio')

audio.addEventListener('play', play_evento , false);
audio.addEventListener('timeupdate', atualizar , false);

audio.addEventListener('canplay', play_evento , false);
audio.addEventListener('timeupdate', atualizar , false);
audio.addEventListener('ended', proxima , false);

let i = 0;

let musicas = [
        {mp3:'Gustavo_Lima_60_segungos.mp3' , 
         //ogg:'the_godfather_main_title.ogg' ,
         titulo:'Gustavo Lima - 60_segungos.mp3'
        },
        {mp3:'Gustavo_Lima_Cafe_e_Amor.mp3',
         //mp3:'game_of_thornes_main_title.ogg',
         titulo:'Gustavo Lima - Café e Amor'
        },
    ];

function play(){
    audio.play();
}

function pause(){
    audio.pause();
}

function stop(){
    audio.pause();
    audio.currentTime = 0;
}

function aumentar_volume(){
    if( audio.volume < 1)  audio.volume += 0.1;
}

function diminuir_volume(){
    if( audio.volume > 0)  audio.volume -= 0.1;
}
     
function mute(){
    if( audio.muted ){
        audio.muted = false;
    }else{
        audio.muted = true;
    }
}

function play_evento(){
    document.querySelector('#tempo_atual').innerHTML = secToStr( audio.currentTime) ;
    document.querySelector('#tempo_total').innerHTML = secToStr( audio.duration );

    document.querySelector('#barra_progresso').max = audio.duration;
    document.querySelector('#barra_progresso').value = audio.currentTime;
}

function atualizar(){
    document.querySelector('#tempo_atual').innerHTML = secToStr( audio.currentTime);
    document.querySelector('#barra_progresso').value = audio.currentTime;
}

function proxima(){
    if(audio.canPlayType("audio/mp3") != ''){
        audio.src = musicas[i].mp3;
    }else{
        audio.src = musicas[i].ogg;
    }
    document.getElementById('nome_musica').innerHTML = musicas[i].titulo;
    audio.play();

    i++;
    if( i >= musicas.length ) i = 0;
}

function secToStr( sec_num ) {
    sec_num = Math.floor( sec_num );
    var horas   = Math.floor(sec_num / 3600);
    var minutos = Math.floor((sec_num - (horas * 3600)) / 60);
    var segundos = sec_num - (horas * 3600) - (minutos * 60);
     
    if (horas   < 10)  horas    = "0"+horas;
    if (minutos < 10)  minutos  = "0"+minutos;
    if (segundos < 10) segundos = "0"+segundos;
     
    var tempo    = horas+':'+minutos+':'+segundos;

    return tempo     
}