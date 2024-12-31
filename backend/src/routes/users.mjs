import { Router } from "express";
import { Users } from "../mongoose/schemas/users.mjs";
import { RefreshTokens } from "../mongoose/schemas/refreshTokens.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/api/user/refresh-access-token", async (req, res) => {
  const refreshToken = req.cookies.token;

  if (refreshToken === null) return res.sendStatus(401);

  try {
    const storedRefreshToken = await RefreshTokens.findOne({ refreshToken });

    if (storedRefreshToken.refreshToken === refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, user) => {
          if (err) return res.sendStatus(403);
          const accessToken = await generateAccessToken(user.username);
          return res.status(201).json({ accessToken });
        }
      );
    } else {
      return res.status(403).send("Unable to find refresh token in database");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
      const accessToken = await generateAccessToken(username);

      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET
      );

      const savedRefreshToken = new RefreshTokens({ refreshToken });
      await savedRefreshToken.save();

      res.cookie("token", refreshToken, {
        httpOnly: true,
      });

      return res.status(200).json({ accessToken, refreshToken });
    } else {
      return res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    return res.status(500).json({ error: "sth wrong" });
  }
});

router.get("/api/user/logout", async (req, res) => {
  const token = req.cookies.token;

  try {
    await RefreshTokens.findOneAndDelete({ refreshToken: token });
    return res.status(204).send("successfully logged out");
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

const generateAccessToken = async (username) => {
  try {
    const getUser = await Users.findOne({ username });

    const userId = getUser._id;
    const user = { userId, username };

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5s",
    });
  } catch (error) {
    console.log(error);
  }
};

export default router;
