// using Microsoft.AspNetCore.Mvc;
// using USSC.Dto;
// using USSC.Entities;
// using USSC.Helpers;
// using USSC.Services;
//
// namespace USSC.Controllers;
//
// [ApiController]
// [Route("admin")]
// //[Authorize]
// public class AdminController: Controller
// {
//     private readonly IUserService _userService;
//     private readonly IApplicationService _applicationService;
//     private readonly ITestCaseService _testCaseService;
//
//     public AdminController(IUserService userService, IApplicationService applicationService, 
//         ITestCaseService testCaseService)
//     {
//         _userService = userService;
//         _applicationService = applicationService;
//         _testCaseService = testCaseService;
//     }
//     
//     /// <summary>
//     /// получение всех зарегистрированных пользователей
//     /// </summary>
//     [HttpGet("getUsers")]
//     public IActionResult GetAllUsers()
//     {
//         return Ok(_userService.GetAll());
//     }
//     
//     /// <summary>
//     /// получение всех отправленных заявок
//     /// </summary>
//     [HttpGet("getApplications")]
//     public IActionResult GetAllApplications()
//     {
//         return Ok(_applicationService.GetAll());
//     }
//     
//     /// <summary>
//     /// получение всех отправленных решений тестовых заданий
//     /// </summary>
//     [HttpGet("getPractices")]
//     public IActionResult GetAllTestCase()
//     {
//         return Ok(_testCaseService.GetAll());
//     }
//     
//     /// <summary>
//     /// возвращает путь к файлу решен
//     /// </summary>
//     /*[HttpGet("downloadPractices")]
//     public IActionResult DownLoadPractice([FromQuery] BaseEntity entity)
//     {
//         var user = _userService.GetById(entity.Id);
//         if (user.TestCaseId == default)
//             return BadRequest(new { Message = "Пользователь не предоставил решения" });
//         //тут не должно быть GetHashCode(), но я его поставил чтобы не было ошибки
//         //потому что user.TestCaseId должны быть int а не long
//         var testCasePath = _testCaseService.DownLoad(user.TestCaseId);
//         
//         return Ok(testCasePath);
//     }*/
//
//     /// <summary>
//     /// проверка практики куратором
//     /// </summary>
//     [HttpPost("reviewPractice")]
//     public IActionResult ReviewPractice([FromQuery] BaseEntity user, [FromBody] ReviewTestCaseModel caseModel)
//     {
//         var response = _testCaseService.ReviewTestCaseAsync(user, caseModel);
//         if (response.Result.Success)
//             return Ok(response.Result);
//         else
//             return BadRequest(response.Result); //здесь тоже логика с racticeService
//     }
//     
//     /// <summary>
//     /// добавление на сайт нового направления практики
//     /// </summary>
//     [HttpPost("addPractice")]
//     public IActionResult AddPractice()
//     {
//         return Ok();
//     }
//     
//     //добавление комментария к уже отправленной обратной связи (не на mvp)
//     // [HttpPost("comment")]
//     // public IActionResult AddCommentToSolution()
//     // {
//     //     return Ok();
//     // }
// }