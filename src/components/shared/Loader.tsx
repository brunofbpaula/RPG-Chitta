import loader from "@/assets/icons/loader.svg";

type LoaderProps = {
  size: number;
};

const Loader = ({ size }: LoaderProps) => {
  return (
    <div className='flex-center w-full'>
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
