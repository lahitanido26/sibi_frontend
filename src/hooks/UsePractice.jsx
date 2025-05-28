import { useQuery } from '@tanstack/react-query'
import ApiClient from '../lib/api/ApiClient'

export function usePractice() {
  return useQuery({
    queryKey: ['practice'],
    refetchOnWindowFocus: false,
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(`/practice`)
      const data = res.data.data
      return data
    },
  })
}
