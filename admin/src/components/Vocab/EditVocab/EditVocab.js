import React, { useEffect, useState } from 'react';
import styles from './EditVocab.module.scss';
import cn from 'classnames/bind';
import Layout from '../../../commons/Layout';
import { Row, Input, Card, Spin } from 'antd';
import { URL } from '../../../consts';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const cx = cn.bind(styles);

const EditVocab = () => {

	const history = useHistory();
	const location = useLocation(); 
	const [loading, setLoading] = useState({ image: false, audio: false }); 
	const word = location.state.word;

	console.log("lay ra word tu local state",word)

	const [formData, setFormData] = useState({
		"id": word._id,
		"keyword": word.keyword,
		"suggest": word.suggest,
		"transcription": word.transcription,
		"shortDesc": word.shortDesc,
		"fullVietnamese": word.fullVietnamese,
		"explanation": word.explanation,
		"image": word.image,
		"audio": word.audio, 
		"topic": word.topic,
	});

	const handleEditVocab = async () => {
		console.log("formData", formData);
		try {

			const token = window.localStorage.getItem("token-lingo-admin");
			const headers = { Authorization: `Bearer ${token}` };

			const res = await axios.put(`${URL}/admin/vocal?volId=${formData.id}`, formData, { headers });
			if (res.status === 200) {
				console.log(res);
				history.push(`/manage-vocab/show`);
				// window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	}

	const handleUploadImage = async (e) => {
		setLoading({ ...loading, image: true });

		let url = `${URL}/admin/upload`;	
		let file = e.target.files[0];

		let form = new FormData();
		form.append("file", file);

		const token = window.localStorage.getItem("token-lingo-admin");
			const headers = { Authorization: `Bearer ${token}` };

		axios.post(url, form, {
			headers
		}).then((response) => {

			console.log('push anh nhe ', response);
			setFormData({ ...formData, imageUrl: response.data.cdn_url });
			setLoading({ ...loading, image: false });

		}).catch((error) => {
			console.log(error);
		});
	};

	const handleUploadAudio = async (e) => {
		setLoading({ ...loading, audio: true });

		let url = `${URL}/admin/upload-sound`;
		let file = e.target.files[0];

		let form = new FormData();
		form.append("file", file);

		const token = window.localStorage.getItem("token-lingo-admin");
			const headers = { Authorization: `Bearer ${token}` };

		axios.post(url, form, {
			headers
		}).then((response) => {
			console.log(response);
			setFormData({ ...formData, audioUrl: response.data.cdn_url });
			setLoading({ ...loading, audio: false });
		}).catch((error) => {
			console.log(error);
		});
 
	};

	return (
		<Layout>
			<div className={cx("editVocab")}>
				<div className={cx("container")}>
					<div className={cx("pageTitle")}>Edit vocabulary</div>
					<div className={cx("body")}>
						<div className={cx("left")}>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Name</div>
								<input
									defaultValue={word.keyword}
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Transcription</div>
								<input
									defaultValue={word.transcription}
									placeholder='e.g /tekˈnɒlədʒi/'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, transcription: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Meaning</div>
								<input
									defaultValue={word.shortDesc}
									placeholder='e.g. Công nghệ'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Full meaning</div>
								<div className={cx("description")}>Fully explain the meaning of the word by Vietnamese</div>
								<textarea
									defaultValue={word.fullVietnamese}
									placeholder='e.g.Công nghệ'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, fullVietnamese: e.target.value })}
									rows={10}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Suggestion</div>
								<div className={cx("description")}>
									Help learners guess words during flashcard learning
								</div>
								<input
									defaultValue={word.suggest}
									placeholder='e.g. T_ _h_ ol_ _y'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, suggest: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Explanation</div>
								<div className={cx("description")}>
									Explain the meaning of words by English and example sentences
								</div>
								<textarea
									defaultValue={word.explanation}
									placeholder='e.g. Scientific knowledge used in practical ways in industry, for example in designing new machines'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
									rows={4}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add image</div>
								<div className={cx("description")}>
									Image make it easier for learners to remember vocabulary
								</div>
								<input
									type="file"
									onChange={handleUploadImage}
									accept="image/*"
								/>
								<div>
									{loading.image ? <Spin style={{ marginTop: '20px' }} /> : (
										<img src={formData.image} alt="vocab" width={80} className={cx("box-img")} />
									)}
								</div>
							</div>


							<div className={cx("oneField")}>
								<div className={cx("title")}>Add audio</div>
								<input
									type="file"
									onChange={handleUploadAudio}
									accept="audio/*"
								/>
								<div style={{ marginTop: '20px' }}>
									{loading.audio ? <Spin /> : (
									<audio controls src={formData.audio}>
									</audio>
								)}
								</div>
							</div>

						</div>
					</div>

					<br /><br />
					<span
						className={cx("button")}
						onClick={handleEditVocab}
					>
						EDIT VOCABULARY
					</span> &nbsp; &nbsp;
					<span
						className={cx("button")}
						style={{ background: "#000000" }}
						onClick={() => history.push(`/manage-vocab/show`)}
					>
						CANCEL
					</span>
				</div>
			</div>
			<br /><br />
		</Layout>
	)
}

export default EditVocab;