const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
require('dotenv').config()

const url = 'mongodb+srv://amondo:amondo@ngalabiiscluster.lurxh.mongodb.net/hospital?retryWrites=true&w=majority'
const port = process.env.PORT || 9000

app.use(express.urlencoded({extended: true})) //parse data for request body

const doctor = require('./routes/doctor')
const patient = require('./routes/patient')


//Setup view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// serve static files
app.use(express.static(path.join(__dirname,'public')))


//Connection to Atlas online mongoDb
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db){
	if (err){
		throw err
	}

	console.info('***Successful connection to Atlas Online MongoDB****')
})

app.get('/', (req, res) => {
	res.render('index')
})

// use routes
app.use(doctor)
app.use(patient)


// Listen on specified port and host
app.listen(port, () => {
	console.info(`App is running on http://localhost:${port}`)
})
