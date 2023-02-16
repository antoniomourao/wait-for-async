import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component Unit Testing', () => {
  let component: AppComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('RQ01 - should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`RQ02 - should have as title 'wait-for-async'`, () => {
    expect(component.title).toEqual('wait-for-async');
  });

  it('RQ03 - should render title', () => {
    // triggers a change detection cycle for the component
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome wait-for-async'
    );
  });

  it('RQ04 - should increment and decrement value', (() => {
    component.increment();
    expect(component.value).toEqual(1);

    component.decrement();
    expect(component.value).toEqual(0);
  }));

  it('RQ05 - should increment value in template', (() => {
    fixture.detectChanges();
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();
    const value = debugElement.query(By.css('h2')).nativeElement.innerHTML;

    expect(value).toEqual('1');
  }));

  it('RQ06 - should stop at 0 and show minimum message', (() => {
    debugElement
      .query(By.css('button.decrement'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();

    const message = debugElement.query(By.css('p.message')).nativeElement
      .innerHTML;

    expect(component.value).toEqual(0);
    expect(message).toContain('Minimum');
  }));

  it('RQ07 - should stop at 15 and show maximum message', (() => {
    fixture.componentInstance.value = 15;
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();

    const message = debugElement.query(By.css('p.message')).nativeElement
      .innerHTML;

    expect(component.value).toEqual(15);
    expect(message).toContain('Maximum');
  }));

});
