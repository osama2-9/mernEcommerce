import { Box, Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slider = () => {
    return (
        <Box w={'1400px'} left={'4%'}   mt={20} className="shadow-md" position="relative">
            
            <Carousel 
            
                autoPlay
                interval={3000}
                infiniteLoop
                
                showStatus={false}
                showThumbs={false}
                showArrows={true}
            >
                <div>
                    <Image
                        height="500px"
                        width="900px"
                        
                        src="/ads.jpg"
                        alt="Slide 1"
                    />
                </div>
                <div>
                    <Image
                        height="500px"
                        width="900px"
                        
                        src="/ads2.jpeg"
                        alt="Slide 2"
                    />
                </div>
                <div>
                    <Image
                        height="500px"
                        width="900px"
                        
                        src="/ads3.jpg"
                        alt="Slide 3"
                    />
                </div>
            </Carousel>
        </Box>
    );
};

export default Slider;
