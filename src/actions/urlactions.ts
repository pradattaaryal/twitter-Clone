"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto" 

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")


const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEYY!,
    secretAccessKey: process.env.AWS_SECERATE_KEY!,
  },
})
interface SignedURLResponse {
  success?: { urlSigned: string };
  failure?: string;
}

export async function getSignedURL(): Promise<SignedURLResponse> {
 
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
  })

  const urlSigned = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  )

  return {success: {urlSigned}}
}