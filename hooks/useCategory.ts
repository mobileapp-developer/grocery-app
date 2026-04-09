import {useEffect, useState} from "react";
import {Category} from "@/types/category";
import {getCategories} from "@/db/categories";

export function useCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategories();
                setCategories((data ?? []) as Category[]);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Failed to load categories");
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    return {categories, loading, error};
}