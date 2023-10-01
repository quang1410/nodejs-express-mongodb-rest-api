/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CLOSE_DB, CONNECT_DB, GET_DB } from '~/config/mongodb';
import exitHook from 'async-exit-hook';
import { env } from '~/config/environment'


const START_SERVER = () => {
  const app = express()
  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.get('/', async (req, res) => {
    console.log('process', process.env.APP_HOST)
    console.log('DB', await GET_DB().listCollections().toArray());
    res.end('<h1>Hello World!</h1><hr>');
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello Ngoc Quang Dev, I am running at ${hostname}:${port}`)
  })


  //Thực hiện các tác vụ cleanup trước khi dừng server
  //https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(() => {
    console.log('4. Disconnecting from MonongoDB Cloud Atlas');
    CLOSE_DB();
    console.log('4. Disconnected from MonongoDB Cloud Atlas');
  });
};

(async () => {
  try {
    console.log('1. Connecting to mongoDB Cloud Atlas');
    await CONNECT_DB();

    console.log('2. Connected to mongodb cloud');
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})()

//Cách viết khác:

// CONNECT_DB()
//   .then(() => console.log('Connected to mongodb cloud'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error);
//     process.exit(0);
//   })
