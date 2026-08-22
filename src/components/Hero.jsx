import { CyborgWolfCanvas } from ".";
import Position from "./Position";

const Hero = ({ scrollContainer }) => {
  return (
    <section className="parallax">
      <div className='parallax__content absolute top-[10%] sm:top-[16%] lg:top-[24%] w-full mx-auto lg:pl-[38vh] lg:pr-[30vh] xl:pl-96 xl:pr-72 2xl:px-40 3xl:px-60 flex flex-col lg:flex-row items-start z-10'>
        <div className="flex-1 lg:mb-0">
          <h1 className='font-medium text-white text-[40px] xs:text-[50px] sm:text-[68px] md:text-[80px] lg:text-[100px] 2xl:text-[180px] leading-[110px] 2xl:leading-[160px]'>
            IVAN LOVO
          </h1>
          <Position />
        </div>
        <div className="flex-1 flex justify-start lg:justify-end mt-4 sm:mt-14 ml-8 xs:ml-[-4vh] sm:ml-[-17vh] md:ml-[-26vh] lg:mt-10 2xl:mt-0">
          <div className='font-bold text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[46px] sm:leading-[40px] md:leading-[50px] 2xl:leading-[60px] streaky-glow max-w-sm 2xl:max-w-lg text-white text-left'>
            I create <br/>3D models for video games, 3D printing, and CNC machining.
          </div>
        </div>
      </div>

      <img className="parallax__stars" src="./parallax/1Stars.png" alt="" />
      <img className="parallax__planets" src="./parallax/2Moon.png" alt="" />
      <img className="parallax__mountain1" src="./parallax/3Mountains.png" alt="" />
      <img className="parallax__trees1" src="./parallax/4Trees1.png" alt="" />
      <img className="parallax__trees2" src="./parallax/4Trees2.png" alt="" />
      <img className="parallax__crater" src="./parallax/5Trees.png" alt="" />
      <img className="parallax__ground" src="./parallax/6Ground.png" alt="" />

      <div className="cyborgwolf-abduction-beam" aria-hidden="true">
        <span className="cyborgwolf-abduction-core" />
        <span className="cyborgwolf-abduction-dust" />
        <span className="cyborgwolf-abduction-mist" />
      </div>
      <CyborgWolfCanvas scrollContainer={scrollContainer} />
    </section>
  );
};

export default Hero;
