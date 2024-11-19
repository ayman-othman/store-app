export class CookieController {
  public static getCookie(name: string): string | null {
    const cookieValue = document.cookie
      .split(';')
      .find((row) => row.trim().startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  }

  public static setCookie(name: string, value: string): void {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=None; Secure`;
  }

  public static removeCookie(cookieToRemove: string): void {
    const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = `${cookieToRemove}=; expires=${expires}; path=/;SameSite=None; Secure`;
  }
}
