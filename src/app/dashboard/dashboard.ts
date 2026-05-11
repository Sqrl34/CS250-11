import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { produce_listings } from '../model/listing.model';
import { SupabaseService } from '../services/supabase';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  listings: produce_listings[] = [];
  isLoading = true;
  message = '';
  searchQuery = '';
  minQuantity : number | null = null;
  maxQuantity : number | null = null;

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
        this.listings = listings ?? [];
        this.filteredListings = this.listings;
      }
    } catch (err) {
      console.error(err);
      this.message = 'unexpected error occurred.'
    }

    this.isLoading = false;
    this.cdr.detectChanges();
  }

  filteredListings: produce_listings[] = [];

  applyFilters() {
    let results = this.listings;

    if(this.searchQuery.trim()) {
      const query = this.searchQuery.toLocaleLowerCase();
      results = results.filter(listing => listing.title?.toLowerCase().includes(query))
    }

    if(this.minQuantity !== null && this.minQuantity > 0) {
      results = results.filter(listing => listing.quantity >= this.minQuantity!);
    }

    if(this.maxQuantity !== null && this.maxQuantity > 0) {
      results = results.filter(listing => listing.quantity <= this.maxQuantity!);
    }

    this.filteredListings = results;
    this.cdr.detectChanges();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
