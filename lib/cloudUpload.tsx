import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ru-central1",
  credentials: {
    accessKeyId: process.env.OBJ_ACCESS_KEY,
    secretAccessKey: process.env.OBJ_SECRET_KEY,
  },
  endpoint: process.env.OBJ_ENDPOINT,
});

export async function GetUploadUrl(filename, filetype) {
  let params = {
    Bucket: process.env.OBJ_BUCKET_NAME,
    Key: filename,
    ContentType: filetype,
    CacheControl: "max-age=630720000",
  };

  const signedUrl = await getSignedUrl(s3Client, new PutObjectCommand(params), {
    expiresIn: 60 * 60,
  });

  return signedUrl;
}

export async function DeleteFileFromCloud(filename) {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.OBJ_BUCKET_NAME,
      Key: filename,
    })
  );
}
