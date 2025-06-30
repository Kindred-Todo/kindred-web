import React, { useState, useEffect } from "react";
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
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const calculateScaleFactor = () => {
      const originalWidth = 1727;
      const currentWidth = window.innerWidth;
      const newScaleFactor = currentWidth / originalWidth;
      setScaleFactor(newScaleFactor);
    };

    // Calculate initial scale factor
    calculateScaleFactor();

    // Add resize listener
    window.addEventListener('resize', calculateScaleFactor);

    // Cleanup
    return () => {
      window.removeEventListener('resize', calculateScaleFactor);
    };
  }, []);

  // Calculate scaling factor based on 1727 as original width
  const getScaledValue = (value: number) => {
    return value * scaleFactor;
  };

  return (
    <div className="flex flex-col items-start relative bg-colors-sceen-background" style={{ 
      height: getScaledValue(1152),
      gap: getScaledValue(28.8),
      padding: getScaledValue(28.8)
    }}>
      <div className="flex items-start relative flex-1 self-stretch w-full grow" style={{ gap: getScaledValue(28.8) }}>
        <div className="relative bg-[#fbfbfb] rounded-[28.8px] overflow-hidden" style={{ 
          width: getScaledValue(403.2), 
          height: getScaledValue(722.7),
          marginBottom: getScaledValue(-377.10)
        }}>
          <img
            className="absolute top-0 left-0"
            alt="Ellipse"
            src={ellipse10}
            style={{ width: getScaledValue(188), height: getScaledValue(186) }}
          />

          <div className="absolute bg-[#854cff33] rounded-[128.7px]" style={{ 
            width: getScaledValue(257), 
            height: getScaledValue(257),
            top: getScaledValue(233),
            left: getScaledValue(288)
          }} />
        </div>

        <div className="relative self-stretch bg-[#854cff] rounded-[28.8px] overflow-hidden" style={{ width: getScaledValue(311.4) }}>
          <img
            className="absolute"
            alt="Group"
            src={group4}
            style={{ 
              width: getScaledValue(108), 
              height: getScaledValue(87),
              top: getScaledValue(130),
              left: getScaledValue(101)
            }}
          />
        </div>

        <div className="relative flex-1 self-stretch grow bg-white rounded-[28.8px]">
          <div className="relative" style={{ 
            width: getScaledValue(861), 
            height: getScaledValue(374), 
            top: getScaledValue(-29),
            left: getScaledValue(41)
          }}>
            <div className="flex flex-col items-start justify-center absolute" style={{ 
              width: getScaledValue(655), 
              height: getScaledValue(217),
              top: getScaledValue(93),
              left: 0,
              gap: getScaledValue(14.4)
            }}>
              <div className="font-fraunces relative font-normal text-colors-foreground text-4xl tracking-[-1.80px] leading-[normal]" style={{ width: getScaledValue(502.2) }}>
                Influencers 🤝 Blueprints
              </div>
            </div>

            <img
              className="absolute"
              alt="Image"
              src={image4}
              style={{ 
                width: getScaledValue(318), 
                height: getScaledValue(374),
                top: 0,
                left: getScaledValue(544)
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-start relative flex-1 self-stretch w-full grow" style={{ gap: getScaledValue(28.8) }}>
        <img
          className="relative self-stretch"
          alt="Frame"
          src={frame}
          style={{ width: getScaledValue(403.2) }}
        />

        <div className="relative self-stretch bg-white rounded-[28.8px] overflow-hidden flex items-center justify-center" style={{ width: getScaledValue(772.2) }}>
          <p className="font-fraunces font-normal text-black text-4xl text-center tracking-[-0.72px] leading-[normal]" style={{ height: getScaledValue(88) }}>
            redefining both day-to-day
            <br />
            productivity and human connection
          </p>
        </div>

        <img
          className="relative"
          alt="Frame"
          src={frame5082}
          style={{ width: getScaledValue(443.6), height: getScaledValue(345.6) }}
        />
      </div>

      <div className="flex items-start relative flex-1 self-stretch w-full grow" style={{ gap: getScaledValue(28.8) }}>
        <div className="relative self-stretch bg-white rounded-[28.8px] overflow-hidden" style={{ width: getScaledValue(698.4) }}>
          <div className="relative" style={{ 
            width: getScaledValue(733), 
            height: getScaledValue(346),
            left: getScaledValue(-34)
          }}>
            <div className="absolute font-fraunces font-normal text-black text-4xl tracking-[-1.08px] leading-[normal]" style={{ 
              height: getScaledValue(44),
              top: getScaledValue(89),
              left: getScaledValue(77)
            }}>
              Congrats! 🎉🍵
            </div>

            <div className="absolute top-0 left-0" style={{ width: getScaledValue(733), height: getScaledValue(346) }}>
              <p className="absolute font-outfit font-light text-colors-foreground text-[21.6px] tracking-[0.90px] leading-[32.4px]" style={{ 
                width: getScaledValue(514), 
                height: getScaledValue(96),
                top: getScaledValue(156),
                left: getScaledValue(77)
              }}>
                You just finished 'grab matcha with <br />
                Lok Ye &amp; lock in' its time to share <br />
                and earn points!
              </p>

              <div className="absolute font-outfit font-light text-black text-[115.2px] tracking-[0.90px] leading-[172.8px] whitespace-nowrap" style={{ 
                height: getScaledValue(173),
                top: getScaledValue(85),
                left: getScaledValue(559)
              }}>
                🎉
              </div>

              <div className="absolute bg-[#854cff26] rotate-[7.90deg] backdrop-blur-[1.8px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(1.8px)_brightness(100%)]" style={{ 
                width: getScaledValue(539), 
                height: getScaledValue(33),
                top: getScaledValue(263),
                left: 0
              }} />

              <img
                className="absolute"
                alt="Image"
                src={image6}
                style={{ 
                  width: getScaledValue(286), 
                  height: getScaledValue(346),
                  top: 0,
                  left: getScaledValue(446)
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl flex flex-col items-center justify-center p-8 min-h-[350px] w-full">
          <img src={image5} alt="Luffy" className="w-24 h-24 object-cover rounded-full mb-4" />
          <Fire className="w-10 h-10 mb-2" />
          <p className="font-fraunces text-black text-xl text-center mb-4">
            Encourage Luffy to<br />"Go to the Gym"
          </p>
          <button className="bg-[#854cff] text-white rounded-lg px-8 py-2 font-outfit text-base">
            Encourage
          </button>
        </div>

        <div className="relative self-stretch bg-white rounded-[28.8px] overflow-hidden flex items-center justify-center" style={{ width: getScaledValue(575.1) }}>
          <div className="grid grid-rows-5 grid-cols-10" style={{ 
            minWidth: getScaledValue(520), 
            minHeight: getScaledValue(260),
            gap: getScaledValue(4),
            padding: getScaledValue(24)
          }}>
            {gridColors.slice(0, 50).map((color, index) => (
              <div
                key={index}
                className={`rounded-md ${color.startsWith('#') ? '' : `bg-${color}`}`}
                style={color.startsWith('#') ? { backgroundColor: color, width: getScaledValue(48), height: getScaledValue(48) } : { width: getScaledValue(48), height: getScaledValue(48) }}
              />
            ))}
          </div>
        </div>
      </div>

      <img
        className="absolute"
        alt="Lol"
        src={lol1}
        style={{ 
          width: getScaledValue(1108), 
          height: getScaledValue(626),
          top: getScaledValue(131),
          left: getScaledValue(-345.4) // -20% of 1727
        }}
      />
    </div>
  );
};
