import { Col, Row, Spin, Statistic, Typography } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Crypto } from '../components/Crypto'
import { News } from '../components/News'

interface globalTypes{
  total: number,
  totalExchanges: number
  totalMarketCap: number
  total24hVolume: number
  totalMarkets: number
}

export const Home = () => {
  const {Title}=Typography
  const {data, isFetching } = useGetCryptosQuery(10)
  const globalStats:globalTypes=data?.data?.stats

  if (isFetching) 
            return <Spin size="large"
                                      style={{ 
                                        width: "100%",         textAlign: "center" }}
                            />
  return (
    <>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12} > 
          <Statistic title="Total Cryptoes" value={globalStats.total}/>
        </Col>
        <Col span={12}> 
          <Statistic title="Total Market Cap" value={millify(globalStats.totalExchanges)} />
        </Col>
        <Col span={12}> 
          <Statistic title="Total Markets" value={millify(globalStats.totalMarketCap)} />
        </Col>
        <Col span={12}> 
          <Statistic title="Total Exchanges" value={millify(globalStats.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className='home-title' >Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more' >
          <Link to='/cryptoes'>Show more ...</Link>
        </Title>
      </div>
      <Crypto simplified={true}/>
      <div className="home-heading-container">
        <Title level={2} className='home-title' >Latest Crypto News</Title>
        <Title level={3} className='show-more' >
          <Link to='/news'>Show more ...</Link>
        </Title>
      </div>
      <News simplified={true}/>
    </>
  )
}
