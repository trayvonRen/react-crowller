import './login.css'
import React, { Component } from 'react'
import axios from 'axios'
import request from '../../request'
import { Form, Input, Button, message } from 'antd'
import WrappedFormUtils from 'antd/lib/form/Form'
import qs from 'qs'
import { Redirect } from 'react-router-dom'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

// interface Props {
//   form: WrappedFormUtils
// }

class NormalLogin extends Component {
  state = {
    isLogin: false,
  }
  onFinish = (values: any) => {
    request
      .post(
        '/api/login',
        qs.stringify({
          password: values.password,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      .then(res => {
        const data = res.data
        if (data) {
          this.setState({
            isLogin: true,
          })
        } else {
          message.error('登录失败！')
        }
      })
  }

  onFinishFailed = (errorInfo: any) => {
    alert('请输入密码！')
  }

  handleSubmit(e: any) {}
  render() {
    const { isLogin } = this.state
    return isLogin ? (
      <Redirect to="/home" />
    ) : (
      <div className="login-page">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入你的密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default NormalLogin
