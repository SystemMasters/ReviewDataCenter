import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // below normal load
    { duration: '2m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '2m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '2m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '2m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3005/api/reviews'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/?page=0&count=100&sort=false&product_id=1000`],
    ['GET', `${BASE_URL}/meta/?product_id=5`],
    ['GET', `${BASE_URL}/?page=0&count=100&sort=false&product_id=5`],
    ['GET', `${BASE_URL}/meta/?product_id=5`],
  ]);

  sleep(1);
}