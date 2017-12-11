import { NgModule } from '@angular/core';
import { CardComponent } from './card/card';
import { IonicModule } from "ionic-angular";
import { EditProfileModal } from "./edit-profile-modal/edit-profile-modal";

@NgModule({
  declarations: [
    CardComponent,
    EditProfileModal,
  ],
  imports: [
    IonicModule
  ],
  exports: [CardComponent],
  entryComponents: [
    EditProfileModal,
  ]
})
export class ComponentsModule {
}
