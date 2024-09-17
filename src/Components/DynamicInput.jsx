import { Button, Form, Input, Select, Typography, message } from 'antd';
import React, { useState } from 'react';
import { employeeData } from '../JSON/employdata';
import Dynamictable from './Dynamictable';


const { Option } = Select;
const { Title } = Typography;

const DynamicInput = () => {
  const [formData, setFormData] = useState([]);
  const [form] = Form.useForm(); 

  const onFinish = (values) => {
    message.success('Form submitted successfully!'); 
    let updateddata= [...formData,values]
    localStorage.setItem('formData', JSON.stringify(updateddata)); 
    setFormData(updateddata); 
  form.resetFields();
  };
  const mapValidation = (validation) => {
    return validation.map((rule) => {
      const mappedRule = {};
      if (rule.type === 'required') {
        mappedRule.required = true;
        mappedRule.message = rule.message;
      } else if (rule.type === 'maxLength') {
        mappedRule.max = parseInt(rule.value, 10);
        mappedRule.message = rule.message;
      }
      return mappedRule;
    });
  };

  return (
    <>
  
    <Form
      form={form} 
      name="basic"
      style={{
        maxWidth: '600px', 
        margin: 'auto', 
        padding: '20px',
        backgroundColor: '#f0f2f5',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish} 
      autoComplete="off"
      layout="vertical"
    >
      {employeeData.map((section) => 
      (
        <div key={section.id} style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ marginBottom: '20px' }}>
            {section.label}
          </Title>
          {section.fields.map((field) => (
            <Form.Item
              key={field.id}
              label={field.label !== "Save" ? field.label : ''}
              name={field.id}
              rules={field.validation ? mapValidation(field.validation) : []} 
            >
              {field.type === 'text' ? (
                <Input placeholder={field.placeholder}  />):
                field.type === 'email' ? (
                  <Input placeholder={field.placeholder}  /> 
              ):field.type === 'file' ? (
                <Input placeholder={field.placeholder}  />
              ):field.type === 'number' ? (
                <Input placeholder={field.placeholder}  />
              ) : field.type === 'password'  ? (
                <Input.Password placeholder={field.placeholder} />
              ) : field.type === 'select' ? (
                <Select placeholder={field.placeholder}>
                  {field?.options?.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              ) : field.type === 'date' ? (
                <Input type={field.type} placeholder={field.placeholder}  />
              ) : field.type === 'button' ? (
                <Button type="primary" htmlType="submit" style={{ width: '100%' }} >
                  {field.label}
                </Button>
              ) : null}
            </Form.Item>
          ))}
        </div>
      ))}
    </Form>
        <Dynamictable formData={formData} setFormData={setFormData} />
    </>
  );
};

export default DynamicInput;
