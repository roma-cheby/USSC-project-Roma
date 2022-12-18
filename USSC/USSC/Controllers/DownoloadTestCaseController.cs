// using Microsoft.AspNetCore.Mvc;
// using USSC.Dto;
//
// namespace USSC.Controllers;
//
// // должно работать, но не работает(
// public class DownoloadTestCaseController : Controller
// {
//     private ModelsContext _context;
//     private IWebHostEnvironment _webHostEnvironment;
//     
//     public DownoloadTestCaseController(ModelsContext context, IWebHostEnvironment webHostEnvironment)
//     {
//         _context = context;
//         _webHostEnvironment = webHostEnvironment;
//     }
//  
//     public IActionResult Index()
//     {
//         return View(_context.Files.ToList());
//     }
//     [HttpPost]
//     public async Task<IActionResult> AddFile(IFormFile uploadedFile)
//     {
//         if (uploadedFile != null)
//         {
//             // путь к папке Files
//             string path = "/Files/" + uploadedFile.FileName;
//             // сохраняем файл в папку Files в каталоге wwwroot
//             using (var fileStream = new FileStream(_webHostEnvironment.WebRootPath + path, FileMode.Create))
//             {
//                 await uploadedFile.CopyToAsync(fileStream);
//             }
//             TestTaskFile file = new TestTaskFile { Name = uploadedFile.FileName, Path = path };
//             _context.Files.Add(file);
//             _context.SaveChanges();
//         }
//             
//         return RedirectToAction("Index");
//     }
// }
//     
//     // [HttpGet]
//     // public async Task<IActionResult> GetSomeFile() {
//     //     /// Создаете объект Stream для передачи
//     //     var stream = Array.Empty<byte>();/* ваш код создания объекта Stream */
//     //     /// Вызов метода из базового класса ControllerBase
//     //     return File(System.Text.Encoding.UTF8.GetBytes("yourstring"),
//     //         "mime тип вашего файла",
//     //         "имя_вашего_файла");
//     // }
