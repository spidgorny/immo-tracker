import { Card, Stack } from "react-bootstrap";
import { HStack } from "../widgets/hstack";
import { niceMoney } from "../../lib/common/number";

export function PropCard({ prop }) {
  return (
    <Card className="">
      <Card.Body className="">
        <h6 className="p-0 m-0">{prop.name}</h6>
        <HStack
          className="mt-3 justify-content-between font-monospace text-end flex-column align-items-end flex-md-row"
          style={{ fontSize: "10pt" }}
        >
          <div>Price: {niceMoney(prop.price)}</div>
          <div>
            Area: {prop.area} m<sup>2</sup>
          </div>
          <div>
            Price/m2: {(prop.price / prop.area).toFixed(2)} / m<sup>2</sup>
          </div>
        </HStack>
      </Card.Body>
    </Card>
  );
}
