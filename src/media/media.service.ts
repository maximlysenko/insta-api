import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MediaService {
  async upload(file: Express.Multer.File) {
    return this.getBlobClient(file.originalname).uploadData(file.buffer);
  }

  private getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(
      process.env.AZURE_CONNECTION,
    );
    const containerClient =
      blobClientService.getContainerClient("insta-app-images");

    return containerClient.getBlockBlobClient(imageName);
  }
}
