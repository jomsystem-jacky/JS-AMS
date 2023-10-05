using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.VisualBasic.FileIO;

namespace JS.AMSWeb.Services.Azure
{
    public class AzureBlobService : IAzureBlobService
    {
        private const string AZURE_STORAGE_ACCOUNT_NAME = "jomams";
        private const string AZURE_STORAGE_ACCOUNT_KEY = "67XtPbAtBR2KXGfWdbnXNL9MroupvmRqT2miwS5B6zhqfympvxaPsmVVu5PCcpH+ipaR1Xa6kfd/+AStssAQ9g==";
        public const string AZURE_STORAGE_DOMAIN = "https://jomams.blob.core.windows.net/";
        public const string AZURE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=bposimages;AccountKey=67XtPbAtBR2KXGfWdbnXNL9MroupvmRqT2miwS5B6zhqfympvxaPsmVVu5PCcpH+ipaR1Xa6kfd/+AStssAQ9g==;EndpointSuffix=core.windows.net";

        //update path , all fake
        public AzureBlobService()
        {
        }

        public bool AddImage(string objectKey, string localFilePath, string containerName)
        {
            MemoryStream ms = new MemoryStream();
            using (FileStream file = new FileStream(localFilePath, FileMode.Open, FileAccess.Read))
            {
                file.CopyTo(ms);
            }

            // Create a URI to the blob
            Uri blobUri = new Uri($"{AZURE_STORAGE_DOMAIN}{containerName}/{objectKey}");

            // Create StorageSharedKeyCredentials object by reading the values from the configuration (appsettings.json)
            StorageSharedKeyCredential storageCredentials =
                new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY);

            // Create the blob client.
            BlobClient blobClient = new BlobClient(blobUri, storageCredentials);

            // Upload the file

            ms.Position = 0;

            var state = blobClient.Upload(ms, new BlobHttpHeaders { ContentType = "image/jpeg" });
            return true;
        }

        public string GetBlobUrl(string objectKey, string containerName)
        {
            return $"{AZURE_STORAGE_DOMAIN}{containerName}/{objectKey}";
        }

    }
}
