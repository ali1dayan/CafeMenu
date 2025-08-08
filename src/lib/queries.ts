export const getMenuItemsQuery = `
  *[_type == "menuItem"]{
    _id,
    title,
    price,
    description,
    "imageUrl": image.asset->url,
    isSpecial,
    category->{
      titleFa,
      titleEn
    }
  }
`

export const getCategoriesQuery = `
  *[_type == "category"]{
    _id,
    titleFa,
    titleEn
  }
`
