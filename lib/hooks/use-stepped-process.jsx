import { useState } from "react";

export function useSteppedProcess(numberOfSteps = 3) {
	const [currentStep, setCurrentStep] = useState(null);
	// -1: failure, 0: running, +1: success
	const [stepStatus, setStatus] = useState(new Array(numberOfSteps).fill(null));

	const stepsStart = () => {
		setCurrentStep(1);
		setStepStatus(1, 0);
	};

	const setCurrentStepStatus = (status) => {
		setStepStatus(currentStep, status);
	};

	const setStepStatus = (step, status) => {
		console.log("setStepStatus", step, "=", status);
		setStatus({
			...stepStatus,
			[step]: status,
		});
	};

	const stepSuccessfulGoToNext = () => {
		console.log("stepSuccessfulGoToNext", { currentStep });
		setCurrentStepStatus(1);
		setStepStatus(currentStep + 1, 0);
		incrementStep();
	};

	const incrementStep = () => {
		console.log("increment", currentStep, "=>", currentStep + 1);
		setCurrentStep(currentStep + 1);
	};

	const stepFailed = () => {
		setCurrentStepStatus(-1);
	};

	// console.log("process", { currentStep, stepStatus });

	return {
		stepsStart,
		stepSuccessfulGoToNext,
		steps: stepStatus,
		currentStep,
		setCurrentStepStatus,
		stepFailed,
	};
}
