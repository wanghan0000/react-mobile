import { Carousel } from '@arco-design/mobile-react';
import React from 'react';

const Banner = () => {
  return (
    <div>
      <Carousel indicatorType="circle" lazyloadCount={1}>
        <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_4.jpg" alt="" />
        <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_4.jpg" alt="" />
        <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_4.jpg" alt="" />
        <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_4.jpg" alt="" />
      </Carousel>
    </div>
  );
};

export default Banner;
