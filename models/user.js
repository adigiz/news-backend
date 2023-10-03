class User {
  constructor(users) {
    this.user_id = users.user_id;
    this.username = users.username;
    this.email = users.email;
    this.password = users.password;
    this.category_user = users.category_user;
    this.no_hp = users.no_hp;
    this.created_at = users.created_at;
    this.is_delete = users.is_delete;
  }
}

module.exports = User;
