import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RoleSelectionComponent} from './role-selection';

describe('RoleSelectionComponent', () => {
    let component: RoleSelectionComponent;
    let fixture: ComponentFixture<RoleSelectionComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoleSelectionComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(RoleSelectionComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should select giver role', () => {
        component.selectRole('giver');
        expect(component.selectedRole()).toBe('giver');
    });
    it('should select receiver role', () => {
        component.selectRole('receiver');
        expect(component.selectedRole()).toBe('receiver');
    });
});