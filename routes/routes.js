const express = require('express');
const router = express.Router();
const Question = require('../models/Questions')
const Categories = require('../models/Categories')
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
    Categories.findAll().then((categories) => {
        res.render("game/addQuestion", {categories:categories})
    })
    
})

router.post("/questions/add", (req, res) => {
    var erros = [];

    if(!req.body.question || typeof req.body.question == undefined || req.body.question == null){
        erros.push({texto: "Pegunta inválida"})
    }
    
    if(!req.body.answer || typeof req.body.answer == undefined || req.body.answer == null){
        erros.push({texto: "Respostas inválida"})
    }

    if(req.body.categories   == "0"){
        erros.push({texto: "Categoria invalida, registre uma categoria"})
    }
    if(req.body.answer.length < 4 || req.body.answer.length > 10 ){
        erros.push({texto: "Digite uma respostas de 4 a 10 letras"})
    }
    

    if(erros.length > 0){
        Categories.findAll().then((categories) => {
            res.render("game/addQuestion", {categories:categories, erros:erros})
        })
    }else{
        Question.create({
            question: req.body.question,
            answer: req.body.answer,
            categorie: req.body.categories  
            
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

router.get("/categories", (req, res)=>{
    Categories.findAll().then((categories) => {
        res.render("game/categories", {categories:categories})
    })
})
router.get("/categories/add", (req, res) => {
    res.render("game/addCategories")    
})

router.post("/categories/add", (req, res) => {
    var erros = [];

    if(!req.body.categorie || typeof req.body.categorie == undefined || req.body.categorie == null){
        erros.push({texto: "Categoria inválida"})
    }
    
    if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
        erros.push({texto: "Descrição inválida"})
    }

    if(erros.length > 0){
        res.render("game/addCategories", {erros: erros});
    }else{
        Categories.create({
            name: req.body.categorie,
            description: req.body.description
        }).then(()=>{
            req.flash("success_msg", "Categoria adicionada com sucesso!")
            res.redirect("/game/categories")
        })
    }
})

router.get("/categories/:id", (req, res) => {
    Categories.destroy({
        where: {'id': req.params.id}
    }).then(()=>{
        req.flash("success_msg", "Excluido com sucesso!")
        res.redirect('/game/categories')
    }).catch((err) => {
        res.send("Houve um erro: "+err)
    })
})

module.exports = router;