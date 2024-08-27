//HeaderBox Component

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div>
      <div className="header-box">
        <h1 className="header-box-title">
          {title}
          {type === "greeting" && (
            <span className="text-bankGradient dark:text-neutral-400">&nbsp;{user}</span>
          )}
        </h1>
        <p className="header-box-subtext">{subtext}</p>
      </div>
    </div>
  );
};

export default HeaderBox;
