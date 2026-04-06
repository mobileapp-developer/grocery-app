import {supabase} from "@/db/supabase";

export async function getCategories() {
    const {data, error} = await supabase
        .from('categories')
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
