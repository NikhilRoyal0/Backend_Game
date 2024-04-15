const dbConnection = require("../../db/dataMain");

class LoginService {
  async getUserByEmailAndPassword(email, password) {
    try {
      const [user] = await dbConnection.query(
        "SELECT * FROM admin WHERE Email = ? AND Password = ?",
        [email, password]
      );
      return user;
    } catch (error) {
      console.error("Error fetching user by email and password:", error);
      throw error;
    }
  }

  async getUserById(AdminID) {
    try {
      if (AdminID === undefined) {
        throw new Error("Admin ID is not valid");
      }

      const [userData] = await dbConnection.query(
        "SELECT * FROM admin WHERE AdminID = ?",
        [AdminID]
      );
      return userData || null;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }
}

module.exports = new LoginService();
