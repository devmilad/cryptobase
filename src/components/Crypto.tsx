import  { useEffect, useState } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Card, Col, Input, Row, Spin } from 'antd'
import { Link } from 'react-router-dom'
import millify from 'millify'

interface currencyType{
  uuid: string
  rank: number
  name: string
  iconUrl:string
  price:number
  change:number
  marketCap:number
}

interface propsType{
  simplified: boolean
}
export const Crypto = ({simplified }: propsType) => {
  const count = simplified ? 10 : 100;
  const {data:cryptoList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState<currencyType[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins)
    const filtered= cryptoList?.data?.coins.filter((coin:currencyType)=>coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    setCryptos(filtered)
  }, [cryptoList, searchTerm])
  


  if (isFetching) 
  return <Spin size="large"
                            style={{ 
                              width: "100%",         textAlign: "center" }}
                  />

  return (
    <>
    {!simplified && (
      <div className="search-crypto">
      <Input
          placeholder='Search Cryptocurrency'
          onChange={(e)=>setSearchTerm(e.target.value)}
      />    
    </div>
    )}

      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos?.map(c=>(
          <Col 
            xs={24} 
            sm={12} 
            lg={6} 
            className='crypto-card' 
            key={c.uuid}
          >
            <Link to={`/crypto/${c.uuid}` }>
              <Card
                   title={`${c.rank}. ${c.name}`} 
                   extra={<img src={c.iconUrl }className='crypto-image' />}
                   hoverable
                   >
                    <p>Price: { millify(c.price)} </p>
                    <p>Market Cap: { millify(c.marketCap)} </p>
                    <p>Daily Change: { millify(c.change)} </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}
