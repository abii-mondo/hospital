const express = require('express')
const router = express.Router()
const Doctor = require('../models/Doctor')


//____________Get the form for posting movie___________
router.get('/register/doctor', (req, res) => {
	res.render('docRegister')
})


router.get('/choose/doctors', (req, res) =>{
	res.render('listDoctors')
})


// Post with no validation
router.post('/doctor', async (req, res) => {
	console.log(req.body)
	const doctor = new Doctor(req.body)
	console.log(doctor)

	try {

		const savedDoctor = await doctor.save()
		res.redirect('/all-doctors')


	} catch(err){

		res.status(500).json({message: err})
	}
	
})


router.post('/doctor', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveAndRedirect('all-doctors'))


router.put('doctor/:id', async (req, res, next) => {
  req.doctor = await Doctor.findById(req.params.id)
  next()
}, saveAndRedirect('edit'))


router.get('/all-doctors', async (req, res) => {

	try {
		const doctors = await Doctor.find()
		console.log(doctors)
		res.render('listDoctors', {doctors})

	} catch(err){
		res.status(500).send(err)
	}
})




function saveAndRedirect(path) {
  return async (req, res) => {
    let doctor = req.doctor
    doctor.name = req.body.name
    doctor.email = req.body.email
    doctor.password = req.body.password
    try {
      doctor = await doctor.save()
      res.redirect(`/all-doctors`)
    } catch (e) {
      res.render(`articles/${path}`, { doctor: doctor })
    }
  }
}



module.exports = router