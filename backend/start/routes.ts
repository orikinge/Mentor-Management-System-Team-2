/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
    Route.group(()=>{
        Route.post('/login', 'AuthenticationController.login')
        Route.post('/forgetpassword', 'AuthenticationController.forgetPassword')
        Route.post('/resetpassword', 'AuthenticationController.resetPassword')
        Route.get('/google/redirect', 'AuthenticationController.redirectToGoogle')
        Route.get('/google', 'AuthenticationController.googleLogin')
    }).prefix('auth')

  Route.group(() => {
    Route.get('/:userId', 'ProfilesController.getByUserId')
    Route.put('/:userId', 'ProfilesController.update')
    Route.put('/delete/:userId', 'ProfilesController.delete')
  }).prefix('profile')

  Route.group(() => {
    Route.get('/', 'NotificationSettingsController.getUserNotificationSettings')
    Route.put('/', 'NotificationSettingsController.updateUserNotificationSettings')
  }).prefix('notification-settings')

  Route.group(() => {
    Route.get('/', 'PrivacySettingsController.getUserPrivacySettings')
    Route.put('/', 'PrivacySettingsController.updateUserPrivacySettings')
  }).prefix('privacy-settings')

  Route.group(() => {
    Route.get('/', 'SupportRequestsController.index')
    Route.post('/', 'SupportRequestsController.createRequest')
  }).prefix('support-request')
}).prefix('api/v1')
