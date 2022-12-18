// using Microsoft.AspNetCore.Mvc;
// using USSC.Entities;
// using USSC.Dto;
// using USSC.Services;
//
// namespace USSC.Controllers;
//
// [ApiController]
// [Route("[controller]")]
// public class InternshipApplicationController : ControllerBase
// {
//     private readonly IApplicationService _applicationService;
//     private readonly IUserService _userService;
//     public InternshipApplicationController(IApplicationService applicationService, IUserService userService)
//     {
//         _applicationService = applicationService;
//         _userService = userService;
//     }
//     
//     [HttpPost("createApplication")]
//     public IActionResult CreateApplication([FromQuery] BaseEntity entity, [FromBody]ApplicationModel application)
//     {
//         try
//         {
//             //вот это проверка на существование application, но там не работает из-за long
//             //не захотел полностью переделывать, поэтому оставил на подумать
//             //var id = _applicationService.GetById(int.Parse(application.Id));
//             var user = _userService.GetById(entity.Id);
//             var response = _applicationService.SubmitApplicationAsync(user, application);
//             return Ok(response.Result);
//         }
//         catch
//         {
//             return BadRequest(StatusCode(400));
//         }
//     }
// }