import "./HeaderButton.scss";

interface HeaderButtonProps {
  label: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ label }) => {
  return (
    <div className="headerButton">
      <h4>{label}</h4>
    </div>
  );
};

export default HeaderButton;
