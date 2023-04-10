const queryString = require("query-string");
const axios = require("axios");
const { User } = require("../../models");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  const user = await User.findOne({ email: userData.data.email });

  if (user && user.type === "password auth") {
    return res.redirect(`${process.env.FRONTEND_URL}`);
  }
  if (user && user.type === "google auth") {
    await User.updateOne({
      token: tokenData.data.access_token,
      password: tokenData.data.access_token,
    });
  } else {
    await User.create({
      name: userData.data.name,
      email: userData.data.email,
      token: tokenData.data.access_token,
      type: "google auth",
    });
  }
  return res.redirect(
    `${process.env.FRONTEND_URL}/dashboard?token=${tokenData.data.access_token}&name=${userData.data.name}`
  );
};
module.exports = googleRedirect;
