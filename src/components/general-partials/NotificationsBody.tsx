function NotificationsBody({ project }) {
    return (
        <div className="fade-in-right w-screen mobilXL:w-[300px] h-[350px] bg-lightbgunder dark:bg-darksubbgprimary rounded text-textlightprimary dark:text-textdarkprimary">
            <div className="text-center pt-3 text-sm">
                <h3>Noticiaciones</h3>
                <div
                    style={{ background: `${project.color_one}` }}
                    className="mt-2 h-[1px] w-full"
                />
            </div>
        </div>
    );
}

export default NotificationsBody;
