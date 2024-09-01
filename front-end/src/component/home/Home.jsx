'use client'
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Header, HeaderContent, HeaderSubheader, Container } from 'semantic-ui-react';

const Home = () => {
    return (
        <>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                loop={true}
                keyboard={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                slideToClickedSlide={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://assets.digiaccel.in/website/images/homepage/specialist-business-education-web1.webp"
                        style={{ height: "440px" }} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://assets.digiaccel.in/website/images/homepage/pgp-web-banner1.webp"
                        style={{ height: "440px" }} />

                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://assets.digiaccel.in/website/images/homepage/pgpex-web-banner1.webp"
                        style={{ height: "440px" }} />
                </SwiperSlide>
            </Swiper>
            <Header size='huge'>
                <Container>
                    <HeaderContent>
                        <Header>Trusted by Experts</Header>
                        <HeaderSubheader>
                            India’s leading organizations use Digiaccel’s eCommerce and Marketing education for their employees.
                        </HeaderSubheader>
                    </HeaderContent>
                </Container>
            </Header>
        </>
    )
}
export default Home;