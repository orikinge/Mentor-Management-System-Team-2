import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Program from 'App/Models/Program'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Program.createMany([
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 1',
        description: 'GADS Desc 1',
        userId: 1,
      },
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 2',
        description: 'GADS Desc 1',
        userId: 2,
      },
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 3',
        description: 'GADS Desc 1',
        userId: 3,
      },
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 4',
        description: 'GADS Desc 1',
        userId: 4,
      },
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 5',
        description: 'GADS Desc 1',
        userId: 5,
      },
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 7',
        description: 'GADS Desc 1',
        userId: 1,
      },
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 8',
        description: 'GADS Desc 1',
        userId: 2,
      },
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 9',
        description: 'GADS Desc 1',
        userId: 3,
      },
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 10',
        description: 'GADS Desc 1',
        userId: 4,
      },
      {
        name: 'GADS - Google Africa Developer Scholarship Search Trial 11',
        description: 'GADS Desc 1',
        userId: 5,
      },
    ])
  }
}
