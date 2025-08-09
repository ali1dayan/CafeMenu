import { useQuery } from "@tanstack/react-query";
import { getMenuItemsQuery, getCategoriesQuery } from "@/lib/queries";
import { fetchFromSanity } from "@/lib/sanityClient";

export const useMenuItems = () =>
  useQuery({
    queryKey: ["menu-items"],
    queryFn: () => fetchFromSanity(getMenuItemsQuery),
  });

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchFromSanity(getCategoriesQuery),
  });
