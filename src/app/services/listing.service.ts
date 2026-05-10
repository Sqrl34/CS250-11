import { Injectable } from '@angular/core';
import { Listing } from '../model/listing';

@Injectable({ providedIn: 'root' })
export class ListingService {

  // TEMP MOCK DATA — replace with API call later
  private listings: Listing[] = [
    {
      id: 1,
      user_id: '123',
      title: 'Fresh Tomatoes',
      quantity: 12,
      description: 'Organic tomatoes from my garden.',
      location: 'San Diego, CA',
      available_until: '2026-05-10',
      created_at: '2026-05-05',
      contact_info: 'email@example.com'
    }
  ];

  getListings() {
    return this.listings;
  }
}
