using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dating.app.data;
using dating.app.Models;
namespace dating.app
{
    [Route("[controller]")]
    [ApiController]
    public class ValueController : ControllerBase
    {
        private DataContext _dbContext;
        public ValueController(DataContext dbContext)
	    {
          _dbContext=dbContext;
	    }
        [HttpGet]
        public async Task<IActionResult> GetValue()
        {
            var value= await _dbContext.Value.ToListAsync();
            return Ok(value);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult>GetValue(int id){
            var value=await _dbContext.Value.FirstOrDefaultAsync(r=>r.Id==id);
            return Ok(value);
        }

    }
}