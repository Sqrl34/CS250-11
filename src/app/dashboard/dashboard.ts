import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { produce_listings } from '../model/listing.model';
import { SupabaseService } from '../services/supabase';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  listings: produce_listings[] = [];
  isLoading = true;
  message = '';

  constructor(private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.loadListings();
  }

  async loadListings() {
    this.isLoading = true;
    this.message = '';

    try {
      const { data: listings, error } = await this.supabaseService.getProduceListings();

      if(error) {
        console.error('Error occurred while fetching list:', error);
        this.message = 'Can\'t load listings. Please retry.';
      } else {
        this.listings = listings ?? []
      }
    } catch (err) {
      console.error(err);
      this.message = 'unexpected error occurred.'
    }

    this.isLoading = false;
    this.cdr.detectChanges();
  }

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}
