var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var ejs = require('ejs')
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var multer = require('multer')
var upload = multer({ dest: 'public/uploads/' })
var cookieParser = require('cookie-parser')
var { mainCtrl } = require("./mainCtrl/mainController");
var { checkAuth } = require("./middlewares/Auth")
var { signinGet, signinPost } = require("./mainCtrl/signinController");
var { signupGet, signupPost } = require("./mainCtrl/signupController");
var { usersListGet } = require("./mainCtrl/usersListController");
var { profilePost, profileGet } = require("./mainCtrl/profileController");
var { sortGet } = require("./mainCtrl/sortContoller");
var mongoose = require("mongoose");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/usersdb");


// создаем парсер для данных в формате json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/public")
app.set('view engine', 'ejs');

app.get("/", signinGet);
app.post("/", signinPost)

app.get('/main', checkAuth, mainCtrl)

app.get('/usersList', usersListGet);
app.get('/sort/:page', sortGet);


app.get('/signup', signupGet)
app.post("/signup", signupPost);

app.post("/profile", checkAuth, upload.single('avatar'), profilePost);
app.get('/profile', checkAuth, profileGet)

app.listen(3000);