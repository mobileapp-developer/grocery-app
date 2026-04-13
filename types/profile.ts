export type Profile = {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    gender: string;
    birthday: Date;
}

type GenderOption = "Male" | "Female" | "Other";

export type ProfileForm = {
    first_name: string;
    last_name: string;
    phone: string;
    gender: GenderOption;
    birthday: string;
};