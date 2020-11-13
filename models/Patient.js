const mongoose = require('mongoose')
const PatientSchema = new mongoose.Schema({

	name: {type: String, required: true},
	age: {type: Number, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	createdAt: {type: Date, default: new Date()},
})

module.exports = mongoose.model('Patient', PatientSchema)