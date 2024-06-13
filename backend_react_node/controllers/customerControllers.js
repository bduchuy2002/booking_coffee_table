const { Customer } = require("../models/model");

const customerControllers = {
    addCustomer: async (req, res) => {
        try {
            const newCustomer = new Customer(req.body);
            const savedCustomer = await newCustomer.save();
            res.status(200).json(savedCustomer);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getCustomers: async (req, res) => {
        try {
            const nameQuery = req.query.name;
            let customers;

            if (nameQuery) {
                // Filter by customer name if 'name' query parameter is provided
                customers = await Customer.find({ 
                    $or: [
                        { firstName: { $regex: new RegExp(nameQuery, 'i') } },
                        { lastName: { $regex: new RegExp(nameQuery, 'i') } }
                    ]
                });
            } else {
                // Retrieve all customers if no 'name' query parameter is provided
                customers = await Customer.find();
            }

            res.status(200).json(customers);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getCustomerById: async (req, res) => {
        try {
            const customer = await Customer.findById(req.params.id);
            res.status(200).json(customer);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateCustomerById: async (req, res) => {
        try {
            const updatedCustomer = await Customer.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedCustomer);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteCustomerById: async (req, res) => {
        try {
            await Customer.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successful");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getBooking: async (req, res) => {
    try {
        const customerId = req.params.id;

        // Tìm khách hàng theo ID và populate trường 'booking' để lấy thông tin chi tiết về các đặt phòng
        const customerWithBookings = await Customer.findById(customerId).populate("booking");

        if (!customerWithBookings) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng" });
        }

        // Trích xuất thông tin đặt phòng từ tài liệu khách hàng đã populate
        const bookings = customerWithBookings.booking;

        res.status(200).json(bookings);
    } catch (err) {
        console.error("Lỗi khi lấy thông tin đặt phòng cho khách hàng:", err);
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
    },
    getLogin: async (req, res) => {
    

        try {
        const { email, password } = req.body;
        // Tìm khách hàng dựa trên email
            const customer = await Customer.findOne({ email,password });
            
        if (!customer) {
            return res.status(401).json({ message: 'Email không tồn tại' });
        } else {
            return  res.status(200).json({ message: customer._id });
            }

        

        // Đăng nhập thành công
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng nhập' });
    }
}

    
};

module.exports = customerControllers;
