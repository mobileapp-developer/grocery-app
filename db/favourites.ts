import {supabase} from "@/db/supabase";

export async function getFavourites(userId: string) {
    const {data, error} = await supabase
        .from('favourites')
        .select('*')
        .eq('user_id', userId);

    if (error) throw new Error(error.message);

    return data;
}

export async function addFavourite(userId: string, productId: number) {
    const {data, error} = await supabase
        .from('favourites')
        .insert({
            product_id: productId,
            user_id: userId,
        });
    if (error) throw new Error(error.message);

    return data;
}

export async function removeFavourite(userId: string, productId: number) {
    const {data, error} = await supabase
        .from('favourites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

    if (error) throw new Error(error.message);

    return data;
}