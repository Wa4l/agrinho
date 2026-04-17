// Iniciando o contexto de áudio (precisa de interação do usuário)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let oscilador = null;
let ganho = null;

const btn = document.getElementById('btn-ouvir');
const bioSlider = document.getElementById('bio');
const quimicoSlider = document.getElementById('quimico');
const soloVisual = document.getElementById('visualizador-solo');

btn.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    tocarSomBase();
    btn.innerText = "Monitorando...";
});

function tocarSomBase() {
    oscilador = audioCtx.createOscillator();
    ganho = audioCtx.createGain();

    oscilador.type = 'sine'; // Som suave
    oscilador.connect(ganho);
    ganho.connect(audioCtx.destination);
    
    oscilador.start();
    atualizarParametros();
}

function atualizarParametros() {
    const nivelBio = bioSlider.value;
    const nivelQuimico = quimicoSlider.value;

    // Lógica Inovadora: 
    // Quanto mais bio e menos químico, maior a frequência (vida)
    const frequenciaVida = 200 + (nivelBio * 2) - (nivelQuimico * 1.5);
    
    if(oscilador) {
        oscilador.frequency.setTargetAtTime(frequenciaVida, audioCtx.currentTime, 0.1);
    }

    // Feedback Visual
    if (nivelQuimico > 70) {
        soloVisual.classList.add('solo-degradado');
    } else {
        soloVisual.classList.remove('solo-degradado');
    }
}

// Escutar mudanças nos sliders
bioSlider.addEventListener('input', atualizarParametros);
quimicoSlider.addEventListener('input', atualizarParametros);