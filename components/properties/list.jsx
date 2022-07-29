import { fetcher } from "../../lib/common/http.ts";
import useSWR from "swr";
import { ErrorAlert } from "../widgets/error-alert.tsx";
import { Card, Spinner } from "react-bootstrap";
import { niceMoney } from "../../lib/common/number.ts";
import { useState } from "react";
import { HStack } from "../widgets/hstack.tsx";

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
      <HStack className="justify-content-start bg-success">
        <div>Sort by:</div>
        <div onClick={() => setSortBy("price")}>price</div>
        <div onClick={() => setSortBy("area")}>area</div>
        <div onClick={() => setSortBy("pricePerM2")}>
          price/m<sup>2</sup>
        </div>
      </HStack>
      <div className="my-1 row row-cols-1 row-cols-md-3 g-2">
        {children(props)}
      </div>
    </div>
  );
}

export function OneProp({ prop }) {
  return (
    <Card>
      <Card.Body className="">
        <h4 className="p-0 m-0">{prop.name}</h4>
        <div className="text-muted fs-4">
          <a href={prop.url} className="stretched-link">
            {prop.url}
          </a>
        </div>
        <HStack className="justify-content-start">
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
  );
}
