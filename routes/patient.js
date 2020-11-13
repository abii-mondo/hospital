const express = require('express')
const router = express.Router()
const Patient = require('../models/Patient')


//____________Get form for registration___________
router.get('/register/patient', (req, res) => {
	res.render('patRegister')
})


// Post with no validation
router.post('/patient', async (req, res) => {
	console.log(req.body)
	const patient = new Patient(req.body)
	console.log(patient)

	try {

		const savedPatient = await patient.save()
		res.redirect('/choose/doctors')

	} catch(err){

		res.status(500).json({message: err})
	}
	
})


router.get('/all-patients', async (req, res) => {

	try {
		const patients = await Patient.find()
		console.log(patients)
		res.render('listPatients', {patients})

	} catch(err){
		res.status(500).send(err)
	}
})


router.get('/patient/:id', async (req, res) => {
	try {
		const eachPatient = await Patient.findById(req.params.id)
		console.log(eachPatient)
		res.render('patient', {eachPatient})
	} catch(err){
		res.status(500).send(err)
	}
})


router.get('/edit/:id', async (req, res) => {
	try {
		const eachPatient = await Patient.findById(req.params.id)
		console.log(eachPatient)
		res.render('editPatient', {eachPatient})
	} catch(err){
		res.status(500).send(err)
	}
})


router.delete('/delete', async (req, res) => {

	const query = req.body
	try {
		await Patient.deleteOne(query)
		res.status(202).json({message: "Deleted Successfully"})
		console.log('Deleted!')
	} catch(err) {
		res.status(500).json({message: err.message})
	}
})





module.exports = router