import Button from "../../Button";

type Props = { title: string; Content: any, imgsrc: any };

const Card = ({ title, Content, imgsrc }: Props) => {
  return (
    <div className="rounded-md gradient-bg p-5 space-y-8 text-white bg-[#181717]">
      {/* TITLE */}
      <div className="flex items-center gap-5">
        <img src={imgsrc} alt="" className="w-6 h-6" />
        <p className="text-lg"> {title}</p>
      </div>

      {/* STATS */}
      <div className="gap-2 mt-2">
        <Content />
      </div>
    </div>
  );
};

export default Card;
