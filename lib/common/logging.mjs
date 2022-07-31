export function consoleLogLogout(...vars) {
	console.log("%c [LOGOUT] ", "background: #000000E5; color: #FFFF00", ...vars);
}

export function consoleLogCartFunctions(...vars) {
	console.log("%c [CART LOGS (General)] ", "background: #0066DA; color: #FFFF00", ...vars);
}

export function consoleLogUseEffect(...vars) {
	console.log("%c [useEffect LOGS] ", "background: #198038; color: #FFFFFF", ...vars);
}

export function consoleLogForgotPasswordForm(...vars) {
	console.log("%c [PasswordResetForm] ", "background: #03A196; color: #FFFFFF", ...vars);
}

export function consoleLogPushCart(...vars) {
	console.log("%c [Push Cart Function] ", "background: #800080; color: #FFFFFF", ...vars);
}

export function consoleLogMergeCart(...vars) {
	console.log("%c [mergeCart Function] ", "background: #0005FD; color: #FFFFFF", ...vars);
}

export function consoleLogPushOwl(...vars) {
	console.log("%c [PushOwl Function] ", "background: #55447E; color: #FFFFFF", ...vars);
}

export function consoleLogCustomer(...vars) {
	console.log("%c [checkCustomerType] ", "background: #F7466D; color: #FFFFFF", ...vars);
}

export function consoleLogPayPal(...vars) {
	console.log("%c [PayPal Checkout] ", "background: #00008B; color: #FFFFFF", ...vars);
}


export function consoleLogGreenBgWhiteText(...vars) {
	console.log("%c [Checkout Logs] ", "background: #A2CF60; color: #FFFFFF", ...vars);
}

export function consoleLogSubmitPayment(...vars) {
	console.log("%c [Submit Payment Logs] ", "background: #000080; color: #FFFFFF", ...vars);
}

export function consoleLogOrder(...vars) {
	console.log("%c [Order Logs] ", "background: #000000; color: #00FF00", ...vars);
}

// White = #FFFFFF
// Black = #000000
// Dark Gray = #454545
// Light Gray = #999999

// Primary Colors
// Red = #FF0000
// Green = #00FF00
// Blue = #0000FF

// Navy = #000080
// Lime Green = #DFFF00
// Orange = #FFBF00
// Magenta = #DE3163
// Teal = #9FE2BF
// Aqua = #40E0D0
// Baby Blue = #6495ED
// Light Purple = #CCCCFF

export function logDBResponse(res) {
	if (!res) {
		console.log(
			"%c[savePaymentIntentToDB] Response =>",
			"background: #313539; color: #FFFFFF",
			"❌❌",
		);
	}
	if (res) {
		console.log("%c[savePaymentIntentToDB] Response =>",
			"background: #313539; color: #FFFFFF",
			"✔✔",
		);
	}
}
