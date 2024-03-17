import "./Header.scss";
import HeaderButton from "../../shared/HeaderButton/HeaderButton";
import SearchBar from "../../shared/SearchBar/SearchBar";

function Header() {
  return (
    <div className="header">
      <div className="headerContainer">
        <img
          className="logo"
          src={require("../../logo/ColorLogo.png")}
          alt="Logo"
        ></img>
        <HeaderButton label={"About"}></HeaderButton>

        <SearchBar></SearchBar>
        <HeaderButton label={"Nutri Comparation"}></HeaderButton>
        <HeaderButton label={"User Log In"}></HeaderButton>
      </div>
    </div>
  );
}

export default Header;
