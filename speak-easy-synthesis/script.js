var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    var selectedIndex =
        voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    voices.forEach(function(voice) {
        if (voice.lang !== 'pt-BR') return;

        var option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        if (voice.default) {
            option.textContent += ' -- PADRÃO';
        }
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
    voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(text) {
    if (!text || synth.speaking) return;
    const utterThis = new SpeechSynthesisUtterance(text);
    const voiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const voice = voices.find(v => v.name === voiceName);
    if (voice) {
        utterThis.voice = voice;
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
}

pitch.onchange = function() {
    pitchValue.textContent = pitch.value;
};

rate.onchange = function() {
    rateValue.textContent = rate.value;
};

document.addEventListener('keyup', function(e){
  console.log(e.key);
  speak(e.key);
})