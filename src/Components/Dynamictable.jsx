import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { employeeData } from '../JSON/employdata'; 

const Dynamictable = ({formData, setFormData}) => {
 
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []); 

  const columns = employeeData[0]?.fields
    ?.filter((field) => field.label.toLowerCase() !== "save")
    .map((field) => ({
      title: field.label,
      dataIndex: field.id,
      key: field.id,
    })) || [];
    const dataSource = formData.map((data, index) => ({
      ...data,
      key: data.id || index, 
    }));

  return (
    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Table 
        columns={columns} 
        dataSource={dataSource} 
        rowKey="key"
        pagination={false}
      />
    </div>
  );
};

export default Dynamictable;
