import Image from "next/image";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useState } from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

export function PropImages({ prop }) {
  const images = prop.images;
  const handle = useFullScreenHandle({
    onChange: (state) => {
      if (!state) {
        setCurrentImage(null);
      }
    },
  });
  console.log(handle);
  const [currentImage, setCurrentImage] = useState();

  return (
    <>
      <div className="d-flex flex-row flex-nowrap gap-2 my-3 overflow-auto">
        {images.map((image) => (
          <div key={image.id} className="flex-wrap flex-shrink-0">
            <Image
              src={image.src}
              alt={image.alt}
              width={128}
              height={128}
              onClick={async () => {
                setCurrentImage(image);
                await handle.enter();
              }}
            />
          </div>
        ))}
      </div>

      <FullScreen handle={handle} className="bg-white">
        <div className="slide-container">
          <Slide
            transitionDuration={300}
            defaultIndex={images.findIndex((x) => x.id === currentImage.id)}
          >
            {images.map((img) => (
              <div className="each-slide" key={img.id}>
                <div style={{ backgroundImage: `url(${img.src})` }}>
                  <span>Img</span>
                </div>
                {/*<Image*/}
                {/*  src={img.src}*/}
                {/*  alt={img.caption}*/}
                {/*  width={"100%"}*/}
                {/*  height={"100%"}*/}
                {/*  layout="fill"*/}
                {/*  onClick={async () => {*/}
                {/*    setCurrentImage(null);*/}
                {/*    await handle.exit();*/}
                {/*  }}*/}
                {/*/>*/}
              </div>
            ))}
          </Slide>
        </div>
      </FullScreen>
    </>
  );
}
