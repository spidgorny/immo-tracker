import Image from "next/image";

export function PropImages({ prop }) {
  const images = prop.images;

  return (
    <div className="d-flex flex-row flex-nowrap">
      {images.map((image) => (
        <div key={image.id} className="">
          <Image src={image.src} alt={image.alt} width={128} height={128} />
        </div>
      ))}
    </div>
  );
}
