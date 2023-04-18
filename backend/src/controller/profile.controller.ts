import { Request, Response } from 'express'
import { ProfileService } from '../service/profile.service'

export class ProfileController {
  profileService = new ProfileService()

  getProfiles = async (req: Request, res: Response): Promise<void> => {
    const profiles = await this.profileService.findAll()
    res.json(profiles)
  }

  getProfileById = async (req: Request, res: Response): Promise<void> => {
    try {
      const profile = await this.profileService.findOne(+req.params.id)
      res.json(profile)
    } catch (error) {
      res.status(404).json({ message: error })
    }
  }

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = +req.params.id
      const data = req.body
      const profile = await this.profileService.update(id, data)
      res.json(profile)
    } catch (error) {
      res.status(404).json({ message: error })
    }
  }

  softDeleteProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = +req.params.id
      await this.profileService.softDelete(id)
      res.sendStatus(204)
    } catch (error) {
      res.status(404).json({ message: error })
    }
  }
}
