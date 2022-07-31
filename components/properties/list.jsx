import { fetcher } from "../../lib/common/http.ts";
import useSWR from "swr";
import { ErrorAlert } from "../widgets/error-alert.tsx";
import { Card, Spinner } from "react-bootstrap";
import { niceMoney } from "../../lib/common/number.ts";
import { useState } from "react";
import { HStack } from "../widgets/hstack.tsx";
import Link from "next/link";

export function PropertiesList() {
  const { data, error } = useSWR("/api/properties/list", fetcher);

  return (
    <div className="my-5">
      <ErrorAlert error={error} />
      {!data && <Spinner animation="border" />}
      <PropTransformer props={data?.results}>
        {(data) => data?.map((prop) => <OneProp key={prop.id} prop={prop} />)}
      </PropTransformer>
      <hr />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export function PropTransformer({ props, children }) {
  const [sortBy, setSortBy] = useState("price");
  if (!props) {
    return null;
  }

  props = props.map((x) => ({
    ...x,
    pricePerM2: x.price / x.area,
  }));
  props.sort((a, b) => a[sortBy] - b[sortBy]);

  return (
    <div>
      <HStack className="justify-content-start bg-gray-100 p-2">
        <div>Sort by:</div>
        <div onClick={() => setSortBy("price")}>price</div>
        <div onClick={() => setSortBy("area")}>area</div>
        <div onClick={() => setSortBy("pricePerM2")}>
          price/m<sup>2</sup>
        </div>
      </HStack>
      <div className="my-1 d-flex flex-row flex-wrap gap-2">
        {children(props)}
      </div>
    </div>
  );
}

export function OneProp({ prop }) {
  return (
    <div
      className="overflow-hidden flex-grow-0 flex-shrink-1"
      style={{ flexBasis: "32%" }}
    >
      <Card className="">
        <Card.Body className="">
          <h6 className="p-0 m-0">
            <Link href={`/prop/${prop.id}`} passHref>
              <a className="stretched-link text-black text-decoration-none">
                {prop.name}
              </a>
            </Link>
          </h6>
          <div className="text-muted fs-4">
            <a href={prop.url} className="text-muted fs-6 text-truncate ">
              {prop.url}
            </a>
          </div>
          <HStack className="justify-content-between font-monospace">
            <div>{niceMoney(prop.price)}</div>
            <div>
              {prop.area} m<sup>2</sup>
            </div>
            <div>
              {(prop.price / prop.area).toFixed(2)} / m<sup>2</sup>
            </div>
          </HStack>
        </Card.Body>
      </Card>
    </div>
  );
}
