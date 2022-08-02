import dotenv from "dotenv";
import { findUp } from "find-up";
import axios from "axios";

const { AxiosError } = axios;

export async function loadEnv() {
  // console.log(process.cwd());
  let envPath = await findUp(".env");
  // console.log((chalk.cyan("Env Path => ")), envPath);
  dotenv.config({ path: envPath });
  console.log("HTTP_PROXY", process.env.HTTP_PROXY);
  // if (!process.env.MYSQL_HOST) {
  // 	throw new Error(".env not loaded");
  // }
}

export async function runTest(code) {
  try {
    console.warn("RUN TEST", code.name);
    await loadEnv();
    await code();
    console.log("Done in", process.uptime());
    process.exit(0);
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("ERROR", e.status, e.statusText);
      console.error("ERROR", e.response.data);
      if (e.response.data instanceof Buffer) {
        console.error(e.response.data.toString());
      }
    } else {
      console.error("ERROR", e);
    }
    console.log("Uptime", process.uptime());
  }
}

export function log(...vars) {
  console.log(process.uptime(), ...vars);
}
