import React from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  css,
  Flex,
} from "@chakra-ui/core";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Form() {
  const tabStyle = css`
    border-bottom: 2px solid transparent;
    font-size: 2rem;
  `;
  const selectedTabStyle = css`
    box-shadow: "none";
    color: #ea6f5a;
    border-bottom: 2px solid #ea6f5a;
  `;
  const hoverTabStyle = css`
    border-bottom: 2px solid #ea6f5a;
  `;

  return (
    <Box p={10} boxShadow="lg" borderRadius="lg" w="400px">
      <Tabs align="center">
        <TabList align="center">
          <Flex align="center">
            <Tab _focus={{ boxShadow: "none" }}>注册</Tab>
            <Box fontSize="lg">·</Box>
            <Tab _focus={{ boxShadow: "none" }}>登录</Tab>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignUp />
          </TabPanel>
          <TabPanel>
            <SignIn />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
