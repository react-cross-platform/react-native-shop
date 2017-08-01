import * as React from "react";
import { Category } from "../../modules/catalog/index";

class CategoryScreen extends React.Component<any, any> {
  private _root;

  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };

  render() {
    return <Category id={this.props.match.params.id} />;
  }
}

export default CategoryScreen;
