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
  const selectedTabStyle = css`
    a: "b";
    box-shadow: none;
    color: #ea6f5a;
    border-bottom: 2px solid #ea6f5a;
    font-weight: 600;
  `;
  const hoverTabStyle = css`
    a: "b";
    border-bottom: 2px solid #ea6f5a;
  `;

  return (
    <Box
      p={10}
      boxShadow="lg"
      borderRadius="lg"
      backgroundColor="#fff"
      w="400px">
      <Tabs borderColor="transparent">
        <TabList justifyContent="center">
          <Flex align="center">
            <Tab
              fontSize={20}
              _selected={selectedTabStyle}
              _hover={hoverTabStyle}>
              登录
            </Tab>
            <Box fontSize="lg" mx={5}>
              ·
            </Box>
            <Tab
              fontSize={20}
              _selected={selectedTabStyle}
              _hover={hoverTabStyle}>
              注册
            </Tab>
          </Flex>
        </TabList>
        <TabPanels pt="20px">
          <TabPanel>
            <SignIn />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
