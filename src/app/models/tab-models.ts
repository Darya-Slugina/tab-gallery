export enum Tabs {
    cats = 'Cats',
    dogs = 'Dogs',
    birds = 'Birds'
  }
  
  export interface TabState {
    name: string,
    isDisabled: boolean
  }