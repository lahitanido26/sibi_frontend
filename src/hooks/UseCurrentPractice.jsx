import { useQuery } from '@tanstack/react-query'
import ApiClient from '../lib/api/ApiClient'

export function useCurrentPractice(slug) {
  return useQuery({
    queryKey: ['current-practice', slug],
    initialData: [],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await ApiClient.get(`/practice/slug/${slug}`)
      const data = res.data.data
      return data?.questions ?? []
    },
  })
}
