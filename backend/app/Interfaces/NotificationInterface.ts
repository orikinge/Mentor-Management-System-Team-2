export default interface NotificationInterface {
  type: string
  userId: number
  recipients: number[]
  message: string
}
