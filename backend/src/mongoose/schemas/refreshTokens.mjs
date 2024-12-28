import mongoose, { mongo } from "mongoose";

const refreshTokensSchema = mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

export const RefreshTokens = mongoose.model(
  "Refresh_Tokens",
  refreshTokensSchema
);
