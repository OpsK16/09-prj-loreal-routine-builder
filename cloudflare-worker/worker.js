export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    try {
      const body = await request.json();
      const {
        task,
        selectedProducts = [],
        messages = [],
        userQuestion = "",
      } = body;

      const systemInstruction =
        "You are a beauty advisor. You must answer only about the generated routine, skincare, haircare, makeup, fragrance, and closely related beauty topics. If a question is outside this scope, politely redirect back to beauty topics.";

      let finalMessages = [];

      if (task === "generate-routine") {
        finalMessages = [
          {
            role: "system",
            content: systemInstruction,
          },
          {
            role: "user",
            content:
              "Build a personalized beginner-friendly beauty routine using only these selected products. Include short morning and evening steps, and simple safety notes when needed. Products JSON: " +
              JSON.stringify(selectedProducts),
          },
        ];
      } else {
        finalMessages = [
          {
            role: "system",
            content: systemInstruction,
          },
          ...messages,
          {
            role: "user",
            content: userQuestion,
          },
        ];
      }

      const openAIResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: finalMessages,
            temperature: 0.7,
          }),
        },
      );

      if (!openAIResponse.ok) {
        const errorText = await openAIResponse.text();
        return new Response(
          JSON.stringify({
            error: "OpenAI request failed",
            details: errorText,
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const data = await openAIResponse.json();
      const reply =
        data.choices?.[0]?.message?.content || "No response returned.";

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Invalid request", details: String(error) }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }
  },
};
