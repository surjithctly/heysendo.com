import { Button } from "@usesend/ui/src/button";
import { CodeBlock } from "@usesend/ui/src/code-block";
import { CodeBlockWithCopy } from "@usesend/ui/src/code-block-with-copy";
import { LangToggle } from "./CodeLangToggle";

const TS_CODE = `import { UseSend } from "usesend-js";

const usesend = new UseSend("us_12345");

usesend.emails.send({
  to: "hello@acme.com",
  from: "hello@company.com",
  subject: "useSend email",
  html: "<p>useSend is the best open source product to send emails</p>",
  text: "useSend is the best open source product to send emails",
});`;

const PY_CODE = `from usesend import UseSend

client = UseSend("us_12345")

data, err = client.emails.send({
    "to": "hello@acme.com",
    "from": "hello@company.com",
    "subject": "useSend email",
    "html": "<p>useSend is the best open source product to send emails</p>",
    "text": "useSend is the best open source product to send emails",
})

print(data or err)`;

const GO_CODE = `package main

import (
    "fmt"
    "io"
    "net/http"
    "strings"
)

func main() {
    url := "https://app.heysendo.com/api/v1/emails"

    payload := strings.NewReader("{\n     \\"to\\": \\"hello@acme.com\\",\n     \\"from\\": \\"hello@company.com\\",\n     \\"subject\\": \\"Sendo email\\",\n     \\"html\\": \\"<p>Sendo is the best open source product to send emails</p>\\",\n     \\"text\\": \\"Sendo is the best open source product to send emails\\"\\n    }")

    req, _ := http.NewRequest("POST", url, payload)
    req.Header.Add("Content-Type", "application/json")
    req.Header.Add("Authorization", "Bearer us_12345")

    res, _ := http.DefaultClient.Do(req)
    defer res.Body.Close()

    body, _ := io.ReadAll(res.Body)
    fmt.Println(res)
    fmt.Println(string(body))
}`;

const PHP_CODE = `<?php

$ch = curl_init('https://app.heysendo.com/api/v1/emails');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    'Content-Type: application/json',
    'Authorization: Bearer us_12345',
  ],
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => json_encode([
    'to' => 'hello@acme.com',
    'from' => 'hello@company.com',
    'subject' => 'useSend email',
    'html' => '<p>useSend is the best open source product to send emails</p>',
    'text' => 'useSend is the best open source product to send emails',
  ]),
]);

$response = curl_exec($ch);
if ($response === false) {
  echo 'cURL error: ' . curl_error($ch);
} else {
  echo $response;
}
curl_close($ch);`;

export function CodeExample() {
  const containerId = "code-example";
  const languages = [
    {
      key: "ts",
      label: "TypeScript",
      kind: "ts",
      shiki: "typescript" as const,
      code: TS_CODE,
    },
    {
      key: "py",
      label: "Python",
      kind: "py",
      shiki: "python" as const,
      code: PY_CODE,
    },
    {
      key: "go",
      label: "Go",
      kind: "go",
      shiki: "go" as const,
      code: GO_CODE,
    },
    {
      key: "php",
      label: "PHP",
      kind: "php",
      shiki: "php" as const,
      code: PHP_CODE,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-accent/30">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="section-label mb-3">Developers</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
            Built for developers
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Typed SDKs and simple APIs, so you can focus on product not
            plumbing.
          </p>
        </div>

        {/* Code block */}
        <div id={containerId}>
          {/* Language toggle */}
          <div className="flex justify-center mb-6">
            <LangToggle
              containerId={containerId}
              defaultLang="ts"
              languages={languages.map(({ key, label, kind }) => ({
                key,
                label,
                kind,
              }))}
            />
          </div>

          {/* Code container */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
            {languages.map((l, idx) => (
              <div
                key={l.key}
                data-lang-slot={l.key}
                className={idx === 0 ? "block" : "hidden"}>
                <CodeBlockWithCopy code={l.code}>
                  <CodeBlock
                    lang={l.shiki as any}
                    className="p-5 sm:p-6 text-sm">
                    {l.code}
                  </CodeBlock>
                </CodeBlockWithCopy>
              </div>
            ))}
          </div>
          <div className="sr-only" aria-live="polite">
            Language example toggled
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://docs.usesend.com"
            target="_blank"
            rel="noopener noreferrer">
            <Button size="lg" className="px-8 h-12 rounded-full font-medium">
              Read the docs
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CodeExample;
