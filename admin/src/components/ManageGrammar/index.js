import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from "antd";
import List from "./List";
import Search from "../../commons/Search/Search";


const cx = cn.bind(styles);


const Grammar = () => {
	const [listGrammar, setListGrammar] = useState();
	const [listTestGrammar, setListTestGrammar] = useState();

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		
	}

	return (
		<Layout>
			<div className={cx("grammar")}>
				<div className={cx("grammar-top")}>
					<div className={cx("title")}>
						Grammar
					</div>
					<Search />
				</div>
				<div className={cx("list")}>
					<div className={cx("oneSite")}>
						<List
							title="Lessons"
							data={listGrammar}
							type={0}
						/>
					</div>
					<div className={cx("oneSite")}>
						<List
							title="Tasks"
							data={listTestGrammar}
							type={1}
						/>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Grammar;