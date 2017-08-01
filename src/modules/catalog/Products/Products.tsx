import { Icon, View, Text, Flex, WingBlank } from "antd-mobile";
import update from "immutability-helper";
import { throttle } from "lodash";
import { StyleSheet, ScrollView } from "react-native";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
// import MasonryInfiniteScroller from "react-masonry-infinite";
import { connect } from "react-redux";

import { IData } from "../../../model";
import {
  Product
  // ProductsCounter
} from "../index";
import { IAllProduct, ICatalog } from "../model";
import { Loading } from "../../layout/index";

// const ALL_PRODUCTS_QUERY = require("./allProducts.gql");
const ALL_PRODUCTS_QUERY = `
  query allProducts($categoryId: Int, $offset: Int, $first: Int) {
    allProducts(categoryId: $categoryId, offset: $offset, first: $first) {
      total
      products {
        id
        name
        shortDescription
        brand {
          id
          name
        }
        category {
          id
          name
        }
        imagesWithColor {
          id
          src
          width
          height
          colorName
          colorValue
          isTitle
        }
        subProducts {
          id
          article
          price
          oldPrice
          discount
        }
      }
    }
  }
`;

// const styles = require("./styles.css");
const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: "#f5f5f9"
  },

  masonryInfiniteScroller: {},
  icon: {},
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 130,
    margin: 5,
    marginRight: 5,
    borderRadius: 3,
    borderColor: "#bebfc1",
    borderWidth: 1
    // backgroundColor: "yellow",
  }
});

const LIMIT = 10;

// miliseconds bettwen scroll event
const SCROLL_THROTTLE = 500;

// px from bottom to start fetch more products
const FETCH_MORE_THRESHOLD = 1500;

interface IDataProducts extends IData {
  allProducts: IAllProduct;
}

interface IConnectedProductsProps {
  catalog: ICatalog;
  data: IDataProducts;
}

interface IProductsProps {
  categoryId: string;
  navigation: any;
}

interface IProductsState {
  haveMoreProducts?: boolean;
  scrolledProducts?: number;
}

const options = {
  options: props => ({
    fetchPolicy: "network-only",
    variables: {
      categoryId: props.categoryId,
      first: LIMIT,
      offset: 0
    }
  }),
  props({ data: { loading, allProducts, fetchMore } }) {
    if (!loading) {
      // This is temp hack to exclude products without subProducts
      // TODO: Should be solved in GraphQL server
      allProducts = update(allProducts, {
        products: {
          $set: allProducts.products.filter(p => p.subProducts.length !== 0)
        }
      });
    }
    return {
      data: {
        allProducts,
        loading,
        fetchMore() {
          return fetchMore({
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.allProducts) {
                return prev;
              }
              return update(prev, {
                allProducts: {
                  products: {
                    $push: fetchMoreResult.allProducts.products
                  }
                }
              });
            },
            variables: {
              offset: allProducts.products.length
            }
          });
        }
      }
    };
  }
};

class Products extends React.Component<
  IConnectedProductsProps & IProductsProps,
  IProductsState
