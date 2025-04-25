// Seleciona todas as teclas do piano (elementos com a classe "key")
const pianoKeys = document.querySelectorAll(".key");

// Seleciona o input de volume dentro do container "volume-slider"
const volumeSlider = document.querySelector(".volume-slider input");

// Seleciona o checkbox que controla a exibição dos nomes das teclas
const keysCheck = document.querySelector(".keys-check input");

// Cria um objeto de áudio inicial com um som padrão (será alterado dinamicamente)
let audio = new Audio("assets/audios/a.wav");

// Array para armazenar todas as teclas mapeadas (ex: a, s, d, etc.)
let mapedKeys = [];

// Função que toca uma nota com base na tecla recebida
const playTune = (key) => {
    // Atualiza a fonte do áudio com o som correspondente à tecla
    audio.src = `assets/audios/${key}.wav`;
    audio.play(); // Toca o som

    console.log(mapedKeys); // Mostra as teclas mapeadas no console (útil para debug)

    // Seleciona a tecla clicada visualmente usando o atributo data-key
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    
    // Adiciona a classe "active" para dar feedback visual (ex: animação de tecla pressionada)
    clickedKey.classList.add("active");

    // Remove a classe "active" após 150ms para encerrar o efeito visual
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};  

// Para cada tecla do piano encontrada no DOM...
pianoKeys.forEach((key) => {
    console.log(key.dataset.key); // Mostra no console qual tecla está sendo processada

    // Adiciona um listener de clique que toca a nota correspondente
    key.addEventListener("click", () => playTune(key.dataset.key));

    // Armazena a tecla no array mapedKeys para referência futura (teclado físico)
    mapedKeys.push(key.dataset.key);
});

// Adiciona um listener global para pressionamento de teclas do teclado físico
document.addEventListener("keydown", (e) => {
    // Se a tecla pressionada estiver mapeada no array, toca a nota correspondente
    if (mapedKeys.includes(e.key)) {
        playTune(e.key);
    } 
});

// Função para ajustar o volume do som com base no slider
const handleVolume = (e) => {
    audio.volume = e.target.value; // O volume vai de 0.0 a 1.0
};

// Função para mostrar ou esconder os nomes das teclas
const showHideKeys = () => {
    // Alterna a classe "hide" em todas as teclas, afetando a visibilidade por CSS
    pianoKeys.forEach(key => key.classList.toggle("hide")); 
}

// Adiciona o evento ao input de volume para ajustar o volume em tempo real
volumeSlider.addEventListener("input", handleVolume);

// Adiciona o evento ao checkbox para mostrar ou esconder os nomes das teclas
keysCheck.addEventListener("click", showHideKeys);
