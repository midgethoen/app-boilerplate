

export function resolveHeaders(headers = {}) {
  return (state) => {
    let auth;
    if (state && state.user && state.user.accessToken) {
      auth = { Authorization: `Bearer ${state.user.accessToken}` };
    }
    return {
      'content-type': 'application/json',
      ...auth,
      ...headers,
    };
  };
}

export function resolveUrl(path) {
  // return `https://dontw.certhon.com${path}`;
  return path;
}
