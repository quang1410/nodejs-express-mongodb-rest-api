/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB } from '~/config/mongodb';
import 'dotenv/config';


const START_SERVER = () => {
  const app = express()
  const hostname = 'localhost'
  const port = 8017

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Ngoc Quang Dev, I am running at ${hostname}:${port}`)
  })
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
