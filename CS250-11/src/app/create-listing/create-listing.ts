import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-listing.html',
  styleUrl: './create-listing.css',
})
export class CreateListing {
  produceOptions: string[] = [
    'Apples', 'Apricots', 'Artichokes', 'Arugula', 'Asparagus', 'Avocados',
    'Bananas', 'Basil', 'Beets', 'Bell Peppers', 'Blackberries', 'Blueberries',
    'Bok Choy', 'Broccoli', 'Brussels Sprouts', 'Butternut Squash',
    'Cabbage', 'Cantaloupe', 'Carrots', 'Cauliflower', 'Celery', 'Cherries',
    'Cilantro', 'Collard Greens', 'Corn', 'Cucumbers',
    'Dates', 'Dill',
    'Eggplant', 'Elderberries', 'Endive',
    'Figs',
    'Garlic', 'Ginger', 'Grapefruit', 'Grapes', 'Green Beans', 'Green Onions', 'Guava',
    'Honeydew',
    'Jalapenos',
    'Kale', 'Kiwi', 'Kohlrabi',
    'Leeks', 'Lemons', 'Lettuce', 'Limes', 'Lychee',
    'Mangoes', 'Mint', 'Mushrooms',
    'Nectarines',
    'Okra', 'Onions', 'Oranges', 'Oregano',
    'Papaya', 'Parsley', 'Parsnips', 'Passion Fruit', 'Peaches', 'Pears',
    'Peas', 'Persimmons', 'Pineapple', 'Plantains', 'Plums', 'Pomegranates',
    'Potatoes', 'Pumpkins',
    'Radishes', 'Raspberries', 'Rhubarb', 'Rosemary',
    'Sage', 'Spinach', 'Squash', 'Strawberries', 'Sweet Potatoes',
    'Thyme', 'Tomatillos', 'Tomatoes', 'Turnips',
    'Watermelon',
    'Yams',
    'Zucchini',
    'Other'
  ];

  filteredOptions: string[] = [];
  showDropdown = false;
  searchText = '';

  listingOfProduceOrFruit = {
    producename: '',
    quantOfProduce: 1,
    descrpt: '',
    house: '',
    availUntil: '',
    contactInfo: '',
  };

  submit = false;
  message = '';

  constructor(private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {}

  onSearchInput() {
    const query = this.searchText.toLowerCase().trim();
    if (query.length === 0) {
      this.filteredOptions = this.produceOptions;
    } else {
      this.filteredOptions = this.produceOptions.filter(item =>
        item.toLowerCase().includes(query)
      );
    }
    this.showDropdown = true;
  }

  onFocusSearch() {
    this.filteredOptions = this.produceOptions;
    this.showDropdown = true;
  }

  selectProduce(item: string) {
    if (item === 'Other') {
      this.listingOfProduceOrFruit.producename = '';
      this.searchText = '';
    } else {
      this.listingOfProduceOrFruit.producename = item;
      this.searchText = item;
    }
    this.showDropdown = false;
  }

  onBlurSearch() {
    // Small delay so click on dropdown option registers before hiding
    setTimeout(() => {
      this.showDropdown = false;
      // If they typed something that doesn't match any option and didn't select "Other"
      if (this.searchText && !this.listingOfProduceOrFruit.producename) {
        this.searchText = '';
      }
      this.cdr.detectChanges();
    }, 200);
  }

  async submitListing() {
    this.message = '';

    if (!this.listingOfProduceOrFruit.producename || !this.listingOfProduceOrFruit.quantOfProduce || !this.listingOfProduceOrFruit.house) {
      this.message = 'Please fill out the required fields before submitting.';
      return;
    }

    if (this.listingOfProduceOrFruit.quantOfProduce < 1) {
      this.message = 'Quantity must be at least 1.';
      return;
    }

    this.submit = true;
    try {
      const { data } = await this.supabaseService.getSession();
      const user = data.session?.user;
      if (!user) {
        this.message = 'You must be logged in to create a listing.';
        this.submit = false;
        return;
      }

      const { error } = await this.supabaseService.saveProduceListing({
        user_id: user.id,
        title: this.listingOfProduceOrFruit.producename,
        quantity: String(this.listingOfProduceOrFruit.quantOfProduce),
        description: this.listingOfProduceOrFruit.descrpt,
        location: this.listingOfProduceOrFruit.house,
        available_until: this.listingOfProduceOrFruit.availUntil || null,
        contact_info: this.listingOfProduceOrFruit.contactInfo || null
      });

      if (error) {
        console.error('Error saving listing:', error);
        this.message = 'Could not save the listing. Please try again.';
      } else {
        this.message = 'Listing posted successfully!';
        this.listingOfProduceOrFruit = {
          producename: '',
          quantOfProduce: 1,
          descrpt: '',
          house: '',
          availUntil: '',
          contactInfo: '',
        };
        this.searchText = '';
      }
    } catch (err) {
      console.error(err);
      this.message = 'An unexpected error occurred. Please try again.';
    }
    this.submit = false;
    this.cdr.detectChanges();
  }
}
