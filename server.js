const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const imageurl = require('./controllers/imageurl')

const Clarifai = require('clarifai')


const apiapp = new Clarifai.App({
 apiKey: 'acdb3c51ba414e4786624c76e1d10227'
});

var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'imagerec'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res) => {
	res.json('sucess')
})

app.post('/signin',signin.handleSignin(db,bcrypt))

app.post('/register', (req,res) =>{register.handleRegister(req,res,db,bcrypt)} )

app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)})	

app.put('/image',(req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl',(req,res) => {imageurl.handleApiCall(req,res,apiapp)})

app.listen(3001,()=>{
	console.log('app is running on 3001');
})