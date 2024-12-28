import { Router } from "express";
import { Users } from "../mongoose/schemas/users.mjs";
import { RefreshTokens } from "../mongoose/schemas/refreshTokens.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authToken } from "../utils/middleware.mjs";

const router = Router();

router.get("/api/user/trial", authToken, (req, res) => {
  return res.status(201).json(req.user.username);
});

router.post("/api/user/refresh-access-token", async (req, res) => {
  const refreshToken = req.cookies.token;

  if (refreshToken === null) return res.sendStatus(401);

  try {
    const storedRefreshToken = await RefreshTokens.findOne({ refreshToken });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ username: user.username });
      res.status(201).json({ accessToken });
    });
  } catch (error) {
    return res.status(403).json({ error: error });
  }
});

router.post("/api/user/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPass = await bcrypt.hash(password, 10);

    const addUser = await Users({ username, password: hashedPass });
    addUser.save();

    return res.status(200).json({ username, hashedPass });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post("/api/user/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken({ username });

      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET
      );

      const savedRefreshToken = new RefreshTokens({ refreshToken });
      await savedRefreshToken.save();

      res.cookie("token", refreshToken, {
        httpOnly: true,
      });

      return res.status(200).json({ accessToken });
    }

    return res.status(401).send("Invalid Credentials");
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};

export default router;
