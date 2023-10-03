const jwt = require("jsonwebtoken");

const authService = require("../services/authService");
const { USERNAME_ALREADY_EXIST_ERROR } = require("../sentinel/error");
const RegisterResponse = require("../dto/registerResponse");

const secret = process.env.SECRET_KEY;

const register = async (req, res) => {
  const { username, password, is_admin, email, phone_number } = req.body;
  
  if (!username || !password || !email || !phone_number) {
    return res.status(400).json({ error: "missing required field" });
  }
  console.log(register);
  if (username.length < 6 || password.length < 8) {
    return res
      .status(400)
      .json({ error: "username atleast 6 char and password 8 char" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "invalid email address" });
  }

  const phoneRegex = /^\d{10,12}$/;
  if (!phoneRegex.test(phone_number)) {
    return res.status(400).json({ error: "invalid phone number" });
  }

  if (/\s/.test(password)) {
    return res
      .status(400)
      .json({ error: "password should not contain spaces" });
  }

  try {
    const user = await authService.register(
      username,
      password,
      is_admin,
      email,
      phone_number
    );
    res.status(201).json({
      message: "user successfully created",
      data: new RegisterResponse(user[0]),
    });
  } catch (error) {
    if (error.message === USERNAME_ALREADY_EXIST_ERROR) {
      return res.status(200).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "missing required field" });
  }

  try {
    const user = await authService.login(username, password);
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      secret
    );
    return res.json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
