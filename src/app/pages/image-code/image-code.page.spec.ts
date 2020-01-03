import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageCodePage } from './image-code.page';

describe('ImageCodePage', () => {
  let component: ImageCodePage;
  let fixture: ComponentFixture<ImageCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
