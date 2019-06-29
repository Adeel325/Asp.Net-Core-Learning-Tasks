using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using PhotGallery.Models;

namespace PhotGallery.Pages
{
    public class ImageGalleryModel : PageModel
    {
        private ApplicationDbContext _context;
        public List<GalleryImage> GalleryImages { get; set; }
        public ImageGalleryModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task OnGet()
        {
            ViewData["SuccessMessage"] = TempData["SuccessMessage"];
            GalleryImages = await _context.GalleryImages.ToListAsync();
        }
    }
}