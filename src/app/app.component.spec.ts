import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Component Unit Testing', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NxWelcomeComponent, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('RQ01 - should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`RQ02 - should have as title 'wait-for-async'`, () => {
    expect(component.title).toEqual('wait-for-async');
  });

  it('RQ03 - should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome wait-for-async'
    );
  });
});
