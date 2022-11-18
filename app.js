// Carregando modulos
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { engine } = require ('express-handlebars');
const routes = require ('./routes/routes')
const path = require('path');
const session = require('express-session')
const flash = require('connect-flash')

// Configurações

// Sessao
app.use(session({
    secret: "forcav2",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

// Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');
app.set("views", "./views");

// Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Public
app.use(express.static(path.join(__dirname, "public")))

// Rotas
app.use("/game",routes)

// Outros
const PORT = 3000
app.listen(PORT, () => {
    console.log("Servidor iniciado...")
})