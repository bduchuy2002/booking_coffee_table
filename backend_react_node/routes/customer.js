const customerControllers = require("../controllers/customerControllers");
const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         idCustomer:
 *           type: string
 *           description: ID của khách hàng
 *         idCoffee:
 *           type: string
 *           description: ID của quán cà phê
 *         date:
 *           type: string
 *           format: date
 *           description: Ngày đặt bàn
 *         time:
 *           type: string
 *           format: time
 *           description: Thời gian đặt bàn
 *         tableBooking:
 *           type: array
 *           items:
 *             type: string
 *           description: Mảng các ID của bàn được đặt
 *         name:
 *           type: string
 *           description: Tên của khách hàng
 *         address:
 *           type: string
 *           description: Địa chỉ của khách hàng
 *     CustomerWithBookings:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của khách hàng
 *         name:
 *           type: string
 *           description: Tên của khách hàng
 *         booking:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Booking'
 *   responses:
 *     NotFound:
 *       description: Không tìm thấy khách hàng
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     InternalServerError:
 *       description: Lỗi máy chủ nội bộ
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 */

/**
 * @swagger
 * /{id}/bookings:
 *   get:
 *     summary: Lấy thông tin đặt bàn của khách hàng theo ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của khách hàng
 *     responses:
 *       200:
 *         description: Thông tin đặt phòng của khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// Routes for handling Customer CRUD operations
router.post("/", customerControllers.addCustomer); // Add a new customer
router.get("/:id", customerControllers.getCustomerById); // Get a specific customer by ID
router.put("/:id", customerControllers.updateCustomerById); // Update a customer by ID
router.delete("/:id", customerControllers.deleteCustomerById); // Delete a customer by ID
router.get("/", customerControllers.getCustomers); // Get all customers
router.get("/:id/bookings", customerControllers.getBooking);
router.post("/login", customerControllers.getLogin);

module.exports = router;
