using Microsoft.AspNetCore.Mvc;
using ExcelAddinServer.Data;
using ExcelAddinServer.Models;

namespace ExcelAddinServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<DataController> _logger;
    public DataController(AppDbContext db, ILogger<DataController> logger){ _db = db; _logger = logger; }

    [HttpPost("import")]
    public async Task<IActionResult> Import([FromBody] List<Dictionary<string,object>> rows){
        if (rows == null || rows.Count == 0) return BadRequest(new { message = "No data provided" });
        var inserted = 0;
        foreach(var r in rows){
            var rec = new Record { Name = r.ContainsKey("Name") ? r["Name"]?.ToString() : null, CreatedAt = DateTime.UtcNow };
            _db.Records.Add(rec);
            inserted++;
        }
        await _db.SaveChangesAsync();
        return Ok(new { inserted });
    }

    [HttpGet("export")]
    public async Task<IActionResult> Export(){
        var items = await _db.Records.OrderByDescending(r=>r.CreatedAt).Take(1000).ToListAsync();
        return Ok(items);
    }
}
