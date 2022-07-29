import React, { useEffect, useState } from "react";
import styles from "./List.module.scss";
import cn from "classnames/bind";
import {
  Row,
  Col,
  Modal,
  Form,
  Input,
  Button,
  Spin,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const cx = cn.bind(styles);

const List = ({ data, type, loading }) => {
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [lesson, setLesson] = useState();
  const [form] = Form.useForm();
  const [isModalDelete, setIsModalDelete] = useState(false);
  const history = useHistory();

  useEffect(() => form.resetFields(), [lesson]);

  const onFinishEdit = async (values) => {
    setIsModalEdit(false);
  };

  const onFinishFailedEdit = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDelete = async () => {
    setIsModalDelete(false);
  };

  return (
    <div className={cx("list")}>
      <div className={cx("table")}>
        <Row className={cx("table-header")}>
          <Col span={1} style={{ textAlign: "center" }}>
            No.
          </Col>
          <Col span={1}></Col>
          <Col span={5}>Title</Col>
          <Col span={1}></Col>
          <Col span={6}>Chapter</Col>
          <Col span={6}></Col>
        </Row>
        {!loading ? (
          data?.map((item, id) => (
            <Row className={cx("table-body")} key={id}>
              <Col span={1} style={{ textAlign: "center" }}>
                {id + 1}
              </Col>
              <Col span={1}></Col>
              <Col span={5}>{item.title}</Col>
              <Col span={1}></Col>
              <Col span={6}>{item.chapter}</Col>
              <Col span={5}></Col>
              <Col span={4}>
                <div className={cx("group-button")}>
                  <div
                    className={cx("edit")}
                    onClick={() => {
                      setLesson(item);
                      setIsModalEdit(true);
                    }}
                  >
                    <EditOutlined />
                  </div>
                  <div
                    className={cx("delete")}
                    onClick={() => {
                      setLesson(item);
                      setIsModalDelete(true);
                    }}
                  >
                    <DeleteOutlined />
                  </div>
                  <div
                    className={cx("detail")}
                    onClick={() =>
                      history.push(
                        `/manage-grammar/${type === 0 ? "lesson" : "test"}/${
                          item.lessonId
                        }`
                      )
                    }
                  >
                    <RightOutlined />
                  </div>
                </div>
              </Col>
            </Row>
          ))
        ) : (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <Spin />
          </div>
        )}
      </div>
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
        >
          {" "}
          <Form.Item
            label="Lesson code"
            name="lessonCode"
            rules={[
              { required: true, message: "Please input your lesson code!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lesson name"
            name="name"
            rules={[
              { required: true, message: "Please input your lesson name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
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
        <div>Are you sure you want to delete this grammar?</div>
      </Modal>
    </div>
  );
};

export default List;
