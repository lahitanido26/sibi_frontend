import { useQuery } from '@tanstack/react-query'
import ApiClient from '../lib/api/ApiClient'

export function useCurrentUnitLesson(slug) {
  return useQuery({
    queryKey: ['current-lesson', slug],
    initialData: [],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await ApiClient.get(`/unit-lesson/slug/${slug}`)
      const data = res.data.data
      return data.content
    },
  })
}
