import React, { useEffect, useState } from 'react';
import styles from '../Vocab/AddVocab/AddVocab.module.scss';
import cn from 'classnames/bind';
import Layout from '../../commons/Layout';
import { Col, Row, Form, message, Input, Modal, Button, Spin } from "antd";
import { URL } from '../../consts';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const cx = cn.bind(styles);

const AddGrammarTest = () => {
	const history = useHistory(); 
	const [formData, setFormData] = useState({

		"task": "", 
		// listAnswer: ['','','',''],
		choiseA :"",
		choiseB :"",
		choiseC :"",
		choiseD :"",

		"trueAnswer": "", 
		"comment": "",
		"topic": "" ,
		"level" :1,

	});

 
	const handleAddLesson = async () => {
		console.log("formData input ", formData);

		let req = {
			"task": formData.task, 
			listAnswer: [formData.choiseA,formData.choiseB,formData.choiseC,formData.choiseD],

			"trueAnswer": formData.trueAnswer ,
			"comment": formData.comment,
			"topic": formData.topic ,
			"level" :formData.level

		}

		console.log("convert ", req)
		try {

			const token = window.localStorage.getItem("token-lingo-admin");
			const headers = { Authorization: `Bearer ${token}` };
			const res = await axios.post(`${URL}/admin/auth/grammar-task`, req, { headers });
			if (res.status === 200) {
				console.log(res);
				message.success("create  successfully!");  
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Layout>
			<div className={cx("addVocab")}>
				<div className={cx("container")}>
					<div className={cx("pageTitle")}>Add sentence</div>
					<div className={cx("body")}>
						<div className={cx("left")}>
							<div className={cx("oneField")}>
								<div className={cx("title")}>Question</div>
								<input
									placeholder='e.g. Choose the sentence with the right word order'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, task: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Answer A</div>
								<input
									placeholder='e.g. Wolfgang Amadeus Mozart was in 1756 in Salzburg born.'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, choiseA : e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Answer B</div>
								<input
									placeholder='e.g. Wolfgang Amadeus Mozart was born in Salzburg in 1756.'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, choiseB : e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Answer C</div>
								<input
									placeholder='e.g. Wolfgang Amadeus Mozart was born in 1756 in Salzburg.'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, choiseC : e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Answer D</div>
								<input
									placeholder='e.g. Wolfgang Amadeus Mozart in 1756 in Salzburg was born.'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, choiseD : e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Right Answer</div>
								<input
									placeholder='e.g. 3'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, trueAnswer : e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Comment</div>
								<div className={cx("description")}>Explain the answer</div>
								<textarea
									placeholder='e.g. There is a certain word order in statements: Subject - Auxiliary - Predicate - Object. When we need to mention information about time and place'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
									rows={6}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Topic</div>
								<input
									placeholder='present term'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, topic : e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Level</div>
								<input
									placeholder='1'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, level : e.target.value })}
								/>
							</div>
						</div>
					</div>

					<div
						className={cx("button")}
						onClick={handleAddLesson}
					>
						ADD SENTENCE
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default AddGrammarTest;