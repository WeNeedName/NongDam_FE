import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAccountListDB, getYearMonthDB } from "../../redux/modules/account";

export default function Toolbar(props) {
  const dispatch = useDispatch();

  const { date } = props;
  console.log(props);

  const navigate = (action) => {
    props.onNavigate(action);
  };
  const month = moment(date).format("MM");
  const year = moment(date).format("YYYY");
  const YYMM = { month: month, year: year };

  useEffect(() => {
    dispatch(getAccountListDB(YYMM));
    dispatch(getYearMonthDB(YYMM));
  }, [dispatch]);

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        {/* <button type="button" onClick={navigate.bind(null, "TODAY")}>
          이번달
        </button> */}
        <button type="button" onClick={navigate.bind(null, "PREV")}>
          이전
        </button>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</span>
        <button type="button" onClick={navigate.bind(null, "NEXT")}>
          다음
        </button>
      </span>
    </div>
  );
}
