import artwork from "../../../assets/artwork.jpg";
import "./style.css";

const Section = () => {
  return (
    <div className="relative border-2 h-full">
      <img
        src={artwork}
        className="object-cover w-full h-full"
        alt="Test Image"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
        <div>
          <h3 className="text-2xl font-bold">Base Inc</h3>
        </div>
        <div className="mt-auto">
          <p>
            "Acme Inc “This library has saved me countless hours of work and
            helped me deliver stunning designs to my clients faster than ever
            before.” Sofia Davis"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
