import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TypedTerminal, TerminalLine } from "./TypedTerminal";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TypedTerminal",
  component: TypedTerminal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TypedTerminal>;

const terminalData = {
  skills: [
    {
      summary: "Modern full stack web development",
      extras: [
        "✅ Latest Javascript, Typescript and ReactJs practices",
        "✅ Testing for a maintainable and scalable codebase",
        "✅ Building internal and public solutions",
      ],
    },
    {
      summary: "Developing scalable data engineering pipelines ",
      extras: [
        "✅ Developing containerized Airflow environments",
        "✅ Developing Airflow operators and plugins for custom integrations",
        "✅ Scalable data warehouse object management with DBT and Liquidbase",
      ],
    },
    {
      summary: "Building scalable and automated devops solutions",
      extras: [
        "✅ Scalable applications and deployments containers",
        "✅ Implementing infrastructure as code with ansible and terraform",
        "✅ Building CICD infrastructure on Jenkins and Github Actions",
      ],
    },
  ],
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TypedTerminal> = (args) => {
  const [animationState, setAnimationState] = React.useState(
    terminalData.skills.map((skill, index) => (index == 0 ? true : false))
  );

  return (
    <TypedTerminal {...args}>
      {terminalData.skills.map((skill, index) => {
        return (
          <TerminalLine
            key={`${skill}-${index}`}
            skill={skill}
            show={animationState[index]}
            isVisible={true}
            onCompleteFunc={() => {
              let currentState = [...animationState];
              currentState[index + 1] = true;
              setAnimationState(currentState);
            }}
            delay={1500}
          />
        );
      })}
    </TypedTerminal>
  );
};

export const Primary = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "Some terminal title",
};
