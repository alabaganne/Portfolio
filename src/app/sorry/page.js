"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const coupleImages = [
  "https://images.pexels.com/photos/4873580/pexels-photo-4873580.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/7698567/pexels-photo-7698567.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/14106978/pexels-photo-14106978.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3967023/pexels-photo-3967023.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/6338488/pexels-photo-6338488.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4884002/pexels-photo-4884002.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4015089/pexels-photo-4015089.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/7173030/pexels-photo-7173030.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/9306097/pexels-photo-9306097.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/285938/pexels-photo-285938.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/8685288/pexels-photo-8685288.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2549003/pexels-photo-2549003.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/6324269/pexels-photo-6324269.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/7643577/pexels-photo-7643577.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4884002/pexels-photo-4884002.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const frameRotations = [-5, 3, -3, 7, -2, 4, -6, 2, -4, 5, -7, 3, -3, 6, -5, 4];

function Raindrops() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    setDrops(
      Array.from({ length: 50 }, (_, i) => ({
        left: `${(i * 2) + (i % 3)}%`,
        delay: `${(i * 0.3) % 5}s`,
        duration: `${3 + (i % 4)}s`,
        height: `${10 + (i % 18)}px`,
      }))
    );
  }, []);

  return drops.map((drop, i) => (
    <div
      key={i}
      className="sorry-raindrop"
      style={{
        left: drop.left,
        animationDelay: drop.delay,
        animationDuration: drop.duration,
        height: drop.height,
      }}
    />
  ));
}

