using AutoMapper;
using MoonLightBooks.Application.DTOs;
using MoonLightBooks.Application.DTOs.Auth;
using MoonLightBooks.Application.DTOs.Admin;
using MoonLightBooks.Domain.Entities;
using MoonLightBooks.Application.DTOs.Cart;
using MoonLightBooks.Application.DTOs.User;

namespace MoonLightBooks.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Book
            CreateMap<Book, BookDto>().ReverseMap();
            CreateMap<Book, CreateBookDto>().ReverseMap();

            // Category
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Category, CreateCategoryDto>().ReverseMap();

            // CartItem
            CreateMap<CartItem, CartItemDto>()
                .ForMember(dest => dest.BookTitle, opt => opt.MapFrom(src => src.Book.Title))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Book.Price))
                .ForMember(dest => dest.BookImageUrl, opt => opt.MapFrom(src => src.Book.ImageUrl));

            CreateMap<AddToCartDto, CartItem>();

            // Admin - kullanıcı listesi
            CreateMap<ApplicationUser, UserDto>();
        }
    }
}

