import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import { Pagination } from "antd";
import List from "./List";
import { getAllGrammarWithPaginationAndKeyword } from "../../service/AdminService";
import searchIcon from "../../images/searchIcon.svg";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const cx = cn.bind(styles);

const Grammar = () => {
  const history = useHistory();
  const [listGrammar, setListGrammar] = useState([]);
  const [offset, setOffset] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState();
  const [searchKey, setSearchKey] = useState();

  useEffect(() => {
    setLoading(true);
    getAllGrammarWithPaginationAndKeyword(undefined, offset, undefined).then(
      (res) => {
        setListGrammar(res?.data?.data?.items);
        setTotal(res?.data?.data?.totalItems);
        setLoading(false);
      }
    );
  }, [offset]);
  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      getAllGrammarWithPaginationAndKeyword(undefined, undefined, searchKey)
        .then((res) => {
          setListGrammar(res?.data?.data?.items);
          setTotal(res?.data?.data?.totalItems);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const search = async () => {
    getAllGrammarWithPaginationAndKeyword(undefined, undefined, searchKey)
      .then((res) => {
        setListGrammar(res?.data?.data?.items);
        setTotal(res?.data?.data?.totalItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangePaginate = (current) => {
    setOffset(current);
  };
  return (
    <Layout>
      <div className={cx("grammar")}>
        <div className={cx("grammar-top")}>
          <div className={cx("title")}></div>
          <div className={cx("search")}>
            <input
              placeholder="Search ..."
              className={cx("input")}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyUp={(e) => handleSearch(e)}
            />
            <div className={cx("button")} onClick={search}>
              <img src={searchIcon} alt="search" />
            </div>
          </div>
        </div>
        <div className={cx("wrapper")}>
          <div className={cx("list")}>
            <div className={cx("oneSite")}>
              <div
                className={cx("create")}
                onClick={() => history.push(`/manage-vocab/add-vocab`)}
              >
                <PlusCircleOutlined /> Add Grammar
              </div>

              <List data={listGrammar} type={0} loading={loading} />
            </div>
          </div>
          <div className={cx("paginate")}>
            {!loading ? (
              <Pagination
                current={offset}
                total={total}
                showSizeChanger={false}
                onChange={handleChangePaginate}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Grammar;
