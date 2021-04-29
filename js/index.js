const audio = document.querySelector('#audio')
const source = document.querySelector('#src')
const playPause = document.querySelector('#playPause')
const nome_musica = document.querySelector('#nome_musica')
const tempo_atual = document.querySelector('#tempo_atual')

//audio.addEventListener('play', play_evento , false)
audio.addEventListener('timeupdate', atualizar , false);
audio.addEventListener('canplay', play_evento , false);
audio.addEventListener('ended', skip , false);


var posicaoMusica = 0, imparPar = 0;

var musicas =   [
    { mp3:'./../music/the_godfather_main_title.mp3',
      titulo:'60 Segundos',
    },
    { mp3:'./../music/game_of_thornes_main_title.mp3',
      titulo:'Café e Amor',
    },
]; 

playPause.addEventListener('click', ()=>{
    if(nome_musica.innerHTML == ''){
        nome_musica.innerHTML = musicas[posicaoMusica].titulo
    }
    if(imparPar == 0){
        console.log(`P: ${posicaoMusica}`)

        audio.src = musicas[posicaoMusica].mp3

        posicaoMusica++
        console.log(`Primeiro Play P: ${posicaoMusica}`)
    }
    if(imparPar % 2 == 0){
        audio.play()
        playPause.value = 'Pause'
    }
    else{
        audio.pause()
        playPause.value = 'Play'
    }
   
    imparPar ++
})


function skip(){
    /*if(tempo_atual.innerHTML !== '00:00'){
        playPause.value = 'Pause'
       imparPar++
    }*/
    if(audio.canPlayType("audio/mp3") != ''){
        audio.src = musicas[posicaoMusica].mp3
    }else{
        console.log('Não suportado')
    }
    
    nome_musica.innerHTML = musicas[posicaoMusica].titulo;
    audio.play();
    
    posicaoMusica++;
    console.log(`Skip P: ${posicaoMusica}`)
    if( posicaoMusica >= musicas.length ) posicaoMusica = 0;
}

function back(){
   /* if(nome_musica.innerHTML == ''){
        playPause.value = 'Pause'
       imparPar++
    }*/
    posicaoMusica--
    if(posicaoMusica >= 0 && posicaoMusica < musicas.length){
        audio.src = musicas[posicaoMusica].mp3
    }
    else{
        posicaoMusica = musicas.length-1
        audio.src = musicas[posicaoMusica].mp3
    }

    nome_musica.innerHTML = musicas[posicaoMusica].titulo;
    audio.play()

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

function atualizar(){
    tempo_atual.innerHTML = secToStr( audio.currentTime);
    document.querySelector('#barra_progresso').value = audio.currentTime;
}

function play_evento(){
    document.getElementById('tempo_atual').innerHTML = secToStr( audio.currentTime) ;
    document.getElementById('tempo_total').innerHTML = secToStr( audio.duration );

    document.getElementById('barra_progresso').max = audio.duration;
    document.getElementById('barra_progresso').value = audio.currentTime;
}


function secToStr( sec_num ) {
    sec_num = Math.floor( sec_num );
    let minutos = Math.floor((sec_num - (Math.floor(sec_num / 3600) * 3600)) / 60);
    let segundos = sec_num - (Math.floor(sec_num / 3600) * 3600) - (minutos * 60);
     

    if (minutos < 10)  minutos  = "0"+minutos;
    if (segundos < 10) segundos = "0"+segundos;
     
    let tempo = minutos+':'+segundos;

    return tempo     
}