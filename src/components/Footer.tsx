const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="text-gray-400 mb-4">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 ">
          <a href="/home" className="text-gray-300 hover:text-white">
            მთავარი
          </a>
          <a href="/profile" className="text-gray-300 hover:text-white">
            პროფილი
          </a>
          <a href="/about_us" className="text-gray-300 hover:text-white">
            ჩვენ შესახებ
          </a>

          <a href="/contact" className="text-gray-300 hover:text-white">
            კონტაქტი
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
