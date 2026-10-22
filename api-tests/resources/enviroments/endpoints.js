// Endpoints da API
const endpoints = {
  // Account
  createUser: "/Account/v1/User",
  generateToken: "/Account/v1/GenerateToken",
  authorized: "/Account/v1/Authorized",
  userDetails: "/Account/v1/User", // + /{userId}
  deleteUser: "/Account/v1/User", // + /{userId}

  // BookStore
  books: "/BookStore/v1/Books",
};

module.exports = { endpoints };
