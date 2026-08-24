// ==========================================
// GET ALL SERVICES DOCS
// ==========================================
/**
 * @swagger
 * /api/services/get-all:
 *   get:
 *     summary: Get all active services with pagination
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of services per page
 *     responses:
 *       200:
 *         description: Paginated list of active medical services
 *       500:
 *         description: Internal server error
 */
