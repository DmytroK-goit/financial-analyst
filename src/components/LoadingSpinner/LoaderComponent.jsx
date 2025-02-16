import { DNA } from "react-loader-spinner";
import css from "./LoaderComponent.module.css";

const LoaderComponent = () => (
  <div className={css.loaderContainer}>
    <DNA
      visible={true}
      height="280"
      width="280"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  </div>
);

export default LoaderComponent;
