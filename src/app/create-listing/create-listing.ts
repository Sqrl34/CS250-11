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
  listingOfProduceOrFruit = {
    producename: '',
    quantOfProduce: '',
    descrpt: '',
    house: '',
    availUntil: '',
  };
  submit = false;
  message = '';
  constructor(private supabaseService: SupabaseService){}
  async submitListing(){
    this.message = '';
    // some people are idiots and wont fill it out.
      if(!this.listingOfProduceOrFruit.producename || !this.listingOfProduceOrFruit.quantOfProduce || !this.listingOfProduceOrFruit.house){
        this.message = 'please fill out the required sections before you submit the form.';
        return;
        }
    this.submit = true;
    try{
      //if the user isnt signed in with the googel auth they shouldnt be on the page but just in case
      //this should work last time i tried it didnt though so idk.
      const {data} = await this.supabaseService.getSession();
      const user = data.session?.user;
      if (!user){
        this.message = 'You must be logged in to create a listing dummy.';
        this.submit = false;
        return;
      }

      //save teh listing to the database. make sure ts works on the backend
      const { error } = await this.supabaseService.saveProduceListing({
        user_id: user.id,
        title: this.listingOfProduceOrFruit.producename,
        quantity: this.listingOfProduceOrFruit.quantOfProduce,
        description: this.listingOfProduceOrFruit.descrpt,
        location: this.listingOfProduceOrFruit.house,
        available_until: this.listingOfProduceOrFruit.availUntil || null
      });
      if (error){ //had to put this in to avoid posting on the front end while error on the back end
        console.error('there was an error saving listing please try again:', error);
        this.message = 'we couldnt save the listing';
      }else{
        this.message = 'the listing was posted successfully';
        this.listingOfProduceOrFruit = {
          producename: '',
          quantOfProduce: '',
          descrpt: '',
          house: '',
          availUntil: '',
        };
      }
    } catch(err){
      console.error(err);
      this.message = 'there was an unexpected error, probably our fault, please try again.';
    }
    this.submit = false;
  }
}
