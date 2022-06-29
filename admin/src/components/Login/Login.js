import React, { useState } from 'react';
import styles from './Login.module.scss';
import cn from "classnames/bind";
import logo from "../../images/logo_no_bgr.png";
import { Form, Input, Checkbox, Button, Divider, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// react-router-dom là thư viện giúp cho việc điều hướng url tới các component
// useHisrtory được sử dụng để thay đổi url, ví dụ như khi bạn đang ở mà hình login chẳng hạn, \users\login, sau khi đã authen xong thì cần redirect tới màn dashboard
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { URL } from '../../consts';
import Header from '../../commons/Header';

const cx = cn.bind(styles);

const Login = () => {
	const history = useHistory();

	const onFinish = async (values) => {
		console.log('Success:', values);
		const data = {
			"email": values.username,
			"password": values.password,
		}

		try {
			const res = await axios.post(`${URL}/admin/login`, data);

			console.log("data return ", res.data.data)
			if (res.status === 200) {
				window.localStorage.setItem("token-lingo-admin", res?.data.data.token);
				// window.localStorage.setItem("username-admin", res.data.username);
				history.push("/manage-vocab/show");
				// window.location.reload();
			}
		} catch (err) {
			console.log(err);
			message.error(err.response.data);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Header />
			<div className={cx("container")}>
				<div className={cx("login")}>
					<img src={logo} alt="logo" width="60%" />
					<Form
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						className={cx("form")}
					>
						<Form.Item
							name="username"
							rules={[{ required: true, message: 'Please input your username!' }]}
						>
							<Input placeholder="Username" prefix={<UserOutlined />} />
						</Form.Item>

						<Form.Item
							name="password"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password placeholder="Password" />
						</Form.Item>

						<Form.Item name="remember" valuePropName="checked" >
							<Checkbox>Remember Password</Checkbox>
						</Form.Item>

						<Form.Item >
							<Button type="primary" htmlType="submit" className={cx("button")}>
								ĐĂNG NHẬP
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	)
}

export default Login;