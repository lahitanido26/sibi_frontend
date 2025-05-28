import { useQuery } from '@tanstack/react-query'
import ApiClient from '../lib/api/ApiClient'

export function useUser() {
  return useQuery({
    queryKey: ['users'],
    initialData: [],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await ApiClient.get(`/user`)
      const data = res.data.data
      return data
    },
  })
}
