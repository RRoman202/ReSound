using Microsoft.EntityFrameworkCore;
using ReSound.Server.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ReSoundContext>(e => e.UseNpgsql(builder.Configuration.GetConnectionString("ReSoundDb")));
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

builder.Services.AddCors();


app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseStaticFiles();

app.UseCors(opts => opts.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
