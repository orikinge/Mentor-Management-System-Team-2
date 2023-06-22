/**
 * @swagger
 * info:
 *   title: AdonisJs 5 Swagger Documentation
 *   version: 1.0.0
 */

/**
 * @get /
 * summary: Get hello world
 * responses:
 *   200:
 *     description: Hello world
 *     content:
 *       application/json:
 *         schema:
 *           type: string
 */

/**
 * @post /auth/login
 * summary: Login
 * requestBody:
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 * responses:
 *   200:
 *     description: Successfully logged in
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 */

/**
 * @post /auth/forget-password
 * summary: Forget password
 * requestBody:
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 * responses:
 *   200:
 *     description: Password reset email sent
 */

/**
 * @post /auth/reset-password
 * summary: Reset password
 * requestBody:
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           token:
 *             type: string
 *           newPassword:
 *             type: string
 * responses:
 *   200:
 *     description: Password reset successful
 */

/**
 * @post /auth/change-password
 * summary: Change password
 * requestBody:
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         type: object
 *         properties:
 *           oldPassword:
 *             type: string
 *           newPassword:
 *             type: string
 * responses:
 *   200:
 *     description: Password changed successfully
 */

/**
 * @get /auth/google/redirect
 * summary: Redirect to Google
 * responses:
 *   302:
 *     description: Redirecting to Google
 */

/**
 * @post /auth/google
 * summary: Google login
 * responses:
 *   200:
 *     description: Successfully logged in with Google
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 */

/**
 * @get /user/
 * summary: Get all users
 * responses:
 *   200:
 *     description: Successfully retrieved all users
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 */

/**
 * @get /user/:userId
 * summary: Get user by ID
 * parameters:
 *   - name: userId
 *     in: path
 *     required: true
 *     schema:
 *       type: string
 * responses:
 *   200:
 *     description: Successfully retrieved user by ID
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 */

console.log('Documentation generated!')
