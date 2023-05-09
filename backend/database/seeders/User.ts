import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async aaaa() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'dim2though@gmail.com',
        password: 'test12345678',
        firstName: 'aliyu',
        lastName: 'Olad',
        bio: "I don't have a bio",
      },
      {
        email: 'test@gmail.com',
        password: 'test12345678',
        firstName: 'aliyu',
        lastName: 'Olad',
        bio: "I don't have a bio",
      },
      {
        email: 'test2@gmail.com',
        password: 'test12345678',
        firstName: 'Segun',
        lastName: 'Oyinlola',
        bio: "I don't have a bio",
      },

      {
        email: 'test3@gmail.com',
        password: 'test12345678',
        firstName: 'Another',
        lastName: 'User',
        bio: "I don't have a bio",
      },

      {
        email: 'test4@gmail.com',
        password: 'test12345678',
        firstName: 'Annoying',
        lastName: 'User',
        bio: "I don't have a bio",
      },

      {
        email: 'test5@gmail.com',
        password: 'test12345678',
        firstName: 'Just Another',
        lastName: 'User',
        bio: "I don't have a bio",
      },

      {
        email: 'test6@gmail.com',
        password: 'test12345678',
        firstName: 'Dan',
        lastName: 'Mike',
        bio: "I don't have a bio",
      },

      {
        email: 'test7@gmail.com',
        password: 'test12345678',
        firstName: 'Test',
        lastName: 'Test',
        bio: "I don't have a bio",
      },
    ])
  }
}
