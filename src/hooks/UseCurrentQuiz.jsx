import { useQuery } from '@tanstack/react-query'
import ApiClient from '../lib/api/ApiClient'

export function useCurrentQuiz(slug) {
  return useQuery({
    queryKey: ['current-quiz', slug],
    initialData: [],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await ApiClient.get(`/quiz/slug/${slug}`)
      const data = res.data.data
      return data?.questions ?? []
    },
  })
}
