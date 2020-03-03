export function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/*
* @param {string} cookieName - The name of the cookie to be set
* @param {string} cookieValue - The value of the cookie to be set
* @param {number} expirationDays = How long the cookie should last.
*               Leave as 0 for a session cookie or set as -1 to delete a cookie
*/

export function setCookie(cookieName, cookieValue, expirationDays = 0) {
  const d = new Date();
  d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()};`;
  document.cookie = `${cookieName}=${cookieValue};${expirationDays !== 0 ? expires : null}path=/`;
}
