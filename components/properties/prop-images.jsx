import Image from "next/image";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useState } from "react";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export function PropImages({ prop }) {
  const images = prop.images;
  const handle = useFullScreenHandle({
    onChange: (state) => {
      if (!state) {
        setCurrentImage(null);
      }
    },
  });
  const [currentImage, setCurrentImage] = useState();

  console.log(handle);

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
                console.log(image);
                setCurrentImage(image);
                await handle.enter();
              }}
            />
          </div>
        ))}
      </div>

      {currentImage && <ImageGallery items={images} />}
    </>
  );
}

// <FullScreen handle={handle} className="bg-gray-100 vh-100">
//        </FullScreen>
