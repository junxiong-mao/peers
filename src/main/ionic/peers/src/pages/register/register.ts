import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth-service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from "@angular/material";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { AppState } from "../../states/app-state";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  createSuccess = false;
  registerCredentials = { email: '', password: '', confirm_password: '', firstName: '', lastName: '', major: '', level: '', bio: '', interests: [], };

  interestsList;

  //======= Material tags

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  fruits = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];


  add(event: MatChipInputEvent): void {
    if(this.inputValue.length === 0 || this.options.indexOf(this.inputValue) < 0 || this.fruits.filter(f => f.name == this.inputValue).length > 0) {
      this.appState.handleError(`${this.inputValue} is not in the list... `, 'You can only add items from the list');
    } else {
      let value = this.inputValue;

      // Add our fruit
      this.fruits.push({name: value.trim()});
      this.options = this.options.filter(o => o != value);
      this.inputValue = '';
      event.input.value = '';
      console.log('blaa', this.inputValue)
    }
  }

  remove(fruit: any): void {
    let index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.options.push(fruit.name);
      this.fruits.splice(index, 1);
    }
  }

//======= END Material tags


//======= Material autocomplete

  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
  ];

  filteredOptions: Observable<string[]>;

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  inputValue = ''
  handleOptionSelected($event: MatAutocompleteSelectedEvent) {
    console.log('sfsdf', this.inputValue)
    // this.inputField.value = $event.option.value;
  }

  //======= END Material autocomplete



  // bio: max length 500 chars
  // interests: "A_B_C"
  // except for email, all other attributes must be prefixed with "custom:"

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private http: HttpClient, private appState: AppState) { }

  ngOnInit(): void {
    const url = `${location.origin}/assets/academic-interests.json`;
    this.interestsList = this.http.get(url);

    //======= Material autocomplete
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((val: string) => this.filter(val))
      );
    //======= END Material autocomplete
  }

  public register() {
    if(this.registerCredentials.password != this.registerCredentials.confirm_password){
      this.showPopup("Error", "Passwords must be the same.");
    } else {

      this.auth.register(this.registerCredentials).subscribe(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("Success", "Account created.");
          } else {
            this.showPopup("Error", "Problem creating account.");
          }
        },
        error => {
          this.showPopup("Error", error);
        });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  public requestAutocompleteItems = (text: string) : Observable<Response> => {
    return this.interestsList;
  }

}
