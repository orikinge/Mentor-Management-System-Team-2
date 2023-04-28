import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Faq from 'App/Models/Faq'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Faq.createMany([
      {
        title: 'General Frequently Asked Question?',
        body: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        type: 'general_faq',
      },
      {
        title: 'General Frequently Asked Question?',
        body: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        type: 'general_faq',
      },
      {
        title: 'General Frequently Asked Question?',
        body: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        type: 'general_faq',
      },
      {
        title: 'General Frequently Asked Question?',
        body: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        type: 'general_faq',
      },
      {
        title: 'Techincal Frequently Asked Question?',
        body: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        type: 'techincal_faq',
      },
      {
        title: 'Techincal Frequently Asked Question?',
        body: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        type: 'techincal_faq',
      },
      {
        title: 'Techincal Frequently Asked Question?',
        body: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        type: 'techincal_faq',
      },
      {
        title: 'Techincal Frequently Asked Question?',
        body: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        type: 'techincal_faq',
      },
      {
        title: 'Techincal Frequently Asked Question?',
        body: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        type: 'techincal_faq',
      },
    ])
  }
}
