const getCurrentUserController = async (req, res) => {
  const { email, name, balance } = req.user;

  res.json({
    message: "Successful operation",
    data: { email, name, balance },
  });
};

module.exports = getCurrentUserController;
