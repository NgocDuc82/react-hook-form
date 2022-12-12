import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Radio, Row, Col, Button, Form, Checkbox } from "antd";

import moment from "moment";

const schema = yup.object().shape({
  Email: yup.string().email().required(),
  Password: yup
    .string()
    .required()
    .min(8)
    .max(16)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password invalid"
    ),
  Checkbox: yup.boolean(),
  Radio: yup.string().required(),
  Date: yup.date().required(),
});
export default function App() {

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Row>
      <Col span={12} offset={6}>
        {/* <h1>{christmas.random()};</h1> */}
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item label="Email">
            <Controller
              control={control}
              name="Email"
              render={({ field }) => <Input {...field} />}
            />
            {errors.Email?.message && <p>{errors.Email?.message}</p>}
          </Form.Item>

          <Form.Item label="Password">
            <Controller
              control={control}
              name="Password"
              render={({ field }) => <Input.Password {...field} />}
            />
            {errors.Password?.message && <p>{errors.Password?.message}</p>}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Controller
              control={control}
              name="Checkbox"
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  checked={value}
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                >
                  Remember
                </Checkbox>
              )}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Controller
              control={control}
              name="Radio"
              render={({ field: { onChange, value } }) => (
                <Radio.Group
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                >
                  <Radio value={1}>A</Radio>
                  <Radio value={2}>B</Radio>
                  <Radio value={3}>C</Radio>
                  <Radio value={4}>D</Radio>
                </Radio.Group>
              )}
            />
            {errors.Radio?.message && <p>{errors.Radio?.message}</p>}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Controller
              control={control}
              name="Date"
              render={({ field }) => <Input type="date" {...field} />}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" disabled={!isValid} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
