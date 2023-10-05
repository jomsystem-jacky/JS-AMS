namespace JS.AMSWeb.Services.Azure
{
    public interface IAzureBlobService
    {
        bool AddImage(string objectKey, string localFilePath, string containerName);
        string GetBlobUrl(string objectKey, string containerName);
    }

}
