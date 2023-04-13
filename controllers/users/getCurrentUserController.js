const getCurrentUserController = async (req, res) => {
  const { email, name, balance, verify, type } = req.user;

  res.json({
    message: "Successful operation",
    data: { email, name, balance, verify, type },
  });
};

module.exports = getCurrentUserController;
