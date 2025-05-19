import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper";
import { Box } from "@mui/material";




const slides = [
  {
    image: "https://via.placeholder.com/800x300?text=Yeni+Kitaplar",
    text: "Yeni Çıkanlar Raflarda!",
  },
  {
    image: "https://via.placeholder.com/800x300?text=Indirimdeki+Kitaplar",
    text: "%20'ye Varan İndirimler!",
  },
];

const SliderBanner = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      style={{ borderRadius: "12px", overflow: "hidden", marginBottom: "2rem" }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "2rem",
              fontWeight: "bold",
              textShadow: "2px 2px 8px black",
            }}
          >
            {slide.text}
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderBanner;
