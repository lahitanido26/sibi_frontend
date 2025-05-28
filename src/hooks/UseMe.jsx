import { useQuery } from '@tanstack/react-query'
import ApiClient from '../lib/api/ApiClient'
import auth from '../utils/auth'
export function useMe() {
  return useQuery({
    queryKey: ['get-me'],
    initialData: [],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const token = auth.getToken()
      const res = await ApiClient.get(`/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data
      return data
    },
  })
}
