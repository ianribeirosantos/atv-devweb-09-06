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
        id: 1,
        nome: "Heated Rivalry",
        ano: 2025,
        genero: "Romance/Esportes/Drama",
        diretor: "Jacob Tierney",
        nota: 8.7
    },
    {
        id: 2,
        nome: "Força, Nakamura!",
        ano: 2026,
        genero: "Comédia Romântica/Japan",
        diretor: "Aoi Umeki",
        nota: 9.6
    },
    {
        id: 3,
        nome: "PEN15",
        ano: 2019,
        genero: "Comédia Cringe",
        diretor: "Sam Zvibleman",
        nota: 8.1
    }
];


app.get("/", (req, res) => {

    res.render("home", {
        filmes
    });

});


app.get("/cadastrar", (req, res) => {

    res.render("cadastrar");

});


app.post("/cadastrar", (req, res) => {

    const novoFilme = {

        id: filmes.length + 1,

        nome: req.body.nome,

        ano: req.body.ano,

        genero: req.body.genero,

        diretor: req.body.diretor,

        nota: req.body.nota

    };

    filmes.push(novoFilme);

    res.redirect("/");

});


let artistas = [
    {
        id: 1,
        nome: "Jacob Tierney",
        anoNascimento: 1979,
        foto: "https://m.media-amazon.com/images/M/MV5BMzkyMTQyNjU2MF5BMl5BanBnXkFtZTcwNTA5OTgyMQ@@._V1_.jpg",
        emAtividade: true
    },

    {
        id: 2,
        nome: "Aoi Umeki",
        anoNascimento: null,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xqrmbOXt6mY-xcs2L7Rs9tXqkzsIBG5_0ru8F3okpw&s=10",
        emAtividade: false
    },

    {
        id: 3,
        nome: "Sam Zvibleman",
        anoNascimento: 1979,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY986NHW4_oavHwF_5NKBloPTj3DtWYKM8sEgyCAv5U5Zb4wyQ8El4Vig2dDTji8tWk_Z9jTulrRBfWmNrvuAIISeJYZYOQ9dJ93f-DadL&s=10",
        emAtividade: true
    }
];


app.get("/artistas", (req, res) => {

    res.render("artistas", {
        artistas
    });

});



app.get("/artistas/cadastrar", (req, res) => {

    res.render("cadastrarArtista");

});



app.post("/artistas", (req, res) => {

    const novoArtista = {

        id: artistas.length + 1,

        nome: req.body.nome,

        anoNascimento: req.body.anoNascimento,

        foto: req.body.foto,

        emAtividade: req.body.emAtividade ? true : false

    };

    artistas.push(novoArtista);

    res.redirect("/artistas");

});




app.get("/artistas/:id", (req, res) => {

    const id = Number(req.params.id);

    const artista = artistas.find((artista) => artista.id === id);

    if (!artista) {
        return res.status(404).send("Artista não encontrado");
    }

    res.render("detalheArtista", {
        artista
    });

});

app.get("/artistas/editar/:id", (req, res) => {

    const id = Number(req.params.id);

    const artista = artistas.find((artista) => artista.id === id);

    if (!artista) {
        return res.status(404).send("Artista não encontrado");
    }

    res.render("editarArtista", {
        artista
    });

});


app.post("/artistas/editar/:id", (req, res) => {

    const id = Number(req.params.id);

    const artista = artistas.find((artista) => artista.id === id);

    if (!artista) {
        return res.status(404).send("Artista não encontrado");
    }

    artista.nome = req.body.nome;

    artista.anoNascimento = req.body.anoNascimento;

    artista.foto = req.body.foto;

    artista.emAtividade = req.body.emAtividade ? true : false;

    res.redirect("/artistas");

});



app.post("/artistas/excluir/:id", (req, res) => {

    const id = Number(req.params.id);

    artistas = artistas.filter((artista) => artista.id !== id);

    res.redirect("/artistas");

});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});