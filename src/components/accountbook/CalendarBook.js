import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getAccountListDB, getYearMonthDB } from "../../redux/modules/account";

// 달력 라이브러리
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../BigCalendar.css";

// 컴포넌트
import ToolBar from "./ToolBar";
import Day from "./Day";
import Event from "./Event";
import AccountModal from "./AccountModal";
import EventModal from "./EventModal";

const CalendarBook = () => {
  const dispatch = useDispatch();
  const [eventInfo, setEventInfo] = useState(null);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [eventDate, setEventDate] = useState([]);

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const accountList = useSelector((state) => state.account.accountList);
  const yearMonth = useSelector((state) => state.account.yearMonth);

  useEffect(() => {
    dispatch(getAccountListDB(yearMonth));
  }, [dispatch]);

  // 장부내역 상세 모달 열기
  const [isOpen, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!isOpen);
  }

  function PriceSum(arr) {
    arr.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  }

  // 같은 날짜 && 수입 내역만 필터링
  const filterAccountList = accountList.filter(
    (v, idx, arr) => v.category === "수입"
  );

  // console.log(filterAccountList);

  // console.log(
  //   filterAccountList[0].filter(
  //     (v, idx) => filterAccountList[0].indexOf(v.date) === idx
  //   )
  // );
  function flatten(arr) {
    const result = [];
    arr.forEach((i) => {
      if (Array.isArray(i)) {
        result.push(...flatten(i));
      } else {
        result.push(i);
      }
    });
    return result;
  }
  console.log(filterAccountList);

  // let result = array.reduce((ac, v) => ac.includes(v) ? ac : [...ac, v], []);

  // let copy = [];
  // flatten(filterAccountList).forEach((account) => {
  //   if (!copy.includes(account.date)) copy.push(account);
  //   // console.log(!copy.includes(item.date));
  // });

  // let copy = new Map();
  // flatten(filterAccountList).forEach((account) => {
  //   if (copy.has(account.date)) {
  //     copy.set(account.date, copy.get(account.date) + account.price);
  //   } else copy.set(account.date, account.price);
  // });
  // console.log(copy);

  // copy = new Map();
  // copy.set("date", copy.date);
  // console.log(copy);

  const list = [
    {
      date: "2022-07-14",
      price: [100000, 3000],
      id: [1, 2],
      type: [3, 4],
      memo: ["", "복숭아 판매"],
      category: "수입",
    },
    {
      date: "2022-07-12",
      price: [80000, 2000],
      id: [3, 4],
      type: [0, 2],
      memo: ["메모 내용", "메모 내용"],
      category: "지출",
    },
    {
      date: "2022-07-12",
      price: [80000, 3000],
      id: [3, 4],
      type: [0, 2],
      memo: ["메모 내용", "메모 내용"],
      category: "수입",
    },
  ];
  const convertCalendarData=(datas)=>{
    let mappedData = new Map();
      datas.map(data=>{
        let original;
        let insertData = [];
        if(mappedData.has(data.date))
          original = mappedData.get(data.date);
        else
          original = [0,0];
        if(data.type < 3){
          insertData.push(original[0]+data.price);
          insertData.push(original[1]);
        }else{
          insertData.push(original[0]);
          insertData.push(original[1]+data.price);
        }
        mappedData.set(data.date,insertData);
      });
    let convertedData = [];
      Array.from(mappedData.keys()).map(key=>{
        const value = mappedData.get(key);
        if(value[0] > 0){
          convertedData.push({
            title:
                "+" + String(value[0]).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"),
            allDay: false,
            start: new Date(key),
            end: new Date(key),
          });
        }
        if(value[1] > 0){
          convertedData.push({
            title:
                "-" + String(value[1]).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"),
            allDay: false,
            start: new Date(key),
            end: new Date(key),
          });
        }
      });
      console.log(convertedData)
      return convertedData;
  }
  // flatten(accountList).forEach((account) => {
  //   if (!list.includes(account)) copy.push(account);
  //   // console.log(!copy.includes(item.date));
  // });

  return (
    <>
      <Calendar
          events={convertCalendarData(accountList)}
        // events={accountList.map((list, id) => {
        //   // 같은 날짜인 내역만 필터링
        //   const filteredList =
        //     accountList && accountList.filter((v) => v.date === list.date);
        //   console.log(filteredList);
        //
        //   // const filteredSliceList = filteredList[0].map((list) => {
        //   //   return console.log(list);
        //   // });
        //
        //   // 같은 날짜의 수입 총합
        //   const filteredIncome = filteredList.filter(
        //     (v) => v.category === "수입"
        //   );
        //   const filteredIncomePrice = filteredIncome.map((v) => {
        //     return v.price;
        //   });
        //   const IncomeSum = filteredIncomePrice.reduce((acc, cur) => {
        //     return acc + cur;
        //   }, 0);
        //
        //   // 같은 날짜의 지출 총합
        //   const filtereExpense = filteredList.filter(
        //     (v) => v.category === "지출"
        //   );
        //   const filteredExpensePrice = filtereExpense.map((v) => {
        //     return v.price;
        //   });
        //   const ExpenseSum = filteredExpensePrice.reduce((acc, cur) => {
        //     return acc + cur;
        //   }, 0);
        //   // console.log(filteredList);
        //   // let copy = [];
        //   // list.forEach((item) => {
        //   //   if (!copy.includes(item.date)) copy.push(item);
        //   // });
        //   // console.log(copy);
        //
        //   return {
        //     title:
        //       list.category === "수입"
        //         ? "+" +
        //           String(IncomeSum).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
        //         : list.category === "지출"
        //         ? "-" +
        //           String(ExpenseSum).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
        //         : null,
        //     allDay: false,
        //     start: new Date(list.date),
        //     end: new Date(list.date),
        //   };
        // })}
        localizer={localizer}
        style={{ height: 100 + "%", width: 100 + "%" }}
        components={{
          toolbar: ToolBar,
          month: {
            dateHeader: Day,
          },
        }}
        onSelectEvent={(eventInfo) => {
          setEventInfo(eventInfo);
          toggleModal();
        }}
        eventPropGetter={Event}
      />
      {isOpen && (
        <EventModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          eventInfo={eventInfo}
          accountList={accountList}
        />
      )}
    </>
  );
};

