import { CategoryDto } from "../models/category/CategoryDTO";

const fetchCategories = async (onSuccess: (data: CategoryDto[]) => void) => {
    try {
        const res = await fetch("https://localhost:7202/api/categories");
        const data = await res.json();
        onSuccess(data);
    } catch (error) {
        console.error("Kategori alınamadı:", error);
    }
};

export {
    fetchCategories
}