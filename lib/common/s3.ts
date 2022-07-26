import proxy from "proxy-agent";
import AWS from "aws-sdk";

export function initS3Proxy() {
	console.log({ http_proxy: process.env.http_proxy });
	if (process.env.http_proxy) {
		AWS.config.update({
			httpOptions: {
				agent: proxy(process.env.http_proxy),
			},
		});
	}
}
