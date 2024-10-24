const Minio = require("minio");
require("dotenv").config();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const upload = async (file) => {
  console.log("inside upload");

  const bucketName = "films";
  const objectName = file.originalname;
  const metaData = {
    "Content-Type": file.mimetype,
  };

    await minioClient.putObject(bucketName, objectName, file.buffer, metaData);
  console.log("inside upload");
  return `http://localhost:9000/${bucketName}/${objectName}`;
};

module.exports = { minioClient, upload };
