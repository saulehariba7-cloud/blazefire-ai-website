import { NextRequest, NextResponse } from "next/server";

const IMAGE_MODELS = {
  image: "black-forest-labs/flux.2-pro",
  "text-image": "ideogram-ai/ideogram-v4-quality",
} as const;

function buildPrompt(prompt: string, type: "image" | "text-image") {
  if (type === "text-image") {
    return `
Create a professional high-resolution poster/flyer design.

User's requested content:
${prompt}

IMPORTANT:
- Create a clean professional composition.
- Use excellent typography and readable text.
- Preserve the requested wording as accurately as possible.
- Do not invent random words.
- Do not add fake logos, fake brands, fake signatures, or unrelated text.
- Keep all important content inside the safe margins.
- Clean edges.
- Sharp details.
- Professional lighting and composition.
- Suitable for a modern digital poster.
`.trim();
  }

  return `
Create a high-quality professional image based on this request:

${prompt}

Requirements:
- High detail
- Sharp focus
- Clean composition
- Natural lighting
- Realistic and coherent objects
- No random letters
- No random words
- No fake watermark
- No unnecessary text
- Professional visual quality
`.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const prompt = String(body?.prompt || "").trim();
    const type = body?.type === "text-image" ? "text-image" : "image";

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    if (prompt.length > 4000) {
      return NextResponse.json(
        { error: "Prompt is too long." },
        { status: 400 }
      );
    }

    const apiKey = process.env.POLLINATIONS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Pollinations API key is missing. Add POLLINATIONS_API_KEY to .env.local.",
        },
        { status: 500 }
      );
    }

    const model = IMAGE_MODELS[type];

    const response = await fetch(
      "https://gen.pollinations.ai/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt: buildPrompt(prompt, type),
          n: 1,
          size: "1536x1536",
          quality: "high",
          response_format: "url",
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Pollinations error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            data?.error ||
            "Image generation failed.",
        },
        { status: response.status }
      );
    }

    const imageUrl =
      data?.data?.[0]?.url ||
      data?.data?.[0]?.image_url;

    if (!imageUrl) {
      console.error("Unexpected response:", data);

      return NextResponse.json(
        { error: "The image service returned no image URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      model,
    });
  } catch (error) {
    console.error("Generate image error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating the image." },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";

const IMAGE_MODELS = {
  image: "black-forest-labs/flux.2-pro",
  "text-image": "ideogram-ai/ideogram-v4-quality",
} as const;

function buildPrompt(prompt: string, type: "image" | "text-image") {
  if (type === "text-image") {
    return `
Create a professional high-resolution poster/flyer design.

User's requested content:
${prompt}

IMPORTANT:
- Create a clean professional composition.
- Use excellent typography and readable text.
- Preserve the requested wording as accurately as possible.
- Do not invent random words.
- Do not add fake logos, fake brands, fake signatures, or unrelated text.
- Keep all important content inside the safe margins.
- Clean edges.
- Sharp details.
- Professional lighting and composition.
- Suitable for a modern digital poster.
`.trim();
  }

  return `
Create a high-quality professional image based on this request:

${prompt}

Requirements:
- High detail
- Sharp focus
- Clean composition
- Natural lighting
- Realistic and coherent objects
- No random letters
- No random words
- No fake watermark
- No unnecessary text
- Professional visual quality
`.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const prompt = String(body?.prompt || "").trim();
    const type = body?.type === "text-image" ? "text-image" : "image";

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    if (prompt.length > 4000) {
      return NextResponse.json(
        { error: "Prompt is too long." },
        { status: 400 }
      );
    }

    const apiKey = process.env.POLLINATIONS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Pollinations API key is missing. Add POLLINATIONS_API_KEY to .env.local.",
        },
        { status: 500 }
      );
    }

    const model = IMAGE_MODELS[type];

    const response = await fetch(
      "https://gen.pollinations.ai/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt: buildPrompt(prompt, type),
          n: 1,
          size: "1536x1536",
          quality: "high",
          response_format: "url",
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Pollinations error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            data?.error ||
            "Image generation failed.",
        },
        { status: response.status }
      );
    }

    const imageUrl =
      data?.data?.[0]?.url ||
      data?.data?.[0]?.image_url;

    if (!imageUrl) {
      console.error("Unexpected response:", data);

      return NextResponse.json(
        { error: "The image service returned no image URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      model,
    });
  } catch (error) {
    console.error("Generate image error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating the image." },
      { status: 500 }
    );
  }
  black-forest-labs/flux.2-pro
}
ideogram-ai/ideogram-v4-quality
}
object-cover scale-110
}
object-contain
}

