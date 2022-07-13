import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TerminalLine } from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TerminalLine",
  component: TerminalLine,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TerminalLine>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TerminalLine> = (args) => {
  return <TerminalLine {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
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
};
