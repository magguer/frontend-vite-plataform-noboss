import { useEffect, useRef, useState } from "react";
import diaryIcon from "../../../assets/images/icons/diary-icon.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import { useSelector } from "react-redux";
import { ProjectType } from "../../../types/ProjectTypes";
import DayOfDiaryBody from "../../../components/project/Diary/DayOfDiaryBody";

function Diary() {
  const containerRef = useRef(null);
  const project = useSelector((state: ProjectType) => state.project);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isLeavingBottom, setIsLeavingBottom] = useState(false);
  const [bottom, setBottom] = useState<boolean>(false);
  const capitalizeFirstLetter = (query: string): string => {
    return query.charAt(0).toUpperCase() + query.substring(1);
  };
  const [selectedDay, setSelectedDay] = useState<Date>();

  const today = startOfToday();
  const days = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];

  const [currMonth, setCurrMonth] = useState(() =>
    format(today, "MMM-yyyy", { locale: es })
  );

  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  useEffect(() => {
    const checkScroll = () => {
      const element = containerRef.current;
      const scrollPosition =
        element.scrollHeight - element.scrollTop - element.clientHeight;

      if (scrollPosition <= 1 && !isAtBottom) {
        setIsAtBottom(true);
        setIsLeavingBottom(false);
        setBottom(true);
        // Realiza alguna acción cuando se llega al fondo
      } else if (scrollPosition > 1 && isAtBottom) {
        setIsAtBottom(false);
        setIsLeavingBottom(true);
        setBottom(false);
        // Realiza alguna acción cuando te alejas del fondo
      }
    };

    containerRef.current.addEventListener("scroll", checkScroll);
  }, [isAtBottom, isLeavingBottom]);

  return (
    <div className="w-full fade-in-left pt-2 px-0 mobilXL:px-2">
      <div className="w-full">
        {/* Mont & Year Selector */}
        <div className="absolute tablet:ml-[-23px] bottom-2 w-full flex items-center justify-center transition-all duration-100">
          <div
            className={`${
              bottom ? "hidden" : "z-30"
            } flex items-center bg-lightbgunder rounded-md dark:bg-darkbgprimary backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70 shadow-lg`}
          >
            <ChevronLeftIcon
              style={{
                borderColor: project.color_one,
                color: project.color_one,
              }}
              className="border-e w-10 h-12 cursor-pointer p-2"
              onClick={getPrevMonth}
            />
            <p className="w-[120px] tablet:w-[300px] truncate text-sm text-center text-textlightprimary dark:text-textdarkprimary py-2 ">
              {capitalizeFirstLetter(
                format(firstDayOfMonth, "MMMM, yy", {
                  locale: es,
                })
              )}
            </p>
            <ChevronRightIcon
              style={{
                borderColor: project.color_one,
                color: project.color_one,
              }}
              className="border-s w-10 h-12 cursor-pointer p-2"
              onClick={getNextMonth}
            />
          </div>
        </div>
        <div
          ref={containerRef}
          className="h-[calc(100dvh-190px)] tablet:h-[calc(100dvh-215px)] overflow-auto scrollbar-none"
        >
          <div className="hidden tablet:grid grid-cols-7 gap-2 text-textlightprimary dark:text-textdarkprimary place-items-center">
            {days.map((day, idx) => {
              return (
                <div key={idx} className="text-xs">
                  {capitalizeFirstLetter(day)}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-7 gap-1 my-3">
            {daysInMonth.map((day, idx) => {
              return (
                <DayOfDiaryBody
                  key={idx}
                  setSelectedDay={setSelectedDay}
                  project={project}
                  day={day}
                  currMonth={currMonth}
                  isToday={isToday}
                  today={today}
                  isSameMonth={isSameMonth}
                  format={format}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diary;
