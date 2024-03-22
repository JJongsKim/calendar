import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { mock } from "./utils/mock";

// API가 없는 관계로 mock 데이터를 통해 API를 받아온 것처럼 코드 작성해보기!

function App() {
  const [yearMonth, setYearMonth] = useState({
    currentYear: 0,
    currentMonth: 0,
  });
  const { currentYear, currentMonth } = yearMonth;

  let firstOfDay = 0;
  let days = [];

  if (currentYear !== 0 && currentMonth !== 0) {
    firstOfDay = new Date(currentYear, currentMonth - 1, 1).getDay();
    for (let i = 0; i < mock.length; i++) {
      const numOfWeekday = new Date(
        currentYear,
        currentMonth - 1,
        mock[i].day
      ).getDay();
      if (numOfWeekday !== 0 && numOfWeekday !== 6) {
        // 일요일(0)과 토요일(6) 제외
        days.push(mock[i]);
      }
    }
  }

  const nullDays = Array.from({ length: firstOfDay - 1 }).fill(null);

  const [selectedDay, setSelectedDay] = useState<number[]>([]);
  const daySet = useRef(new Set<number>());

  const handleClickDay = useCallback(
    (id: number) => {
      daySet.current.has(id)
        ? daySet.current.delete(id)
        : daySet.current.add(id);
      setSelectedDay(Array.from(daySet.current));
    },
    [daySet]
  );

  useEffect(() => {
    setYearMonth({
      currentYear: mock[0].year,
      currentMonth: mock[0].month,
    });
  }, []);

  return (
    <div className="App">
      <p>
        {currentYear}년 {currentMonth}월
      </p>
      <main className="mainWrap">
        <ul className="dayWrap">
          <li>월</li>
          <li>화</li>
          <li>수</li>
          <li>목</li>
          <li>금</li>
        </ul>
        <div className="calenderWrap">
          {nullDays.map((_, index) => (
            <div key={index} />
          ))}
          {days.map((el) => (
            <div key={el.id} className="dayButtonWrap">
              <button
                className="dayButton"
                type="button"
                onClick={() => handleClickDay(el.id)}
                disabled={el.remainingSeats === 0}
                style={{
                  borderColor: selectedDay.some((day) => day === el.id)
                    ? `orange`
                    : `gray`,
                }}
              >
                {el.day}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
