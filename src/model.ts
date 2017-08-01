export interface IData {
  loading: boolean;
  fetchMore: any;
  refetch: () => void;
  errors?: any;
  networkStatus?: any;
}
