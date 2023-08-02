import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectFade } from "swiper/modules";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { Autoplay, Pagination, Navigation, EffectCoverflow, EffectCreative } from "swiper/modules";

import img1 from "../../img/hero/1.png";
import img2 from "../../img/hero/2.png";
import img3 from "../../img/hero/3.png";
import img4 from "../../img/hero/4.png";

export const Hero = () => {
  const heroContent = [
    {
      imgsrc: img1,
      buttonTitle: "Buy Now",
      heading: "State of the Art Grand Piano"
    },
    {
      imgsrc: img2,
      buttonTitle: "Buy Now",
      heading: "Guitar "
    },
    {
      imgsrc: img3,
      buttonTitle: "View Microphones",
      heading: "Guitar "
    },
    {
      imgsrc: img4,
      buttonTitle: "Buy Now",
      heading: "Guitar "
    }
  ];
  return (
    <div style={{ background: "#FEFCF9", height: "400px", padding: "0px 100px" }}>
      <Swiper
        style={{ height: "400px" }}
        effect={"creative"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-125%", 0, -800],
            rotate: [0, 0, -90]
          },
          next: {
            shadow: true,
            translate: ["125%", 0, -800],
            rotate: [0, 0, 90]
          }
        }}
        navigation={true}
        modules={[EffectCreative, EffectCoverflow, EffectCards, Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false
        }}
      >
        {heroContent.map(hero => {
          return (
            <SwiperSlide className="SlideWrap" style={{ height: "400px", display: "flex", alignItems: "center" }}>
              <img src={hero.imgsrc} alt="1" style={{ height: "200px", objectFit: "contain" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>{hero.heading}</h1>
                <button style={{ height: "30px", width: "180px" }}>{hero.buttonTitle}</button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
