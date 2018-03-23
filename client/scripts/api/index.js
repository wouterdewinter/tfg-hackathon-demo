import fetch from '../utils/fetch';
// import buckets from './data/buckets.json';

export function getVariableData() {
  // return new Promise(resolve => {
  //   setTimeout(() => resolve(buckets), 1000);
  // });
  return fetch.json('/stats');
}

export function submitData(age, gender) {
  return fetch.json('/save', {
    method: 'POST',
    body: JSON.stringify({ age, gender }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function flushData() {
  return fetch('/flush', { method: 'POST' });
}
