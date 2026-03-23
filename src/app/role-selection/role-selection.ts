import {Component,signal} from '@angular/core';
import{SupabaseService} from '../services/supabase';
import{CommonModule} from '@angular/common';
import{Router} from '@angular/router';

@Component({
    selector: 'app-role-selection',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './role-selection.html',
    styleUrl: './role-selection.css',
})
export class RoleSelectionComponent {
    selectedRole = signal<'giver' | 'receiver' | null>(null);
    isLoading = signal(false);
    constructor(private supabaseService: SupabaseService, private router: Router) {}
    selectRole(role:'giver'|'receiver') {this.selectedRole.set(role);}
    async confirmRole(){
        const role = this.selectedRole();
        console.log('Selected role:', role);
        if (!role) return;
        this.isLoading.set(true);
        console.log('Saving role now...');
        try{
            const{data} = await this.supabaseService.getSession();
            const user = data.session?.user;
            console.log('User\'s session:', user);
            if(user){
                this.supabaseService.setUserRole(role);
                try{
                    console.log('Saving user role to db...');
                    await this.supabaseService.saveUserRole(user.id, role);
                    console.log("Saved user role to db successfully");
                }catch(dbError){
                    console.warn('Failed to save user role to db, going to use local state now', dbError);
                }
            }else{
                this.supabaseService.setUserRole(role);
            }
            console.log('Navigating to dashboard now..');
            this.router.navigate(['/dashboard']);
            console.log('Navigated to dashboard now');
            this.isLoading.set(false);
        }catch(error){
            console.error('Saving role error', error);
            this.isLoading.set(false);
        }
    }
}