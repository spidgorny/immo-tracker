import cn from "classnames";
import { isDevOrder } from "../../lib/common/is-dev.mjs";

export const StatusBadge = ({ status, paymentIntentId, paymentMethodId, email }) => {

	console.log({ status });
	console.log({ paymentIntentId });
	console.log({ paymentMethodId });
	console.log({ email });

	let classes = "bg-secondary";
	let text = status;
	let background = "";
	let color = "rgb(61, 64, 65)";
	let link;

	// console.log("Payment status => ", status);
	const isDev = isDevOrder({ email });

	const statusLowercase = String(status).toLowerCase();
	if (status === "authorized") {
		classes = "bg-warning text-dark";
		text = "Authorized";
	} else if (status === "paid") {
		classes = "bg-success text-white";
		text = "Paid";
	} else if (status === "unfulfilled") {
		classes = "bg-warning text-dark";
		background = "rgb(100, 60, 60)";
		text = "Unfulfilled";
	} else if (status === "fulfilled") {
		classes = "bg-secondary";
		text = "Fulfilled";
	} else if (status === "partially_refunded") {
		classes = "bg-secondary";
		text = "Partially Refunded";
	} else if (status === "partially_shipped") {
		classes = "bg-secondary";
		text = "Partially Shipped";
	} else if (status === "shipped") {
		classes = "bg-secondary";
		text = "Shipped";
	} else if (status === "refunded") {
		classes = "text-white";
		background = "rgb(239 150 28)";
		text = "Refunded";
	} else if (status === "paypal" && isDev === false) {
		classes = "bg-secondary text-black";
		text = "Paypal";
		paymentIntentId = paymentIntentId.replace("pp_", "");
		link = paymentIntentId ? `https://www.paypal.com/activity/payment/${paymentIntentId}` : null;

	} else if ((status === "sandbox_paypal") && isDev === true) {
		//https://www.sandbox.paypal.com/myaccount/transactions/?free_text_search=&filter_id=&currency=ALL&issuance_product_name=&asset_names=&asset_symbols=&type=&status=&start_date=2022-04-17&end_date=2022-07-16
		classes = "bg-secondary text-black";
		text = "Paypal";
		paymentIntentId = paymentIntentId.replace("pp_", "");
		link = paymentIntentId ? `https://sandbox.paypal.com/activity/payment/${paymentIntentId}` : null;

	} else if (status === "affirm") {
		classes = "bg-secondary text-black";
		text = "Affirm";
		link = paymentMethodId ? `https://www.affirm.com/dashboard/charges/${paymentMethodId}` : null;
	} else if (status === "sandbox_affirm") {
		classes = "bg-secondary text-black";
		text = "Affirm";
		link = paymentMethodId ? `https://sandbox.affirm.com/dashboard/charges/${paymentMethodId}` : null;
	} else if (statusLowercase === "stripe" || statusLowercase === "card") {
		classes = "bg-secondary text-black";
		text = "Stripe";
		link = paymentIntentId ? `https://dashboard.stripe.com/payments/${paymentIntentId}` : null;
	} else if (statusLowercase === "sandbox_stripe" || statusLowercase === "sandbox_card") {
		classes = "bg-secondary text-black";
		text = "Stripe";
		link = paymentIntentId ? `https://dashboard.stripe.com/test/payments/${paymentIntentId}` : null;
	} else if (statusLowercase === "authnet") {
		classes = "bg-secondary text-black";
		text = "Authorize.Net";
		link = paymentIntentId ? `https://dashboard.stripe.com/test/payments/${paymentIntentId}` : null;
	} else if (statusLowercase === "sandbox_authnet") {
		classes = "bg-secondary text-black";
		text = "Authorize.Net";
		link = paymentIntentId ? `https://dashboard.stripe.com/test/payments/${paymentIntentId}` : null;
	} else if (status === "voided") {
		classes = "bg-danger text-white";
		text = "Voided";
	} else {
		classes = "bg-secondary";
	}

	return (
		<div
			style={{
				["--bs-danger-rgb"]: "240, 120, 120",
				["--bs-warning-rgb"]: "255, 234, 137",
				["--bs-secondary-rgb"]: "228,229,231",
				backgroundColor: background,
				color: color,
				fontSize: "12px",
			}}
			className={`badge rounded-pill ${classes}`}
		>
			{link && <a href={link} target="_blank" rel="nofollow"
									className={cn(classes, "text-decoration-none")}>{text}</a>}
			{!link && <span>{text}</span>}
		</div>
	);
};
