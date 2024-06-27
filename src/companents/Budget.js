import React, { useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Select, } from 'antd';
import { postBudgetData } from './api';
import '../styles/styles.css';


function Budget() {
    const [form] = Form.useForm();
    const images = [
        { key: 1, src: require('../images/egitim.png'), name: 'Eğitim' },
        { key: 2, src: require('../images/fatura.png'), name: 'Fatura' },
        { key: 3, src: require('../images/gıda.png'), name: 'Gıda' },
        { key: 4, src: require('../images/kira.png'), name: 'Kira' },
        { key: 5, src: require('../images/maas.png'), name: 'Maaş' },
        { key: 6, src: require('../images/sağlık.png'), name: 'Sağlık' },
        { key: 7, src: require('../images/ulasim.png'), name: 'Ulaşım' },
        { key: 8, src: require('../images/yatırım.png'), name: 'Yatırım' },

    ];

    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [selectedImageKey, setSelectedImageKey] = useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState(false)

    const handleCheckBox = () => {
        if (selectedCheckbox === false) {
            setSelectedCheckbox(true)
        }
        else {
            setSelectedCheckbox(false)
        }
        console.log(selectedCheckbox)
    }

    const handleSubmit = async () => {
        console.log(category)
        console.log(amount)
        console.log(type)
        console.log(date)

        try {
            await postBudgetData(type, category, amount, date)
            form.resetFields();
        } catch (error) {
            console.error('Error deleting data:', error);
        }

    }
    const handleDateChange = (date, dateString) => {
        setDate(dateString);
    };
    const selectedImage = (key, name) => {
        setSelectedImageKey(key)
        setType(name)
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form
                    form={form}
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 4,
                    }}
                    layout="vertical"

                    onFinish={handleSubmit}
                >
                    <div className='containers'>
                        <div className="image-grid">
                            {images.map((image, index) => (
                                <div className='img-name' key={image.key}>
                                    <img onClick={() => { selectedImage(image.key, image.name) }}
                                        key={image.key}
                                        src={image.src}
                                        alt={`image-${index}`}
                                        className={`image-item ${selectedImageKey === image.key ? 'selected' : ''}`}
                                    />
                                    <div>{image.name}</div>
                                </div>

                            ))}
                        </div>
                    </div>
                    <div>
                        <Form.Item
                            name="Check"
                            valuePropName="checked"

                            rules={[
                                {
                                    required: false,
                                    message: 'Please check the checkbox!',
                                },
                            ]}
                        >
                            <Checkbox onChange={handleCheckBox}>Diğer</Checkbox>
                        </Form.Item>
                        <Form.Item label="Tip">
                            <Select value={category} onChange={(value) => { setCategory(value) }}>
                                <Select.Option value="Gelir">Gelir</Select.Option>
                                <Select.Option value="Gider">Gider</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Miktar"
                            name='Miktar'
                            value='amount'
                            onChange={(e) => { setAmount(e.target.value) }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your amount!',
                                },
                            ]}

                        >
                            <InputNumber style={{ width: '100%' }} size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Tarih"
                            name="date"
                            value='date'
                        >
                            <DatePicker onChange={handleDateChange} />
                        </Form.Item>
                        {selectedCheckbox === true ?
                            <Form.Item
                                type='text'
                                label="Diğer"
                                name="type"
                                value="type"
                                onChange={(e) => { setType(e.target.value) }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your date!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item> : ""}
                        <Form.Item label="Kaydet">
                            <Button className='' type='primary' htmlType='submit' >Kaydet</Button>
                        </Form.Item>
                    </div>

                </Form>
            </div >
        </div>
    );
};
export default Budget;