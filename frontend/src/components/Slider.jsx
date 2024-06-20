import { Box, Image, Text } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slider = () => {
    return (
        <Box className="shadow-md" position="relative">
            <Text
                position="absolute"
                fontWeight="800"
                width={{
                    base: '250px',
                    lg: 'auto',
                }}
                top={40}
                left={{
                    base: '20px',
                    lg: '40px',
                }}
                fontSize={{
                    base: '40px',
                    lg: '60px',
                }}
                fontFamily="sans-serif"
            >
                Summer Collection
            </Text>
            <Text
                position="absolute"
                top={290}
                left={{
                    base: '20px',
                    lg: '40px',
                }}
            >
                Start explore our collections
            </Text>
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
                        height="600px"
                        width="900px"
                        
                        src="/m1.avif"
                        alt="Slide 1"
                    />
                </div>
                <div>
                    <Image
                        height="600px"
                        width="100%"
                        
                        src="/m2.jpg"
                        alt="Slide 2"
                    />
                </div>
                <div>
                    <Image
                        height="600px"
                        width="100%"
                        
                        src="/m3.jpg"
                        alt="Slide 3"
                    />
                </div>
            </Carousel>
        </Box>
    );
};

export default Slider;
