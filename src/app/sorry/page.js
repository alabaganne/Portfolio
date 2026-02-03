"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
  useContext,
} from "react";

const MusicContext = createContext(null);

function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
  }, []);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // playback failed
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // playback failed
      }
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, playMusic }}>
      <audio ref={audioRef} src="/clair-de-lune.mp3" loop preload="auto" />
      {children}
    </MusicContext.Provider>
  );
}

function MusicButton() {
  const { isPlaying, toggleMusic } = useContext(MusicContext);

  return (
    <button
      onClick={toggleMusic}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 shadow-lg transition-all cursor-pointer hover:scale-105 ${
        isPlaying
          ? "bg-[#1e2a4a]/80 border-[#4338ca] shadow-[#4338ca]/20"
          : "bg-[#0d1225] border-[#4f46e5] shadow-[#4f46e5]/30 animate-pulse"
      }`}
    >
      <span className="text-2xl">{isPlaying ? "🎵" : "🔇"}</span>
      <span className="text-[#a5b4fc] font-semibold">
        {isPlaying ? "Playing..." : "Play song"}
      </span>
    </button>
  );
}

const coupleImages = [
  "/sorry/0ee625e2be41cca5.jpg",
  "/sorry/a45b8c7ab1ab5b6e.jpg",
  "/sorry/57274fdd3207438b.jpg",
  "/sorry/3ad43e5eb87fb9f9.jpg",
  "/sorry/4e2a6faac5612380.jpeg",
  "/sorry/a6a9ed83b4f338b6.jpg",
  "/sorry/0afc55c82c6c3a84.jpg",
  "/sorry/6e1d45473ce9be1a.jpg",
  "/sorry/3746d5b3509e2aee.jpg",
  "/sorry/eaf1d9f6e6c4772f.jpg",
  "/sorry/946101b2c4581a7f.jpg",
  "/sorry/749806d079eee5a0.jpeg",
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
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 h-full auto-rows-[200px] md:auto-rows-[280px] lg:auto-rows-[340px] xl:auto-rows-[400px]">
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

function NotificationCard({ onOpenLetter }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a] p-4">
      <style>{sorryStyles}</style>
      <Raindrops />
      <div className="relative z-10 max-w-md w-full sorry-fade-in">
        <div className="bg-[#0d1225]/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-[#1e2a4a] shadow-[0_0_80px_rgba(99,102,241,0.15)]">
          {/* Envelope icon */}
          <div className="text-center mb-6">
            <div className="text-7xl mb-4 sorry-pulse">💌</div>
          </div>

          {/* Notification text */}
          <div className="text-center mb-8">
            <p className="text-[#6b7ca0] text-sm uppercase tracking-widest mb-2">
              You have received
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#a5b4fc] mb-3">
              A letter from Ala
            </h1>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#4f46e5] to-transparent mx-auto mb-4" />
            <p className="text-[#93a3c0] text-base">
              He has something important to tell you...
            </p>
          </div>

          {/* Open button */}
          <div className="text-center">
            <button
              onClick={onOpenLetter}
              className="px-8 py-4 bg-gradient-to-r from-[#4338ca] to-[#6366f1] text-white rounded-full font-semibold text-lg hover:from-[#4f46e5] hover:to-[#818cf8] hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
            >
              Open Letter 💌
            </button>
          </div>

          {/* Subtle footer */}
          <p className="text-center text-[#4a5568] text-xs mt-6 italic">
            Take your time...
          </p>
        </div>
      </div>
    </div>
  );
}

function SorryPageContent() {
  const [showLetter, setShowLetter] = useState(false);
  const [answered, setAnswered] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const escapeCountRef = useRef(0);
  const noBtnRef = useRef(null);
  const containerRef = useRef(null);
  const { playMusic } = useContext(MusicContext);

  const handleOpenLetter = () => {
    playMusic();
    setShowLetter(true);
  };

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
    if (!btn) return;

    // Alternate between moving left and right within the card
    const direction = escapeCountRef.current % 2 === 1 ? -1 : 1;
    const translateX = direction * (80 + Math.random() * 40); // Move 80-120px left or right

    btn.style.transform = `translateX(${translateX}px)`;
  }, []);

  // Show notification card first
  if (!showLetter) {
    return <NotificationCard onOpenLetter={handleOpenLetter} />;
  }

  if (answered === "yes") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a] p-4">
        <style>{sorryStyles}</style>
        <Raindrops />
        <div className="relative z-10 max-w-lg w-full text-center sorry-fade-in">
          <div className="bg-[#0d1225]/90 backdrop-blur-sm rounded-2xl p-10 border border-[#1e2a4a] shadow-[0_0_60px_rgba(99,102,241,0.15)]">
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>
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
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>
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
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a]"
    >
      <style>{sorryStyles}</style>
      <Raindrops />
      <PictureFrames />

      {/* Main content */}
      <div className="z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <div className="max-w-xl w-full sorry-fade-in">
          <div className="bg-[#0d1225]/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#1e2a4a] shadow-[0_0_80px_rgba(99,102,241,0.1)]">
            {/* Music Button */}
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>

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
                I was careless with your heart; the most precious thing
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
                chance to show you that I can do better. I promise to do my best
                to make things right.
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
              <div className="flex items-center justify-center gap-4">
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
                  className="px-8 py-3 bg-[#0d1225] text-[#6b7ca0] rounded-full font-semibold text-xl border-2 border-[#1e2a4a] hover:border-[#312e81] transition-transform duration-300 cursor-pointer z-50 shrink-0 whitespace-nowrap"
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

export default function SorryPage() {
  return (
    <MusicProvider>
      <SorryPageContent />
    </MusicProvider>
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
