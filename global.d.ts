
declare global {
  type SetState<T> = React.Dispatch<T|React.SetStateAction<T>> | React.Dispatch<T> | React.Dispatch<React.SetStateAction<T>>;
}
export default global;