import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TerminalLine } from ".";

const meta: Meta<typeof TerminalLine> = {
  title: "TerminalLine",
  component: TerminalLine,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TerminalLine>;

export const Basic: Story = {
  args: {
    hidden: false,
    promptText: "user@local:~ $",
    typedJsProps: {
      strings: [
        "ls -a ./some-folder-1" +
          "\n" +
          [
            "file1",
            "file2",
            "file3",
            "file4",
            "file5",
            "file6",
            "file7",
            "file8",
          ].join("\n"),
      ],
      loop: false,
      typeSpeed: 40,
      showCursor: false,
    },
  },
};
