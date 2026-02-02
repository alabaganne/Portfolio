"use client";

import { useState, useEffect } from "react";

export default function AnswersPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hey/responses")
      .then((res) => res.json())
      .then((data) => setResponses(data))
      .catch(() => setResponses([]))
      .finally(() => setLoading(false));
  }, []);

  const yesCount = responses.filter((r) => r.answer === "yes").length;
  const noCount = responses.filter((r) => r.answer === "no").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            Responses 💌
          </h1>
          <p className="text-pink-400">
            Secret dashboard &mdash; all /hey responses
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 text-center border-2 border-pink-200 shadow-lg">
            <p className="text-3xl font-bold text-pink-600">
              {responses.length}
            </p>
            <p className="text-pink-400 text-sm mt-1">Total</p>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center border-2 border-pink-200 shadow-lg">
            <p className="text-3xl font-bold text-green-500">{yesCount}</p>
            <p className="text-pink-400 text-sm mt-1">Yes 💕</p>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center border-2 border-pink-200 shadow-lg">
            <p className="text-3xl font-bold text-red-400">{noCount}</p>
            <p className="text-pink-400 text-sm mt-1">No 😬</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-pink-400 py-12">Loading...</div>
        ) : responses.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border-2 border-pink-200 shadow-lg">
            <p className="text-5xl mb-4">🦗</p>
            <p className="text-pink-400 text-lg">
              No responses yet. Send someone to /hey!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...responses].reverse().map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border-2 border-pink-200 shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {r.answer === "yes" ? "💕" : "😬"}
                  </span>
                  <div>
                    <p className="font-semibold text-pink-600">{r.name}</p>
                    <p className="text-pink-300 text-xs">
                      {new Date(r.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    r.answer === "yes"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {r.answer === "yes" ? "Yes!" : "No"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
