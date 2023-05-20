import diaryIcon from "../../../assets/images/icons/diary-icon.png";

function Diary() {
    return (
        <div className="w-full fade-in-left">
            {" "}
            <div className="flex flex-col items-center mt-24 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
                <img
                    className="w-20 laptop:w-24 invert dark:invert-0"
                    src={diaryIcon}
                    alt=""
                />
                <h3>Agenda no disponible.</h3>
            </div>
        </div>
    );
}

export default Diary;
