import React from "react";
import SideMenuComponent from "./SideMenu.component";

export default {
  children: "",
  title: "Component/SideMenu",
  component: SideMenuComponent,
};

const Template = (args: any) => {
  return <SideMenuComponent {...args} />;
};

const props = {
  defaultProps: () => ({}),
};

export const SideMenuStory: any = Template.bind({});
const defaultProps = props.defaultProps();
SideMenuStory.storyName = "SideMenu";
SideMenuStory.args = {
  ...defaultProps,
};
