import { Component } from "react";

interface Apple {
  id: number;
  weight: number;
}
export default class AppleItem extends Component {
  private apple: Apple = { id: 1, weight: 1 };

  private eatApple(id: number): void {}

  render() {
    return (
      <div className="apple-item">
        <div className="apple">
          <img src={"/apple.png"} alt="" />
        </div>
        <div className="info">
          <div className="name">红苹果 - {this.apple.id}号</div>
          <div className="weight">{this.apple.weight}克</div>
        </div>
        <div className="btn-div">
          <button onClick={() => this.eatApple(this.apple.id)}> 吃掉 </button>
        </div>
      </div>
    );
  }
}
