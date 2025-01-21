import Cookies from 'js-cookie'

const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN
const EXPIRE_DAYS = 1

export const auth = {
  setToken(token: string) {
    Cookies.set(TOKEN_KEY, token, {
      expires: EXPIRE_DAYS,
      secure: true,
      sameSite: 'strict'
    })
  },

  getToken(): string | undefined {
    return Cookies.get(TOKEN_KEY)
  },

  removeToken() {
    Cookies.remove(TOKEN_KEY)
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}
