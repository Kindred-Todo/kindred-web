import React from "react";
import { Fire } from "./fire";
// import { IconComponentNode } from "./IconComponentNode";
import ellipse10 from "./ellipse-10.svg";
import frame5082 from "./frame-5082.png";
import frame from "./frame.svg";
import group4 from "./group-4.png";
import image4 from "./image-4.png";
import image5 from "./image-5.png";
import image6 from "./image-6.png";
import lol1 from "./lol.png";

// Color data for the grid squares
const gridColors = [
  "#005e21", "#5cff95", "#005e21", "#005e21", "#005e21",
  "#059a39", "#059a39", "#c0ffdd", "#059a39", "#059a39",
  "#54e787", "#c0ffdd", "#059a39", "#059a39", "#c0ffdd",
  "#c0ffdd", "#c0ffdd", "#059a39", "#059a39", "#059a39",
  "#c0ffdd", "#c0ffdd", "#059a39", "#54e787", "#c0ffdd",
  "#c0ffdd", "#059a39", "#c0ffdd", "#54e787", "#c0ffdd",
  "#059a39", "#c0ffdd", "#059a39", "success"
];

export const Bento = () => {
  return (
    <div className="flex flex-col h-[1152px] items-start gap-[28.8px] p-[28.8px] relative bg-colors-sceen-background">
      <div className="flex items-start gap-[28.8px] relative flex-1 self-stretch w-full grow">
        <div className="relative w-[403.2px] h-[722.7px] mb-[-377.10px] bg-[#fbfbfb] rounded-[28.8px] overflow-hidden">
          <img
            className="absolute w-[188px] h-[186px] top-0 left-0"
            alt="Ellipse"
            src={ellipse10}
          />

          <div className="absolute w-[257px] h-[257px] top-[233px] left-72 bg-[#854cff33] rounded-[128.7px]" />
        </div>

        <div className="relative self-stretch w-[311.4px] bg-[#854cff] rounded-[28.8px] overflow-hidden">
          <img
            className="absolute w-[108px] h-[87px] top-[130px] left-[101px]"
            alt="Group"
            src={group4}
          />
        </div>

        <div className="relative flex-1 self-stretch grow bg-white rounded-[28.8px]">
          <div className="relative w-[861px] h-[374px] top-[-29px] left-[41px]">
            <div className="flex flex-col w-[655px] h-[217px] items-start justify-center gap-[14.4px] absolute top-[93px] left-0">
              <div className="font-fraunces relative w-[502.2px] font-normal text-colors-foreground text-4xl tracking-[-1.80px] leading-[normal]">
                Influencers 🤝 Blueprints
              </div>
            </div>

            <img
              className="absolute w-[318px] h-[374px] top-0 left-[544px]"
              alt="Image"
              src={image4}
            />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-[28.8px] relative flex-1 self-stretch w-full grow">
        <img
          className="relative self-stretch w-[403.2px]"
          alt="Frame"
          src={frame}
        />

        <div className="relative self-stretch w-[772.2px] bg-white rounded-[28.8px] overflow-hidden">
          <p className="absolute h-[88px] top-32 left-[103px] font-fraunces font-normal text-black text-4xl text-center tracking-[-0.72px] leading-[normal]">
            redefining both day-to-day
            <br />
            productivity and human connection
          </p>
        </div>

        <img
          className="relative w-[443.6px] h-[345.6px]"
          alt="Frame"
          src={frame5082}
        />
      </div>

      <div className="flex items-start gap-[28.8px] relative flex-1 self-stretch w-full grow">
        <div className="relative self-stretch w-[698.4px] bg-white rounded-[28.8px] overflow-hidden">
          <div className="relative w-[733px] h-[346px] left-[-34px]">
            <div className="absolute h-11 top-[89px] left-[77px] font-fraunces font-normal text-black text-4xl tracking-[-1.08px] leading-[normal]">
              Congrats! 🎉🍵
            </div>

            <div className="absolute w-[733px] h-[346px] top-0 left-0">
              <p className="absolute w-[514px] h-24 top-[156px] left-[77px] font-outfit font-light text-colors-foreground text-[21.6px] tracking-[0.90px] leading-[32.4px]">
                You just finished 'grab matcha with <br />
                Lok Ye &amp; lock in' its time to share <br />
                and earn points!
              </p>

              <div className="absolute h-[173px] top-[85px] left-[559px] font-outfit font-light text-black text-[115.2px] tracking-[0.90px] leading-[172.8px] whitespace-nowrap">
                🎉
              </div>

              <div className="absolute w-[539px] h-[33px] top-[263px] left-0 bg-[#854cff26] rotate-[7.90deg] backdrop-blur-[1.8px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(1.8px)_brightness(100%)]" />

              <img
                className="absolute w-[286px] h-[346px] top-0 left-[446px]"
                alt="Image"
                src={image6}
              />
            </div>
          </div>
        </div>

        <div className="relative flex-1 self-stretch grow bg-white rounded-[28.8px] overflow-hidden">
          <div className="absolute w-[446px] h-[419px] top-[-179px] left-8">
            <div className="absolute w-[406px] h-[419px] top-0 left-10">
              <img
                className="absolute w-[104px] h-[103px] top-[233px] left-[45px] object-cover"
                alt="Image"
                src={image5}
              />

              <Fire className="!absolute !w-[67px] !h-16 !top-[302px] !left-[141px]" />
              <p className="absolute h-[54px] top-[365px] left-0 font-fraunces font-normal text-black text-[21.6px] text-center tracking-[0] leading-[27.0px]">
                Encourage Luffy to
                <br />
                "Go to the Gym"
              </p>

              <div className="absolute w-[257px] h-[284px] top-0 left-[149px] bg-[#854cff33] rounded-[128.7px/142.2px]" />
            </div>

            {/* <IconComponentNode className="!absolute !w-[85px] !h-[81px] !top-[215px] !left-0" /> */}
          </div>

          <div className="inline-flex items-center justify-center gap-[9px] pt-[10.8px] pb-[9px] px-[43.2px] absolute top-[267px] left-[91px] bg-[#854cff] rounded-[10.8px]">
            <div className="relative w-fit mt-[-0.22px] rotate-[1.13deg] font-outfit font-normal text-white text-[14.4px] tracking-[0] leading-[normal]">
              Encourage
            </div>
          </div>
        </div>

        <div className="relative self-stretch w-[575.1px] bg-white rounded-[28.8px] overflow-hidden flex items-center justify-center">
          <div className="grid grid-rows-5 grid-cols-10 gap-1 p-6" style={{ minWidth: 520, minHeight: 260 }}>
            {gridColors.slice(0, 50).map((color, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-md ${color.startsWith('#') ? '' : `bg-${color}`}`}
                style={color.startsWith('#') ? { backgroundColor: color } : {}}
              />
            ))}
          </div>
        </div>
      </div>

      <img
        className="absolute w-[1108px] h-[626px] top-[131px] left-[-20%]"
        alt="Lol"
        src={lol1}
      />
    </div>
  );
};
