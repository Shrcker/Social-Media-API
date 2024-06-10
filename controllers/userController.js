const { User, Post } = require("../models");

module.exports = {
  async getUsers (req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getOneUser (req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');
      
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createUser (req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async deleteUser (req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Post.deleteMany({ _id: { $in: user.posts } });
      res.json({ message: "User and their posts deleted" });
    } catch (error) {
      res.status(500).json(error);

    }
  }
}
