import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { Autoplay, EffectFade, Pagination, Navigation, EffectCoverflow, EffectCreative } from "swiper/modules";
import { MacloopsLogo } from "../components/svgs";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate()
  const importAll = (r) => { return r.keys().map(r); }
  const heroImages = importAll(require.context("../../img/hero/", false, /\.(png|jpe?g|svg)$/))

  console.log(heroImages.map(img => img.substring(14, 90)));

  const heroContent = [
    {
      imgsrc: heroImages[0],
      category: "Acoustic Guitars",
      slogan: "Strumming Life's Melody.",
      teaser: "Crafted with precision, our acoustic guitars resonate with the soulful notes of craftsmanship, ensuring the beat goes on in every chord.",
    },
    {
      imgsrc: heroImages[1],
      category: "Amps",
      slogan: "Amplify the Rhythm of Sound.",
      teaser: "Our amps are the backbone of your sonic journey. Precision-engineered to elevate your music, ensuring the beat goes on at the perfect volume.",
    },
    {
      imgsrc: heroImages[2],
      category: "Bass Guitars",
      slogan: "Groove to the Heartbeat of Bass.",
      teaser: "Each bass guitar we create is a testament to deep, resonant tones. Crafted with expertise, ensuring the beat goes on with the pulse of your groove.",
    },
    {
      imgsrc: heroImages[3],
      category: "Drums",
      slogan: "Drumming the Rhythms of Life.",
      teaser: "Expert craftsmanship, the finest materials, and the height of technology produce drums of unmatched quality. The beat goes on, echoing the heartbeat of your music",
    },
    {
      imgsrc: heroImages[4],
      category: "Electric Guitars",
      slogan: "Electrify Your Soundtrack",
      teaser: "Our electric guitars are precision instruments designed to electrify your music. With each strum, the beat goes on, charging your sound with unparalleled energy.",
    },
    {
      imgsrc: heroImages[5],
      category: "Home Studio Setup",
      slogan: "Where Creativity Finds its Beat.",
      teaser: "Craft your musical masterpiece with our home studio setup. Expertly curated to ensure the beat goes on in the comfort of your creative space.",
    },
    {
      imgsrc: heroImages[6],
      category: "Keyboards",
      slogan: "Unlock Musical Possibilities.",
      teaser: "Our keyboards open doors to a world of musical exploration. Precision-engineered keys ensure the beat goes on, as you compose your musical journey.",
    },
    {
      imgsrc: heroImages[7],
      category: "Microphones",
      slogan: "Capturing Sound, Preserving Beats.",
      teaser: "Our microphones are the guardian angels of sound. With unmatched precision, they ensure the beat goes on, immortalizing your musical moments.",
    },
    {
      imgsrc: heroImages[8],
      category: "Mixers",
      slogan: "Mixing the Magic of Music.",
      teaser: "Our mixers are the alchemists behind great sound. Expertly crafted to ensure the beat goes on, blending your musical elements into pure magic.",
    },
    {
      imgsrc: heroImages[9],
      category: "Percussions",
      slogan: "Percussive Poetry in Motion.",
      teaser: "Our percussion instruments are a symphony of rhythm. Meticulously crafted, they ensure the beat goes on, creating poetic motion in your music.",
    },
    {
      imgsrc: heroImages[10],
      category: "Pianos",
      slogan: "Elegance in Every Note.",
      teaser: "Our pianos are a testament to timeless elegance. Each note played ensures the beat goes on, resonating with the grace of your melodies.",
    },
    {
      imgsrc: heroImages[11],
      category: "Trumpets",
      slogan: "Trumpeting the Sound of Excellence",
      teaser: "Crafted with precision, our trumpets resonate with excellence. With each note, the beat goes on, heralding your musical prowess.",
    },
    {
      imgsrc: heroImages[12],
      category: "Violins",
      slogan: "Strings of Passion, Music of the Heart.",
      teaser: "Our violins are born of passion and craftsmanship. With every bow stroke, the beat goes on, echoing the music of your heart.",
    },
    {
      imgsrc: heroImages[13],
      category: "Prototypes",
      slogan: "Innovate. Create. Let the Beat Resonate.",
      teaser: "Our prototype instruments are a testament to innovation. Melding expert craftsmanship with cutting-edge technology, we ensure the beat goes on, pushing the boundaries of musical exploration.",
    },
  ];
  return (
    <div style={{ background: "#13120F", height: "700px" }}>
      <Swiper
        style={{ height: "700px" }}
        effect={"creative"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        pagination={{ clickable: true }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-125%", 0, -800],
            rotate: [0, 0, -90]
          },
          next: {
            shadow: true,
            translate: ["-125%", 0, -800],
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
              style={{ height: "700px", display: "flex", alignItems: "center" }}>
              <div className="img_and_overlay_wrap">
                <img src={hero.imgsrc} alt="Hero Image"
                  style={{
                    height: "700px", width: '100vw', objectFit: "cover",
                  }} />
                <div className="hero_img_overlay"
                  style={{
                    width: '100%', height: '700px', background: "linear-gradient(90deg, #13120F 9.32%, rgba(19, 18, 15, 0.30) 100%)",
                    position: 'absolute', top: '0'
                  }} />
              </div>

              <div className="hero_content" style={{ display: "flex", justifyContent: 'space-between', position: 'absolute', top: '0', height: '-webkit-fill-available', width: '-webkit-fill-available', padding: '60px' }}>
                <div className="hero_content_left_wrap" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '65%' }}>
                  <div className="hero_content_left_top_wrap" style={{ display: "flex", flexDirection: "column", gap: '15px' }}>
                    <div style={{ color: '#ffcf86', fontSize: 16, fontFamily: 'Nunito Sans', fontWeight: '900', wordWrap: 'break-word', textTransform: 'uppercase' }}>{hero.category}</div>
                    <div style={{ color: '#FFF1DC', fontSize: 72, fontFamily: 'Montserrat', fontWeight: '900', lineHeight: '1.2', wordWrap: 'break-word', textTransform: 'uppercase' }}>{hero.slogan}</div>
                    <div style={{ color: '#FFF1DC', fontSize: 18, fontFamily: 'Nunito Sans', fontWeight: '500', wordWrap: 'break-word' }}>{hero.teaser}</div>
                  </div>
                  <button className="primarybtn" onClick={e => navigate(`/products/${hero.category}`)}
                    style={{ height: "45px", padding: '0 20px', width: "fit-content", background: '#ffcf86', color: '#121211', border: 'none', fontSize: 16, fontFamily: 'Nunito Sans', fontWeight: '800', wordWrap: 'break-word' }}>
                    {"Explore " + hero?.category}
                  </button>
                </div>
                <div className="hero_content_right_wrap" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <i className="ph-bold ph-magnifying-glass" style={{ color: '#FFF1DC', display: 'flex', justifyContent: 'flex-end' }} />
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
