const { Coofee } = require("../models/model");
const cofeeControllers = {
    addCoffee: async (req, res) => {
        try {
            const newCoffee = new Coofee(req.body);
            const saveCoffee = await newCoffee.save();
            res.status(200).json(saveCoffee);
        } catch(err){
            res.status(500).json(err);
        }
    },
    getCoffee : async (req, res) => {
        // try {
            
        //     const coffee = await Coofee.find();
            
        //     res.status(200).json(coffee);
        // } catch(err){
        try {
            // Check if there's a 'name' query parameter
            const nameQuery = req.query.name;
            let coffee;
            
            if (nameQuery) {
                // Filter by coffee name if 'name' query parameter is provided
                coffee = await Coofee.find({ name: { $regex: new RegExp(nameQuery, 'i') } });
            } else {
                // Retrieve all coffees if no 'name' query parameter is provided
                coffee = await Coofee.find();
            }
            
            res.status(200).json(coffee);
        } catch(err){
            res.status(500).json(err);
        }
    },
    getAnCoffee : async (req, res) => {
        try {
            
            const anCoffee = await Coofee.findById(req.params.id);
            res.status(200).json(anCoffee);
        } catch(err){
            res.status(500).json(err);
        }
    },
    updateAnCoffee : async (req, res) => {
        try {
            const updateCoffee = await Coofee.findById(req.params.id);
            await updateCoffee.updateOne({ $set: req.body });
            res.status(200).json("update sussess");
        } catch(err){
            res.status(500).json(err);
        }
    },
    deleteAnCoffee : async (req, res) => {
        try {
           
            await Coofee.findByIdAndDelete(req.params.id);
            res.status(200).json("delete sussess");
        } catch(err){
            res.status(500).json(err);
        }
    },
    getPhanTrangCoffee: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là trang 1)
            const limit = 4; // Số lượng mục trên mỗi trang (mặc định là 10)

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const coffeeCount = await Coofee.countDocuments();
            const coffee = await Coofee.find().skip(startIndex).limit(limit);
            const totalPages = Math.ceil(coffeeCount / limit);
            // Tính toán thông tin phân trang (pagination)
            const pagination = {};
            if (endIndex < coffeeCount) {
                pagination.next = {
                    page: page + 1,
                    limit: limit
                };
            }
            if (startIndex > 0) {
                pagination.prev = {
                    page: page - 1,
                    limit: limit
                };
            }

            res.status(200).json({ coffee, pagination ,totalPages,});
        } catch(err) {
            res.status(500).json(err);
        }
    },
    
};
module.exports = cofeeControllers;