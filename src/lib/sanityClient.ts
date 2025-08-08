import axios from 'axios'

const projectId = '7pf48vti'
const dataset = 'production'
const apiVersion = 'v2023-08-04'

const baseURL = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`

export const fetchFromSanity = async (query: string) => {
  const encodedQuery = encodeURIComponent(query)
  const url = `${baseURL}?query=${encodedQuery}`

  const res = await axios.get(url)
  return res.data.result
}
