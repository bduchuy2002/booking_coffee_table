const express = require("express");
const router = express.Router();
const bookingControllers = require("../controllers/bookingControllers"); // Updated import
/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - idCustomer
 *         - idCoffee
 *         - date
 *         - time
 *         - tableBooking
 *         - name
 *         - address
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
 *     BookingResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Thông báo kết quả đặt bàn
 *   responses:
 *     BadRequest:
 *       description: Yêu cầu không hợp lệ
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
 * /confirm1:
 *   post:
 *     summary: Đặt bàn mới
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Đặt bàn thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.post("/", bookingControllers.addBooking);
router.get("/", bookingControllers.getBookings);
router.get("/:id", bookingControllers.getBookingById);
router.put("/:id", bookingControllers.updateBookingById);
router.delete("/:id", bookingControllers.deleteBookingById);
router.get("/customer/:customerId", bookingControllers.getBookingsByCustomer);
router.post("/confirm", bookingControllers.addBooking2)
router.post("/confirm1", bookingControllers.addBooking3)

module.exports = router;
