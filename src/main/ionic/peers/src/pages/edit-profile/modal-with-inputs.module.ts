import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalWithInputs } from './modal-with-inputs';

@NgModule({
  declarations: [
    ModalWithInputs,
  ],
  imports: [
    IonicPageModule.forChild(ModalWithInputs)
  ]
})
export class ModalWithInputsModule {}
