export class User {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly level: string,
    public readonly major: string,
    public readonly interests: Array<string>,
    public readonly bio: string,
    public readonly email: string,
    public readonly photoUrl: string,
  ){}
}
