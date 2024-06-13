const cofeeControllers = require("../controllers/cofeeControllers");

const router = require("express").Router();
router.post("/", cofeeControllers.addCoffee);
router.get("/:id", cofeeControllers.getAnCoffee);
router.put("/:id", cofeeControllers.updateAnCoffee);
router.delete("/:id", cofeeControllers.deleteAnCoffee);
router.get("/", cofeeControllers.getCoffee);
router.get("/55/pagination", cofeeControllers.getPhanTrangCoffee);
module.exports = router;
