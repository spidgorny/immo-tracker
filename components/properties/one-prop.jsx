import { Card, Stack } from "react-bootstrap";
import { HStack } from "../widgets/hstack";
import { niceMoney } from "../../lib/common/number";

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
