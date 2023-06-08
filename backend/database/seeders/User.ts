import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'test20@gmail.com',
        password: 'test12345678',
        firstName: 'aliyu',
        lastName: 'Olad',
        bio: "I don't have a bio",
      },
      {
        email: 'test21@gmail.com',
        password: 'test12345678',
        firstName: 'aliyu',
        lastName: 'Olad',
        bio: "I don't have a bio",
      },
      {
        email: 'test22@gmail.com',
        password: 'test12345678',
        firstName: 'Segun',
        lastName: 'Oyinlola',
        bio: "I don't have a bio",
      },

      {
        email: 'test23@gmail.com',
        password: 'test12345678',
        firstName: 'Another',
        lastName: 'User',
        bio: "I don't have a bio",
      },

      {
        email: 'test24@gmail.com',
        password: 'test12345678',
        firstName: 'Annoying',
        lastName: 'User',
        bio: "I don't have a bio",
      },

      {
        email: 'test25@gmail.com',
        password: 'test12345678',
        firstName: 'Just Another',
        lastName: 'User',
        bio: "I don't have a bio",
      },

      {
        email: 'test26@gmail.com',
        password: 'test12345678',
        firstName: 'Dan',
        lastName: 'Mike',
        bio: "I don't have a bio",
      },

      {
        email: 'test27@gmail.com',
        password: 'test12345678',
        firstName: 'Test',
        lastName: 'Test',
        bio: "I don't have a bio",
      },
    ])
  }
}
