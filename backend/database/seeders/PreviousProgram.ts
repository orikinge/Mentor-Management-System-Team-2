import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PreviousProgram from 'App/Models/PreviousProgram'

export default class extends BaseSeeder {
  public async eeee() {
    // Write your database queries inside the run method
    await PreviousProgram.createMany([
      {
        userId: 1,
        previousProgram: 'GADS 2022',
      },
      {
        userId: 1,
        previousProgram: 'Google I/O Extended 2021',
      },
      {
        userId: 2,
        previousProgram: 'Google I/O Extended 2021',
      },
      {
        userId: 2,
        previousProgram: 'GADS 2022',
      },
      {
        userId: 3,
        previousProgram: 'GADS 2022',
      }
    ])
  }
}
