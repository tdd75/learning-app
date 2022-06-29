import { EditOutlined, KeyOutlined, LogoutOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import React from "react";
import Layout from "../../commons/Layout";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { changePassword, logout } from "../../service/AdminService";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = cn.bind(styles);

const AdminAccount = () => {
	const history = useHistory();
	const [oldPass, setOldPass] = useState();
	const [newPass, setNewPass] = useState();

	const handleChangePassword = async () => {
		changePassword(oldPass, newPass).then(
            res => {
                console.log(res?.data?.data);
                toast.success('Change password successfully!');
                setNewPass('');
                setOldPass('');
            }).catch((err) => {
                console.log(err);
                toast.error(`${err?.response?.data?.message}`);
            });
	}
    const handleLogout = () => {
        logout();
        history.push('/login');
    }

	return (
		<Layout>
			<div style={{ fontSize: '28px', fontWeight: '700' }}>
				Admin account
			</div>
			<div className={cx("body")}>
                <ToastContainer position="top-right"/>
				<Row gutter={[32, 32]}>
					<Col offset={6} span={12}>
						<Card
							className={cx("card")}
							title={
								<>
									<KeyOutlined /> Change password
								</>
							}
						>

							<div className={cx("field")}>
								<div className={cx("content")}>
									<div
										className={cx("title")}
									>Old password</div>
									<input
										type="password"
										className={cx("value")}
										placeholder=""
										onChange={(e) => setOldPass(e.target.value)}
										required
									/>
									<div></div>
								</div>

							</div>

							<div className={cx("field")}>
								<div className={cx("content")}>
									<div
										className={cx("title")}
									>New password</div>
									<input
										type="password"
										className={cx("value")}
										placeholder=""
										onChange={(e) => setNewPass(e.target.value)}
										required
									/>
								</div>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div
									className={cx("button1")}
									onClick={handleChangePassword}
								>
									<EditOutlined /> Change password
								</div>
								<div
									className={cx("button2")}
									onClick={handleLogout}
								>
									<LogoutOutlined /> Logout
								</div>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</Layout>
	)
}

export default AdminAccount;