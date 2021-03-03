import { Component } from "react";
import { Apple, IAppleStore } from "../store/apple";
import { inject, observer } from "mobx-react";

@inject("appleStore")
@observer
export default class AppleItem extends Component<{ apple: Apple }> {
  render() {
    const { eatApple } = (this.props as {
      apple: Apple;
      appleStore: IAppleStore;
    }).appleStore;

    return (
      <div className="apple-item">
        <div className="apple">
          <img src={"/apple.png"} alt="" />
        </div>
        <div className="info">
          <div className="name">红苹果 - {this.props.apple.id}号</div>
          <div className="weight">{this.props.apple.weight}克</div>
        </div>
        <div className="btn-div">
          <button onClick={() => eatApple(this.props.apple.id)}> 吃掉 </button>
        </div>
      </div>
    );
  }
}
