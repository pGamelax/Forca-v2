
// Pegar a resposta do jogo
const answer = document.getElementById("answer").value;

// Pegando a div showErrors

const showError = document.getElementById("errors")

// Pegar botão de checar as letras
const enter = document.getElementById("checkAnswer")
const clear = document.getElementById("clearInput")

//Pegar os valores digitados pelo jogador
var letterOne = document.getElementById('letter-1');
var letterTwo = document.getElementById('letter-2');
var letterThree = document.getElementById('letter-3');
var letterFour = document.getElementById('letter-4');
var letterFive = document.getElementById('letter-5');

// Arraylist com os valores dos inputs
const lettersInput = [letterOne, letterTwo, letterThree, letterFour, letterFive]

// Arraylist que vai receber as letras separadamente da resposta do jogo
const lettersAnswer = []

// For para adicionar as letras no arraylist de letras
for(i = 0; i < answer.length; i++){
    lettersAnswer.push(answer.slice(i, (i+1)))
}
$("#letter-1").focus();  
// jquery para pular para o proximo input
$(".input-text").keyup(function() {
    if (this.value.length == this.maxLength) {
        $(this).next('.input-text').focus();
    }
});

// jquery para confirmar ao pressionar enter
$(document).keypress(function(e) {
    if(e.which == 13){
        $('#checkAnswer').click();
    }
});     
// Funções para verificar as letras do input com as letras da respostas
function checkLetters(){
    // Remover focus do input
    $(".input-text").blur()

    for(i = 0; i < 5; i++){
        if(lettersInput[i].value == lettersAnswer[i]){
            lettersAnswer.splice(i,1,"0")   
        }
    }

    for(i = 0; i < 5; i++){
        if(lettersAnswer[i]== "0"){
            lettersInput[i].classList.add("letra-certa")  
        }else if(lettersAnswer.includes(lettersInput[i].value)){
            lettersInput[i].classList.add("letra-exist")
        }else if(lettersInput[i].value != lettersAnswer[i]){
            lettersInput[i].classList.add("letra-errada") 
        }
    }
}
function checkInputs() {
    var error = []

    if(!lettersInput[0].value || typeof lettersInput[0].value == undefined || lettersInput[0].value == null ){
        error.push("Preencha todos os campos")
    }
    if(!lettersInput[1].value || typeof lettersInput[1].value == undefined || lettersInput[1].value == null ){
        error.push("Preencha todos os campos")
    }
    if(!lettersInput[2].value || typeof lettersInput[2].value == undefined || lettersInput[2].value == null ){
        error.push("Preencha todos os campos")
    }
    if(!lettersInput[3].value || typeof lettersInput[3].value == undefined || lettersInput[3].value == null ){
        error.push("Preencha todos os campos")
    }
    if(!lettersInput[4].value || typeof lettersInput[4].value == undefined || lettersInput[4].value == null ){
        error.push("Preencha todos os campos")
    }
    
    if(error.length > 0){
        console.log("Preencha os campos")
        showError.classList.add("alert")
        showError.classList.add("alert-danger")
        showError.innerText = error[0]
    }else{
        showError.classList.remove("alert")
        showError.classList.remove("alert-danger")
        showError.innerText = ""
        enter.disabled = true;
        checkLetters();
        checkWin();

        setTimeout( () => {
            clearAll();
        }, 3000);
    }
}
const letterRight = []

function checkWin(){
    if(letterRight.length > 0){
        letterRight.splice(letterRight.indexOf(0), letterRight.length)
    }else{
        for (i = 0; i <5; i++){
            if(lettersInput[i].classList.contains("letra-certa")){
                letterRight.push('sim')
                if(letterRight.length == 5 && letterRight[i] == "sim"){
                    console.log("ganhou")
                }
            }
        }
    }
}

function clearAll(){
    enter.disabled = false;
    for (i = 0; i <5; i++){
        letterOne.focus()
        lettersInput[i].value = ""
        lettersInput[i].classList.remove("letra-certa")
        lettersInput[i].classList.remove("letra-exist")
        lettersInput[i].classList.remove("letra-errada")
        letterRight.splice(i)
        lettersAnswer.splice(i)
    }
    for(i = 0; i < 5; i++){
        lettersAnswer.push(answer.slice(i, (i+1)))
    }
}

function initKeyboard(){
    document.querySelectorAll(".keyboard button").forEach((item)=>{
        item.addEventListener('click', keyboardLetters)
    })
}

initKeyboard()

function keyboardLetters(e){
    const index = e.target.getAttribute("data-i")
 
    for(i = 0; i <5; i++){
        if(lettersInput[i].value == ""){
            lettersInput[i].value = index
            $("#letter-"+(i+2)).focus()
            break
        }
    }
    
}
    
enter.addEventListener('click', checkInputs)
clear.addEventListener('click', clearAll)