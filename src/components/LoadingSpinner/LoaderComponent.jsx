import { ClipLoader } from "react-spinners";
import css from "./LoaderComponent.module.css";
const LoaderComponent = () => (
  <div className={css.loaderContainer}>
    <ClipLoader size={80} color="#36d7b7" />
  </div>
);

export default LoaderComponent;
