import chalk from "chalk";


export let GLOBAL_CONFIG = {
	EnvType: "production",
};


export const setEnv = (EnvType) => {
	ifIsDev("development", "production", EnvType);
};

export function ifIsDev(dev, prod, EnvType = null) {

	if (EnvType) {
		GLOBAL_CONFIG.EnvType = EnvType;
	}
	EnvType = GLOBAL_CONFIG.EnvType;
	console.log(chalk.cyanBright(("[ENVIRONMENT] GLOBAL => ")), EnvType);

	if (EnvType === "production") {
		console.log((chalk.magenta("==== !! #1 Production Environment Recognized !!==== ")));
		return prod;
	} else if (EnvType === "development") {
		console.log((chalk.yellow("==== !! #1 Development Environment Recognized !!==== ")));
		return dev;
	} else if (EnvType !== "production" && process.env.NODE_ENV === "development") {
		console.log((chalk.yellow("==== !! #2 Development Environment Recognized !!==== ")));
		return dev;
	} else {
		console.log((chalk.magenta("==== !! #2 Production Environment Recognized !!==== ")));
		return prod;
	}
}


export function isDevOrder(order) {
	const dev_order_emails = ["kevinschlenker01@gmail.com", "recruiting@skaraudio.com", "helper@skaraudio.com", "andrew@beldenstreet.com"];
	if (dev_order_emails.includes(order.email)) {
		return true;
	} else {
		return false;
	}
}
