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
  FormHelperText,
} from "@chakra-ui/core";
import {
  FaUserAlt,
  FaLock,
  FaPhone,
  FaWeibo,
  FaWeixin,
  FaQq,
} from "react-icons/fa";
import { useFormik } from "formik";
import axios from "axios";

export default function SignUp() {
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(
        "https://conduit.productionready.io/api/users",
        {
          user: values,
        }
      );
      setSuccess(true);
    } catch (e) {
      const {
        response: {
          data: { errors },
        },
      } = e;
      actions.setErrors({
        email: errors.email && errors.email[0],
        password: errors.password && errors.password[0],
        username: errors.username && errors.username[0],
      });
    }
  };
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={5}>
        {success && <Text>注册成功</Text>}
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
              placeholder="你的昵称"
              pl="40px"
              name="username"
              {...formik.getFieldProps("username")}
              required
            />
          </InputGroup>
          {formik.errors.email && (
            <FormHelperText>{formik.errors.username}</FormHelperText>
          )}

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<FaPhone />}
              h="100%"
            />
            <Input
              type="tel"
              placeholder="手机号"
              pl="40px"
              name="email"
              {...formik.getFieldProps("email")}
              required
            />
          </InputGroup>
          {formik.errors.email && (
            <FormHelperText>{formik.errors.email}</FormHelperText>
          )}

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<FaLock />}
              h="100%"
            />
            <Input
              type="password"
              placeholder="设置密码"
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

        <Button
          type="submit"
          boxShadow="xl"
          colorScheme="green"
          w="100%"
          borderRadius="full">
          注册
        </Button>
        <Text fontSize="xs" textAlign="center" px={10}>
          点击 “注册” 即表示您同意并愿意遵守简书
          <Link href="https://www.jianshu.com/p/c44d171298ce"> 用户协议 </Link>
          和<Link href="https://www.jianshu.com/p/2ov8x3"> 隐私政策 </Link> 。
        </Text>
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
