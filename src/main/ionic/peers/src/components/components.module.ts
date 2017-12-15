import { NgModule } from '@angular/core';
import { CardComponent } from './card/card';
import { IonicModule } from "ionic-angular";
import { EditProfileModal } from "./edit-profile-modal/edit-profile-modal";
import { MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChipInputComponent } from "./chip-input/chip-input";

@NgModule({
  declarations: [
    CardComponent,
    ChipInputComponent,
    EditProfileModal,
  ],
  imports: [
    IonicModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
  exports: [
    CardComponent,
    ChipInputComponent,
    EditProfileModal,
  ],
  entryComponents: [
    EditProfileModal,
  ]
})
export class ComponentsModule {
}
