import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "gilang-storage-service",
  keyFilename: "service-account.json",
});

const bucketName = "hr-webapp";
const gcs = storage.bucket(bucketName);

export default gcs;
