const mongoose = require('mongoose')
const DoctorSchema = new mongoose.Schema({

	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	createdAt: {type: Date, default: new Date()},
	
})

module.exports = mongoose.model('Doctor', DoctorSchema)