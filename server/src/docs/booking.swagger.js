// ==========================================
// CREATE NEW APPOINTMENT BOOKING DOCS
// ==========================================
/**
 * @swagger
 * /api/booking/new:
 *   post:
 *     summary: Create a new appointment booking
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - department
 *               - doctor
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2026-08-25 10:30"
 *               department:
 *                 type: string
 *                 example: "Cardiology"
 *               doctor:
 *                 type: string
 *                 example: "Dr. Jim Halpert"
 *               comments:
 *                 type: string
 *                 example: "Routine checkup"
 *               reports:
 *                 type: string
 *                 format: binary
 *                 description: Medical report file (PDF/Images, max 2MB)
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Missing fields or invalid appointment time slot
 *       409:
 *         description: Same booking already exists
 */

// ==========================================
// GET USER'S BOOKINGS DOCS
// ==========================================
/**
 * @swagger
 * /api/booking/my-bookings:
 *   get:
 *     summary: Get user appointments
 *     description: Retrieve all bookings for the authenticated user, optionally filtered by year.
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter bookings by year (e.g. 2026)
 *     responses:
 *       200:
 *         description: List of user bookings
 */
