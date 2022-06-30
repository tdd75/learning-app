import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import { Col, Pagination, Row } from "antd";
import List from "./List";
import Search from "../../commons/Search/Search";
import { getAllGrammarWithPaginationAndKeyword } from "../../service/AdminService";


const cx = cn.bind(styles);


const Grammar = () => {
	const [listGrammar, setListGrammar] = useState([]);
	const [offset, setOffset] = useState(1);
	const [total, setTotal] = useState(0);
	const [listTestGrammar, setListTestGrammar] = useState();

	useEffect(() => {
		getAllGrammarWithPaginationAndKeyword(undefined, offset, undefined).then(
			res => {
				setListGrammar(res?.data?.data?.items);
				setTotal(res?.data?.data?.totalItems);
			}
		)
		
	}, [offset]);
	const handleChangePaginate = (current) => {
		setOffset(current);
	}
	return (
		<Layout>
			<div className={cx("grammar")}>
				<div className={cx("grammar-top")}>
					<div className={cx("title")}>
					</div>
					<Search />
				</div>
				<div className={cx("list")}>
					<div className={cx("oneSite")}>
						<List
							title="Grammars"
							data={listGrammar}
							type={0}
						/>
					</div>
				</div>
				<div className={cx("paginate")}>
					<Pagination defaultCurrent={offset} total={total} showSizeChanger={false} onChange={handleChangePaginate}/>
				</div>
				
			</div>
		</Layout>
	)
}

export default Grammar;