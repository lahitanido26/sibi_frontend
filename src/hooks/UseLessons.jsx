import { useQuery } from '@tanstack/react-query'
import ApiClient from '../lib/api/ApiClient'

export function useLesson() {
  return useQuery({
    queryKey: ['lessons'],
    initialData: [],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await ApiClient.get(`/lesson`)
      const data = res.data.data
      return data
    },
  })
}
