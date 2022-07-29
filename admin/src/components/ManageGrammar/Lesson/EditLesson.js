import React, { useEffect, useState } from 'react';
import styles from '../../Vocab/AddVocab/AddVocab.module.scss';
import cn from 'classnames/bind';
import Layout from '../../../commons/Layout';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const cx = cn.bind(styles);

const EditGrammarLesson = () => {
	const history = useHistory();
	const { id } = useParams();
	const location = useLocation();
	const lesson = location.state.lesson;

	const [formData, setFormData] = useState({
		"id": lesson.id,
		"name": lesson.name,
		"order": lesson.order,
		"imageUrl": lesson.imageUrl,
		"audioUrl": lesson.audioUrl,
		"lessonCode": lesson.lessonCode,
		"lessonId": lesson.lessonId,
	});

	const [loading, setLoading] = useState({ image: false, audio: false });
	const [lessonInfo, setLessonInfo] = useState();

	useEffect(() => {
		getLessonById();
	}, [id]);

	const getLessonById = async () => {
		
	}

	const handleEditLesson = async () => {
		
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
					<div className={cx("pageTitle")}>Edit grammar lesson</div>
					<div className={cx("body")}>
						<div className={cx("left")}>
							<div className={cx("oneField")}>
								<div className={cx("title")}>Name</div>
								<input
									defaultValue={lesson.name}
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Lesson order</div>
								<input
									defaultValue={lesson.order}
									placeholder='e.g ueg_ca_01_000'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, order: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add image</div>
								<input type="file" onChange={handleUploadImage} accept="image/*" />
								<div>
									{loading.image ? <Spin style={{ marginTop: '20px' }} /> : (
										<img src={formData.imageUrl} alt="vocab" width={80} className={cx("box-img")} />
									)}
								</div>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add audio</div>
								<input type="file" onChange={handleUploadAudio} accept="audio/*" />
								<div style={{ marginTop: '20px' }}>
									{loading.audio ? <Spin /> : (
										<audio controls src={formData.audioUrl}>
										</audio>
									)}
								</div>
							</div>

						</div>
					</div>

					<div style={{ marginTop: '30px' }}>
						<span
							className={cx("button")}
							onClick={handleEditLesson}
						>
							EDIT GRAMMAR LESSON
						</span>
						&nbsp; &nbsp;
						<span
							className={cx("button")}
							style={{ background: "#000000" }}
							onClick={() => history.push(`/manage-grammar/lesson/${id}`)}
						>
							CANCEL
						</span>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default EditGrammarLesson;