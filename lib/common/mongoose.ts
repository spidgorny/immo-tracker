import mongoose from "mongoose";
import Papa from "papaparse";
import { splitChunks } from "./array";
import axios from "axios";
import * as fs from "fs";

export async function connectMongoose() {
  let rdsFilePath = `/tmp/rds-combined-ca-bundle.pem`;
  let pemFileExists;
  try {
    pemFileExists = fs.statSync(rdsFilePath);
  } catch {}
  console.log({ pemFileExists });

  if (!pemFileExists) {
    const url =
      "https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem";
    console.log("downloading", url);
    const res = await axios.get(url);
    console.log("saving", res.data.substring(0, 20));
    fs.writeFileSync(rdsFilePath, res.data);
  }

  console.log({ rdsFilePath });
  const connection = await mongoose.connect(process.env.mongodb, {
    tlsCAFile: rdsFilePath,
    sslCA: rdsFilePath,
    sslValidate: false,
    tlsAllowInvalidHostnames: true,
    connectTimeoutMS: 2000,
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    dbName: "admin",
    replicaSet: "rs0",
    heartbeatFrequencyMS: 2000,
    directConnection: true,
    autoCreate: true,
    autoIndex: true,
    ignoreUndefined: false,
  });
  console.log("connected");
  return connection;
}

export function makeDLCModel() {
  const Schema = mongoose.Schema;
  // const ObjectId = mongoose.Types.ObjectId;
  const DLCEntrySchema = new Schema({
    serialNumber: {
      type: String,
      index: true,
      unique: true,
      dropDups: true,
      required: true,
    },
    dlControlNumbers: {
      type: [String],
      index: true,
    },
    poNumber: String,
    anNumber: String,
    swName: String,
    timestamp: Date,
    dsStatus: Number,
  });
  DLCEntrySchema.set("strict", false);
  DLCEntrySchema.set("strictQuery", false);

  return mongoose.model("DLCEntry", DLCEntrySchema);
}

export function getDLCModel() {
  return mongoose.models.DLCEntry || makeDLCModel();
}

export async function saveDocument(props) {
  try {
    const MyModel = getDLCModel();
    const instance = new MyModel(props);
    await instance.save();
  } catch (e) {
    if (e.code === 11000) {
      return;
    }
    console.log(e);
    throw e;
  }
}

export async function insertRow(row) {
  // console.log(row);
  const [
    serialNumber,
    dlControlNumber1,
    dlControlNumber2,
    poNumber,
    anNumber,
    swName,
    timestamp,
    dsStatus,
  ] = row;

  if (!timestamp) {
    return;
  }

  const dateParts = timestamp.substring(0, 10).split(".");
  const iso_date =
    dateParts.reverse().join("-") + "T" + timestamp.slice(11) + "Z";

  const document = {
    serialNumber,
    dlControlNumbers: [dlControlNumber1, dlControlNumber2],
    poNumber,
    anNumber,
    swName,
    timestamp: new Date(iso_date).toISOString(),
    dsStatus: Number(dsStatus),
  };
  // console.log(document);
  // return await postDocument(document); // pocket
  return await saveDocument(document); // mongoose
  // console.log({ pid: process.pid, res, uptime: process.uptime() });
}
