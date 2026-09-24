"use client";

import { useState } from "react";

type Tab = "image" | "poster" | "writer";

const restrictedWords = [
  "porn",
  "pornography",
  "nude",
  "nudity",
  "sex",
  "sexual",
  "xxx",
  "gore",
  "suicide",
  "self harm",
  "self-harm",
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("image");

  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [details, setDetails] = useState("");

  const [image, setImage] = useState("");
  const [writerOutput, setWriterOutput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [credits, setCredits] = useState(3);

  const containsRestricted = (text: string) => {
    const value = text.toLowerCase();

    return restrictedWords.some((word) =>
      value.includes(word)
    );
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter an image description.");
      return;
    }

    if (credits <= 0) {
      setError("You have no credits left.");
      return;
    }

    if (containsRestricted(prompt)) {
      setError("This prompt contains restricted content.");
      return;
    }

    setLoading(true);
    setError("");
    setImage("");

    try {
      /*
        Pollinations public image endpoint.

        IMPORTANT:
        We use the image as a background only for posters.
        Exact poster text is added with HTML/CSS.
      */

      const imagePrompt = encodeURIComponent(
        `
        Create an ultra high quality professional image.

        Requirements:
        - extremely detailed
        - sharp image
        - realistic lighting
        - premium composition
        - clean professional design
        - high resolution
        - no random text
        - no fake letters
        - no random numbers
        - no logos
        - no website names
        - no watermark
        - no typography

        User request:
        ${prompt}
        `
      );

      const url =
        `https://image.pollinations.ai/prompt/${imagePrompt}` +
        `?model=flux` +
        `&width=1536` +
        `&height=1024` +
        `&enhance=true`;

      /*
        Preload image so we know whether it actually loaded.
      */

      await new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve();

        img.onerror = () =>
          reject(new Error("Image generation failed."));

        img.src = url;
      });

      setImage(url);
      setCredits((value) => Math.max(0, value - 1));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Image generation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const generatePoster = async () => {
    if (!title.trim()) {
      setError("Please enter a poster title.");
      return;
    }

    if (credits <= 0) {
      setError("You have no credits left.");
      return;
    }

    const allText =
      `${title} ${subtitle} ${details} ${prompt}`;

    if (containsRestricted(allText)) {
      setError("This poster contains restricted content.");
      return;
    }

    setLoading(true);
    setError("");
    setImage("");

    try {
      /*
        VERY IMPORTANT:

        The AI creates ONLY the visual background.

        It is NOT asked to draw the poster text.

        This prevents:
        "Annual Science Exhibition"
        becoming
        "Annu4l Scienc3 Exh1b1t1on"

        The actual text is rendered by the browser.
      */

      const backgroundPrompt = encodeURIComponent(
        `
        Create a premium professional poster BACKGROUND.

        Theme:
        ${prompt || "modern professional event"}

        Design requirements:
        - premium graphic design
        - cinematic lighting
        - beautiful composition
        - high detail
        - sharp details
        - professional colors
        - sophisticated background
        - clean empty area for typography
        - visually balanced
        - high resolution

        ABSOLUTELY DO NOT GENERATE:
        - text
        - letters
        - numbers
        - words
        - logos
        - website names
        - watermarks
        - signatures

        Background only.
        `
      );

      const url =
        `https://image.pollinations.ai/prompt/${backgroundPrompt}` +
        `?model=flux` +
        `&width=1536` +
        `&height=1024` +
        `&enhance=true`;

      await new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve();

        img.onerror = () =>
          reject(new Error("Poster background generation failed."));

        img.src = url;
      });

      setImage(url);
      setCredits((value) => Math.max(0, value - 1));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Poster generation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const generateWriter = async () => {
    if (!prompt.trim()) {
      setError("Please enter a writing topic.");
      return;
    }

    if (credits <= 0) {
      setError("You have no credits left.");
      return;
    }

    if (containsRestricted(prompt)) {
      setError("This prompt contains restricted content.");
      return;
    }

    setLoading(true);
    setError("");
    setWriterOutput("");

    try {
      /*
        Simple client-side writer demo.

        For production AI writing, connect this function
        to your server-side AI API.
      */

      const text = `
BLAZEFIRE AI — GENERATED CONTENT

Topic:
${prompt}

Introduction
${prompt} is an important and interesting topic that can be understood by looking at its main ideas, practical applications, and impact on everyday life.

Main Discussion
Understanding this subject requires attention to its key concepts and real-world importance. It can influence the way people learn, work, communicate, and solve problems.

Key Points
• Clear understanding of the main concept
• Practical applications in everyday situations
• Importance of responsible and thoughtful use
• Opportunities for future development

Conclusion
Overall, ${prompt} is a valuable topic to explore. Learning about it can help students and creators develop better knowledge, creativity, and problem-solving skills.

Generated with Blazefire.ai
      `.trim();

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      setWriterOutput(text);
      setCredits((value) => Math.max(0, value - 1));
    } catch {
      setError("Writing failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (tab === "image") {
      generateImage();
    } else if (tab === "poster") {
      generatePoster();
    } else {
      generateWriter();
    }
  };

  const downloadImage = async () => {
    if (!image) return;

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = "blazefire-ai.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(image, "_blank");
    }
  };

  const downloadPoster = async () => {
    if (!image) return;

    /*
      This downloads the AI background.

      The HTML text overlay is visible in the browser,
      but converting the whole DOM poster into PNG requires
      a canvas/html-to-image library.
    */

    await downloadImage();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1a0b02 0%, #050505 40%, #000 100%)",
        color: "#fff",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      {/* HEADER */}

      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,.08)",
          background: "rgba(0,0,0,.75)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "auto",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 25,
                fontWeight: 900,
                letterSpacing: "-1px",
              }}
            >
              Blaze
              <span style={{ color: "#ff6b00" }}>
                fire
              </span>
              <span style={{ color: "#fff" }}>
                .ai
              </span>
            </div>

            <div
              style={{
                fontSize: 11,
                color: "#777",
                marginTop: 2,
              }}
            >
              AI CREATION STUDIO
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(255,107,0,.3)",
              background: "rgba(255,107,0,.1)",
              borderRadius: 999,
              padding: "9px 15px",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            ⚡ {credits} Credits
          </div>
        </div>
      </header>

      {/* HERO */}

      <section
        style={{
          maxWidth: 1200,
          margin: "auto",
          padding: "70px 24px 30px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: 800,
            margin: "auto",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 15px",
              borderRadius: 999,
              background: "rgba(255,107,0,.1)",
              border:
                "1px solid rgba(255,107,0,.25)",
              color: "#ff9a52",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            ✨ Powered by Blazefire AI
          </div>

          <h1
            style={{
              fontSize:
                "clamp(42px, 7vw, 76px)",
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: "-4px",
              margin: 0,
            }}
          >
            Create.
            <span style={{ color: "#ff6b00" }}>
              {" "}
              Imagine.
            </span>
            <br />
            Build Anything.
          </h1>

          <p
            style={{
              color: "#888",
              maxWidth: 650,
              margin: "25px auto 0",
              lineHeight: 1.7,
              fontSize: 16,
            }}
          >
            Create high-quality AI images, crystal-clear
            posters and useful content with Blazefire.ai.
          </p>
        </div>

        {/* TABS */}

        <div
          style={{
            maxWidth: 720,
            margin: "45px auto 0",
            padding: 5,
            display: "flex",
            gap: 5,
            borderRadius: 18,
            background: "rgba(255,255,255,.04)",
            border:
              "1px solid rgba(255,255,255,.08)",
          }}
        >
          {[
            ["image", "🎨 Image"],
            ["poster", "📝 Poster"],
            ["writer", "✍️ Writer"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => {
                setTab(value as Tab);
                setError("");
              }}
              style={{
                flex: 1,
                border: "none",
                borderRadius: 13,
                padding: "13px 10px",
                cursor: "pointer",
                background:
                  tab === value
                    ? "#ff6b00"
                    : "transparent",
                color:
                  tab === value ? "#000" : "#999",
                fontWeight: 800,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: 25,
            marginTop: 25,
          }}
        >
          {/* INPUT PANEL */}

          <div
            style={{
              border:
                "1px solid rgba(255,255,255,.09)",
              background: "rgba(255,255,255,.035)",
              borderRadius: 25,
              padding: 25,
            }}
          >
            {tab === "poster" ? (
              <>
                <h2 style={{ marginTop: 0 }}>
                  Professional Poster
                </h2>

                <p
                  style={{
                    color: "#777",
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  AI creates the background. Your exact
                  text is added separately for maximum
                  clarity.
                </p>

                <Input
                  label="Main Title"
                  value={title}
                  onChange={setTitle}
                  placeholder="Annual Science Exhibition"
                />

                <Input
                  label="Subtitle"
                  value={subtitle}
                  onChange={setSubtitle}
                  placeholder="Discover • Learn • Create"
                />

                <TextArea
                  label="Details"
                  value={details}
                  onChange={setDetails}
                  placeholder={
                    "25 October 2026\nSchool Auditorium\n10:00 AM"
                  }
                  rows={4}
                />

                <TextArea
                  label="Design"
                  value={prompt}
                  onChange={setPrompt}
                  placeholder="Modern blue science theme, futuristic laboratory, glowing scientific elements..."
                  rows={5}
                />
              </>
            ) : (
              <>
                <h2 style={{ marginTop: 0 }}>
                  {tab === "image"
                    ? "AI Image Generator"
                    : "AI Writer"}
                </h2>

                <p
                  style={{
                    color: "#777",
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {tab === "image"
                    ? "Describe the image you want to create."
                    : "Describe what you want Blazefire AI to write."}
                </p>

                <TextArea
                  label="Prompt"
                  value={prompt}
                  onChange={setPrompt}
                  placeholder={
                    tab === "image"
                      ? "A futuristic city at sunset, cinematic lighting, realistic architecture, ultra detailed..."
                      : "Write a report about renewable energy for students..."
                  }
                  rows={12}
                />
              </>
            )}

            {/* ERROR */}

            {error && (
              <div
                style={{
                  marginTop: 15,
                  padding: 13,
                  borderRadius: 12,
                  background:
                    "rgba(255,50,50,.1)",
                  border:
                    "1px solid rgba(255,50,50,.2)",
                  color: "#ff8888",
                  fontSize: 13,
                }}
              >
                {error}
              </div>
            )}

            {/* GENERATE */}

            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: 20,
                padding: "16px",
                border: "none",
                borderRadius: 15,
                background: loading
                  ? "#6b3000"
                  : "#ff6b00",
                color: "#000",
                fontWeight: 900,
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontSize: 15,
              }}
            >
              {loading
                ? "⏳ Creating..."
                : "☄️ Generate with Blazefire AI"}
            </button>
          </div>

          {/* RESULT PANEL */}

          <div
            style={{
              border:
                "1px solid rgba(255,255,255,.09)",
              background: "rgba(255,255,255,.025)",
              borderRadius: 25,
              padding: 20,
              minHeight: 500,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 800,
                  }}
                >
                  Result
                </div>

                <div
                  style={{
                    color: "#666",
                    fontSize: 11,
                    marginTop: 3,
                  }}
                >
                  Blazefire.ai
                </div>
              </div>

              {image && (
                <button
                  onClick={
                    tab === "poster"
                      ? downloadPoster
                      : downloadImage
                  }
                  style={{
                    padding: "9px 13px",
                    borderRadius: 10,
                    border:
                      "1px solid rgba(255,255,255,.1)",
                    background:
                      "rgba(255,255,255,.04)",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  ↓ Download
                </button>
              )}
            </div>

            {/* WRITER RESULT */}

            {tab === "writer" ? (
              <div
                style={{
                  minHeight: 420,
                  padding: 22,
                  borderRadius: 18,
                  background:
                    "rgba(0,0,0,.35)",
                  border:
                    "1px solid rgba(255,255,255,.07)",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.8,
                  color: "#ddd",
                  fontSize: 14,
                }}
              >
                {loading ? (
                  <div
                    style={{
                      minHeight: 380,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                    }}
                  >
                    Writing...
                  </div>
                ) : writerOutput ? (
                  writerOutput
                ) : (
                  <EmptyResult />
                )}
              </div>
            ) : image ? (
              /* POSTER */

              tab === "poster" ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: 18,
                    background: "#000",
                    aspectRatio: "3 / 2",
                  }}
                >
                  <img
                    src={image}
                    alt="Blazefire AI poster"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* DARK OVERLAY */}

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.45))",
                    }}
                  />

                  {/* EXACT TEXT */}

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      padding: "8%",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        color: "#fff",
                        fontSize:
                          "clamp(25px,5vw,52px)",
                        lineHeight: 1.05,
                        fontWeight: 950,
                        textShadow:
                          "0 4px 25px rgba(0,0,0,.9)",
                        maxWidth: "95%",
                      }}
                    >
                      {title}
                    </h2>

                    {subtitle && (
                      <div
                        style={{
                          marginTop: 14,
                          color: "#fff",
                          fontSize:
                            "clamp(14px,2.5vw,25px)",
                          fontWeight: 700,
                          textShadow:
                            "0 3px 15px rgba(0,0,0,.9)",
                          maxWidth: "90%",
                        }}
                      >
                        {subtitle}
                      </div>
                    )}

                    {details && (
                      <div
                        style={{
                          marginTop: 20,
                          whiteSpace: "pre-line",
                          color: "#fff",
                          fontSize:
                            "clamp(11px,1.7vw,17px)",
                          lineHeight: 1.6,
                          fontWeight: 600,
                          textShadow:
                            "0 2px 12px rgba(0,0,0,.9)",
                          maxWidth: "85%",
                        }}
                      >
                        {details}
                      </div>
                    )}
                  </div>

                  {/* BLAZEFIRE BRAND */}

                  <div
                    style={{
                      position: "absolute",
                      bottom: 15,
                      right: 18,
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: 2,
                      color:
                        "rgba(255,255,255,.75)",
                    }}
                  >
                    BLAZEFIRE.AI
                  </div>
                </div>
              ) : (
                /* NORMAL IMAGE */

                <div
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#000",
                  }}
                >
                  <img
                    src={image}
                    alt="Blazefire AI generated image"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              )
            ) : (
              <EmptyResult />
            )}
          </div>
        </div>

        {/* FEATURES */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 15,
            marginTop: 35,
          }}
        >
          <Feature
            icon="🎨"
            title="High Quality"
            text="Large-resolution AI image generation."
          />

          <Feature
            icon="🔤"
            title="Clear Typography"
            text="Poster text is rendered by the browser instead of AI."
          />

          <Feature
            icon="⚡"
            title="Blazefire AI"
            text="One simple workspace for images, posters and writing."
          />
        </div>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          borderTop:
            "1px solid rgba(255,255,255,.08)",
          padding: "35px 20px",
          textAlign: "center",
          color: "#555",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 20,
          }}
        >
          Blaze
          <span style={{ color: "#ff6b00" }}>
            fire
          </span>
          .ai
        </div>

        <div
          style={{
            marginTop: 8,
            fontSize: 12,
          }}
        >
          AI Creation Studio
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 11,
          }}
        >
          © 2026 Blazefire.ai
        </div>
      </footer>
    </main>
  );
}

