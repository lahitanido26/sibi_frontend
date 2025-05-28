import { useQuery } from '@tanstack/react-query'
import ApiClient from '../lib/api/ApiClient'
import auth from '../utils/auth'

export function useCurrentScoreQuiz(slug) {
  return useQuery({
    queryKey: ['current-score-quiz', slug],
    initialData: [],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const token = auth.getToken()
      const res = await ApiClient.get(`/quiz/slug/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data.data
      return data
    },
  })
}
