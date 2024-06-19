namespace CSE443_FinalProject.Services
{
    public class FileService
    {
        private readonly IWebHostEnvironment _environment;

        public FileService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public void SaveImage(IFormFile formFile, string pathFor, string name)
        {
            string Filepath = _environment.WebRootPath + "/Upload/" + pathFor;
            if (!Directory.Exists(Filepath))
            {
                Directory.CreateDirectory(Filepath);
            }

            string imagepath = Filepath + "/" + name + ".png";
            if (File.Exists(imagepath))
            {
                File.Delete(imagepath);
            }
            using (var stream = new FileStream(imagepath, FileMode.Create))
            {
                formFile.CopyTo(stream);
            }
        }

        public void RemoveImage(string name)
        {
            string imagepath = _environment.WebRootPath + name;
            if (File.Exists(imagepath))
            {
                File.Delete(imagepath);
            }
        }
    }
}
