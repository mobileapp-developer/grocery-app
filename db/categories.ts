import {supabase} from "@/db/supabase";

export async function getCategories() {
    const {data, error} = await supabase
        .from('categories')
        .select()
        .order('id', { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
