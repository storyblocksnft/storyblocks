import { ArrowRightIcon } from "@heroicons/react/solid";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <div className="text-3xl mb-4 lg:text-4xl font-bold w-full md:w-1/3">
        <p>A collaborative story,</p>
        <p>told one word at a time</p>
      </div>

      <div className="w-full md:w-1/6 flex flex-col justify-center bg-green-400 text-white mx-2 my-2">
        <p className="text-center font-bold text-3xl text-white">2323</p>
        <p className="text-center text-white">contributors</p>
      </div>

      <div className="w-full md:w-1/6 flex flex-col justify-center bg-green-500 text-white mx-2 my-2">
        <p className="text-center font-bold text-3xl">2323</p>
        <p className="text-center">paid to contributors</p>
      </div>
      <div className="w-full md:w-1/6 flex flex-col justify-center bg-green-600 text-white mx-2 my-2">
        <p className="text-center font-bold text-3xl">23</p>
        <p className="text-center">words</p>
      </div>

      <div className="w-full md:w-1/12 flex flex-col justify-center bg-gray-500 text-white ml-2 my-2 px-4 align-center">
        <p className="text-center text-white">how it works</p>
        <div className="flex flex-row justify-center">
          <ArrowRightIcon className="opacity-70 hover:opacity-100 h-5 w-5 mr-2" />
        </div>
      </div>
    </div>
  );
};

export default Header;
