export default function DayOfDiaryBody({
    setSelectedDay,
    project,
    day,
    getDay,
    colStartClasses,
    isToday,
    today,
    isSameMonth,
    format,
}) {
    return (
        <div onClick={() => setSelectedDay(day)}>
            <div
                style={{
                    backgroundColor: isToday(day) && project.color_one,
                }}
                className={`cursor-pointer w-full h-44 tablet:h-24 transition-all duration-200 dark:hover:text-white flex flex-col justify-between p-5 tablet:p-2 ${
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
                <h3 className="text-end  font-semibold">{format(day, "d")}</h3>
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
