import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageAddPage } from './image-add.page';

describe('ImageAddPage', () => {
  let component: ImageAddPage;
  let fixture: ComponentFixture<ImageAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
