const router = require("express").Router();
const { getUsers, getOneUser, createUser, deleteUser, publishPost } = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getOneUser).delete(deleteUser);

// /api/users/:userId/publish
router.route("/:userId/publish").post(publishPost);

module.exports = router;


