import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { User } from "../models/user";

@Injectable()
export class UserService {
  private user =
    {
      id: '123',
      firstName: "John",
      lastName: "Doe",
      level: "phd",
      major: "Computer Science",
      interests: ["Machine Learning", "AI"],
      bio: "I like turtles.",
      email: "email@ucsd.edu",
      photoUrl: "https://i.pinimg.com/736x/45/18/61/4518617f909007087ef9cebbfcaec007--rock-painting-bonsai.jpg"
    };

  public getUser(id: string): Observable<User> {
    return Observable.of(this.user as User);
  }

}
