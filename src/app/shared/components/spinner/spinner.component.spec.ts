import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
    let component: SpinnerComponent;
    let fixture: ComponentFixture<SpinnerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpinnerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain spinner', () => {
        // Arrange
        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
        component.isLoading = true;
        fixture.detectChanges();

        // Assert
        const elements = fixture.nativeElement.querySelectorAll('div.spinner');
        expect(elements.length).toBe(1);
    });

    it('should not contain spinner', () => {
        // Arrange
        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
        component.isLoading = false;
        fixture.detectChanges();

        // Assert
        const elements = fixture.nativeElement.querySelectorAll('div.spinner');
        expect(elements.length).toBe(0);
    });
});
