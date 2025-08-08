import { useQuery } from '@tanstack/react-query'
import { fetchFromSanity } from '@/lib/sanityClient'
import { getMenuItemsQuery } from '@/lib/queries'

export const useMenuItems = () => {
  return useQuery({
    queryKey: ['menu-items'],
    queryFn: () => fetchFromSanity(getMenuItemsQuery),
  })
}
