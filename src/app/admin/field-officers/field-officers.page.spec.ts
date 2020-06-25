import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FieldOfficersPage } from './field-officers.page';

describe('FieldOfficersPage', () => {
  let component: FieldOfficersPage;
  let fixture: ComponentFixture<FieldOfficersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldOfficersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldOfficersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
