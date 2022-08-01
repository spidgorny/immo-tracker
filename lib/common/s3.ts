import proxy from "proxy-agent";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import invariant from "tiny-invariant";
import mime from "mime-types";

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

export async function uploadBufferToS3(
  fileName,
  fileBytes,
  ContentType = null
) {
  if (process.env.HTTP_PROXY) {
    AWS.config.update({
      httpOptions: { agent: proxy(process.env.HTTP_PROXY) },
    });
  }

  invariant(process.env.YOURACCESSKEYID, "fix .env");

  const s3 = new AWS.S3({
    accessKeyId: process.env.YOURACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION,
  });

  console.log(process.env.BUCKET, process.env.HTTP_PROXY);
  ContentType = ContentType ?? mime.lookup(fileName);
  const params = {
    Bucket: process.env.BUCKET,
    Key: fileName,
    Body: fileBytes,
    ContentType: ContentType || "application/octet-stream",
    // CacheControl: "max-age=172800",
    // ChecksumAlgorithm: 'sha256'
    // ACL: "public-read", //To make file publicly accessible through URL
  };
  // console.log(params)

  return await s3.upload(params).promise();
}

export async function uploadFileToS3(task) {
  const { file: fileName } = task;
  invariant(fileName);
  if (process.env.HTTP_PROXY) {
    AWS.config.update({
      httpOptions: { agent: proxy(process.env.HTTP_PROXY) },
    });
  }

  invariant(process.env.YOURACCESSKEYID, "fix .env");

  const s3 = new AWS.S3({
    accessKeyId: process.env.YOURACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION,
  });

  const fileData = fs.createReadStream(fileName);

  console.log(process.env.BUCKET, process.env.HTTP_PROXY);
  const ContentType = mime.lookup(fileName);
  const params = {
    Bucket: process.env.BUCKET,
    Key: path.basename(fileName),
    Body: fileData,
    ContentType: ContentType || "application/octet-stream",
    CacheControl: "max-age=172800", // ChecksumAlgorithm: 'sha256'
    // ACL: "public-read", //To make file publicly accessible through URL
  };
  // console.log(params)

  return await s3.upload(params).promise();
}

export async function uploadLargeFileToS3(fileName: string) {
  console.log("Uploading", fileName);
  if (process.env.HTTP_PROXY) {
    AWS.config.update({
      httpOptions: { agent: proxy(process.env.HTTP_PROXY) },
    });
  }

  invariant(process.env.YOURACCESSKEYID, "fix .env");
  invariant(process.env.REGION, "fix .env");

  const s3 = new AWS.S3({
    accessKeyId: process.env.YOURACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION,
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
  });

  const fileData = fs.createReadStream(fileName);

  console.log(process.env.BUCKET, process.env.HTTP_PROXY);
  const ContentType = mime.lookup(fileName);

  const baseName = path.basename(fileName.replaceAll("\\", "/"));
  const params = {
    Bucket: process.env.BUCKET,
    Key: baseName,
    Body: fileData,
    ContentType: ContentType || "application/octet-stream",
    CacheControl: "max-age=172800", // ChecksumAlgorithm: 'sha256'
    // ACL: "public-read", //To make file publicly accessible through URL
  };
  console.log("s3 params", params);
  const upload = new AWS.S3.ManagedUpload({
    service: s3,
    params,
  });
  upload.on("httpUploadProgress", (e) => uploadProgress(e));
  upload.send();

  console.log("Upload starts now...");
  return await upload.promise();
}

async function uploadProgress(e) {
  console.log(e.key, ((e.loaded * 100) / e.total).toFixed(2), "%");
}
