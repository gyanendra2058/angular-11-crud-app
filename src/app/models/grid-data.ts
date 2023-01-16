export class GridData {
  data: unknown[];
  totalCount: number;

  constructor(data = [], totalCount = 0) {
    this.data = data;
    this.totalCount = totalCount;
  }

  static defaults(): GridData {
    return new GridData();
  }
}
