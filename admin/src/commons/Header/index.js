import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import logo from '../../images/logo_bgr.png';
import { useHistory, useLocation } from "react-router-dom";
import { getAdminProfile, logout } from "../../service/AdminService";
import { UserOutlined } from "@ant-design/icons";

const cx = cn.bind(styles);

const Header = () => {
	const location = useLocation();
	const [user, setUser] = useState({});
	const token = window.localStorage.getItem("token-lingo-admin");
	const history = useHistory();

	useEffect(() => {
		if(token !== null){
			getAdminProfile().then(res => {
				setUser(res?.data?.data);
			}).catch((err) => {
				console.log(err);
			});
		}
	}, [token])

	const handleBtnProfile = () => {
		logout();
		history.push('/login');
	}
	return (
		<div className={cx("header")}>
			<div className={cx("top")}>
				<img src={logo} alt="logo" width={100} onClick={() => history.push("/")}/>
				{token === null
				? (<></>)
				: (<div className={cx("btn-profile")} onClick={handleBtnProfile}><UserOutlined className={cx("user-icon")}/>{user?.username}</div>)}
			</div>
			{location.pathname === "/login" || !token ? (<></>) : (
				<div className={cx("container")}>
					<div className={cx("content")}>
						<div className={cx("title")}>Learn4U Admin Page</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Header;