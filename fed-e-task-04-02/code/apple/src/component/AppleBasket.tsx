import { Component } from "react";
import AppleItem from "./AppleItem";
import "../style/Apple.css";
import { inject, observer } from "mobx-react";
import { IAppleStore } from "../store/apple";

@inject("appleStore")
@observer
export default class AppleBasket extends Component {
  public render() {
    const { pickApple, freshApples, eatenAppleInfo, picking } = (this.props as {
      appleStore: IAppleStore;
    }).appleStore;

    return (
      <div className="apple-basket">
        <div className="title">苹果篮子</div>

        <div className="stats">
          <div className="section">
            <div className="head">当前</div>
            <div className="content">
              {freshApples.length}
              个苹果，
              {freshApples.reduce((acc, cur) => (acc += cur.weight), 0)}克
            </div>
          </div>
          <div className="section">
            <div className="head">已吃掉</div>
            <div className="content">
              {eatenAppleInfo.number}个苹果，{eatenAppleInfo.weight}克
            </div>
          </div>
        </div>

        <div className="appleList">
          {freshApples.map((a) => (
            <AppleItem key={a.id} apple={a} />
          ))}
        </div>

        <div className="btn-div">
          <button
            className={picking ? "disabled" : ""}
            onClick={pickApple}>
            {"采摘"}
          </button>
        </div>
      </div>
    );
  }
}
