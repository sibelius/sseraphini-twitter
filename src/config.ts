import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

export const config = {
  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN as string,
  TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID as string,
  TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET as string,
  TWITTER_PROFILE_ID: process.env.TWITTER_PROFILE_ID as string,
  TWITTER_PROFILE_USER: process.env.TWITTER_PROFILE_USER as string,

  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN as string,
  GUILD_ID: process.env.GUILD_ID as string,
}