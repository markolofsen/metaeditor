
export const config = new class {
  isDev: boolean


  constructor() {
    this.isDev = process.env.NODE_ENV === 'development'
  }

}