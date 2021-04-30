const audio = document.querySelector('#audio')
const source = document.querySelector('#src')
const playPause = document.querySelector('#playPause')
const nome_musica = document.querySelector('#nome_musica')
const tempo_atual = document.querySelector('#tempo_atual')
const skip = document.querySelector('#skip')
const back = document.querySelector('#back')
const volumeBarra = document.querySelector('#volumeBarra')
const controleVolume = document.querySelector('#controleVolume')
const skipPlayBack = document.querySelector('#skipPlayBack')
const muteButton = document.querySelector('#muteDiv') 
const controleVolumeDiv = document.querySelector('#controleVolumeDiv')
const img = document.querySelector('#capa')


audio.addEventListener('timeupdate', atualizar , false);
audio.addEventListener('canplay', play_evento , false);
audio.addEventListener('ended', skip , false);

muteButton.classList.add('invisivel')
controleVolumeDiv.classList.add('controleVolume')


let posicaoMusica = 0, imparPar = 0, botaDeControle = 0;

var musicas = [
    { mp3:'./../music/60_segundos.mp3',
      titulo:'60 Segundos',
      capa: './../img/60_segundos.jpg'
    },
    { mp3:'./../music/Café_e_Amor.mp3',
      titulo:'Café e Amor',
      capa: './../img/cafe_e_amor.jpg'
    },
    { mp3:'./../music/CRACUDO.mp3',
      titulo:'Cracudo',
      capa: './../img/cracudo.png'
    },
]; 

playPause.addEventListener('click', ()=>{
    if(nome_musica.innerHTML == ''){
        nome_musica.innerHTML = musicas[posicaoMusica].titulo
    }
    if(imparPar == 0){
         audio.src = musicas[0].mp3
         img.src = musicas[0].capa

    }
    if(imparPar % 2 == 0){
        audio.play()
        playPause.value = '‖'
    }
    else{
        audio.pause()
        playPause.value = '▸'
    }

    imparPar ++
})

skip.addEventListener('click', ()=>{
    if(nome_musica.innerHTML !== ''){
        posicaoMusica++
        if(audio.canPlayType("audio/mp3") != ''){
            if(posicaoMusica >= 0 && posicaoMusica < musicas.length){
                audio.src = musicas[posicaoMusica].mp3
                img.src = musicas[posicaoMusica].capa
            }
            else{
                posicaoMusica = 0
                audio.src = musicas[posicaoMusica].mp3
                img.src = musicas[posicaoMusica].capa
            }
        }
        else{
            console.log('Não suportado, adicionar em outro formato')
        }
    }
    else{
        audio.src = musicas[0].mp3
        playPause.value = '‖'
        imparPar++
        img.src = musicas[0].capa
    }

    nome_musica.innerHTML = musicas[posicaoMusica].titulo;
    
    audio.play();
})

back.addEventListener('click', ()=>{
    if(nome_musica.innerHTML !== ''){
        posicaoMusica--
        if(audio.canPlayType("audio/mp3") != ''){
            if(posicaoMusica >= 0 && posicaoMusica < musicas.length){
                audio.src = musicas[posicaoMusica].mp3
                img.src = musicas[posicaoMusica].capa
            }
            else{
                posicaoMusica = musicas.length-1
                audio.src = musicas[posicaoMusica].mp3
                img.src = musicas[posicaoMusica].capa
            }
            nome_musica.innerHTML = musicas[posicaoMusica].titulo;
        }
        else{
            console.log('Não suportado, adicionar em outro formato')
        }
    }
    else{
        nome_musica.innerHTML = musicas[musicas.length-1].titulo;
        
        audio.src = musicas[musicas.length-1].mp3
        img.src = musicas[musicas.length-1].capa
        playPause.value = '‖'
        imparPar++
    }
    audio.play()
})

controleVolume.addEventListener('click',()=>{
    if(botaDeControle%2 == 0){
        skipPlayBack.classList.add('invisivel')
        muteButton.classList.remove('invisivel')
        controleVolumeDiv.classList.remove('controleVolume')
        
    }
    else{
        skipPlayBack.classList.remove('invisivel')
        muteButton.classList.add('invisivel')
        controleVolumeDiv.classList.add('controleVolume')
        
    }
    botaDeControle++
})

function volume(){
    audio.volume = volumeBarra.value;
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