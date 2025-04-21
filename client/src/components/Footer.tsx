const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-6">
      <div className="container mx-auto px-4 text-center text-sm">
        <p className="font-semibold text-lg">
          Zombie Survival Social Network © {new Date().getFullYear()}
        </p>

        <div className="mt-4">
          <a
            href="https://www.juandebandi.dev/"
            className="text-indigo-300 hover:text-indigo-100 transition-colors duration-300 text-sm"
            target="_blank"
            rel="noopener noreferrer">
            Made by Juan Debandi
          </a>
          <span className="mx-2 text-indigo-300">|</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
