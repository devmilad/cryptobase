import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const cryptoHeaders={
    'X-RapidAPI-Key': '3f0d668941msh62ab8d0747029bfp170d37jsnfbe00c1526e8',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
const baseUrl="https://coinranking1.p.rapidapi.com"

const createRequest=(url:string)=>({url, headers:cryptoHeaders})

export const cryptoApi=createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) =>({
        getCryptos: builder.query({
            query:(count)=>createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetail: builder.query({
            query:(coinId)=>createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        }),
        getExchanges: builder.query({
            query: () => createRequest('coin/exchanges'),
          }),
    })
})

export const {useGetCryptosQuery,useGetCryptoDetailQuery,useGetCryptoHistoryQuery,useGetExchangesQuery} = cryptoApi