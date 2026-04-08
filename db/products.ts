import {supabase} from "@/db/supabase";

export async function getProductsByCategoryId(category_id: number) {
    const {data, error} = await supabase
        .from('products')
        .select()
        .eq('category_id', category_id);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}