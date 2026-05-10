export interface produce_listings {
    user_id: string;
    title: string;
    quantity: number;
    description: string | null;
    location: string | null;
    available_until: string;
    contact_info: string;
}