/* INPUT */

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div style={{ marginTop: 18 }}>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 13,
          fontWeight: 800,
        }}
      >
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "13px 14px",
          borderRadius: 12,
          border:
            "1px solid rgba(255,255,255,.1)",
          background: "rgba(0,0,0,.4)",
          color: "#fff",
          outline: "none",
        }}
      />
    </div>
  );
}

/* TEXTAREA */

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows: number;
}) {
  return (
    <div style={{ marginTop: 18 }}>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 13,
          fontWeight: 800,
        }}
      >
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border:
            "1px solid rgba(255,255,255,.1)",
          background: "rgba(0,0,0,.4)",
          color: "#fff",
          outline: "none",
          resize: "vertical",
          lineHeight: 1.6,
        }}
      />
    </div>
  );
}

/* EMPTY */

function EmptyResult() {
  return (
    <div
      style={{
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 18,
        border:
          "1px dashed rgba(255,255,255,.1)",
        background: "rgba(0,0,0,.2)",
      }}
    >
      <div style={{ fontSize: 50 }}>
        ✨
      </div>

      <div
        style={{
          marginTop: 15,
          fontWeight: 800,
          color: "#aaa",
        }}
      >
        Ready to create
      </div>

      <div
        style={{
          marginTop: 7,
          maxWidth: 300,
          color: "#555",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        Enter your prompt and generate your
        Blazefire AI creation.
      </div>
    </div>
  );
}

/* FEATURE */

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        padding: 22,
        borderRadius: 18,
        border:
          "1px solid rgba(255,255,255,.08)",
        background: "rgba(255,255,255,.025)",
      }}
    >
      <div style={{ fontSize: 28 }}>
        {icon}
      </div>

      <div
        style={{
          marginTop: 12,
          fontWeight: 800,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 7,
          color: "#666",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        {text}
      </div>
    </div>
  );
}
