import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex justify-center items-center gap-2 mb-8 text-center">
      <Logo />
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-2">
        Todo App
      </h1>
    </header>
  );
};

export default Header;
