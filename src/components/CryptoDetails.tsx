import { Col, Row, Select, Spin, Typography } from "antd"
import { useParams } from "react-router-dom"
import {useState} from 'react'
import { useGetCryptoDetailQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi"
import millify from "millify"
import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, TrophyOutlined } from "@ant-design/icons"
import HTMLReactParser from "html-react-parser"
import { LineChart } from "./LineChart"


interface coinType{
  name: string
  symbol: string
  price: number
  rank:number
  marketCap:number
  allTimeHigh:{
    price:number
  }
  numberOfMarkets:number
  numberOfExchanges:number
  supply:{
    circulating:number
    confirmed:boolean
    total:number
  }
  description:string
  links:linkType[]
}

interface statsType{
  icon:React.ReactElement
  title:string
  value:string | number | React.ReactElement
}

interface linkType{
  name:string
    type:string
    url:string
}

export interface historyType{
  data: {
    change:string
    history:{
      price:string
      timestamp: number
    }[]
  }
}


const {Title, Text} = Typography
const{Option}=Select

export const CryptoDetails = () => {
  const {coinId} = useParams()
  const [timePeriod, setTimePeriod] = useState<string>('7d') 
   const{data , isFetching}=useGetCryptoDetailQuery(coinId)
   const{data:coinHistory}=useGetCryptoHistoryQuery({coinId, timePeriod})
   
  const cryptoDetails:coinType=data?.data?.coin

   const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

   const stats:statsType[]= [
     { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
     { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
     
     { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
     { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
   ];
 
   const genericStats:statsType[] = [
     { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
     { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
     { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
     { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
     { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
   ];

   if (isFetching) 
   return <Spin size="large"
                             style={{ 
                               width: "100%",         textAlign: "center" }}
                   />
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name}({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars.
          View value statistic, market cap and supply.
        </p>
      </Col>
      <Select 
                defaultValue="7d"
                className="select-timeperiod"
                placeholder="Select Time Period"
                onChange={(value)=>setTimePeriod(value)}
      >
        {time.map((data:string)=>(
            <Option key={data} >{data}</Option>
        ))}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
      <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistic-heading">
              <Title level={3} className="coin-detailes-heading">
                {cryptoDetails.name} Value Statistic
              </Title>
              <p>
                An overview showing the stats of {cryptoDetails.name}
              </p>
            </Col>
            {stats.map((s:statsType)=>(
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{s.icon}</Text>
                <Text>{s.title}</Text>
              </Col>
              <Text className="stats">{s.value}</Text>
            </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistic-heading">
              <Title level={3} className="coin-detailes-heading">
                Other Statistic
              </Title>
              <p>
                An overview showing the stats of all cryptocurencies
              </p>
            </Col>
            {genericStats.map((s:statsType)=>(
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{s.icon}</Text>
                <Text>{s.title}</Text>
              </Col>
              <Text className="stats">{s.value}</Text>
            </Col>
            ))}
          </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
           <Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name}?<br />
              {HTMLReactParser(cryptoDetails.description)}
           </Title>
        </Row>
        <Col className="coin-links">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Links
              </Title>
              {cryptoDetails.links.map((link:linkType)=>(
                <Row className="coin-link" key={link.url}>
                  <Title level={5} className="link-name" >
                    {link.type}
                  </Title>
                  <a href={link.url} target="_blank" rel="noreffere">
                    {link.name}
                  </a>
                </Row>
              ))}
        </Col>
      </Col>
    </Col>
  )
}
