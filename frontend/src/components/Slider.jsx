import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const Slider = () => {
    return (
        <div className="flex flex-col justify-center items-start w-full mt-5 px-2 sm:px-4">
            <div className="w-full relative shadow-md">
                <Carousel
                    autoPlay
                    interval={3000}
                    infiniteLoop
                    showStatus={false}
                    showThumbs={false}
                    showArrows={true}
                    swipeable
                    emulateTouch
                >
                    <div>
                        <img
                            className="h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] w-full object-cover"
                            src="/ads.jpg"
                            alt="Slide 1"
                        />
                    </div>
                    <div>
                        <img
                            className="h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] w-full object-cover"
                            src="/ads2.jpeg"
                            alt="Slide 2"
                        />
                    </div>
                    <div>
                        <img
                            className="h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] w-full object-cover"
                            src="/ads3.jpg"
                            alt="Slide 3"
                        />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Slider;
