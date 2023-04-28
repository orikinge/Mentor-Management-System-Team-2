import { useLocalStorage } from 'usehooks-ts'

export const useLogin = () =>  {
  const [token, setToken] = useLocalStorage('token', '')
  return { token, setToken }
}