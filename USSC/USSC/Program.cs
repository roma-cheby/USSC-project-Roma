using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Context;
using Serilog.Events;
using USSC;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using USSC.Dto;
using USSC.Entities;
using USSC.Helpers;
using USSC.Profiles;
using USSC.Services;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions {WebRootPath = "Files"});

// Add services to the container.

builder.Host.UseSerilog((cts, lc) =>
        lc
            .Enrich.WithThreadId()
            .Enrich.FromLogContext()
            // .AuditTo.Sink<SerilogSink>()
            // .Filter.With<SerilogFilter>()
            // .Enrich.With<SerilogEnrich>()
            .WriteTo.Console(
                LogEventLevel.Information,
                outputTemplate:
                "{Timestamp:HH:mm:ss:ms} LEVEL:[{Level}]| THREAD:|{ThreadId}| Source: |{Source}| {Message}{NewLine}{Exception}"));

LogContext.PushProperty("Source", "Program");
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<DataContext>(opt => 
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// builder.Services.AddDbContext<ApplicationDb>(opt => 
//     opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// builder.Services.AddScoped(typeof(IEfRepository<>), typeof(UserRepository<>));
// builder.Services.AddScoped<UserRepository<UsersEntity>>();
// builder.Services.AddScoped<ProfileRepository>();
// builder.Services.AddScoped(typeof(IEfRepository<>), typeof(ApplicationRepository<>));
// builder.Services.AddScoped(typeof(IEfRepository<ProfileEntity>), typeof(ProfileRepository<ProfileEntity>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
builder.Services.AddScoped<ITestCaseRepository, TestCaseRepository>();
builder.Services.AddScoped<IDirectionRepository, DirectionRepository>();
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();
builder.Services.AddScoped<IPracticeRepository, PracticeRepository>();
// builder.Services.AddScoped<IEfRepository<UsersEntity>>();
// builder.Services.AddScoped<IEfRepository<ProfileEntity>>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IApplicationService, ApplicationService>();
builder.Services.AddScoped<ITestCaseService, TestCaseService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IDirectionService, DirectionService>();
builder.Services.AddScoped<IPracticeService, PracticeService>();
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
    );
builder.Services.AddAutoMapper(typeof(UserProfile));
builder.Services.AddAutoMapper(typeof(ApplicationProfile));
builder.Services.AddAutoMapper(typeof(TestCaseProfiles));
builder.Services.AddAutoMapper(typeof(PracticesProfile));
builder.Services.AddAutoMapper(typeof(ProfileUserProfile));
builder.Services.AddAutoMapper(typeof(RequestProfile));
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "USSC-project", Version = "v1" });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Помогает отлаживать HTTP запросы
// app.UseHttpLogging();
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<JwtMiddleware>();
// app.UseEndpoints(x => x.MapControllers());

app.Run();