import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { mock } from "./utils/mock";

// API가 없는 관계로 mock 데이터를 통해 API를 받아온 것처럼 코드 작성해보기!

function App() {
  const [yearMonth, setYearMonth] = useState({
    currentYear: 0,
    currentMonth: 0,
  });
  const [selectedDay, setSelectedDay] = useState<number[]>([]);
  const daySet = useRef(new Set<number>());

  console.log(selectedDay);

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
        {yearMonth.currentYear}년 {yearMonth.currentMonth}월
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
          {mock.map((el) => (
            <div key={el.id} className="dayButtonWrap">
              <button
                className="dayButton"
                type="button"
                onClick={() => handleClickDay(el.id)}
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
