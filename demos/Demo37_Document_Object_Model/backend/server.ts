import express, { Application } from 'express';
import ejs from 'ejs';

// Spin up Express server
const app: Application = express();

// Set templating engine to EJS and incorporate the views folder
app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/", (req, res) => {
    res.render("SimpleWebPageJavaScript")
});

app.listen(5000, () => console.log("Listening on PORT 5000"));