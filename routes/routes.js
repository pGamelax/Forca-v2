const express = require('express');
const router = express.Router();
const Question = require('../models/Questions')
const Sequelize = require('sequelize')

router.get("/play", async (req, res) =>{
    await Question.findAll({ order: Sequelize.literal('rand()'), limit: 1 }).then((question) => {
        res.render("game/play",{question:question})
    }).catch((err) => {
        req.flash("error_msg", "Pergunta nao encontrada")
        res.redirect("/game/questions")
    }); 
   
    
})
router.get("/questions", (req, res) =>{
    Question.findAll().then((question) => {
        res.render("game/questions", {question:question});
    })
    
})
router.get("/questions/add", (req, res) => {
    res.render("game/addQuestion");
})
router.post("/questions/add/new", (req, res) => {
    var erros = [];

    if(!req.body.question || typeof req.body.question == undefined || req.body.question == null){
        erros.push({texto: "Pegunta inválida"})
    }
    
    if(!req.body.answer || typeof req.body.answer == undefined || req.body.answer == null){
        erros.push({texto: "Respostas inválida"})
    }

    if(req.body.answer.length < 5 || req.body.answer.length > 5 ){
        erros.push({texto: "Digite uma respostas de 5 letras"})
    }

    if(erros.length > 0){
        res.render("game/addQuestion", {erros: erros});
    }else{
        Question.create({
            question: req.body.question,
            answer: req.body.answer
            
        }).then(() => {
            req.flash("success_msg", "Pergunta adicionada com sucesso!");
            res.redirect("/game/questions");
        })
    }
})

router.get("/questions/:id", (req, res) => {
    Question.destroy({
        where: {'id': req.params.id}
    }).then(()=>{
        req.flash("success_msg", "Excluido com sucesso!")
        res.redirect('/game/questions')
    }).catch((err) => {
        res.send("Houve um erro: "+err)
    })
})

module.exports = router;