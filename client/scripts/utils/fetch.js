import fetch from 'isomorphic-fetch';

const FETCH_OPTIONS = { credentials: 'same-origin' };

function parseError(res) {
  return res.text().then(text => {
    try {
      const json = JSON.parse(text);

      return {
        code: res.status,
        ...json
      };
    } catch (e) {
      return {
        code: res.status,
        message: 'An unexpected error occurred.',
        text
      };
    }
  });
}

function rejectForErrorHTTPStatus(res) {
  if (!res.ok) {
    return parseError(res).then(error => Promise.reject(error));
  }

  return res;
}

export default function exportedFetch(input, init = {}) {
  const options = { ...FETCH_OPTIONS, ...init };

  return fetch(input, options).then(rejectForErrorHTTPStatus);
}

exportedFetch.json = function() {
  return exportedFetch(...arguments).then(res => res.json());
};
