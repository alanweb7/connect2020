import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContatoListPage } from './contato-list.page';

describe('ContatoListPage', () => {
  let component: ContatoListPage;
  let fixture: ComponentFixture<ContatoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
