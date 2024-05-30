import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function uploadFileToS3(buffer, filename, contentType, folderName) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${filename}`,
    Body: buffer,
    ContentType: contentType,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // This is the file URL
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

export default uploadFileToS3;

