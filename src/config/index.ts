require("dotenv").config();

export const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 3000,
};