import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TypedTerminal } from "./TypedTerminal";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TypedTerminal",
  component: TypedTerminal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TypedTerminal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TypedTerminal> = (args) => {
  return <TypedTerminal {...args} />;
};

const sharedArgs = {
  title: "Typed Terminal",
  promptText: "user@local:~$",
  typedJsProps: {},
};

export const Basic = Template.bind({});
Basic.args = {
  ...sharedArgs,
  terminalData: [
    {
      command: "ls -a ./folder-1",
      results: ["file 1", "file 2", "file 3", "file 4"],
    },
  ],
};

export const MultipleCommands = Template.bind({});
MultipleCommands.args = {
  ...sharedArgs,
  terminalData: [
    {
      command: "ls -a ./folder-1",
      results: ["file 1", "file 2"],
    },
    {
      command: "ls -a ./folder-2",
      results: ["file 1", "file 2"],
    },
    {
      command: "ls -a ./folder-3",
      results: ["file 1", "file 2"],
    },
    {
      command: "ls -a ./folder-4",
      results: ["file 1", "file 2"],
    },
  ],
};

export const TypedFormatting = Template.bind({});
TypedFormatting.args = {
  ...sharedArgs,
  terminalData: [
    {
      command: "ls -a ./slow-folder",
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
};
