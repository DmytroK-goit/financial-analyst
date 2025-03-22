import s from "./NotFound.module.scss";
const NotFound = () => {
  return (
    <div className={s.cont}>
      <a className={s.home_button} href="/">
        Додому
      </a>
      {/* <img
        src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
        alt="404 Not Found"
        className={s.img}
      /> */}
    </div>
  );
};

export default NotFound;
