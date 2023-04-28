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

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'AuthenticationController.login')
    Route.post('/forget-password', 'AuthenticationController.forgetPassword')
    Route.post('/reset-password', 'AuthenticationController.resetPassword')
    Route.get('/google/redirect', 'AuthenticationController.redirectToGoogle')
    Route.post('/google', 'AuthenticationController.googleLogin')
  }).prefix('auth') 

  Route.group(() => {
    Route.get('/', 'UserController.getAllUsers')
    Route.get('/mentors', 'UserController.getAllMentors')
    Route.get('/mentor-managers', 'UserController.getAllMentorManagers')
  }).prefix('user')

  Route.group(() => {
    Route.get('/', 'ProfilesController.getByUserId')
    Route.put('/', 'ProfilesController.update')
    Route.put('/delete/:userId', 'ProfilesController.delete')
    Route.get('/search', 'ProfilesController.search')
  })
    .prefix('profile')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'TaskController.index')
    Route.post('/', 'TaskController.create')
    Route.put('/:taskId', 'TaskController.update')
    Route.get('/:taskId', 'TaskController.show')
    Route.delete('/delete/:taskId', 'TaskController.delete')
  })
    .prefix('task')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'TaskReportController.getAllReports')
    Route.post('/:taskId/', 'TaskReportController.createTaskReport')
    Route.get('/:reportId', 'TaskReportController.getReport')
    Route.get('/:reportId/pdf', 'TaskReportController.downloadReportPDF')
    Route.post('/:reportId/pdf', 'TaskReportController.shareReport')
    Route.delete('/:reportId', 'TaskReportController.deleteReport')
  }).prefix('task-reports')

  Route.group(() => {
    Route.get('/', 'PostController.getAllPosts')
    Route.post('/', 'PostController.createPost')
    Route.put('/:postId', 'PostController.updatePost')
    Route.delete('/:postId', 'PostController.deletePost')
    Route.get('/:postId', 'PostController.getPostWithComments')
  }).prefix('post')

  Route.group(() => {
    Route.post('/:postId', 'CommentController.createComment')
    Route.put('/:postId/:commentId', 'CommentController.updateComment')
    Route.delete('/:postId/:commentId', 'CommentController.deleteComment')
  }).prefix('comment')

  Route.group(() => {
    Route.get('/', 'NotificationSettingsController.getUserNotificationSettings')
    Route.put('/', 'NotificationSettingsController.updateUserNotificationSettings')
  })
    .prefix('notification-settings')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'PrivacySettingsController.getUserPrivacySettings')
    Route.put('/', 'PrivacySettingsController.updateUserPrivacySettings')
  })
    .prefix('privacy-settings')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'SupportRequestsController.index')
    Route.post('/', 'SupportRequestsController.createRequest')
  })
    .prefix('support-request')
    .middleware('auth')

  Route.group(() => {
    Route.get('/sent', 'BroadcastMessagesController.sent')
    Route.get('/', 'BroadcastMessagesController.index')
    Route.post('/', 'BroadcastMessagesController.create')
  })
    .prefix('broadcast')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'ProgramsController.index')
    Route.get('/:id', 'ProgramsController.show')
    Route.post('/', 'ProgramsController.store')
    Route.put('/:id', 'ProgramsController.update')
    Route.delete('/:id', 'ProgramsController.destroy')
  })
    .prefix('programs')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'ProgramsController.allArchive')
    Route.put('/:id', 'ProgramsController.archive')
  })
    .prefix('archive')
    .middleware('auth')
}).prefix('api/v1')
