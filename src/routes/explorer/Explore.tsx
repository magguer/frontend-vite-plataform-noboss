//Components
import SliderHeadings from "../../components/explore/SliderHeadings";
//CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Assets
import exploreimage from "../../assets/images/no_explorer_image.svg";

function Explore() {
    return (
        <div className="relative w-full h-full">
            <div className="w-full grid justify-center text-center">
                <div>
                    <h3>Explorador</h3>
                    <h3 className="text-secondarycolor opacity-75 font-medium text-sm">
                        Navega por el mapa de proyectos, y conoce el mercado de
                        tu zona!
                    </h3>
                </div>
            </div>
            <SliderHeadings />
            <div className="mt-10 grid gap-10 justify-center text-center">
                <img className="w-60" src={exploreimage} alt="explore_image" />
                <h3 className="text-lg">Próximamente...</h3>
            </div>
        </div>
    );
}

export default Explore;
