import ImageGallery from "react-image-gallery";
import Image from "next/image.js";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { niceMoney } from "../../lib/common/date.mjs";

export function PropImages({ prop }) {
  const propImages = prop.images;
  const [currentImage, setCurrentImage] = useState();
  // const handle = useFullScreenHandle({
  //   onChange: (state) => {
  //     console.log("onChange", state);
  //     if (!state) {
  //       setCurrentImage(null);
  //     }
  //   },
  // });

  const galleryImages = propImages.map((x) => ({
    ...x,
    original: x.src,
    thumbnail: x.src,
  }));

  const startIndex =
    currentImage &&
    propImages.findIndex((image) => image.id === currentImage.id);

  return (
    <>
      <div className="d-flex flex-row flex-nowrap gap-2 my-3 overflow-auto">
        {propImages.map((image) => (
          <div key={image.id} className="flex-wrap flex-shrink-0">
            <Image
              src={image.src}
              alt={image.alt}
              width={128}
              height={128}
              onClick={async () => {
                setCurrentImage(image);
              }}
            />
          </div>
        ))}
      </div>

      {currentImage && (
        <Modal
          show={!!currentImage}
          onHide={() => setCurrentImage(null)}
          backdrop="static"
          centered
          size="xl"
          fullscreen={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>{niceMoney(prop.price)}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ImageGallery items={galleryImages} startIndex={startIndex} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
