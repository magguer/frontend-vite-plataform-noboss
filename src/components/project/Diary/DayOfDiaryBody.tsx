import axios from "axios";
import { useEffect, useState } from "react";
import { open } from "../../../redux/modalsReducer";
import { useDispatch } from "react-redux";
import { addDate } from "../../../redux/dateReducer";

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
  const dispatch = useDispatch();
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

  const handleOpenModalBooking = () => {
    dispatch(open("addBookingModal"));
    dispatch(addDate(day.toLocaleDateString()));
  };

  return (
    <>
      <button onClick={handleOpenModalBooking}>
        <div
          style={{
            backgroundColor: isToday(day) && project.color_one,
          }}
          className={`fade-in text-start cursor-pointer w-full h-44 tablet:h-24 laptop:h-32 transition-all duration-200 dark:hover:text-white flex flex-col justify-between p-5 tablet:p-2 ${
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
                <div
                  key={bookingBydate._id}
                  className="text-sm text-textlightprimary dark:text-textdarkprimary"
                >
                  <h3>{bookingBydate.service.name}</h3>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-textlightterceary opacity-30">
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
      </button>
    </>
  );
}
