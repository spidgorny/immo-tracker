import { fetcher } from "../../lib/common/http";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Card, Spinner, Stack } from "react-bootstrap";
import Link from "next/link";
import { HStack } from "../../components/widgets/hstack";
import { niceMoney } from "../../lib/common/number";

export default function OneProp() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: prop } = useSWR(`/api/properties/${slug}`, fetcher);

  return (
    <div>
      {!prop && <Spinner animation="border" />}
      {prop && <PropCard prop={prop} />}
      <hr />
      <pre>{JSON.stringify(prop, null, 2)}</pre>
    </div>
  );
}

export function PropCard({ prop }) {
  return (
    <Card className="">
      <Card.Body className="">
        <HStack>
          <div>
            <h6 className="p-0 m-0">{prop.name}</h6>
            <div className="text-muted fs-4">
              <a href={prop.url} className="text-muted fs-6 text-truncate ">
                {prop.url}
              </a>
            </div>
          </div>
          <Stack
            direction="vertical"
            className="justify-content-between font-monospace text-end"
          >
            <div>Price: {niceMoney(prop.price)}</div>
            <div>
              Area: {prop.area} m<sup>2</sup>
            </div>
            <div>
              Price/m2: {(prop.price / prop.area).toFixed(2)} / m<sup>2</sup>
            </div>
          </Stack>
        </HStack>
      </Card.Body>
    </Card>
  );
}
