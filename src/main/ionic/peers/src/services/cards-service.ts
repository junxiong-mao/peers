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
      ],
      bio: 'I like Machine Learning because it\'s cool'
    },
    {
      level: 'MS',
      major: 'Physics',
      interests: [
        'Biology',
        'Newton'
      ],
      bio: 'I like bio because it\'s cool'
    },
    {
      level: 'MS',
      major: 'Electrical Engineering',
      interests: [
        'Processors',
        'Digital Signal Processing'
      ],
      bio: 'I like Digital Signal Processing because it\'s cool'
    }
  ];

  public getCards(): Observable<any> {
    return Observable.of(this.cards);
  }
}
