export function setCookie(name, value, props) {
  props = props || {};
  let age = props.age * 60;
  if (!props.age) {
    age = 36000000;
  }
  let updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value);

  document.cookie = `${updatedCookie}; path='/'; max-age=${age}; samesite=lax`;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
