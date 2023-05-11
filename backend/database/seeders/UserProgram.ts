import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserProgram from 'App/Models/UserProgram'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await UserProgram.createMany([
      {
        userId: 1,
        programId: 1,
      },
      {
        userId: 2,
        programId: 2,
      },
      {
        userId: 3,
        programId: 3,
      },
      {
        userId: 4,
        programId: 4,
      },
      {
        userId: 5,
        programId: 5,
      },
      {
        userId: 1,
        programId: 2,
      },
      {
        userId: 2,
        programId: 1,
      },
      {
        userId: 3,
        programId: 2,
      },
      {
        userId: 4,
        programId: 1,
      },
      {
        userId: 5,
        programId: 2,
      },
    ])
  }
}
