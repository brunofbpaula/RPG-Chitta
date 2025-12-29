import loader from "@/assets/icons/loader.svg";

type LoaderProps = {
  size: number;
};

const Loader = ({ size }: LoaderProps) => {
  return (
    <div className='flex w-full justify-center items-center'>
      <img 
        src={loader}
        width={size}
        height={size}
        alt="Loading..."
      />
    </div>
  );
};

export default Loader;