function PictureFrames() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 h-full auto-rows-[160px] md:auto-rows-[200px] lg:auto-rows-[240px]">
        {coupleImages.map((img, i) => (
          <div
            key={i}
            className="sorry-frame"
            style={{
              transform: `rotate(${frameRotations[i]}deg)`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/80 via-[#0a0e1a]/50 to-[#0a0e1a]/85" />
    </div>
  );
}

export default function SorryPage() {
  const [answered, setAnswered] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const escapeCountRef = useRef(0);
  const noBtnRef = useRef(null);
  const btnContainerRef = useRef(null);

  const submitAnswer = useCallback(
    async (answer) => {
      setAnswered(answer);
      if (submitted) return;
      try {
        await fetch("/api/sorry/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Eya", answer }),
        });
        setSubmitted(true);
      } catch {
        // silently fail
      }
    },
    [submitted]
  );

  const moveNoButton = useCallback(() => {
    if (escapeCountRef.current >= 3) return;
    escapeCountRef.current += 1;

    const btn = noBtnRef.current;
    const container = btnContainerRef.current;
    if (!btn || !container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 10;
    const maxY = containerRect.height - btnRect.height - 10;

    const randomX = Math.floor(Math.random() * Math.max(maxX, 50)) + 5;
    const randomY = Math.floor(Math.random() * Math.max(maxY, 30)) + 5;

    btn.style.position = "absolute";
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
  }, []);

  if (answered === "yes") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a] p-4">
        <style>{sorryStyles}</style>
        <Raindrops />
        <div className="relative z-10 max-w-lg w-full text-center sorry-fade-in">
          <div className="bg-[#0d1225]/90 backdrop-blur-sm rounded-2xl p-10 border border-[#1e2a4a] shadow-[0_0_60px_rgba(99,102,241,0.15)]">
            <div className="text-7xl mb-6 sorry-pulse">💍</div>
            <h1 className="text-4xl font-bold text-[#a5b4fc] mb-4">Eya...</h1>
            <p className="text-[#93a3c0] text-lg leading-relaxed mb-4">
              You&apos;ve given me the greatest gift I could ever ask for. I
              promise to spend every single day making you feel loved, cherished,
              and happy.
            </p>
            <p className="text-[#818cf8] text-xl font-semibold">
              You are my everything. I love you forever.
            </p>
            <div className="mt-6 w-16 h-[1px] bg-gradient-to-r from-transparent via-[#4f46e5] to-transparent mx-auto" />
            <p className="text-[#6b7ca0] text-sm mt-4 italic">
              Forever and always yours, Ala
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (answered === "no") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a] p-4">
        <style>{sorryStyles}</style>
        <Raindrops />
        <div className="relative z-10 max-w-lg w-full text-center sorry-fade-in">
          <div className="bg-[#0d1225]/90 backdrop-blur-sm rounded-2xl p-10 border border-[#1e2a4a] shadow-[0_0_60px_rgba(99,102,241,0.15)]">
            <div className="text-7xl mb-6">💔</div>
            <h1 className="text-4xl font-bold text-[#a5b4fc] mb-4">
              I understand...
            </h1>
            <p className="text-[#93a3c0] text-lg leading-relaxed mb-4">
              I know I&apos;ve hurt you deeply, Eya. I don&apos;t blame you. But
              I want you to know that my love for you will never fade.
            </p>
            <p className="text-[#6b7ca0] italic">
              I&apos;ll wait for you... always.
            </p>
            <button
              onClick={() => {
                setAnswered(null);
                escapeCountRef.current = 0;
              }}
              className="mt-8 px-8 py-3 bg-[#312e81] text-[#a5b4fc] rounded-full font-semibold hover:bg-[#3730a3] transition-all cursor-pointer border border-[#4338ca]/50"
            >
              Give me another chance?
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a]">
      <style>{sorryStyles}</style>
      <Raindrops />
      <PictureFrames />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <div className="max-w-xl w-full sorry-fade-in">
          <div className="bg-[#0d1225]/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#1e2a4a] shadow-[0_0_80px_rgba(99,102,241,0.1)]">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🥀</div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#a5b4fc] mb-2">
                I&apos;m Sorry, Eya
              </h1>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#4f46e5] to-transparent mx-auto" />
            </div>

            {/* Apology letter */}
            <div className="space-y-5 text-[#93a3c0] text-base md:text-lg leading-relaxed italic">
              <p>My Dearest Eya,</p>
              <p>
                I know words alone cannot undo the mistakes I&apos;ve made, but I
                need you to know how deeply sorry I am.
              </p>
              <p>
                I was careless with your heart &mdash; the most precious thing
                I&apos;ve ever been trusted with. I took your love for granted
                when I should have been cherishing every single moment with you.
              </p>
              <p>
                Every day without your warmth beside me is a reminder of what my
                foolishness has cost us. The silence where your laugh used to be
                is the heaviest thing I&apos;ve ever carried.
              </p>
              <p>
                I&apos;m not asking you to forget the pain. I&apos;m asking for a
                chance to prove that I can be the man you deserve. That I can
                spend every day of my life making it right.
              </p>
              <p>
                You are my everything, Eya. Without you, this world is just
                shades of gray.
              </p>
              <p>I&apos;m sorry. From the deepest part of my soul.</p>
              <p className="text-right text-[#818cf8]">
                Forever yours,
                <br />
                <span className="text-xl not-italic font-semibold">Ala</span>
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#1e2a4a]" />
              <span className="text-[#4f46e5] text-xl">💍</span>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#1e2a4a]" />
            </div>

            {/* The question */}
            <div className="text-center">
              <p className="text-[#c4b5fd] text-xl md:text-2xl font-semibold mb-2">
                Eya, despite everything...
              </p>
              <p className="text-[#a5b4fc] text-lg md:text-xl mb-8">
                Will you forgive me and be my lovely, submissive, cute wife?
              </p>

              {/* Buttons */}
              <div
                ref={btnContainerRef}
                className="relative min-h-[80px] flex items-center justify-center gap-4"
              >
                <button
                  onClick={() => submitAnswer("yes")}
                  className="px-8 py-3 bg-[#4338ca] text-white rounded-full font-semibold text-xl hover:bg-[#4f46e5] hover:scale-110 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all cursor-pointer z-10"
                >
                  Yes! 💍
                </button>
                <button
                  ref={noBtnRef}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={() => submitAnswer("no")}
                  className="px-8 py-3 bg-transparent text-[#6b7ca0] rounded-full font-semibold text-xl border-2 border-[#1e2a4a] hover:border-[#312e81] transition-all cursor-pointer z-10"
                >
                  No 😔
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sorryStyles = `
  @keyframes sorry-raindrop {
    0% { transform: translateY(-20px); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.8; }
    100% { transform: translateY(100vh); opacity: 0; }
  }

  @keyframes sorry-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes sorry-float {
    0%, 100% { transform: var(--frame-rotation) translateY(0); }
    50% { transform: var(--frame-rotation) translateY(-6px); }
  }

  @keyframes sorry-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .sorry-raindrop {
    position: fixed;
    top: -20px;
    width: 1.5px;
    background: linear-gradient(transparent, rgba(147, 197, 253, 0.25));
    animation: sorry-raindrop linear infinite;
    z-index: 2;
    pointer-events: none;
  }

  .sorry-fade-in {
    animation: sorry-fade-in 1s ease-out;
  }

  .sorry-frame {
    position: relative;
    overflow: hidden;
    opacity: 0.15;
    border: 6px solid #1a1528;
    box-shadow: inset 0 0 8px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.6), 0 0 0 2px #0d0a14;
    padding: 3px;
    background: #0d0a14;
    animation: sorry-float 6s ease-in-out infinite;
  }

  .sorry-pulse {
    animation: sorry-pulse 2s ease-in-out infinite;
  }
`;
