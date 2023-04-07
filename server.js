const app = require("./app");
const connectDB = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running. Use our API on port: ${PORT}`);
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
});
