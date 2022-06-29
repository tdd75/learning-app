import React, { useEffect, useState } from "react";
import styles from './VocabLessonDetail.module.scss';
import cn from 'classnames/bind';
import Layout from "../../../commons/Layout";
import { useHistory, useLocation } from "react-router-dom";
import Search from "../../../commons/Search/Search";
import axios from "axios";
import { URL } from "../../../consts";
import { Col, Row, Form, message, Input, Modal, Button, Spin } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
	RightOutlined
} from "@ant-design/icons";
import sound from "../../../images/sound.svg";
import { useParams } from "react-router-dom";

const cx = cn.bind(styles);

const VocabLessonDetail = () => { 

	// [tên, function]
	const [lessonDetail, setLessonDetail] = useState();
	const history = useHistory();
	const [word, setWord] = useState(); 
	const [form] = Form.useForm();
	const [isModalDelete, setIsModalDelete] = useState(false); 
	const [loading, setLoading] = useState(true);

	// hàm sẽ được gọi mỗi khi có gì đó ảnh hưởng đến components của bạn.
	useEffect(() => form.resetFields(), [word]);

	useEffect(() => {
		getLessonDetail();
	}, [word]); // only return when lessonInfo change 

	const getLessonDetail = async () => {
		setLoading(true);
		try {
			let res = await axios.get(`${URL}/user/vocal/topic?topicId=2`);
			if (res.status === 200) { 
				setLessonDetail(res.data.data.items);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
		}
	}

	const handleDelete = async () => {
		try {

			console.log('del id word '+ word._id)
			const token = window.localStorage.getItem("token-lingo-admin");
			const headers = { Authorization: `Bearer ${token}` };

			console.log('token barrier ', headers)
			const res = await axios.delete(`${URL}/admin/vocal?volId=${word._id}`, { headers });

			if (res.status === 200) {
				message.success("Delete successfully!");
				window.location.reload();
			}

		} catch (err) {
			console.log(err);
			message.error("Error!");
		}

		setIsModalDelete(false);
	};

	return (
		<Layout>
			<div className={cx("detail-page")}>
				 

				<div className={cx("create")} onClick={() => history.push(`/manage-vocab/add-vocab`)}>
					<PlusCircleOutlined /> Add new Vocabulary
				</div>

				<div className={cx("table")}>
					<Row className={cx("table-header")}>
						<Col span={2} style={{ textAlign: 'center' }}>No.</Col>
						<Col span={4}>Name</Col>
						<Col span={6}>Transcription</Col>
						<Col span={4}>Meaning</Col>
						<Col span={4}>Suggestion</Col>
						<Col span={4}></Col>
					</Row>
 
					{!loading ? lessonDetail?.map((item, id) => (
						
						
						<div key={id}>
							{
								!lessonDetail?.length && (<div style={{ padding: '20px', textAlign: 'center' }}>No data</div>)
							}

							

							<Row
								className={cx("table-body")}
							>
								<Col span={2} style={{ textAlign: 'center' }}>{id + 1}</Col>
								<Col span={4}>
									<span dangerouslySetInnerHTML={{ __html: item.keyword }} />
								</Col>
								<Col span={6}>
									<audio id={`audio${id}`} src={item.sound}>
									</audio>
									<img
										src={sound}
										alt="sound"
										style={{ cursor: 'pointer' }}
										onClick={() => {
											let x = document.getElementById(`audio${id}`);
											x.play();
										}}
									/>&nbsp; &nbsp;
									<span dangerouslySetInnerHTML={{ __html: item.transcription }} />
								</Col>
								<Col span={4}>
									<span dangerouslySetInnerHTML={{ __html: item.shortDesc }} />
								</Col>
								<Col span={4}>
									<span dangerouslySetInnerHTML={{ __html: item.suggest }} />
								</Col>
								<Col span={4}>
									<div className={cx("group-button")}>
										<div
											className={cx("edit")}
											onClick={() => {
												setWord(item)
												history.push({
													pathname: `/manage-vocab/${item.topic}/edit-vocab`,
													state: {word: item}
												})
											}}>
											<EditOutlined /> Edit
										</div>
										<div
											className={cx("delete")}
											onClick={() => {
												setWord(item)
												setIsModalDelete(true)
											}}
										><DeleteOutlined /> Delete</div>
									</div>
								</Col>
							</Row>
						</div>
					)) : (
						<div style={{ padding: '20px', textAlign: 'center' }}>
							<Spin />
						</div>
					)}
				</div>
			</div>

			<Modal
				title="Delete lesson"
				visible={isModalDelete}
				onCancel={() => setIsModalDelete(false)}
				okText="Delete"
				onOk={handleDelete}
				width={320}
			>
				<div>Are you sure you want to delete this word?</div>
			</Modal>
		</Layout>
	)
}

export default VocabLessonDetail;