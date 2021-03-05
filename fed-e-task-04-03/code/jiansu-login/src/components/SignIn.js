import React, { useState } from "react";
import {
  Input,
  Stack,
  InputGroup,
  Button,
  Text,
  Link,
  InputLeftElement,
  Divider,
  Flex,
  Checkbox,
  FormHelperText,
} from "@chakra-ui/core";
import { FaUserAlt, FaLock, FaWeibo, FaWeixin, FaQq } from "react-icons/fa";
import { useFormik } from "formik";
import axios from "axios";

export default function SignUp() {
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(
        "https://conduit.productionready.io/api/users/login",
        {
          user: values,
        }
      );
      console.log(data);
      setSuccess(true);
    } catch (e) {
      const {
        response: {
          data: { errors },
        },
      } = e;
      console.log(e, errors);
      actions.setErrors({
        password: "用户名或密码错误",
      });
      console.log(formik, actions);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={5}>
        {success && <Text>登录成功</Text>}
        <Stack spacing={0} w="100%">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<FaUserAlt />}
              h="100%"
            />
            <Input
              type="tel"
              placeholder="手机号或邮箱"
              pl="40px"
              name="email"
              {...formik.getFieldProps("email")}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<FaLock />}
              h="100%"
            />
            <Input
              type="password"
              placeholder="密码"
              pl="40px"
              name="password"
              {...formik.getFieldProps("password")}
              required
            />
          </InputGroup>
          {formik.errors.password && (
            <FormHelperText>{formik.errors.password}</FormHelperText>
          )}
        </Stack>

        <Stack direction="row" w="100%" justify="space-between">
          <Checkbox>记住我</Checkbox>
          <Link>登录遇到问题</Link>
        </Stack>

        <Button
          type="submit"
          boxShadow="xl"
          colorScheme="blue"
          w="100%"
          borderRadius="full">
          登录
        </Button>
      </Stack>

      <Flex direction="row" align="center" mt="50px">
        <Divider orientation="horizontal" />
        <Text px="1" fontSize={5} flexShrink="0">
          社交账号登录
        </Text>
        <Divider orientation="horizontal" />
      </Flex>
      <Stack
        direction="row"
        spacing={5}
        align="center"
        justify="center"
        mt="10px">
        <Link>
          <FaWeibo fontSize="1.5rem" />
        </Link>
        <Link>
          <FaWeixin fontSize="1.5rem" />
        </Link>
        <Link>
          <FaQq fontSize="1.5rem" />
        </Link>
      </Stack>
    </form>
  );
}
