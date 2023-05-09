import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PreviousRole from 'App/Models/PreviousRole'

export default class extends BaseSeeder {
  public async dddd () {
    // Write your database queries inside the run method
    await PreviousRole.createMany([
      {
        userId: 1,
        previousRole: 'Mentor',
      },
      {
        userId: 1,
        previousRole: 'Program Assistant',
      },
      {
        userId: 2,
        previousRole: 'Mentor',
      },
      {
        userId: 2,
        previousRole: 'Program Assistant',
      },
      {
        userId: 3,
        previousRole: 'Program Assistant',
      },
      {
        userId: 3,
        previousRole: 'Program Assistant Lead',
      },
      {
        userId: 4,
        previousRole: 'Program Assistant',
      },
      {
        userId: 4,
        previousRole: 'Program Assistant Lead',
      },
      {
        userId: 5,
        previousRole: 'Program Assistant',
      },
      {
        userId: 5,
        previousRole: 'Program Assistant Lead',
      },
    ])
  }
}
