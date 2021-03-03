import { Component } from "react";
import AppleItem from "./AppleItem";
import "../style/Apple.css";

export default class AppleBasket extends Component {
  private isPicking: boolean = false;

  private pickApple() {}

  private getAppleItem(): any[] {
    return [{ id: 1 }];
  }

  public render() {
    return (
      <div className="apple-basket">
        <div className="title">苹果篮子</div>

        <div className="stats">
          <div className="section">
            <div className="head">当前</div>
            <div className="content">
              {1}个苹果，{1}克
            </div>
          </div>
          <div className="section">
            <div className="head">已吃掉</div>
            <div className="content">
              {1}个苹果，{1}克
            </div>
          </div>
        </div>

        <div className="appleList">
          {this.getAppleItem().map((a) => (
            <AppleItem key={a.id} />
          ))}
        </div>

        <div className="btn-div">
          <button
            className={this.isPicking ? "disabled" : ""}
            onClick={() => this.pickApple()}>
            {"采摘"}
          </button>
        </div>
      </div>
    );
  }
}
