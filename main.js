//armazenando a API na variável
var SpeechRecognition = window.webkitSpeechRecognition;
  
//criando um novo reconhecimento de fala utilizando a API e armazenando na variável
var recognition = new SpeechRecognition();

//armazenando na variável o elemento HTML cujo ID é textbox
var Textbox = document.getElementById("textbox"); 

function start()
{
    //sempre que o start for pressionado, a area de texto será limpa
    Textbox.innerHTML = ""; 

    //a função start aqui, é predefinida da API e irá iniciar a conversão de fala para texto
    recognition.start();
} 
 
//onresult contém todos os valores da fala convertidos em texto
recognition.onresult = function(event) {

    console.log(event); 

    //pegando o conteudo do que foi falado
    var Content = event.results[0][0].transcript;

    Textbox.innerHTML = Content;
    console.log(Content);

      if(Content == "Selfie")
      {
        console.log("tirando selfie");
        speak();
      }
}


function speak(){
    //converter texto em fala
    var synth = window.speechSynthesis;

    speakData = "Tirando sua selfie em 3 segundos";

    //é a SpeechSynthesisUtterance que faz a conversão
    var utterThis = new SpeechSynthesisUtterance(speakData);

    synth.speak(utterThis);

    Webcam.attach(camera);

    setTimeout(function()
    { 
        takeSelfie(); 
        save();
    }, 3000);
}

 
camera = document.getElementById("camera");
Webcam.set({
    width:360,
    height:250,
    image_format : 'jpeg',
    jpeg_quality:90
});

function takeSelfie()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfieImage" src="'+data_uri+'"/>';
    });
}


function save()
{
  link = document.getElementById("link");
  image = document.getElementById("selfieImage").src ;
  link.href = image;
  link.click();
}
