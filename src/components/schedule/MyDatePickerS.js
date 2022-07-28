import react from "react";

import styled from "styled-components";
import DatePicker from "react-datepicker";
import "../../react-datepickerSchedule.css";
import { ko } from "date-fns/esm/locale";
import moment, { months } from "moment";

const MyDatePickerS = ({ setStartDate, startDate }) => {
  return (
    <Container>
      <div className="containerDatePicker">
        <DatePicker
          className="startDatePicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="yyyy.MM.dd HH:mm" // 시간 포맷 변경
          locale={ko}
          // dayClassName={(d) =>
          //   d.getDate() === startDate.getDate()
          //     ? "custom-day selected-day"
          //     : d.getMonth() === months
          //     ? "custom-day"
          //     : "custom-day gray-day"
          // }
        />
      </div>
    </Container>
  );
};
// const MyDatePicker = styled(DatePicker)`
//   width: 90%;
//   height: 3rem;
//   font-size: 1.6rem;
//   font-weight: bold;
//   background-color: pink;
//   color: white;
//   border: 1px solid;
// `;

const Container = styled.div`
  //   .react-datepicker {
  //     font-size: 11px;
  //   }
  //   .react-datepicker__header {
  //     padding-top: 5%;
  //   }
  //   .react-datepicker__time-header {
  //     padding-top: 5%;
  //   }
  //   .react-datepicker__month {
  //     margin: 0.4em 1em;
  //   }
  //   .react-datepicker__day-name,
  //   .react-datepicker__day {
  //     width: 1.9em;
  //     line-height: 1.9em;
  //     margin: 0.166em;
  //   }
  //   .react-datepicker__current-month {
  //     font-size: 1em;
  //   }
  //   .react-datepicker__navigation {
  //     top: 1em;
  //     line-height: 1.7em;
  //     border: 0.45em solid transparent;
  //   }
  //   .react-datepicker__navigation--previous {
  //     border-right-color: #ccc;
  //     left: 1em;
  //   }
  //   .react-datepicker__navigation--next {
  //     border-left-color: #ccc;
  //     right: 1em;
  //   }
`;

export default MyDatePickerS;
