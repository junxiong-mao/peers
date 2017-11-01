import {Injectable} from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class CardsService {
  private cards = [
    {
      level: 'PhD',
      major: 'Computer Science',
      interests: [
        'Machine Learning',
        'Bumblebees',
        'Biology'
      ]
    },
    {
      level: 'MS',
      major: 'Physics',
      interests: [
        'Biology',
        'Newton'
      ]
    },
    {
      level: 'MS',
      major: 'Electrical Engineering',
      interests: [
        'Processors',
        'Digital Signal Processing'
      ]
    }
  ];

  public getCards(): Observable<any> {
    return Observable.of(this.cards);
  }
}
