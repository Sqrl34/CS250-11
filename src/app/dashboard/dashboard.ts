// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   imports: [],
//   templateUrl: './dashboard.html',
//   styleUrl: './dashboard.css',
// })
// export class DashBoardComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingService } from '../services/listing.service';
import { Listing } from '../model/listing';
import { SupabaseService } from '../services/supabase';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  listings: Listing[] = [];

  constructor(private listingService: ListingService) {}

  ngOnInit() {
    this.listings = this.listingService.getListings();
  }

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}
