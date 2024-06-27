import { Table, Button, Modal, Form, Input, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { fetchBudgetData, updateBudgetData, deleteBudgetData } from './api';

function List() {
  const [info, setInfo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [rapor,SetRapor]=useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBudgetData();
        const formattedData = data.map((item) => ({
          key: item.row_id,
          row_id: item.row_id,
          names: item.names,
          type: item.type,
          price: item.price,
          date: item.date,
        }));
        setInfo(formattedData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (key) => {
    const newData = info.filter(item => item.key !== key); // Tablodaki veriyi günceller
    setInfo(newData);

    try {
      await deleteBudgetData(key);
      console.log(`Row with row_id=${key} deleted successfully`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  

  const handleOk = () => {
    form.validateFields()
      .then(async values => {
        const updatedRecord = { ...currentRecord, ...values };
        const newData = info.map(item => item.key === currentRecord.key ? updatedRecord : item);
        setInfo(newData);
        setIsModalVisible(false);
        setCurrentRecord(null);

        try {
          await updateBudgetData(updatedRecord.key, updatedRecord);
        } catch (error) {
          console.error('Error updating data:', error);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  function getColumnSearchProps(dataIndex) {
    return {
      filters: [...new Set(info.map(item => item[dataIndex]))].map(value => ({ text: value, value })),
      onFilter: (value, record) => record[dataIndex].toString().includes(value),
    };
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'names',
      key: 'names',
      width: 150,
      ...getColumnSearchProps('names'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date'), 
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(record.row_id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  const handleButton=()=>{
    SetRapor('Mail Gönderildi!')
  }
  return (
    <>
      <Table
        columns={columns}
        dataSource={info}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        open={isModalVisible}  
        title="Edit Record"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="names"
            label="Names"
            rules={[{ required: true, message: 'Please input the names!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please input the type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please input the date!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={handleButton} type='primary'>Raporu al</Button>
      <h4>{rapor}</h4>
    </>
  );
}

export default List;
