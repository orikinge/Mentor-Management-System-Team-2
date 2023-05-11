import { useLocalStorage } from 'usehooks-ts'

export const useLogin = () =>  {
  const [token, setToken] = useLocalStorage('token', '')
  const [{user}, setUser] = useLocalStorage('user', '')
  return { token, setToken, user, setUser }
}