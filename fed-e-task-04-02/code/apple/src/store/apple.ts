import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export interface Apple {
  id: number;
  weight: number;
  eaten: boolean;
}

export interface IEatenAppleInfo {
  number: number;
  weight: number;
}

export interface IAppleStore {
  pickApple: () => void;
  eatApple: (id: number) => void;
  freshApples: Apple[];
  eatenAppleInfo: IEatenAppleInfo;
  picking: boolean;
}

class AppleStore implements IAppleStore {
  constructor() {
    makeObservable(this);
  }
  @observable
  private apples: Apple[] = [
    {
      id: 999,
      weight: 44,
      eaten: false,
    },
  ];

  @observable
  public eatenAppleInfo: IEatenAppleInfo = {
    number: 1,
    weight: 1,
  };

  @observable
  public picking: boolean = false;

  @observable
  private latestId: number = 0;

  @action.bound
  public pickApple() {
    if (this.picking) {
      return;
    }
    this.picking = true;
    setTimeout(
      () =>
        runInAction(() => {
          this.apples.push({
            id: this.latestId++,
            weight: Math.floor(Math.random() * 100 + 1),
            eaten: false,
          });
          this.picking = false;
        }),
      Math.random() * 2000
    );
  }

  @action.bound
  public eatApple(id: number) {
    const apple = this.apples.find((a) => a.id === id);
    if (!apple) {
      return;
    }
    apple.eaten = true;
    this.eatenAppleInfo.number++;
    this.eatenAppleInfo.weight += apple.weight;
  }

  @computed
  public get freshApples(): Apple[] {
    return this.apples.filter((a) => !a.eaten);
  }
}

export default new AppleStore();
