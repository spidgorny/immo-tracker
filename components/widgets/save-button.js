import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";
import { HStack } from "./hstack";
import { useWorking } from "../../lib/http/http.js";

export function SaveButton(props) {
  // console.log("SaveButton Props => ", props)
  const { isWorking, wrapWorking } = useWorking();
  const [isSuccess, setSuccess] = useState(false);

  const onClick = wrapWorking(async (e) => {
    // console.log("Event => (save) ", e)
    props.onClick && (await props.onClick(e));
    setSuccess(true);
  });

  let isWorkingState = isWorking || props?.forceRunning;

  let isDisabled = isWorking || props?.buttonProps?.disabled;
  if (props.forceEnable) {
    isDisabled = false;
  }

  return (
    <>
      <Button
        className={props.className}
        onClick={onClick}
        variant={isSuccess ? props.variantSuccess : props.variant}
        disabled={props.disabled || isDisabled}
        type={props.type ?? "button"}
        size={props.size ?? props.buttonProps?.size}
        style={props.style ?? props.buttonProps?.style}
        {...(props?.buttonProps ?? {})}
      >
        <HStack className="justify-content-center">
          {isWorkingState && (
            <Spinner animation="border" size="sm" className="me-2" />
          )}
          <span>{props.children}</span>
        </HStack>
      </Button>
      {/*<Spinner animation="border" size="sm" />*/}
    </>
  );
}

SaveButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  buttonProps: PropTypes.any,
  forceRunning: PropTypes.bool,
  forceEnable: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.string,
  variantSuccess: PropTypes.string,
  style: PropTypes.object,
};
