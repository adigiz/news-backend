class RegisterResponse {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.is_admin = user.is_admin;
    this.email = user.email;
    this.phone_number = user.phone_number;
  }
}

module.exports = RegisterResponse;
