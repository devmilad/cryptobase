import { Avatar, Card, Col, Row, Select, Spin, Typography } from "antd"
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi"
import { useState } from "react"
import moment from "moment"
import { useGetCryptosQuery } from "../services/cryptoApi"

const {Text, Title } = Typography
const {Option} = Select

interface propsType{
  simplified: boolean
}
interface newsType{
  url:string
  name:string
  image:{
    thumbnail:{
      contentUrl:string
    }
  }
  provider: {
    image:{
      thumbnail:{
        contentUrl:string
      }
    },
    name: string
  }[]
  description:string
  datePublished:string
}
interface optionType{
  name: string
}
const demoImage='https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
export const News = ({simplified}:propsType) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const {data } = useGetCryptosQuery(100)
  const {data: cryptoNews} = useGetCryptoNewsQuery( {newsCategory:newsCategory, count: simplified ? 6 : 12 })

  if (!cryptoNews) 
  return <Spin size="large"
                            style={{ 
                              width: "100%",         textAlign: "center" }}
                  />
  return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
          <Select
  showSearch
  className="select-news"
  placeholder="Select a Crypto"
  optionFilterProp="children"
  onChange={(value) => setNewsCategory(value)}
  filterOption={(input, option) =>
    (option?.children as unknown  as string)?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0
  }
>
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin:optionType)=>(
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}

        {cryptoNews?.value?.map((news:newsType )=>(
          <Col xs={24} sm={12} lg={8} className="news-card" key={1}>
            <Card className="news-card" hoverable >
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"  style={{ maxWidth: '200px', maxHeight: "100px" }}/>
              </div>
              <p>
                {news.description.length > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description
                }
              </p>
              <div className="provider-container">
                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}  alt=""/>
                <Text className="provider-name" >{news.provider[0]?.name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf('s').fromNow()}</Text>
            </a>
            </Card>
            
          </Col>
        ))}
    </Row>
  )
}
