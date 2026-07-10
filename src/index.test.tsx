import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import TypedTerminal, { TerminalLine } from "./index";

type TypedInstance = {
  destroy: ReturnType<typeof vi.fn>;
  options: Record<string, unknown>;
};

const typedInstances: TypedInstance[] = [];

vi.mock("typed.js", () => {
  return {
    default: class MockTyped {
      destroy: ReturnType<typeof vi.fn>;
      options: Record<string, unknown>;

      constructor(_element: Element, options: Record<string, unknown> = {}) {
        this.options = options;
        this.destroy = vi.fn();
        typedInstances.push(this);
      }
    },
  };
});

vi.mock("./styles.css", () => ({}));

afterEach(() => {
  cleanup();
  typedInstances.length = 0;
  vi.clearAllMocks();
});

describe("TypedTerminal", () => {
  it("renders default title and empty terminal body", () => {
    render(<TypedTerminal />);

    expect(screen.getByText("Typed Terminal")).toBeInTheDocument();
    expect(document.querySelector(".TerminalBody")).toBeInTheDocument();
    expect(document.querySelectorAll(".TerminalLine")).toHaveLength(0);
  });

  it("renders custom title, prompt, and terminal data", () => {
    render(
      <TypedTerminal
        title="Demo Terminal"
        promptText="dev@host:~ $"
        terminalData={[
          {
            command: "ls",
            results: ["file-a", "file-b"],
          },
        ]}
      />
    );

    expect(screen.getByText("Demo Terminal")).toBeInTheDocument();
    expect(screen.getByText("dev@host:~ $")).toBeInTheDocument();
    expect(typedInstances).toHaveLength(1);
    expect(typedInstances[0].options.strings).toEqual(["ls\nfile-a\nfile-b"]);
  });

  it("reveals the next line after onComplete", async () => {
    render(
      <TypedTerminal
        terminalData={[
          { command: "echo one", results: ["one"] },
          { command: "echo two", results: ["two"] },
        ]}
      />
    );

    expect(typedInstances).toHaveLength(1);

    const prompts = document.querySelectorAll(".TerminalPrompt");
    expect(prompts[0]).not.toHaveAttribute("hidden");
    expect(prompts[1]).toHaveAttribute("hidden");

    const onComplete = typedInstances[0].options.onComplete as () => void;
    onComplete();

    await waitFor(() => {
      expect(typedInstances).toHaveLength(2);
    });

    const updatedPrompts = document.querySelectorAll(".TerminalPrompt");
    expect(updatedPrompts[1]).not.toHaveAttribute("hidden");
    expect(typedInstances[1].options.strings).toEqual(["echo two\ntwo"]);
  });

  it("merges typedJsProps over defaults", () => {
    render(
      <TypedTerminal
        terminalData={[{ command: "pwd", results: ["/tmp"] }]}
        typedJsProps={{
          typeSpeed: 10,
          showCursor: true,
          loop: true,
        }}
      />
    );

    expect(typedInstances[0].options).toMatchObject({
      typeSpeed: 10,
      showCursor: true,
      loop: true,
    });
  });
});

describe("TerminalLine", () => {
  beforeEach(() => {
    typedInstances.length = 0;
  });

  it("does not construct Typed while hidden", () => {
    render(
      <TerminalLine
        hidden
        promptText="user@local:~ $"
        typedJsProps={{ strings: ["hidden"] }}
      />
    );

    expect(typedInstances).toHaveLength(0);
    expect(document.querySelector(".TerminalPrompt")).toHaveAttribute("hidden");
  });

  it("constructs Typed once when visible", () => {
    const { rerender } = render(
      <TerminalLine
        hidden
        promptText="user@local:~ $"
        typedJsProps={{ strings: ["visible"] }}
      />
    );

    expect(typedInstances).toHaveLength(0);

    rerender(
      <TerminalLine
        hidden={false}
        promptText="user@local:~ $"
        typedJsProps={{ strings: ["visible"] }}
      />
    );

    expect(typedInstances).toHaveLength(1);
    expect(document.querySelector(".TerminalPrompt")).not.toHaveAttribute(
      "hidden"
    );

    rerender(
      <TerminalLine
        hidden={false}
        promptText="user@local:~ $"
        typedJsProps={{ strings: ["visible-again"] }}
      />
    );

    expect(typedInstances).toHaveLength(1);
  });
});
