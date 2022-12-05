// Pegar a resposta do jogo
const answer = document.getElementById("answer").value;

// Pegando a div showErrors

const showError = document.getElementById("errors")

// Pegar botão de checar as letras
const enter = document.getElementById("checkAnswer")
const clear = document.getElementById("clearInput")

// 
var ganhou = document.querySelector(".ganhou")
var txtVitoria = document.getElementById("textoVitoria")
var grid = document.querySelector(".grid")


//Criando inputs
for(i = 0; i < answer.length; i ++){
    let input = document.createElement('input')
    input.classList.add('input-text')
    input.setAttribute('maxlength', "1")
    input.setAttribute('inputmode', "none")
    input.setAttribute('type', "text")
    input.setAttribute('id', i)
    document.getElementById('row-input').append(input)
}

// Arraylist com os valores dos inputs
const lettersInput = []


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
    // Pegando os valores digitado pelo usuario
    for(i = 0; i < answer.length; i++){
        lettersInput.push(document.getElementById(i).value)
        console.log(lettersInput)
    }
    // Remover focus do input
    $(".input-text").blur()

    for(i = 0; i < answer.length; i++){
        if(lettersInput[i] == lettersAnswer[i]){
            lettersAnswer.splice(i,1,"0")   
        }
    }

    for(i = 0; i < answer.length; i++){
        if(lettersAnswer[i]== "0"){
            document.getElementById(i).classList.add("letra-certa")  
        }else if(lettersAnswer.includes(lettersInput[i])){
            document.getElementById(i).classList.add("letra-exist")
        }else if(lettersInput[i] != lettersAnswer[i]){
            document.getElementById(i).classList.add("letra-errada") 
        }
    }
}
function checkInputs() {
    var error = []

    for(i = 0; i < answer.length; i++){
        if(!document.getElementById(i).value|| typeof document.getElementById(i).value== undefined || document.getElementById(i).value == null ){
            error.push("Preencha todos os campos")
            console.log(error)
        }
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
        for (i = 0; i < answer.length; i++){
            if(document.getElementById(i).classList.contains("letra-certa")){
                letterRight.push('sim')
                if(letterRight.length == answer.length && letterRight[i] == "sim"){
                    ganhou.classList.remove("none")
                    grid.classList.add("none")
                    txtVitoria.innerText = `Parabéns, Você ganhou! A palavra era ' ${answer} '`
                }
            }
        }
    }
}

function clearAll(){
    enter.disabled = false;
    for (i = 0; i < answer.length; i++){
        document.getElementById(0).focus()
        document.getElementById(i).value = ""
        document.getElementById(i).classList.remove("letra-certa")
        document.getElementById(i).classList.remove("letra-exist")
        document.getElementById(i).classList.remove("letra-errada")
        letterRight.splice(i)
        lettersAnswer.splice(i)
        lettersInput.splice(i)
    }
    for(i = 0; i < answer.length; i++){
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
 
    for(i = 0; i < answer.length; i++){
        if(document.getElementById(i).value == ""){
            document.getElementById(i).value = index
            $("#letter-"+(i+2)).focus()
            break
        }
    }
    
}

// função de novo jogo
newGame.addEventListener('click', function(){
    location.reload()
})
    
enter.addEventListener('click', checkInputs)
clear.addEventListener('click', clearAll)