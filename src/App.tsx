import { Layout, Space, Typography } from 'antd'
import './App.css'
import { Navbar } from "./components/Navbar"
import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Exchanges } from './components/Exchanges'
import { News } from './components/News'
import { Crypto } from './components/Crypto'
import { CryptoDetails } from './components/CryptoDetails'




export const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route index element={<Home />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path="/cryptoes" element={<Crypto />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer" >
          <Typography.Title level={5} style={{ color: 'white', textAlign: "center" }}>
            CryptoBase <br />
            Created By DevMilad
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}
