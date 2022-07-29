import React from "react";
import styles from './List.module.scss';
import cn from 'classnames/bind';
import { Row, Col } from "antd";

const cx = cn.bind(styles);

const List = ({ data }) => {
	return (
		<div className={cx("list")}>
			<div className={cx("top")}>
			</div>
			<div className={cx("table")}>
				<Row className={cx("table-header")}>
					<Col span={2} style={{ textAlign: 'center' }}>
						No.
					</Col>
					<Col span={1}></Col>
					<Col span={4}>
						UserId
					</Col>
					<Col span={1}></Col>
					<Col span={4}>
						Username
					</Col>
					<Col span={5}>Email</Col>
					<Col span={1}></Col>
					<Col span={2}>FirstName</Col>
					<Col span={2}>LastName</Col>
				</Row>
				{data?.map((item, id) => (
					<Row
						className={cx("table-body")}
						key={id}
					>
						<Col span={2} style={{ textAlign: 'center' }}>
							{id + 1}
						</Col>
						<Col span={1}></Col>
						<Col span={4}>
							{item._id}
						</Col>
						<Col span={1}></Col>
						<Col span={4}>
							{item.username}
						</Col>
						<Col span={5}>{item.email}</Col>
						<Col span={1}></Col>
						<Col span={2}>
							{item.firstName}
						</Col>
                        <Col span={2}>
							{item.lastName}
						</Col>
					</Row>
				))}
			</div>
		</div>
	)
}

export default List;