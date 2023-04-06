const logoutController = (req, res) => {
  const { id } = req.params;

  //   await logout(id);
  const logout = async (id) => {
    const user = await User.findOne(id);

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    try {
      user.token = null;
      const updatedUser = await User.save();

      return res.status(202).json({
        message: "No content",
        data: updatedUser,
      });
    } catch (err) {
      console.log(error.message);
    }
  };

  return res.json({ status: "success" });
};

module.exports = logoutController;
