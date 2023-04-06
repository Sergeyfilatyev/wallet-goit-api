const logout = async (req, res, next) => {
  const { id } = req.params;

  await logout(id);

  return res.json({ status: "success" });
};

module.exports = logout;
