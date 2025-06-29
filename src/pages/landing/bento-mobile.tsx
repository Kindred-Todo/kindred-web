import React from "react";
import { Fire } from "./fire";
import ellipse10 from "./ellipse-10.svg";
import frame5082 from "./frame-5082.png";
import frame from "./frame.svg";
import group4 from "./group-4.png";
import image4 from "./image-4.png";
import image5 from "./image-5.png";
import image6 from "./image-6.png";
import lol1 from "./lol.png";

const gridColors = [
  "#005e21", "#5cff95", "#005e21", "#005e21", "#005e21",
  "#059a39", "#059a39", "#c0ffdd", "#059a39", "#059a39",
  "#54e787", "#c0ffdd", "#059a39", "#059a39", "#c0ffdd",
  "#c0ffdd", "#c0ffdd", "#059a39", "#059a39", "#059a39",
  "#c0ffdd", "#c0ffdd", "#059a39", "#54e787", "#c0ffdd",
  "#c0ffdd", "#059a39", "#c0ffdd", "#54e787", "#c0ffdd",
  "#059a39", "#c0ffdd", "#059a39", "success"
];

export const BentoMobile = () => (
  <div className="flex flex-col items-center justify-center w-full bg-dark-bg rounded-[64px] p-4 z-40">
    <div className="flex flex-col gap-6 w-full">
      {/* Card 2: Group4 */}
      <div className="relative w-full bg-[#854cff] rounded-3xl overflow-hidden flex items-center justify-center min-h-[360px]">
        <img className="w-28 h-22" alt="Group" src={group4} />
      </div>
      {/* Card 3: Influencers */}
      <div className="relative w-full bg-white rounded-3xl min-h-[300px] flex flex-col items-center justify-center p-8">
        <div className="font-fraunces font-normal text-center text-colors-foreground text-2xl tracking-tight leading-normal mb-4">Influencers 🤝 Blueprints</div>
        <img className="w-40 h-auto" alt="Image" src={image4} />
      </div>
      {/* Card 5: Redefining productivity */}
      <div className="relative w-full bg-white rounded-3xl flex items-center justify-center min-h-[320px] p-8 overflow-hidden">
        {/* Top left ellipse */}
        <img 
          src={ellipse10} 
          alt="" 
          className="absolute top-0 left-0 w-16 h-16 scale-150 opacity-100"
        />
        {/* Bottom right ellipse */}
        <img 
          src={ellipse10} 
          alt="" 
          className="absolute bottom-0 right-0 w-16 h-16 scale-150 scale-x-[-1] scale-y-[-1] opacity-100"
        />
        <p className="font-fraunces font-normal text-black text-2xl text-center tracking-tight leading-normal relative z-10">redefining both day-to-day productivity and human connection</p>
      </div>
      {/* Card 6: Frame5082 */}
      <div className="w-full bg-white rounded-3xl flex items-center justify-center min-h-[220px]">
        <img className="w-full max-w-xs" alt="Frame" src={frame5082} />
      </div>
      {/* Card 7: Congrats */}
      <div className="w-full bg-white rounded-3xl overflow-hidden p-8 flex flex-col items-center gap-4 min-h-[300px]">
        <div className="font-fraunces font-normal text-black text-2xl">Congrats! 🎉🍵</div>
        <p className="font-outfit font-light text-colors-foreground text-base text-center">You just finished 'grab matcha with Lok Ye & lock in' its time to share and earn points!</p>
        <img className="w-32 h-auto" alt="Image" src={image6} />
      </div>
      {/* Card 8: Encourage Luffy */}
      <div className="w-full bg-white rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 min-h-[300px]">
        <img className="w-24 h-auto mb-2" alt="Image" src={image5} />
        <Fire className="w-12 h-12 mb-2" />
        <p className="font-fraunces font-normal text-black text-base text-center">Encourage Luffy to<br />"Go to the Gym"</p>
        <div className="inline-flex items-center justify-center gap-2 pt-2 pb-1 px-6 mt-4 bg-[#854cff] rounded-xl">
          <div className="font-outfit font-normal text-white text-sm">Encourage</div>
        </div>
      </div>
      {/* Card 9: Grid */}
      <div className="w-full bg-white rounded-3xl overflow-hidden flex items-center justify-center p-8 min-h-[300px]">
        <div className="flex flex-wrap gap-2 w-full">
          {gridColors.slice(0, 50).map((color, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-sm ${color.startsWith('#') ? '' : `bg-${color}`}`}
              style={color.startsWith('#') ? { backgroundColor: color } : {}}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
); 