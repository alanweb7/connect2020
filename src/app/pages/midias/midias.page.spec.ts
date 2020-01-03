import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MidiasPage } from './midias.page';

describe('MidiasPage', () => {
  let component: MidiasPage;
  let fixture: ComponentFixture<MidiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MidiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
