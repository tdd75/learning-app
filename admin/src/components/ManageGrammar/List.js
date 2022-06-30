import React, { useEffect, useState } from "react";
import styles from './List.module.scss';
import cn from 'classnames/bind';
import { Row, Col, Modal, Select, Form, Input, Button, message } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
	RightOutlined
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const cx = cn.bind(styles);

const List = ({ data, title, type }) => {
	const [isModalCreate, setIsModalCreate] = useState(false);
	const [isModalEdit, setIsModalEdit] = useState(false);
	const [lesson, setLesson] = useState();
	const [form] = Form.useForm();
	const [isModalDelete, setIsModalDelete] = useState(false);
	const history = useHistory();

	useEffect(() => form.resetFields(), [lesson]);

	const handleCancel = () => {
		setIsModalCreate(false);
	};

	const onFinishCreate = async (values) => {
		
		setIsModalCreate(false);
	};

	const onFinishFailedCreate = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const onFinishEdit = async (values) => {
		
		setIsModalEdit(false);
	};

	const onFinishFailedEdit = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const handleDelete = async () => {

		setIsModalDelete(false);
	};

	return (
		<div className={cx("list")}>
			<div className={cx("top")}>
				<div className={cx("title")}>{title}</div>
				<div className={cx("create")} onClick={() => setIsModalCreate(true)}>
					<PlusCircleOutlined /> Add
				</div>
			</div>
			<div className={cx("table")}>
				<Row className={cx("table-header")}>
					<Col span={1} style={{ textAlign: 'center' }}>
						No.
					</Col>
					<Col span={1}></Col>
					<Col span={8}>
						Title
					</Col>
					<Col span={2}></Col>
					<Col span={3}>Lesson code</Col>
					<Col span={1}></Col>
					<Col span={8}></Col>
				</Row>
				{data?.map((item, id) => (
					<Row
						className={cx("table-body")}
						key={id}
					>
						<Col span={1} style={{ textAlign: 'center' }}>
							{id + 1}
						</Col>
						<Col span={1}></Col>
						<Col span={8}>
							{item.name}
						</Col>
						<Col span={2}></Col>
						<Col span={3}>{item.lessonCode}</Col>
						<Col span={1}></Col>
						<Col span={8}>
							<div className={cx("group-button")}>
								<div
									className={cx("edit")}
									onClick={() => {
										setLesson(item)
										setIsModalEdit(true)
									}}>
									<EditOutlined />
								</div>
								<div
									className={cx("delete")}
									onClick={() => {
										setLesson(item)
										setIsModalDelete(true)
									}}
								><DeleteOutlined />
								</div>
								<div 
								className={cx("detail")}
								onClick={() => history.push(`/manage-grammar/${type === 0 ? "lesson" : "test"}/${item.lessonId}`)}
								><RightOutlined /></div>
							</div>
						</Col>
					</Row>
				))}
			</div>
			<Modal
				title="Create new lesson"
				visible={isModalCreate}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					form={form}
					name="create-from"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					onFinish={onFinishCreate}
					onFinishFailed={onFinishFailedCreate}
					autoComplete="off"
				>
					<Form.Item
						label="Lesson code"
						name="lessonCode"
						rules={[{ required: true, message: 'Please input your lesson code!' }]}
					>
						<Input placeholder="e.g. VOCAB_01" />
					</Form.Item>
					<Form.Item
						label="Lesson name"
						name="name"
						rules={[{ required: true, message: 'Please input your lesson name!' }]}
					>
						<Input placeholder="e.g. Bài 1" />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
							Create
						</Button>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Edit lesson"
				visible={isModalEdit}
				onCancel={() => setIsModalEdit(false)}
				footer={null}
			>
				<Form
					form={form}
					name="Edit form"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ lessonCode: lesson?.lessonCode, name: lesson?.name }}
					onFinish={onFinishEdit}
					onFinishFailed={onFinishFailedEdit}
				> {console.log("lesson", lesson)}
					<Form.Item
						label="Lesson code"
						name="lessonCode"
						rules={[{ required: true, message: 'Please input your lesson code!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Lesson name"
						name="name"
						rules={[{ required: true, message: 'Please input your lesson name!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
							Save
						</Button>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Delete lesson"
				visible={isModalDelete}
				onCancel={() => setIsModalDelete(false)}
				okText="Delete"
				onOk={handleDelete}
				width={320}
			>
				<div>Are you sure you want to delete this lesson?</div>
			</Modal>
		</div>
	)
}

export default List;