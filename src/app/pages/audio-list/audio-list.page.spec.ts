import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AudioListPage } from './audio-list.page';

describe('AudioListPage', () => {
  let component: AudioListPage;
  let fixture: ComponentFixture<AudioListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AudioListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