> {
  ref;

  bottomHeight: number;

  state = {
    haveMoreProducts: true,
    scrolledProducts: 0
  };

  refineScrolledProducts = scrolledProducts => {
    const { data } = this.props;
    const { fetchMore, allProducts: { products, total } } = data;

    if (scrolledProducts < LIMIT) {
      scrolledProducts = LIMIT > total ? total : LIMIT;
    } else if (scrolledProducts > total) {
      scrolledProducts = total;
    }
    return scrolledProducts;
  };

  handleScroll = event => {
    console.log("handleScroll", event.nativeEvent);

    // const { data } = this.props;
    // const { fetchMore, allProducts: { products, total } } = data;

    // // Calculate scrolled products
    // const scrollTop = event.srcElement.scrollTop;
    // // const scrollTop = document.body.scrollTop;
    // const { scrolledProducts, haveMoreProducts } = this.state;
    // const scrolled = Math.round(
    //   scrollTop / this.bottomHeight * products.length
    // );
    // this.setState({ scrolledProducts: scrolled });

    // if (scrollTop > this.bottomHeight && haveMoreProducts === true) {
    //   fetchMore();
    // }
  };

  // componentDidMount() {
  //   this.handleScrollThrottle = throttle(
  //     event => this.handleScroll(event),
  //     SCROLL_THROTTLE
  //   );

  //   // tslint:disable-next-line:max-line-length
  //   // TODO: Bind to some element, but not window
  //   // https://stackoverflow.com/questions/36207398/not-getting-callback-after-adding-an-event-listener-for-scroll-event-in-react-js/36207913#36207913
  //   window.addEventListener("scroll", this.handleScrollThrottle, true);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.handleScrollThrottle, true);
  // }

  // componentDidUpdate = (prevProps, prevState) => {
  //   const { loading, allProducts } = this.props.data;
  //   if (loading === false) {
  //     this.bottomHeight =
  //       this.ref.offsetTop +
  //       this.ref.clientHeight -
  //       window.innerHeight -
  //       FETCH_MORE_THRESHOLD;
  //   }
  // };

  // componentWillReceiveProps = nextProps => {
  //   const { loading, allProducts } = nextProps.data;
  //   if (loading === false) {
  //     const { products, total } = allProducts;
  //     if (products.length >= total) {
  //       this.setState({
  //         haveMoreProducts: false
  //       });
  //     }
  //   }
  // };

  render() {
    const {
      navigation,
      data,
      catalog: { showOnlyViewed, viewedProductIds }
    } = this.props;
    const { loading, allProducts, fetchMore } = data;

    if (loading === true) {
      return <Loading />;
    }
    const { products, total } = allProducts;
    const filteredProducts =
      showOnlyViewed === true
        ? products.filter(p => viewedProductIds.indexOf(p.id) !== -1)
        : products;

    // let padding: number;
    // let gutter: number;
    // if (window.innerWidth <= 640) {
    //   padding = 4;
    //   gutter = 15;
    // } else if (window.innerWidth <= 750) {
    //   padding = 8;
    //   gutter = 17;
    // } else {
    //   padding = 10;
    //   gutter = 20;
    // }
    // if (window.innerWidth <= 640) {
    //   padding = 4;
    //   gutter = 15;
    // } else if (window.innerWidth <= 750) {
    //   padding = 8;
    //   gutter = 17;
    // } else {
    //   padding = 10;
    //   gutter = 20;
    // }
    const padding = 5;
    const gutter = 15;

    return (
      <ScrollView
        contentContainerStyle={styles.mainScreen}
        scrollEventThrottle={100}
        onScroll={this.handleScroll}
        horizontal={false}
        // ref={element => (this.ref = element)}
      >
        <WingBlank size="sm">
          <Flex justify="center" wrap="wrap">
            {filteredProducts.map((product, i) =>
              <Product key={i} {...product} navigation={navigation} />
            )}
          </Flex>
          <View
          // className={styles.icon}
          // style={{
          //   display: this.state.haveMoreProducts ? "block" : "none"
          // }}
          >
            {/* <Icon type="loading" size="lg" /> */}
            <Text>Loading...</Text>
          </View>

          {/*         <ProductsCounter
            scrolled={this.refineScrolledProducts(this.state.scrolledProducts)}
            total={total}
          /> */}

          {/*<ShowOnlyViewed/>*/}
        </WingBlank>
      </ScrollView>
    );
  }
}

const mapStateToProps: any = state => ({
  catalog: state.catalog
  // router: state.router
});

export default compose<any, any, any>(
  connect<IConnectedProductsProps, {}, IProductsProps>(mapStateToProps),
  graphql(gql(ALL_PRODUCTS_QUERY), options as any)
)(Products as any);
