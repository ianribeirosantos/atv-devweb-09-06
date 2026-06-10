const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

let filmes = [
    {
        nome: "Heated Rivalry",
        ano: 2025,
        genero: "Romance/Esportes/Drama",
        diretor: "Jacob Tierney",
        nota: 8.7
    },
    {
        nome: "Força, Nakamura!",
        ano: 2026,
        genero: "Comédia Romântica/Japan",
        diretor: "Aoi Umeki",
        nota: 9.6
    },
    {
        nome: "PEN15",
        ano: 2019,
        genero: "Comédia Cringe",
        diretor: "Sam Zvibleman",
        nota: 8.1
    }
];

app.get("/", (req, res) => {
    res.render("home", { filmes });
});

app.get("/cadastrar", (req, res) => {
    res.render("cadastrar");
});

app.post("/cadastrar", (req, res) => {

    const novoFilme = {
        nome: req.body.nome,
        ano: req.body.ano,
        genero: req.body.genero,
        diretor: req.body.diretor,
        nota: req.body.nota
    };

    filmes.push(novoFilme);

    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});