// ==========================================
// REGISTER WITH EMAIL DOCS
// ==========================================
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with email, name, password, and contact number. Returns a JWT token and user profile on success.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecretPassword123
 *               contact:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully!
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6512bd8f4f1a2c0012345678
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *       400:
 *         description: Bad Request (missing required fields or user already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               missingFields:
 *                 summary: Missing required fields
 *                 value:
 *                   message: Please Provide Required Fields
 *               userExists:
 *                 summary: User already exists
 *                 value:
 *                   message: User already exists with this email.
 */

// ==========================================
// LOGIN WITH EMAIL DOCS
// ==========================================
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in with email and password
 *     description: Authenticates a user with email and password, returning a JWT token and user profile. Supports an optional rememberMe flag for longer session duration.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecretPassword123
 *               rememberMe:
 *                 type: boolean
 *                 description: If true, the token will be valid for 30 days instead of 1 day
 *                 example: false
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6512bd8f4f1a2c0012345678
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *       400:
 *         description: Invalid credentials or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               userNotFound:
 *                 summary: User not found
 *                 value:
 *                   message: Credentials not been found
 *               invalidPassword:
 *                 summary: Password incorrect
 *                 value:
 *                   message: Invalid credentials
 */

// ==========================================
// GET CURRENT AUTHENTICATED USER PROFILE DOCS
// ==========================================
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     description: Retrieves profile details of the authenticated user using their Bearer JWT token.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6512bd8f4f1a2c0012345678
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     contactNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     profilePicture:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v1234/profile.jpg"
 *       401:
 *         description: Unauthorized (missing, invalid, or expired token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               missingAuth:
 *                 summary: Authentication required
 *                 value:
 *                   message: Authentication required.
 *               invalidToken:
 *                 summary: Invalid token
 *                 value:
 *                   message: Invalid authentication token.
 *               expiredSession:
 *                 summary: Session expired
 *                 value:
 *                   message: Session expired.
 */

// ==========================================
// UPDATE CURRENT USER PROFILE DOCS
// ==========================================
/**
 * @swagger
 * /api/auth/update-me:
 *   patch:
 *     summary: Update current user profile
 *     description: Updates the authenticated user's name, contact number, and/or profile picture (via multipart/form-data upload).
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated full name of the user
 *                 example: Johnathan Doe
 *               contactNumber:
 *                 type: string
 *                 description: Updated contact/phone number
 *                 example: "+1987654321"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: New profile picture file (JPEG/PNG, max 2MB)
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6512bd8f4f1a2c0012345678
 *                     name:
 *                       type: string
 *                       example: Johnathan Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     contactNumber:
 *                       type: string
 *                       example: "+1987654321"
 *                     profilePicture:
 *                       type: string
 *                       example: "https://res.cloudinary.com/demo/image/upload/v1234/profile.jpg"
 *       400:
 *         description: Bad Request (empty field values, invalid file type, or file size limit exceeded)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               emptyName:
 *                 summary: Empty name provided
 *                 value:
 *                   message: Full name cannot be empty.
 *               emptyContact:
 *                 summary: Empty contact number provided
 *                 value:
 *                   message: Contact number cannot be empty.
 *               fileTooLarge:
 *                 summary: File size limit exceeded
 *                 value:
 *                   message: Profile picture exceeds 2MB limit
 *               invalidFileType:
 *                 summary: Non-image file uploaded
 *                 value:
 *                   message: Only image files are allowed for profile pictures.
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication required.
 */
