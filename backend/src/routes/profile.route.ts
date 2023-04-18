import express from 'express'
import { ProfileController } from '../controller/profile.controller'

const router = express.Router()

const profileRoute = new ProfileController()

router.get('/profiles', profileRoute.getProfiles)
router.get('/profiles/:id', profileRoute.getProfileById)
router.put('/profiles/:id', profileRoute.updateProfile)
router.delete('/profiles/:id', profileRoute.softDeleteProfile)

export default router
