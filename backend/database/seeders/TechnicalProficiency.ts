import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TechnicalProficiency from 'App/Models/TechnicalProficiency'

export default class extends BaseSeeder {
  public async bbbb () {
    // Write your database queries inside the run method
    await TechnicalProficiency.createMany([
      {
        userId: 1,
        proficiency: 'JavaScript'
      },
      {
        userId: 1,
        proficiency: 'TypeScript'
      },
      {
        userId: 2,
        proficiency: 'React'
      },
      {
        userId: 2,
        proficiency: 'Node.js'
      },
      {
        userId: 3,
        proficiency: 'Mysql'
      },
      {
        userId: 1,
        proficiency: 'Django'
      },
      {
        userId: 2,
        proficiency: 'Django'
      },
      {
        userId: 2,
        proficiency: 'AWS'
      }
    ])
  }
}
