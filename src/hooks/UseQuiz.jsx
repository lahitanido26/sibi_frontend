import { useQuery } from '@tanstack/react-query'
import ApiClient from '../lib/api/ApiClient'

export function useQuiz() {
  return useQuery({
    queryKey: ['quiz'],
    refetchOnWindowFocus: false,
    initialData: [],
    queryFn: async () => {
      const res = await ApiClient.get(`/quiz`)
      const data = res.data.data
      return data
    },
  })
}
