import { NgModule } from '@angular/core';
import { CardComponent } from './card/card';
import { IonicModule } from "ionic-angular";
import { EditProfileModal } from "./edit-profile-modal/edit-profile-modal";

import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import 'rxjs/add/operator/filter'; // imported for tag-input to work
import 'rxjs/add/operator/debounceTime'; // imported for tag-input to work

@NgModule({
  declarations: [
    CardComponent,
    EditProfileModal,
  ],
  imports: [
    IonicModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  exports: [CardComponent],
  entryComponents: [
    EditProfileModal,
  ]
})
export class ComponentsModule {
}
