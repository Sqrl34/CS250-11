import { Component } from '@angular/core';
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
  //addto it if more things are thought of after you take over the proj
  listing = {
    title: '',
    quantity: '',
    description: '',
    location: '',
    availableUntil: '',
  };
  isSubmitting = false;
  message = '';
  constructor(private supabaseService: SupabaseService){}
  async submitListing(){
    this.message = '';
    // some people are idiots and wont fill it out.
      if(!this.listing.title || !this.listing.title || !this.listing.location){
        this.message = 'please fill out the required sections before you submit the form.';
        return;
        }
    this.isSubmitting = true;
    try{
      //if the user isnt signed in with the googel auth they shouldnt be on the page but just in case
      //this should work last time i tried it didnt though so idk.
      const {data} = await this.supabaseService.getSession();
      const user = data.session?.user;
      if (!user){
        this.message = 'You must be logged in to create a listing dummy.';
        this.isSubmitting = false;
        return;
      }

      //save teh listing to the database. make sure ts works on the backend
      const { error } = await this.supabaseService.saveProduceListing({
        user_id: user.id,
        title: this.listing.title,
        quantity: this.listing.quantity,
        description: this.listing.description,
        location: this.listing.location,
        available_until: this.listing.availableUntil || null
      });
      if (error){ //had to put this in to avoid posting on the front end while error on the back end
        console.error('there was an error saving listing please try again:', error);
        this.message = 'we couldnt save the listing';
      }else{
        this.message = 'the listing was posted successfully';
        this.listing = {
          title: '',
          quantity: '',
          description: '',
          location: '',
          availableUntil: '',
        };
      }
    } catch(err){
      console.error(err);
      this.message = 'there was an unexpected error, probably our fault, please try again.';
    }
    this.isSubmitting = false;
  }
}
