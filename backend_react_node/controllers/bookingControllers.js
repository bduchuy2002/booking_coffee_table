const { Booking,Coofee,Customer } = require("../models/model");

const bookingControllers = {
    addBooking: async (req, res) => {
        try {
            const newBooking = new Booking(req.body);
            const savedBooking = await newBooking.save();
            res.status(200).json(savedBooking);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getBookings: async (req, res) => {
        try {
            const bookings = await Booking.find();
            res.status(200).json(bookings);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getBookingById: async (req, res) => {
        try {
            const booking = await Booking.findById(req.params.id);
            res.status(200).json(booking);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateBookingById: async (req, res) => {
        try {
            const updatedBooking = await Booking.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedBooking);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteBookingById: async (req, res) => {
        try {
            await Booking.findByIdAndDelete(req.params.id);
            res.status(200).json("Booking deleted successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getBookingsByCustomer: async (req, res) => {
        try {
            const { customerId } = req.params;
            const bookings = await Booking.find({ idCustomer: customerId });
            res.status(200).json(bookings);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    addBooking2: async (req, res) => {
        try {
            const { idCustomer, idCoffee, date, time, floor, quantity } = req.body;

            // Tìm thông tin quán cà phê
            const coffee = await Coofee.findById(idCoffee);

            if (!coffee) {
                return res.status(404).json({ message: 'Không tìm thấy quán cà phê' });
            }

            // Kiểm tra số lượng chỗ ngồi còn lại
            const reservedSeats = await Booking.aggregate([
                { $match: { idCoffee: coffee._id } },
                { $group: { _id: null, totalSeats: { $sum: '$quantity' } } }
            ]);

            const availableSeats = coffee.slot - (reservedSeats.length > 0 ? reservedSeats[0].totalSeats : 0);

            if (availableSeats < quantity) {
                return res.status(400).json({ message: 'Quán cà phê đã hết chỗ ngồi' });
            }

            // Tạo đặt chỗ mới
            const newBooking = new Booking({
                idCustomer,
                idCoffee,
                date,
                time,
                floor,
                quantity
            });

            // Lưu đặt chỗ vào cơ sở dữ liệu
            const savedBooking = await newBooking.save();
            if (req.body.idCustomer) {
                const customer = Customer.findById(req.body.idCustomer);
                await customer.updateOne({ $push: {booking:savedBooking._id}})
            }
            // Cập nhật số lượng chỗ ngồi của quán cà phê sau khi đặt chỗ
            coffee.slot -= quantity; // Trừ đi số lượng ghế đã đặt
            await coffee.save();

            res.status(200).json(savedBooking);
        } catch (err) {
            console.log(err); // Debug để xem lỗi là gì
            res.status(500).json({ message: 'Lỗi khi đặt chỗ', error: err.message });
        }
    },
    addBooking3:async (req, res) => {
    try {
        const { idCustomer, idCoffee, date, time, tableBooking,name,address  } = req.body;

        // Kiểm tra số lượng bàn được đặt
        // if (tableBooking.length < 2) {
        //     return res.status(400).json({ message: 'Bạn cần đặt ít nhất 2 bàn.' });
        // }

        // Kiểm tra trạng thái của từng bàn
        const invalidTables = [];

        for (const tableID of tableBooking ) {
            const coffee = await Coofee.findOne({ 'table.tableID': tableID });

            if (!coffee) {
                invalidTables.push(tableID);
            } else {
                const table = coffee.table.find(t => t.tableID === tableID);
                if (table.status) {
                    invalidTables.push(tableID);
                }
            }
        }

        if (invalidTables.length > 0) {
            return res.status(400).json({ message: `Các bàn ${invalidTables.join(', ')} đã được đặt.` });
        }

        // Tạo đơn đặt hàng mới
        const newBooking = new Booking({
            idCustomer,
            idCoffee,
            date: date,
            time: time,
            name: name,
            address:address,
            
                tableBooking :tableBooking // Mảng các tableID đại diện cho các bàn được đặt
        });

        // Lưu đơn đặt hàng vào cơ sở dữ liệu
        await newBooking.save();
if (req.body.idCustomer) {
                const customer = Customer.findById(req.body.idCustomer);
                await customer.updateOne({ $push: {booking:newBooking._id}})
            }
        // Cập nhật trạng thái của các bàn đã được đặt
        await Coofee.updateMany(
            { 'table.tableID': { $in: tableBooking  } },
            { $set: { 'table.$[elem].status': true } },
            { arrayFilters: [{ 'elem.tableID': { $in: tableBooking  } }] }
        );

        res.status(201).json({ message: 'Đặt bàn thành công.' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }


};

module.exports = bookingControllers;
