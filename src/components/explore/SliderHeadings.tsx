//CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Dependencies
import Slider from "react-slick";
import { useEffect, useState } from "react";
import axios from "axios";
//Types
import HeadingTypes from "../../types/HeadingTypes";

function SliderHeadings() {
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        const getHeadings = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/heading`,
                method: "get",
            });
            setHeadings(response.data);
        };
        getHeadings();
    }, []);

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 2,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="px-14 my-5">
            <Slider {...settings}>
                {headings.map((heading: HeadingTypes, i) => {
                    return (
                        <div key={i} className="text-white px-2">
                            <div
                                className={`flex items-center justify-center gap-2 p-1  dark:text-textdarkprimary text-textlightprimary bg-lightbgsecondary dark:bg-darkbgsecondary hover:z-0 cursor-pointer rounded-lg transition-all duration-200`}
                            >
                                <img
                                    src={`${
                                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                                    }/headings/icons/${heading.icon_url}`}
                                    className="w-6 object-contain invert dark:invert-0"
                                    alt=""
                                />
                                <h3 className="text-xs truncate">
                                    {heading.name}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default SliderHeadings;
