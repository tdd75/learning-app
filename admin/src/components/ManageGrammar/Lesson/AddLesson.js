import React, { useEffect, useState } from 'react';
import styles from '../../Vocab/AddVocab/AddVocab.module.scss';
import cn from 'classnames/bind';
import Layout from '../../../commons/Layout';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const cx = cn.bind(styles);

const AddGrammar = () => {
	const history = useHistory();
	const { id } = useParams();
	const [formData, setFormData] = useState({
		"id": "",
		"order": "",
		"name": "",
		"lessonCode": "",
		"lessonId": "",
		"imageUrl": "",
		"audioUrl": ""
	});

	const [loading, setLoading] = useState({ image: false, audio: false });
	const [lessonInfo, setLessonInfo] = useState();

	useEffect(() => {
		getLessonById();
	}, [id]);

	const getLessonById = async () => {
	}

	const handleAddLesson = async () => {
		
	}

	const handleUploadImage = async (e) => {
		setLoading({ ...loading, image: true });
	};

	const handleUploadAudio = async (e) => {
		setLoading({ ...loading, audio: true });
	};

	return (
		<Layout>
			<div className={cx("addVocab")}>
				<div className={cx("container")}>
					<div className={cx("pageTitle")}>Add grammar lesson</div>
					<div className={cx("body")}>
						<div className={cx("left")}>
							<div className={cx("oneField")}>
								<div className={cx("title")}>Name</div>
								<input
									placeholder='e.g. UUEGi 1-0 Overview'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Lesson order</div>
								<input
									placeholder='e.g ueg_ca_01_000'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, order: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add image</div>
								{loading.image && <Spin />} &nbsp;&nbsp;
								<input type="file" onChange={handleUploadImage} accept="image/*" />
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add audio</div>
								{loading.audio && <Spin />}  &nbsp;&nbsp;
								<input type="file" onChange={handleUploadAudio} accept="audio/*" />
							</div>

						</div>
					</div>

					<div
						className={cx("button")}
						onClick={handleAddLesson}
					>
						ADD GRAMMAR LESSON
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default AddGrammar;