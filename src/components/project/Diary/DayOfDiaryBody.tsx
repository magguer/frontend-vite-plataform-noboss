import axios from "axios";
import { set } from "date-fns";
import { useEffect, useState } from "react";

export default function DayOfDiaryBody({
  setSelectedDay,
  project,
  day,
  currMonth,
  isToday,
  today,
  isSameMonth,
  format,
}) {
  const [bookingsByDate, setBookingsByDate] = useState<any>();

  useEffect(() => {
    const getBookingsByDate = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/booking/?project=${
          project._id
        }&date=${day}`,
        method: "get",
      });
      setBookingsByDate(response.data);
    };
    getBookingsByDate();
  }, [project, currMonth]);

  return (
    <div onClick={() => setSelectedDay(day)}>
      <div
        style={{
          backgroundColor: isToday(day) && project.color_one,
        }}
        className={`fade-in cursor-pointer w-full h-44 tablet:h-24 laptop:h-32 transition-all duration-200 dark:hover:text-white flex flex-col justify-between p-5 tablet:p-2 ${
          isSameMonth(day, today)
            ? "text-textlightprimary dark:text-textdarkprimary"
            : "text-opacity-30 dark:opacity-100 text-textlightterceary"
        } ${
          !isToday(day) &&
          "bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgsecondary dark:hover:bg-darkbgunder"
        }`}
      >
        {bookingsByDate?.length !== 0 ? (
          bookingsByDate?.map((bookingBydate: any) => {
            return (
              <div className="text-sm text-textlightprimary dark:text-textdarkprimary">
                <h3>{bookingBydate.service.name}</h3>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-textlightterceary">
            No hay nada agendado.
          </p>
        )}
        <h3 className="text-end font-semibold">{format(day, "d")}</h3>
      </div>
      <div
        style={{
          backgroundColor: project.color_one,
        }}
        className="h-0.5"
      />
    </div>
  );
}
