import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { Dispatch } from "redux";
import { View, Text } from "antd-mobile";

import { IData } from "../../../model";
import { Loading } from "../../layout/index";
import { ILayout } from "../../layout/model";
import { ICategory } from "../../product/model";
import { Products } from "../index";

// const CATEGORY_QUERY = require("./category.gql");
const CATEGORY_QUERY = `
  query category($id: Int) {
    category(id: $id) {
      id
      name
    }
  }

`;

// const styles = require("./styles.css");
const styles = StyleSheet.create({
  category: {},
  categoryName: {}
});

interface IDataCategory extends IData {
  category: ICategory;
}

interface IConnectedCategoryProps {
  dispatch: Dispatch<{}>;
  layout: ILayout;
  data: IDataCategory;
}

interface ICategoryProps {
  id: string;
}

const options = {
  options: props => ({
    fetchPolicy: "cache-first",
    variables: {
      id: props.id
    }
  })
};

class Category extends React.Component<
  IConnectedCategoryProps & ICategoryProps,
  null
> {

  private _root

  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };

  render() {
    const { id, dispatch, layout, data } = this.props;

    const { loading, category } = data;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <View
      // className={styles.category}
      >
        <Text
        // className={styles.categoryName}
        >
          {category.name}
        </Text>
        <Products categoryId={id} />
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout
});

export default compose<any, any, any>(
  connect<IConnectedCategoryProps, {}, ICategoryProps>(mapStateToProps),
  graphql(gql(CATEGORY_QUERY), options)
)(Category as any);
