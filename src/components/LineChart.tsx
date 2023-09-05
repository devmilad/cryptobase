import { Col, Row, Typography } from 'antd'
import { Line } from 'react-chartjs-2'
import { historyType } from './CryptoDetails'
import {   Chart, ChartOptions, registerables } from 'chart.js'


interface chartType{
    currentPrice:string
    coinName: string
    coinHistory:historyType
}
Chart.register(...registerables);


const {Title} = Typography
export const LineChart = ({coinHistory,currentPrice, coinName}:chartType) => { 
    const coinPrice= []
    const coinTimestamp=[]

    for (let i = 0; i < coinHistory?.data?.history?.length; i+=1) {
        coinPrice.push(coinHistory.data.history[i].price)
    }
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
      coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }

    const data ={
        labels: coinTimestamp,
        datasets:[
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }
    const options : ChartOptions<"line"> = {
        scales: {
          y: 
            {
              ticks: {
                min: 0
              },
            },
          
        },
      };
  return (
   
    <>
        <Row className='chart-header'>
            <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
            <Col className='price-container'>
                <Title level={5} className='price-change' >
                    {coinHistory?.data?.change}%
                </Title>
                <Title level={5} className='current-price'>
                    Current  {coinName} Price : $ {currentPrice}
                </Title>
            </Col>
        </Row>
        <Line data={data} options={options}/>
    </>
  )
}
