
"use client";

import { useRef, useState } from "react";

const styles = [
  { name: "Velocity", icon: "⚡", description: "Speed ramps and fast cuts" },
  { name: "Cinematic", icon: "🎬", description: "Colour grading and atmosphere" },
  { name: "Aggressive", icon: "🔥", description: "Shakes, flashes and impact" },
  { name: "Glow", icon: "💜", description: "Neon lighting and aura" },
];

export default function Home() {
  const [style, setStyle] = useState("Velocity");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState("15");
  const inputRef = useRef<HTMLInputElement>(null);

  function uploadFile(selected?: File) {
    if (!selected) return;

    if (!selected.type.startsWith("video/")) {
      setMessage("Please select a video file.");
      return;
    }

    if (selected.size > 100 * 1024 * 1024) {
      setMessage("Maximum upload size is 100 MB for this demo.");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage("");
  }

  function generateEdit() {
    if (!file) {
      setMessage("Upload an anime clip before generating your edit.");
      return;
    }

    setMessage(
      `Your ${style} edit settings are ready! The AI rendering engine will be connected in the next step.`
    );
  }

  return (
    <main className="min-h-screen bg-[#080810] text-white">
      <header className="border-b border-white/10 bg-[#0d0d18]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <a href="/" className="text-2xl font-black tracking-tight">
            ANIME<span className="text-fuchsia-500">FORGE</span>
          </a>
          <span className="rounded-full border border-fuchsia-500/30 px-3 py-1 text-xs text-fuchsia-300">
            AI EDIT STUDIO
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-fuchsia-400">
            Your anime. Your vision.
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-6xl">
            Create edits that
            <span className="block text-fuchsia-500">hit different.</span>
          </h1>
          <p className="mt-4 text-gray-400">
            Upload your clips, choose your editing style, and prepare
            your next anime edit.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-[#11111e] p-6">
            <h2 className="mb-5 text-xl font-bold">01 / Upload your clip</h2>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex min-h-48 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-fuchsia-500/40 bg-fuchsia-500/5 p-5 transition hover:bg-fuchsia-500/10"
            >
              <span className="mb-3 text-4xl">📁</span>
              <span className="font-bold">Choose an anime video</span>
              <span className="mt-2 text-sm text-gray-400">
                MP4, WebM or other browser-supported video · Max 100 MB
              </span>
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(event) => uploadFile(event.target.files?.[0])}
            />

            {file && (
              <div className="mt-4 rounded-lg bg-white/5 p-3">
                <p className="truncate text-sm font-semibold">{file.name}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {(file.size / (1024 * 1024)).toFixed(1)} MB
                </p>
                <button
                  onClick={() => {
                    if (preview) URL.revokeObjectURL(preview);
                    setFile(null);
                    setPreview("");
                    setMessage("");
                  }}
                  className="mt-2 text-sm text-pink-400 hover:text-pink-300"
                >
                  Remove clip
                </button>
              </div>
            )}

            <h2 className="mb-4 mt-8 text-xl font-bold">
              02 / Choose your style
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {styles.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setStyle(item.name)}
                  className={`rounded-xl border p-4 text-left transition ${
                    style === item.name
                      ? "border-fuchsia-500 bg-fuchsia-500/15"
                      : "border-white/10 bg-white/[0.02] hover:border-white/30"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="mt-2 block font-bold">{item.name}</span>
                  <span className="mt-1 block text-xs text-gray-400">
                    {item.description}
                  </span>
                </button>
              ))}
            </div>

            <h2 className="mb-3 mt-8 text-xl font-bold">
              03 / Edit settings
            </h2>
            <label className="mb-2 block text-sm text-gray-300">
              Video duration
            </label>
            <select
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#191927] p-3 text-white"
            >
              <option value="10">10 seconds</option>
              <option value="15">15 seconds</option>
              <option value="30">30 seconds</option>
              <option value="60">60 seconds</option>
            </select>

            <button
              onClick={generateEdit}
              className="mt-6 w-full rounded-xl bg-fuchsia-600 px-5 py-4 font-black transition hover:bg-fuchsia-500"
            >
              ✨ Prepare My Anime Edit
            </button>

            {message && (
              <p
                role="status"
                className="mt-4 rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 p-3 text-sm text-fuchsia-200"
              >
                {message}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#11111e] p-6">
            <h2 className="mb-5 text-xl font-bold">Live preview</h2>

            <div className="mx-auto flex aspect-[9/16] max-h-[650px] w-full max-w-[330px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black">
              {preview ? (
                <video
                  src={preview}
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="px-8 text-center">
                  <div className="mb-4 text-6xl">🎞️</div>
                  <p className="text-lg font-bold">Your edit starts here</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Upload a clip to preview your video.
                  </p>
                </div>
              )}
            </div>

            <div className="mx-auto mt-5 max-w-[330px] rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Selected style</span>
                <span className="font-bold text-fuchsia-300">{style}</span>
              </div>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-400">Target duration</span>
                <span>{duration} seconds</span>
              </div>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-400">Export format</span>
                <span>Vertical 9:16</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-6 text-center text-sm text-gray-500">
        ANIMEFORGE · Built for anime creators
      </footer>
    </main>
  );
}
lculateProfit();
</script>
</body>
</html>
