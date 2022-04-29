var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { request } = require('express');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
require('dotenv').config();
var pgp = require('pg-promise')();

const dev_dbConfig = {
    host: 'db',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
};

const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}

var db = pgp(dbConfig);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.render('pages/main')
    //res.redirect(req.protocol + "://" + req.get('host') + "/main");
});

app.get('/main', function (req, res) {
    res.render('pages/main')
});

app.get('/searches', function (req, res) {
    var query = 'SELECT * FROM searches;';
    db.any(query)
    .then(data=>{
        res.render('pages/searches',{
            data: data
        });
    })
    .catch(err => {
        res.render('pages/searches', {
            data:''
        });
    });
});

app.post('/send', function(req,res){
    var title = req.body.title;
    var img = req.body.img;
    var link = req.body.link;
    var language = req.body.language.slice(10,req.body.language.length);
    var runtime = req.body.runtime.slice(9, req.body.runtime.length-8);
    if(title == 'null' || title == 'undefined' || title == null ){
        title = '-';
    }
    if(img == 'null' || img == 'undefined' || img == null){
        img = '-';
    }
    if(link == 'null' || link == 'undefined' || link == null || link == ""){
        link = '-';
    }
    if(language == 'null' || language == 'undefined' || language == null){
        language = '-';
    }
    if(runtime == 'null' || runtime == 'undefined' || runtime == null){
        runtime = '-';
    }
    var ins = `INSERT INTO searches (title, img, link, lang, runtime) VALUES ('${title}', '${img}', '${link}', '${language}', '${runtime}');`;
    db.any(ins)
    .then(data=>{
        res.render('pages/main');
    })
    .catch(err =>{
        console.log(err);
    })
});

// module.exports=app.listen(3000);
// console.log('Listening on 3000');
const server = module.exports=app.listen(process.env.PORT || 3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });