import { useState } from "react";
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
    const project = useSelector((state: ProjectType) => state.project);
    const capitalizeFirstLetter = (query: string): string => {
        return query.charAt(0).toUpperCase() + query.substring(1);
    };

    const today = startOfToday();
    const days = ["lun", "mar", "mie    ", "jue", "vie", "sab", "dom"];

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

    return (
        <div className="w-full fade-in-left pt-3 px-0 mobilXL:px-3">
            <div className="w-full h-[calc(100vh-210px)] tablet:h-[calc(100vh-250px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                <div className="flex items-center justify-end">
                    <div className="flex items-center justify-evenly gap-6">
                        <ChevronLeftIcon
                            className="w-6 h-6 cursor-pointer"
                            onClick={getPrevMonth}
                        />
                        <p className="w-[140px] text-center bg-darkbgsecondary py-2">
                            {capitalizeFirstLetter(
                                format(firstDayOfMonth, "MMMM, yy", {
                                    locale: es,
                                })
                            )}
                        </p>
                        <ChevronRightIcon
                            className="w-6 h-6 cursor-pointer"
                            onClick={getNextMonth}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-7 mt-6 gap-2  place-items-center">
                    {days.map((day, idx) => {
                        return (
                            <div key={idx}>{capitalizeFirstLetter(day)}</div>
                        );
                    })}
                </div>
                {/* <hr className="my-4" /> */}
                <div className="grid grid-cols-7 gap-2 my-3 place-items-center ">
                    {daysInMonth.map((day, idx) => {
                        return (
                            <div
                                key={idx}
                                className={colStartClasses[getDay(day)]}
                            >
                                <p
                                    style={{
                                        backgroundColor:
                                            isToday(day) && project.color_one,
                                    }}
                                    className={`cursor-pointer w-8 h-8 tablet:w-32 tablet:h-24 p-2 font-semibold grid place-content-center transition-all duration-200 hover:text-white ${
                                        isSameMonth(day, today)
                                            ? "text-textdarkprimary"
                                            : "text-textlightterceary   "
                                    } ${
                                        !isToday(day) &&
                                        "bg-darkbgsecondary hover:bg-darkbgunder"
                                    }`}
                                >
                                    {format(day, "d")}
                                </p>
                            </div>
                        );
                    })}
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
