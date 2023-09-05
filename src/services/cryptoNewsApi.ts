import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const newsHeaders={
    'X-RapidAPI-Key': '3f0d668941msh62ab8d0747029bfp170d37jsnfbe00c1526e8',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}
const baseUrl="https://bing-news-search1.p.rapidapi.com"

const createRequest=(url:string)=>({url, headers:newsHeaders})

export const cryptoNewsApi=createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) =>({
        getCryptoNews: builder.query({
            query:({ newsCategory, count })=>createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi;