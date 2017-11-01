export class Card {
  constructor(
    public readonly level: string,
    public readonly major: string,
    public readonly interests: Array<string>,
    public readonly bio: string,
  ){}
}
