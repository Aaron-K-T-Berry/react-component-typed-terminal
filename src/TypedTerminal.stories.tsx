import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TypedTerminal } from ".";

const meta: Meta<typeof TypedTerminal> = {
  title: "TypedTerminal",
  component: TypedTerminal,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TypedTerminal>;

const sharedArgs = {
  title: "Typed Terminal",
  promptText: "user@local:~ $",
  typedJsProps: {},
};

export const Basic: Story = {
  args: {
    ...sharedArgs,
    terminalData: [
      {
        command: "ls -a ./folder-1",
        results: ["file 1", "file 2", "file 3", "file 4"],
      },
    ],
  },
};

export const MultipleCommands: Story = {
  args: {
    ...sharedArgs,
    terminalData: [
      {
        command: "^200ls -a ./folder-1",
        results: ["file 1", "file 2"],
      },
      {
        command: "^200ls -a ./folder-2",
        results: ["file 1", "file 2"],
      },
      {
        command: "^200ls -a ./folder-3",
        results: ["file 1", "file 2"],
      },
      {
        command: "^200ls -a ./folder-4",
        results: ["file 1", "file 2"],
      },
    ],
  },
};

export const TypedFormatting: Story = {
  args: {
    ...sharedArgs,
    terminalData: [
      {
        command: "^100ls -a ./slow-folder",
        results: [
          "^50file 1",
          "^100file 2",
          "^200file 3",
          "^400file 4",
          "^800file 5",
          "^1600file 6",
        ],
      },
    ],
  },
};
