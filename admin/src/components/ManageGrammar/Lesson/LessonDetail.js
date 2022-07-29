import React, { useEffect, useState } from "react";
import styles from '../../Vocab/VocabLessonDetail/VocabLessonDetail.module.scss';
import cn from 'classnames/bind';
import Layout from "../../../commons/Layout";
import { useHistory, useLocation } from "react-router-dom";
import Search from "../../../commons/Search/Search";

import { Col, Row, Form, message, Input, Modal, Button, Spin } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

const cx = cn.bind(styles);

const GrammarLessonDetail = () => {
	const location = useLocation();
	const [lessonDetail, setLessonDetail] = useState();
	const history = useHistory();
	const [word, setWord] = useState();
	const [isModalCreate, setIsModalCreate] = useState(false);
	const [isModalEdit, setIsModalEdit] = useState(false);
	const [form] = Form.useForm();
	const [isModalDelete, setIsModalDelete] = useState(false);
	const [lessonInfo, setLessonInfo] = useState();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);

	useEffect(() => form.resetFields(), [word]);

	useEffect(() => {
		getLessonById();
	}, [id]);

	useEffect(() => {
		getLessonDetail();
	}, [lessonInfo]);

	const getLessonById = async () => {
		
	}

	const getLessonDetail = async () => {
		setLoading(true);
	}

	const handleDelete = async () => {
		setIsModalDelete(false);
	};

	return (
		<Layout>
			<div className={cx("detail-page")}>
				<div className={cx("top")}>
					<div className={cx("title")}>{lessonInfo?.name}</div>
					<Search />
				</div>

				<div className={cx("create")} onClick={() => history.push(`/manage-grammar/lesson/${id}/add-lesson`)}>
					<PlusCircleOutlined /> Add lesson
				</div>

				<div className={cx("table")}>
					<Row className={cx("table-header")}>
						<Col span={1}>No.</Col>
						<Col span={7}>Name</Col>
						<Col span={8}>Audio</Col>
						<Col span={4}>Lesson order</Col>
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
								<Col span={1}>{id + 1}</Col>
								<Col span={7}>
									<span dangerouslySetInnerHTML={{ __html: item.name }} />
								</Col>
								<Col span={8}>
									<audio controls src={item.audioUrl}>
									</audio>
								</Col>
								<Col span={4}>
									{item.order}
								</Col>
								<Col span={4}>
									<div className={cx("group-button")}>
										<div
											className={cx("edit")}
											onClick={() => {
												setWord(item)
												history.push({
													pathname: `/manage-grammar/lesson/${item.lessonId}/edit-lesson`,
													state: {lesson: item}
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
				width={360}
			>
				<div>Are you sure you want to delete this lesson?</div>
			</Modal>
		</Layout>
	)
}

export default GrammarLessonDetail;