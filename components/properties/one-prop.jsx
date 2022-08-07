import { Card, Stack } from "react-bootstrap";
import { HStack } from "../widgets/hstack";
import { niceMoney } from "../../lib/common/number";

export function PropCard({ prop }) {
  return (
    <Card className="border-0">
      <Card.Header>{prop.name}</Card.Header>
      <Card.Body className="">
        <HStack
          className="mt-3 justify-content-between font-monospace flex-column align-items-end flex-md-row"
          style={{ fontSize: "10pt" }}
        >
          <DisplayNumber title="Price" value={niceMoney(prop.price)} />
          <DisplayNumber
            title="Area"
            value={prop.area}
            unit={
              <span>
                m<sup>2</sup>
              </span>
            }
          />
          <DisplayNumber
            title={
              <span>
                Price/m<sup>2</sup>
              </span>
            }
            value={(prop.price / prop.area).toFixed(2)}
            unit={
              <span>
                m<sup>2</sup>
              </span>
            }
          />
        </HStack>
      </Card.Body>
    </Card>
  );
}

export function DisplayNumber({ title, value, unit }) {
  return (
    <div className="border rounded p-2">
      <div className="fs-5 text-muted">{title}</div>
      <HStack gap={1}>
        <div className="fs-4">{value}</div>
        {unit && <div className="fs-6">{unit}</div>}
      </HStack>
    </div>
  );
}
