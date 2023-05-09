import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Certificate from 'App/Models/ProgramsCertificate'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    Certificate.createMany([
      {
        userId:1,
        programName: 'Google Cloud',
        certification:'Associate Cloud Engineer',
        logoUrl:"https://tinyurl.com/programnlogo"
      },
      {
        userId:4,
        programName: 'Google Cloud',
        certification:'Associate Cloud Engineer',
        logoUrl:"https://tinyurl.com/programnlogo"
      },
      {
        userId:2,
        programName: 'Google Cloud',
        certification:'Associate Cloud Engineer',
        logoUrl:"https://tinyurl.com/programnlogo"
      },
      {
        userId:3,
        programName: 'Google Cloud',
        certification:'Associate Cloud Engineer',
        logoUrl:"https://tinyurl.com/programnlogo"
      },
      {
        userId:6,
        programName: 'Google Cloud',
        certification:'Associate Cloud Engineer',
        logoUrl:"https://tinyurl.com/programnlogo"
      },
    ])
  }
}
