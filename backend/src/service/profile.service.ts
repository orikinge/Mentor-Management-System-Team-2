import { Profile } from '../model/profile.model'

export class ProfileService {
  findAll = async (): Promise<Profile[]> => {
    const profiles = await Profile.findAll({
      where: { deletedAt: null },
    })
    return profiles
  }

  findOne = async (id: number): Promise<Profile | null> => {
    const profile = await Profile.findOne({
      where: { id, deletedAt: null },
    })
    return profile
  }

  update = async (id: number, data: Partial<Profile>): Promise<Profile> => {
    const profile = await this.findOne(id)
    if (!profile) throw new Error(`Profile with id: ${id} not found`)

    return profile.update({ ...data, updateAt: new Date() })
  }

  softDelete = async (id: number): Promise<void> => {
    const profile = await this.findOne(id)

    if (!profile) throw new Error(`Profile with id: ${id} not found`)

    await profile.update({ deleteAt: new Date() })
  }
}
