import { config } from './config';
import { Client } from "twitter-api-sdk";
import {debugConsole} from './debugConsole';

const run = async () => {
  const client = new Client(config.TWITTER_BEARER_TOKEN);

  // remove old rules
  const rules = await client.tweets.getRules();

  const ids = rules.data.map(rule => rule.id);


  await client.tweets.addOrDeleteRules(
    {
      delete: {
        ids,
      },
    },
    {
      dry_run: false,
    }
  );

  await client.tweets.addOrDeleteRules(
    {
      add: [
        { 
          value: "-RT cc @sseraphini -is:reply -is:retweet",
          // value: "cc @sseraphini" 
        },
      ],
    },
    {
      dry_run: false,
    }
  );

  const stream = client.tweets.searchStream({
    "tweet.fields": ['attachments','author_id','id','text','created_at','public_metrics'],
    "user.fields": ['profile_image_url', 'url', 'username'],
    'expansions': ['author_id', 'attachments.media_keys'],
    "media.fields": ['height','media_key','public_metrics','type','url','width']
  });

  const newRules = await client.tweets.getRules();
  debugConsole({
    newRules,
  });


  console.log('awaiting tweets');

  for await (const tweet of stream) {
    debugConsole({
      tweet,
    })
  }
}

(async () => {
  try {
    await run();
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);

    process.exit(1);
  }

  process.exit(0)
})();