// import fetch from '../utils/fetch';
import buckets from './data/buckets.json';

export function getVariableData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(buckets), 1000);
  });
  // return fetch.json('/stats');
}
