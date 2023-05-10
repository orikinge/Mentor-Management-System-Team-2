import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Certificate from 'App/Models/ProgramsCertificate'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    Certificate.createMany([
      {
        userId: 1,
        programNameUrl: 'https://tinyurl.com/gprogramlogo',
        certification: 'Associate Cloud Engineer',
        logoUrl: 'https://tinyurl.com/gcertificatelogo',
        signature: 'https://tinyurl.com/programsign',
      },
      {
        userId: 4,
        programNameUrl: 'https://tinyurl.com/gprogramlogo',
        certification: 'Associate Cloud Engineer',
        logoUrl: 'https://tinyurl.com/gcertificatelogo',
        signature: 'https://tinyurl.com/programsign',
      },
      {
        userId: 2,
        programNameUrl: 'https://tinyurl.com/gprogramlogo',
        certification: 'Associate Cloud Engineer',
        logoUrl: 'https://tinyurl.com/gcertificatelogo',
        signature: 'https://tinyurl.com/programsign',
      },
      {
        userId: 3,
        programNameUrl: 'https://tinyurl.com/gprogramlogo',
        certification: 'Associate Cloud Engineer',
        logoUrl: 'https://tinyurl.com/gcertificatelogo',
        signature: 'https://tinyurl.com/programsign',
      },
      {
        userId: 6,
        programNameUrl: 'https://tinyurl.com/gprogramlogo',
        certification: 'Associate Cloud Engineer',
        logoUrl: 'https://tinyurl.com/gcertificatelogo',
        signature: 'https://tinyurl.com/programsign',
      },
    ])
  }
}
