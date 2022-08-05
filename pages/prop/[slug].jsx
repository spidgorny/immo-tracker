import { fetcher } from "../../lib/common/http";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Spinner } from "react-bootstrap";
import { PropCard } from "../../components/properties/one-prop.jsx";
import { PropComments } from "../../components/properties/prop-comments.jsx";
import { PropImages } from "../../components/properties/prop-images.jsx";
import Image from "next/image.js";
import { HStack } from "../../components/widgets/hstack.tsx";
import { Center } from "../../components/widgets/center.js";

export default function OneProp() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: prop } = useSWR(slug && `/api/properties/${slug}`, fetcher);

  return (
    <div>
      {!prop && (
        <Center className="my-10">
          <Spinner animation="border" />
        </Center>
      )}
      {prop && (
        <div>
          <HStack gap={3} className="align-items-start">
            <div>
              {prop.images[0] && (
                <a href={prop.images[0].src} target="_blank" rel="noopener">
                  <Image
                    src={prop.images[0].src}
                    width={512}
                    height={512}
                    alt="Bigger image"
                  />
                </a>
              )}
            </div>
            <PropCard prop={prop} />
          </HStack>
          <PropImages prop={prop} />
          <PropComments prop={prop} />
        </div>
      )}

      <hr />
      <pre>{JSON.stringify(prop, null, 2)}</pre>
    </div>
  );
}
