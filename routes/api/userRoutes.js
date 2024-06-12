const router = require("express").Router();
const { 
  getUsers, 
  getOneUser, 
  createUser, 
  deleteUser, 
  publishPost, 
  getFriends, 
  addFriend,
  removeFriend 
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getOneUser).delete(deleteUser);

// /api/users/:userId/publish
router.route("/:userId/publish").post(publishPost);

// /api/users/:userId/friends
router.route("/:userId/friends").get(getFriends);

router.route("/:userId/friends/:friendId").put(addFriend).delete(removeFriend);

module.exports = router;


