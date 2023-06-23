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
import * as fs from 'fs'
import * as path from 'path'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'AuthenticationController.login')
    Route.post('/forget-password', 'AuthenticationController.forgetPassword')
    Route.post('/reset-password', 'AuthenticationController.resetPassword')
    Route.post('/change-password', 'AuthenticationController.changePassword')
    Route.get('/google/redirect', 'AuthenticationController.redirectToGoogle')
    Route.post('/google', 'AuthenticationController.googleLogin')
  }).prefix('auth')

  Route.group(() => {
    Route.get('/', 'UserController.getAllUsers')
    Route.get('/:userId/about', 'UserController.getAboutUser')
    Route.post('/invite', 'UserController.inviteUser')
    Route.post('/document', 'UserController.uploadDocument')
  }).prefix('user')

  Route.group(() => {
    Route.get('/', 'ProgramsCertificateController.getAllApprovedCertificates')
    Route.post('/', 'ProgramsCertificateController.createCertificate')
    Route.get('/:userId/certificates', 'ProgramsCertificateController.getUserCertificates')
    Route.put('/approve/:id', 'ProgramsCertificateController.approveCertificate')
    Route.put('/decline/:id', 'ProgramsCertificateController.declineCertificate')
  }).prefix('certificate')

  Route.group(() => {
    Route.get('/', 'MentorController.getAllMentors')
    Route.get('/:mentorId/tasks', 'MentorController.getMentorTask')
    Route.delete('/delete/:mentorId', 'MentorController.deleteAMentor')
    Route.delete('/:taskId/:mentorId', 'MentorController.removeMentorFromTask')
  }).prefix('mentors')

  Route.group(() => {
    Route.get('/', 'MentorManagerController.getAllMentorManagers')
    Route.get('/:mentorManagerId/tasks', 'MentorManagerController.getMentorManagerTask')
    Route.get('/:mentorManagerId/mentors', 'MentorManagerController.getMentorsByManager')
    Route.delete('/delete/:mentorManagerId', 'MentorManagerController.deleteAMentorManager')
    Route.delete('/:taskId/:mentorManagerId', 'MentorManagerController.removeMentorManagerFromTask')
  }).prefix('mentor-managers')

  Route.group(() => {
    Route.get('/:senderId/:recipientId', 'ChatController.getAllChat')
    Route.post('/channel', 'ChatController.authChatChannel')
    Route.post('/', 'ChatController.authChatUser')
    Route.post('/:receiverId', 'ChatController.saveChat')
  }).prefix('chat')

  Route.group(() => {
    Route.get('/', 'ProfilesController.getByUserId')
    Route.put('/', 'ProfilesController.update')
    Route.put('/delete/:userId', 'ProfilesController.delete')
    Route.get('/search', 'ProfilesController.search')
    Route.put('/approve/:userId', 'ProfilesController.approveUser')
  })
    .prefix('profile')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'TaskController.index')
    Route.post('/', 'TaskController.create')
    Route.put('/:taskId', 'TaskController.update')
    Route.get('/:taskId', 'TaskController.show')
    Route.get('/:taskId/mentors', 'TaskController.getMentorsByTask')
    Route.get('/:taskId/mentor-managers', 'TaskController.getMentorManagersByTask')
    Route.get('/:taskId/reports', 'TaskController.getReportsByTask')
    Route.get('/search', 'TaskController.searchTask')
    Route.delete('/delete/:taskId', 'TaskController.delete')
  })
    .prefix('tasks')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'TaskReportController.getAllReports')
    Route.post('/:taskId/', 'TaskReportController.createTaskReport')
    Route.get('/:reportId', 'TaskReportController.getReport')
    Route.get('/:reportId/pdf', 'TaskReportController.downloadReportPDF')
    Route.post('/:reportId/pdf', 'TaskReportController.shareReport')
    Route.delete('/delete/:reportId', 'TaskReportController.deleteReport')
  }).prefix('task-reports')

  Route.group(() => {
    Route.get('/', 'PostController.getAllPosts')
    Route.post('/', 'PostController.createPost')
    Route.put('/:postId', 'PostController.updatePost')
    Route.delete('/delete/:postId', 'PostController.deletePost')
    Route.get('/:postId', 'PostController.getPostWithComments')
  }).prefix('post')

  Route.group(() => {
    Route.post('/:postId', 'CommentController.createComment')
    Route.put('/:postId/:commentId', 'CommentController.updateComment')
    Route.delete('/:postId/:commentId', 'CommentController.deleteComment')
  }).prefix('comments')

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
    Route.get('/:id/mentors', 'ProgramsController.programMentor')
    Route.get('/:id/mentor-managers', 'ProgramsController.programMentorManager')
    Route.get('/:id/reports', 'ProgramsController.getReportsByProgram')
    Route.post('/', 'ProgramsController.store')
    Route.put('/:id', 'ProgramsController.update')
    Route.delete('/:id', 'ProgramsController.destroy')
    Route.post('/assign', 'ProgramsController.assignUser')
    Route.delete('/unassign', 'ProgramsController.unassignUser')
    Route.get('/user-programs/:id', 'ProgramsController.userPrograms')
  })
    .prefix('programs')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'ProgramReportsController.getAllReports')
    Route.post('/:programId/', 'ProgramReportsController.createProgramReport')
    Route.get('/:reportId', 'ProgramReportsController.getReport')
    Route.get('/:reportId/pdf', 'ProgramReportsController.downloadReportPDF')
    Route.delete('/delete/:reportId', 'ProgramReportsController.deleteReport')
  }).prefix('program-reports')

  Route.group(() => {
    Route.get('/', 'ProgramsController.allArchive')
    Route.put('/:id', 'ProgramsController.archive')
  })
    .prefix('archive')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'CriteriaController.index')
    Route.post('/', 'CriteriaController.createCriteria')
    Route.get('/:id', 'CriteriaController.show')
    Route.put('/:id', 'CriteriaController.updateCriteria')
  })
    .prefix('criteria')
    .middleware('auth')

  Route.group(() => {
    Route.get('/pending-requests', 'RequestController.getPendingRequest')
  })
    .prefix('requests')
    .middleware('auth')

  Route.get('/search', 'SearchController.search').middleware('auth')

  Route.get('/dashboard', 'DashboardController.index').middleware('auth')

  Route.group(() => {
    Route.get('/', 'NotificationController.index')
    Route.put('/:id', 'NotificationController.updateOnRead')
  })
    .prefix('notifications')
    .middleware('auth')

  Route.resource('faq', 'FaqController').middleware({
    store: ['auth'],
  })
}).prefix('api/v1')
Route.get('/doc/swagger.json', async ({ view }) => {
  return view.renderRaw(fs.readFileSync(path.join(__dirname, '../docs/swagger.json')).toString())
})
Route.get('/documentation', async ({ view }) => {
  const specUrl = '/doc/swagger.json'
  return view.render('swagger', { specUrl })
})
