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
  },
  async publishPost (req, res) {
    console.log("%cYou are adding this post:\n", "color:blue;font-size:20px;");
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { posts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that id; cannot publish!" });
      }

      res.json(user);
      console.log("%cPost successfully published!", "color:green;font-size:20px;");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
