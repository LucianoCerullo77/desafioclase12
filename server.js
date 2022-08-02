const express = require('express');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');

const datos = []

app.get('/', (req, res) => {
    res.render('form', {datos});
})

app.post('/personas', (req, res) => {
    datos.push(req.body)
    res.render('form', {datos});
})

app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'))

// Por simpleza de código es mucho más eficiente hacerlo con EJS que con PUG o HandleBars.
// Porque EJS es una plantilla de HTML, y PUG es una plantilla de JavaScript.
// Por lo tanto, si queremos usar una plantilla de HTML, usamos EJS.
// Si queremos usar una plantilla de JavaScript, usamos PUG.
// Y con Handlebars, no es necesario usar ninguna plantilla.
// (O así fue como lo entendí en el curso).