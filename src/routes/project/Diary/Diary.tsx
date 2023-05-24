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

    const colStartClasses = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ];

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
        <div className="w-full fade-in-left pt-2 px-0 mobilXL:px-3">
            <div className="w-full">
                <div className="absolute ml-[-23px] bottom-5 shadow opacity-100 w-full flex items-center justify-center transition-all duration-100">
                    <div
                        className={`${
                            bottom ? "opacity-0 z-0" : "opacity-100 z-30"
                        } flex items-center bg-lightbgunder rounded-md dark:bg-darkbgprimary transition-all duration-200`}
                    >
                        <ChevronLeftIcon
                            className="w-10 h-10 cursor-pointer p-2 dark:text-lightbgprimary text-darkbgprimary"
                            onClick={getPrevMonth}
                        />
                        <p className="w-[200px] text-center text-textlightprimary dark:text-textdarkprimary py-2 ">
                            {capitalizeFirstLetter(
                                format(firstDayOfMonth, "MMMM, yy", {
                                    locale: es,
                                })
                            )}
                        </p>
                        <ChevronRightIcon
                            className="w-10 h-10 cursor-pointer p-2 dark:text-lightbgprimary text-darkbgprimary"
                            onClick={getNextMonth}
                        />
                    </div>
                </div>
                <div
                    ref={containerRef}
                    className="h-[calc(100vh-210px)] tablet:h-[calc(100vh-240px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2"
                >
                    <div className="grid grid-cols-7 gap-2 text-textlightprimary dark:text-textdarkprimary place-items-center">
                        {days.map((day, idx) => {
                            return (
                                <div key={idx} className="text-xs">
                                    {capitalizeFirstLetter(day)}
                                </div>
                            );
                        })}
                    </div>
                    <div className="grid grid-cols-7 gap-1 my-3 place-items-center ">
                        {daysInMonth.map((day, idx) => {
                            return (
                                <div
                                    onClick={() => setSelectedDay(day)}
                                    key={idx}
                                    className={colStartClasses[getDay(day)]}
                                >
                                    <div
                                        style={{
                                            backgroundColor:
                                                isToday(day) &&
                                                project.color_one,
                                        }}
                                        className={`cursor-pointer w-full tablet:h-24 transition-all duration-200 dark:hover:text-white flex flex-col justify-between p-2 ${
                                            isSameMonth(day, today)
                                                ? "text-textlightprimary dark:text-textdarkprimary"
                                                : "text-opacity-30 dark:opacity-100 text-textlightterceary"
                                        } ${
                                            !isToday(day) &&
                                            "bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgsecondary dark:hover:bg-darkbgunder"
                                        }`}
                                    >
                                        <p className="text-xs text-textlightterceary">
                                            No hay nada agendado.
                                        </p>
                                        <h3 className="text-end  font-semibold">
                                            {format(day, "d")}
                                        </h3>
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: project.color_one,
                                        }}
                                        className="h-0.5"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/*  {" "}
                <div className="flex flex-col items-center mt-24 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
                    <img
                        className="w-20 laptop:w-24 invert dark:invert-0"
                        src={diaryIcon}
                        alt=""
                    />
                    <h3>Agenda no disponible.</h3>
                </div> */}
        </div>
    );
}

export default Diary;
