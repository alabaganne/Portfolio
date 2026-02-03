"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    // Attempt autoplay — browsers may block this
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked — user must click the button
        setIsPlaying(false);
      }
    };

    tryAutoplay();
  }, []);

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
    <>
      <audio ref={audioRef} src="/clair-de-lune.mp3" loop preload="auto" />
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border-2 border-pink-300 shadow-lg flex items-center justify-center text-xl hover:scale-110 hover:bg-pink-50 transition-all cursor-pointer"
      >
        {isPlaying ? "🎵" : "🔇"}
      </button>
    </>
  );
}

function HeyPageContent() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get("name");
  const name = rawName
    ? rawName
        .trim()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ")
    : null;

  const [answered, setAnswered] = useState(null); // null | "yes" | "no"
  const [submitted, setSubmitted] = useState(false);
  const noBtnRef = useRef(null);
  const containerRef = useRef(null);

  const submitAnswer = useCallback(
    async (answer) => {
      setAnswered(answer);
      if (submitted) return;
      try {
        await fetch("/api/hey/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name || "Anonymous", answer }),
        });
        setSubmitted(true);
      } catch {
        // silently fail — don't ruin the moment
      }
    },
    [name, submitted]
  );

  const moveNoButton = useCallback(() => {
    const btn = noBtnRef.current;
    const container = containerRef.current;
    if (!btn || !container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;

    const randomX = Math.floor(Math.random() * maxX) + 10;
    const randomY = Math.floor(Math.random() * maxY) + 10;

    btn.style.position = "absolute";
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
  }, []);

  const displayName = name || "you";

  if (answered === "yes") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border-2 border-pink-200">
          <div className="text-7xl mb-6 animate-bounce">🥰</div>
          <h1 className="text-4xl font-bold text-pink-600 mb-3">Yaaay!</h1>
          <p className="text-pink-500 text-xl">
            I knew you&apos;d say yes{name ? `, ${name}` : ""}! You just made me
            the happiest person ever 🎉
          </p>
          <p className="text-pink-400 mt-4 text-base">
            Can&apos;t wait to see you! 💐
          </p>
        </div>
      </div>
    );
  }

  if (answered === "no") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border-2 border-pink-200">
          <div className="text-7xl mb-6">🤨</div>
          <h1 className="text-4xl font-bold text-pink-600 mb-3">
            Wrong answer!
          </h1>
          <p className="text-pink-500 text-xl">
            That wasn&apos;t even a real option
            {name ? `, ${name}` : ""}... nice try though 😏
          </p>
          <button
            onClick={() => setAnswered(null)}
            className="mt-6 px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors cursor-pointer"
          >
            Try again 🙄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 relative overflow-hidden p-4"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border-2 border-pink-200 z-10">
        <div className="text-7xl mb-6">👉👈</div>
        <h1 className="text-4xl font-bold text-pink-600 mb-3">
          Hey {displayName}!
        </h1>
        <p className="text-pink-500 text-xl mb-8">
          Sooo... I&apos;ve been meaning to ask you something...
          <br />
          <span className="font-semibold text-pink-600">
            Will you go out with me? 🙈
          </span>
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => submitAnswer("yes")}
            className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold text-xl hover:bg-pink-600 hover:scale-110 transition-all cursor-pointer shadow-lg shadow-pink-300"
          >
            Yes! 😊
          </button>
          <button
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={() => submitAnswer("no")}
            className="px-8 py-3 bg-white text-pink-400 rounded-full font-semibold text-xl border-2 border-pink-300 hover:border-pink-400 transition-all cursor-pointer"
          >
            No 😐
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeyPage() {
  return (
    <>
      <MusicPlayer />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200">
            <div className="text-pink-500">Loading...</div>
          </div>
        }
      >
        <HeyPageContent />
      </Suspense>
    </>
  );
}
