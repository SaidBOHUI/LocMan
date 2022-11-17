import Header from "./header/header";
import Footer from "../Components/footer/footer";

// const LayoutNav = () => {
  const LayoutNav = (props) => {
    return (
      <>
        <Header />
        {props.children}
        <Footer />
      </>
    );
  };

  export default LayoutNav;