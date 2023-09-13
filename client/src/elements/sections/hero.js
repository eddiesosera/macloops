import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectFade } from "swiper/modules";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { Autoplay, Pagination, Navigation, EffectCoverflow, EffectCreative } from "swiper/modules";
import { MacloopsLogo } from "../components/svgs";

// import img1 from "../../img/hero/1.png";
// import img2 from "../../img/hero/2.png";
// import img3 from "../../img/hero/3.png";
// import img4 from "../../img/hero/4.png";

export const Hero = () => {
  function importAll(r) {
    return r.keys().map(r);
  }

  const heroImages = importAll(
    require.context("../../img/hero/", false, /\.(png|jpe?g|svg)$/)
  );
  // const wrfms = importAll(require.context("../../img/projects/kaizen/files/wireframes/", false, /\.(png|jpe?g|svg)$/));
  // const vsl_dsgn = importAll(require.context("../../img/projects/kaizen/files/visual_design/", false, /\.(png|jpe?g|svg)$/));

  // images.forEach(element => console.log(element.substring(14, 90)));

  console.log(heroImages.map(img => img.substring(14, 90)));

  const heroContent = [
    {
      imgsrc: heroImages[0],
      category: "Acoustic Guitars",
      slogan: "Strumming Life's Melody.",
      teaser: "Crafted with precision, our acoustic guitars resonate with the soulful notes of craftsmanship, ensuring the beat goes on in every chord.",
    },
    // {
    //   imgsrc: heroImages[2],
    //   category: "Amps",
    //   slogan: "Amplify the Rhythm of Sound.",
    //   teaser: "Our amps are the backbone of your sonic journey. Precision-engineered to elevate your music, ensuring the beat goes on at the perfect volume.",
    // },
  ];
  return (
    <div style={{ background: "#FEFCF9", height: "600px" }}>
      <Swiper
        style={{ height: "600px" }}
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
            <SwiperSlide key={hero?.imgsrc} className="SlideWrap"
              style={{ height: "600px", display: "flex", alignItems: "center" }}>
              <div className="img_and_overlay_wrap">
                <img src={hero.imgsrc} alt="Hero Image"
                  style={{
                    height: "600px", width: '100vw', objectFit: "cover",
                  }} />
                <div className="hero_img_overlay"
                  style={{
                    width: '100%', height: '600px', background: " linear-gradient(90deg, #13120F 9.32%, rgba(19, 18, 15, 0.20) 100%)",
                    position: 'absolute', top: '0'
                  }} />
              </div>

              <div className="hero_content" style={{ position: 'absolute', top: '0' }}>
                <div className="hero_content_left_wrap">
                  <div className="hero_content_left_top_wrap" style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ color: '#ffcf86' }}>{hero.category}</div>
                    <div style={{ color: '#FFF1DC' }}>{hero.slogan}</div>
                    <div style={{ color: '#FFF1DC' }}>{hero.teaser}</div>
                  </div>
                  <button className="primarybtn" style={{ height: "30px", width: "fit-content", background: '#ffcf86', color: '#121211' }}>{"Explore " + hero?.category}</button>
                </div>
                <div className="hero_content_right_wrap">
                  <i className="ph-bold ph-magnifying-glass" style={{ color: '#FFF1DC' }} />
                  <MacloopsLogo height={24} width={'123px'} color={'#FFF1DC'} />
                </div>
              </div>

            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
