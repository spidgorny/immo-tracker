import { fetcher } from "../../lib/common/http";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Spinner } from "react-bootstrap";
import { PropCard } from "../../components/properties/one-prop.jsx";
import { PropComments } from "../../components/properties/prop-comments.jsx";
import { PropImages } from "../../components/properties/prop-images.jsx";

export default function OneProp() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: prop } = useSWR(`/api/properties/${slug}`, fetcher);

  return (
    <div>
      {!prop && <Spinner animation="border" />}
      {prop && (
        <div>
          <PropCard prop={prop} />
          <PropImages prop={prop} />
          <PropComments prop={prop} />
        </div>
      )}

      <hr />
      <pre>{JSON.stringify(prop, null, 2)}</pre>
    </div>
  );
}