export default CalendarBook;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useDispatch, useSelector } from "react-redux";
// import { getAccountListDB, getYearMonthDB } from "../../redux/modules/account";

// // 달력 라이브러리
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "../../BigCalendar.css";

// // 컴포넌트
// import ToolBar from "./ToolBar";
// import Day from "./Day";
// import Event from "./Event";
// import AccountModal from "./AccountModal";
// import EventModal from "./EventModal";

// const CalendarBook = () => {
//   const dispatch = useDispatch();
//   const [eventInfo, setEventInfo] = useState(null);
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);

//   moment.locale("ko-KR");
//   const localizer = momentLocalizer(moment);

//   const accountList = useSelector((state) => state.account.accountList);
//   const yearMonth = useSelector((state) => state.account.yearMonth);

//   useEffect(() => {
//     dispatch(getAccountListDB(yearMonth));
//   }, [dispatch]);

//   // 장부내역 상세 모달 열기
//   const [isOpen, setOpen] = useState(false);

//   function toggleModal() {
//     setOpen(!isOpen);
//   }

//   // 월 전체내역 수입 총합
//   // const filteredIncome =
//   //   accountList && accountList.filter((v) => v.category === "수입");
//   // const filteredIncomePrice =
//   //   filteredIncome &&
//   //   filteredIncome.map((v) => {
//   //     return v.price;
//   //   });
//   // const IncomeSum = filteredIncomePrice.reduce((acc, cur) => {
//   //   return acc + cur;
//   // }, 0);

//   // 월 전체내역 지출 총합
//   // const filtereExpense =
//   //   accountList && accountList.filter((v) => v.category === "지출");
//   // const filteredExpensePrice =
//   //   filtereExpense &&
//   //   filtereExpense.map((v) => {
//   //     return v.price;
//   //   });

//   // const ExpenseSum = filteredExpensePrice.reduce((acc, cur) => {
//   //   return acc + cur;
//   // }, 0);

//   function PriceSum(arr) {
//     arr.reduce((acc, cur) => {
//       return acc + cur;
//     }, 0);
//   }

//   // 같은 날짜인 내역만 필터링
//   const filterAccountList = accountList.map((list, id) => {
//     return accountList.filter((v) => v.date === list.date);
//   });

//   // console.log(filterAccountList);

//   // console.log(filteredIncome);
//   console.log(accountList);

//   return (
//     <>
//       <Calendar
//         events={accountList.map((list, id) => {
//           // 같은 날짜인 내역만 필터링
//           const filteredList =
//             accountList && accountList.filter((v) => v.date === list.date);
//           // console.log(filteredList);

//           console.log(filteredList);

//           // 같은 날짜의 수입 총합
//           const filteredIncome = filteredList.filter(
//             (v) => v.category === "수입"
//           );
//           const filteredIncomePrice = filteredIncome.map((v) => {
//             return v.price;
//           });
//           const IncomeSum = filteredIncomePrice.reduce((acc, cur) => {
//             return acc + cur;
//           }, 0);

//           // 같은 날짜의 지출 총합
//           const filtereExpense = filteredList.filter(
//             (v) => v.category === "지출"
//           );
//           const filteredExpensePrice = filtereExpense.map((v) => {
//             return v.price;
//           });
//           const ExpenseSum = filteredExpensePrice.reduce((acc, cur) => {
//             return acc + cur;
//           }, 0);

//           // title: "1000원",
//           // // list.category === "수입"
//           // //   ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
//           // //     "+" +
//           // //     String(IncomeSum).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
//           // //   : "-" +
//           // //     String(ExpenseSum).replace(
//           // //       /(\d)(?=(?:\d{3})+(?!\d))/g,
//           // //       "$1,"
//           // //     ),
//           // allDay: false,
//           // start: new Date(list.date),
//           // end: new Date(list.date),
//           // console.log();

//           // console.log(filteredIncome[0]);

//           return {
//             title:
//               list.category === "수입"
//                 ? "+" +
//                   String(IncomeSum).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
//                 : "-" +
//                   String(ExpenseSum).replace(
//                     /(\d)(?=(?:\d{3})+(?!\d))/g,
//                     "$1,"
//                   ),
//             allDay: false,
//             start: new Date(list.date),
//             end: new Date(list.date),
//           };
//         })}
//         localizer={localizer}
//         style={{ height: 100 + "%", width: 100 + "%" }}
//         components={{
//           toolbar: ToolBar,
//           month: {
//             dateHeader: Day,
//           },
//         }}
//         onSelectEvent={(eventInfo) => {
//           setEventInfo(eventInfo);
//           toggleModal();
//         }}
//         eventPropGetter={Event}
//       />
//       {isOpen && (
//         <EventModal
//           isOpen={isOpen}
//           toggleModal={toggleModal}
//           eventInfo={eventInfo}
//           accountList={accountList}
//         />
//       )}
//     </>
//   );
// };

// export default CalendarBook;
