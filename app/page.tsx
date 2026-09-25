"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "image" | "poster" | "writer";
type Style =
  | "Modern"
  | "Minimal"
  | "Festival"
  | "Business"
  | "Education"
  | "Event";
type Ratio = "square" | "portrait" | "landscape";

type PosterCopy = {
  headline: string;
  subheadline: string;
  body: string;
  footer: string;
};

export default function Home() {
  const [mode, setMode] = useState<Mode>("image");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<Style>("Modern");
  const [ratio, setRatio] = useState<Ratio>("square");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [image, setImage] = useState("");
  const [writerText, setWriterText] = useState("");
  const [posterBackground, setPosterBackground] = useState("");
  const [posterCopy, setPosterCopy] = useState<PosterCopy | null>(null);

  const [listening, setListening] = useState(false);

  const recognitionRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.title = "Teenx Generator";
  }, []);

  // Draw poster text separately so AI does not have to create
  // readable letters inside the image.
  useEffect(() => {
    if (!posterBackground || !posterCopy || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      const width =
        ratio === "portrait"
          ? 1200
          : ratio === "landscape"
          ? 1600
          : 1400;

      const height =
        ratio === "portrait"
          ? 1600
          : ratio === "landscape"
          ? 1000
          : 1400;

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      ctx.drawImage(img, 0, 0, width, height);

      // Readability layer
      const gradient = ctx.createLinearGradient(0, 0, 0, height);

      gradient.addColorStop(0, "rgba(255,255,255,0.04)");
      gradient.addColorStop(0.45, "rgba(255,255,255,0.06)");
      gradient.addColorStop(1, "rgba(255,255,255,0.88)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const margin = Math.round(width * 0.07);
      const maxWidth = width - margin * 2;

      ctx.textAlign = "left";
      ctx.fillStyle = "#130b22";

      ctx.font = `800 ${Math.max(
        42,
        Math.round(width * 0.07)
      )}px Arial`;

      drawWrapped(
        ctx,
        posterCopy.headline,
        margin,
        Math.round(height * 0.17),
        maxWidth,
        Math.round(width * 0.08)
      );

      ctx.font = `600 ${Math.max(
        24,
        Math.round(width * 0.035)
      )}px Arial`;

      drawWrapped(
        ctx,
        posterCopy.subheadline,
        margin,
        Math.round(height * 0.35),
        maxWidth,
        Math.round(width * 0.045)
      );

      ctx.font = `500 ${Math.max(
        20,
        Math.round(width * 0.027)
      )}px Arial`;

      drawWrapped(
        ctx,
        posterCopy.body,
        margin,
        Math.round(height * 0.56),
        maxWidth,
        Math.round(width * 0.04)
      );

      if (posterCopy.footer) {
        ctx.font = `700 ${Math.max(
          18,
          Math.round(width * 0.022)
        )}px Arial`;

        drawWrapped(
          ctx,
          posterCopy.footer,
          margin,
          Math.round(height * 0.87),
          maxWidth,
          Math.round(width * 0.035)
        );
      }
    };

    img.src = posterBackground;
  }, [posterBackground, posterCopy, ratio]);

  function drawWrapped(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = String(text || "").split(/\s+/);

    let line = "";
    let currentY = y;

    for (const word of words) {
      const next = line ? `${line} ${word}` : word;

      if (ctx.measureText(next).width > maxWidth && line) {
        ctx.fillText(line, x, currentY);

        line = word;
        currentY += lineHeight;
      } else {
        line = next;
      }
    }

    if (line) {
      ctx.fillText(line, x, currentY);
    }
  }

  // Microphone
  function startMicrophone() {
    setError("");

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Microphone speech recognition is not supported in this browser."
      );
      return;
    }

    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "hi-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      setError(
        "Microphone input could not be read. Please try again."
      );
    };

    recognition.onresult = (event: any) => {
      let text = "";

      for (
        let index = event.resultIndex;
        index < event.results.length;
        index++
      ) {
        text += event.results[index][0].transcript;
      }

      setPrompt(text);
    };

    recognitionRef.current = recognition;

    recognition.start();
  }

  async function generate() {
    if (!prompt.trim()) {
      setError("Please enter a topic or prompt first.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");

    setImage("");
    setWriterText("");
    setPosterBackground("");
    setPosterCopy(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          mode,
          prompt: prompt.trim(),
          style,
          ratio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Generation failed."
        );
      }

      if (mode === "writer") {
        setWriterText(data.text || "");
      } else if (mode === "poster") {
        setPosterBackground(
          data.backgroundDataUrl || ""
        );

        setPosterCopy(data.copy || null);
      } else {
        setImage(data.imageDataUrl || "");
      }
    } catch (err: any) {
      setError(
        err?.message ||
          "Something went wrong while generating."
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadDataUrl(
    dataUrl: string,
    filename: string
  ) {
    const link = document.createElement("a");

    link.href = dataUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function downloadPoster() {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    link.download = "teenx-generator-poster.png";

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function clearAll() {
    setPrompt("");
    setImage("");
    setWriterText("");
    setPosterBackground("");
    setPosterCopy(null);
    setError("");
  }

  const tabs = [
    {
      id: "image" as Mode,
      icon: "✦",
      label: "Images",
    },

    {
      id: "poster" as Mode,
      icon: "▣",
      label: "Text to Image",
    },

    {
      id: "writer" as Mode,
      icon: "Aa",
      label: "AI Writer",
    },
  ];

  return (
    <main className="app">
      <div className="backgroundGlow glowOne" />
      <div className="backgroundGlow glowTwo" />

      {/* HEADER */}

      <header className="topbar">
        <button
          className="brand"
          onClick={clearAll}
          aria-label="Teenx Generator home"
        >
          <span className="brandIcon">T</span>

          <span>
            <strong>Teenx Generator</strong>
            <small>AI Creative Studio</small>
          </span>
        </button>

        <div className="statusPill">
          <span className="statusDot" />
          Free to use
        </div>
      </header>

      {/* HERO */}

      <section className="hero">
        <div className="eyebrow">
          AI CREATIVE STUDIO
        </div>

        <h1>
          Create.
          <span> Imagine.</span>
          <br />
          Build anything.
        </h1>

        <p>
          Generate images, posters, pamphlets and
          topic-aware writing from one clean workspace.
        </p>
      </section>

      {/* GENERATOR */}

      <section className="generator">
        <nav
          className="tabs"
          aria-label="Generator modes"
        >
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              className={
                mode === tabItem.id
                  ? "tab active"
                  : "tab"
              }
              onClick={() => {
                setMode(tabItem.id);
                setError("");
              }}
            >
              <span className="tabIcon">
                {tabItem.icon}
              </span>

              {tabItem.label}
            </button>
          ))}
        </nav>

        <div className="card">
          <div className="cardHeader">
            <div>
              <h2>
                {mode === "image"
                  ? "AI Image Generator"
                  : mode === "poster"
                  ? "Poster & Pamphlet Designer"
                  : "AI Writer"}
              </h2>

              <p>
                {mode === "image"
                  ? "Describe exactly what you want to see."
                  : mode === "poster"
                  ? "Create a visual design while keeping important poster text readable."
                  : "Ask for an answer, explanation, article, notes, ideas or another writing task."}
              </p>
            </div>

            <div className="qualityBadge">
              HD • Smart • Safe
            </div>
          </div>

          {/* POSTER OPTIONS */}

          {mode === "poster" && (
            <div className="selectRow">
              <label>
                Design style

                <select
                  value={style}
                  onChange={(event) =>
                    setStyle(
                      event.target.value as Style
                    )
                  }
                >
                  <option>Modern</option>
                  <option>Minimal</option>
                  <option>Festival</option>
                  <option>Business</option>
                  <option>Education</option>
                  <option>Event</option>
                </select>
              </label>

              <label>
                Layout

                <select
                  value={ratio}
                  onChange={(event) =>
                    setRatio(
                      event.target.value as Ratio
                    )
                  }
                >
                  <option value="square">
                    Square
                  </option>

                  <option value="portrait">
                    Portrait
                  </option>

                  <option value="landscape">
                    Landscape
                  </option>
                </select>
              </label>
            </div>
          )}

          {/* PROMPT */}

          <div className="promptArea">
            <textarea
              value={prompt}
              maxLength={4000}
              onChange={(event) =>
                setPrompt(event.target.value)
              }
              onKeyDown={(event) => {
                if (
                  (event.ctrlKey ||
                    event.metaKey) &&
                  event.key === "Enter"
                ) {
                  generate();
                }
              }}
              placeholder={
                mode === "image"
                  ? "Example: A futuristic Indian city at sunset, cinematic lighting, highly detailed..."
                  : mode === "poster"
                  ? "Example: School Science Exhibition. Headline: Science Expo 2026. Date: 12 October. Add a clean educational design..."
                  : "Example: Explain photosynthesis for a class 8 student with headings, simple examples and a short summary."
              }
            />

            <div className="promptBottom">
              <button
                className={
                  listening
                    ? "micButton listening"
                    : "micButton"
                }
                onClick={startMicrophone}
                title="Voice input"
                aria-label="Voice input"
              >
                {listening ? "●" : "🎙"}
              </button>

              <span>
                {prompt.length}/4000
              </span>
            </div>
          </div>

          {/* GENERATE BUTTON */}

          <button
            className="generateButton"
            disabled={loading}
            onClick={generate}
          >
            {loading
              ? "Generating..."
              : mode === "writer"
              ? "Generate Answer"
              : "Generate"}
          </button>

          <div className="shortcut">
            Tip: Ctrl/Cmd + Enter also generates.
          </div>

          {/* ERROR */}

          {error && (
            <div className="errorBox">
              {error}
            </div>
          )}

          {/* PRIVACY */}

          <div className="privacyBox">
            <strong>Privacy:</strong>{" "}
            Teenx Generator does not save your prompts
            in browser history or its own prompt
            database. Your prompt is sent to the
            configured AI provider only when you press
            Generate. Do not enter passwords, private
            keys or other sensitive information.
          </div>
        </div>
      </section>

      {/* RESULT */}

      {(image ||
        writerText ||
        posterBackground) && (
        <section className="resultSection">
          <div className="resultHeader">
            <div>
              <div className="eyebrow">
                RESULT
              </div>

              <h2>Your generation</h2>
            </div>

            <div className="resultActions">
              <button
                className="secondaryButton"
                onClick={clearAll}
              >
                Clear
              </button>

              {mode === "image" &&
                image && (
                  <button
                    className="downloadButton"
                    onClick={() =>
                      downloadDataUrl(
                        image,
                        "teenx-generator-image.png"
                      )
                    }
                  >
                    Download PNG
                  </button>
                )}

              {mode === "poster" &&
                posterCopy && (
                  <button
                    className="downloadButton"
                    onClick={downloadPoster}
                  >
                    Download Poster
                  </button>
                )}
            </div>
          </div>

          {/* IMAGE RESULT */}

          {mode === "image" &&
            image && (
              <div className="imageResult">
                <img
                  src={image}
                  alt="Generated by Teenx Generator"
                />
              </div>
            )}

          {/* WRITER RESULT */}

          {mode === "writer" &&
            writerText && (
              <article className="writerResult">
                {writerText}
              </article>
            )}

          {/* POSTER RESULT */}

          {mode === "poster" &&
            posterBackground &&
            posterCopy && (
              <div className="posterResult">
                <canvas ref={canvasRef} />

                <p>
                  Poster text is rendered separately
                  in the browser so important wording
                  stays readable instead of depending
                  on AI typography.
                </p>
              </div>
            )}
        </section>
      )}

      <footer>
        <strong>Teenx Generator</strong>
        <span>AI generation workspace</span>
      </footer>
    </main>
  );
}
