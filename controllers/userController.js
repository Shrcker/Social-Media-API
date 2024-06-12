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
      const user = await User.findOne({ _id: req.params.userId });
      
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
  },
  async deletePost(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { posts: { postId: req.params.postId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No post was found with that id; cannot delete post"});
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getFriends (req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user was found with that id; cannot add friend" });
      } else if (!user.friends.length) {
        return res.status(404).json({ message: "This user has no friends; cannot get friends." });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async addFriend (req, res) {
    try {
      const newFriend = req.params.friendId;
      const oldUser = await User.findOne({ _id: req.params.userId });

      if (!User.find({ _id: newFriend })) {
        return res.status(404).json({ message: "User to friend doesn't exist" });
      } else if (!oldUser.friends.includes(newFriend)) {

        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );

        if (!user) {
          return res.status(404).json({ message: "No user was found with that id; cannot add friend"});
        }
        
        res.json(user);
      }
      res.status(404).json({ message: "This user has already friended this person" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async removeFriend (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
