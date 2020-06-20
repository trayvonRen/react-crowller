import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, message } from 'antd'
import axios from 'axios'
import './style.css'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment'
import request from '../../request'

interface CourseItem {
  title: string
  count: number
}

interface State {
  loaded: boolean
  isLogin: boolean
  data: { [key: string]: CourseItem[] }
}
class Home extends Component {
  state: State = {
    loaded: false,
    isLogin: true,
    data: {},
  }
  componentDidMount() {
    request.get('/api/isLogin').then(res => {
      const data = res.data

      if (!data) {
        this.setState({
          isLogin: false,
          loaded: true,
        })
      } else {
        this.setState({
          loaded: true,
        })
      }
    })

    request.get('/api/showData').then(res => {
      const data = res
      if (data) {
        this.setState({
          data: data,
        })
      }
    })
  }

  handleLogoutClick = (e: React.MouseEvent) => {
    axios.get('/api/logout').then(res => {
      const data = res.data
      if (!data) {
        this.setState({
          isLogin: false,
        })
      } else {
        message.error('推出失败')
      }
    })
  }

  getOption: () => echarts.EChartOption = () => {
    const { data } = this.state
    const times: string[] = []
    const counts: number[] = []
    for (let i in data) {
      const item = data[i]
      times.push(moment(i).format('MM-DD HH:mm'))

      counts.push(item.length)
    }

    return {
      title: {
        text: '课程在线学习人数',
      },
      tooltip: {
        trigger: 'axis',
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '视频数量',
          type: 'line',
          data: counts,
        },
      ],
    }
  }

  handleCrowllerClick = (e: React.MouseEvent) => {
    axios.get('/api/getData').then(res => {
      if (res.data?.data) {
        message.success('爬取成功')
      } else {
        message.error('推出失败！')
      }
    })
  }

  render() {
    const { isLogin, loaded } = this.state
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <div className="buttons">
              <Button
                type="primary"
                onClick={this.handleCrowllerClick}
                style={{ marginRight: '25px' }}>
                爬取
              </Button>
              <Button type="primary" onClick={this.handleLogoutClick}>
                推出
              </Button>
            </div>

            <ReactEcharts option={this.getOption()} />
          </div>
        )
      }
      return null
    }
    return <Redirect to="/login" />
  }
}

export default Home
