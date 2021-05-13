import React, { useState, useEffect, useMemo } from 'react';
import { Form, Icon, Input, Button, Row, Radio, Select, Col, Upload, message } from 'antd';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../configs';
import { technicianStore } from './technicianStore';
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from './dropZoneStyles';

import './technician.scoped.scss';
import { getCubaREST } from '@cuba-platform/react-core';
import { toJS } from 'mobx';
import { traderStore } from '../technician/traderOnboardingStore';
const { Option } = Select;
const token = localStorage.getItem('access_token');
async function getRegistration(setRegistration) {
    await axios
        .get(
            `${BASE_URL}/app/rest/v2/entities/miliki_RegistrationFile/search?filter={
    "conditions": [
        {
            "property": "type",
            "operator": "=",
            "value": "TECHNICIAN"
        }
    ]
}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            setRegistration(response.data);
        });
}
function Technician(props) {
    const { getFieldDecorator } = props.form;
    const history = useHistory();
    const [registration, setRegistration] = useState([]);
    const [matchFile, setMatchFile] = useState({
        type: {
            id: '',
        },
        file: {
            id: '',
        },
    });
    const handleInputChange = (event) => {
        setMatchFile((prevProps) => ({
            ...prevProps,
            type: {
                id: '',
            },
            file: {
                id: '',
            },
        }));
    };
    const [uploadProgress, setUploadProgress] = useState(0);
    const { getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone();
    const { ref } = getRootProps();
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );
    const education = [
        { id: 'DEGREE', name: 'DEGREE' },
        { id: 'DIPLOMA', name: 'DIPLOMA' },
        { id: 'CERTIFICATE', name: 'CERTIFICATE' },
        
    ];
    async function handleFiles(file) {
        technicianStore.handleUploads(file, setUploadProgress);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let JsonData;
        props.form.validateFields(
            (err, { fname, lname, tin, email,location, phone, idno, education, documents }) => {
                console.log('Merged ...',documents)
                if (!err) {
                    JsonData = {
                        firstName: fname,
                        lastName: lname,
                        tin: tin,
                        location:location,
                        email: email,
                        phone: phone,
                        citizen: true,
                        residence: true,
                        idNumber: idno,
                        supplier: {
                            id: localStorage.getItem('supplier-id'),
                        },
                        educationLevel: education,
                        registrationFiles: [],
                   
                    };

                    technicianStore.uploadedFiles.forEach(file=> {
                        JsonData.registrationFiles.push({

                            type: {
                                id: documents,
                            },
                            file: {
                                id: file,
                            }
                        })
                    })

                    
                }
            }
        );
        const dataToSend = JSON.stringify(JsonData);
        technicianStore.onboardTechnician(dataToSend);
    }
    useEffect(() => {
        if (registration.length === 0) getRegistration(setRegistration);
    }, []);

    const [value, setValue] = useState('');
   // console.log('+++',value)
    

     function onChanges(e)  {
         setValue('000',{ value: e.target });
    }

    const prop = {
        name: 'file',
         action: `${BASE_URL}/app/rest/v2/files`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            //console.log(info.fileList[0]);
          }
          if (info.file.status === 'done') {
            technicianStore.uploadedFiles = []
            console.log(info.fileList.map(item =>(
                technicianStore.uploadedFiles.push(item.response.id)    
            )));
            //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..',technicianStore.uploadedFiles)
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    return (
        <div className="technician-parent">
            <h1>Technician Registration</h1>
            <h3>Technician Bio Data</h3>
            <Form onSubmit={handleSubmit} colon={false}>
                <div>
                    <Row gutter={[16, 16]}>
                        <Col push span={8}>
                            <Form.Item label="First Name" hasFeedback>
                                {getFieldDecorator('fname', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your First Name',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        placeholder="First Name"
                                        className="textfield"
                                        autoFocus
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Last Name" hasFeedback>
                                {getFieldDecorator('lname', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your Last Name',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        placeholder="Last Name"
                                        className="textfield"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="TIN" hasFeedback>
                                {getFieldDecorator('tin', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your Tax Number',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="number"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        placeholder="Name"
                                        className="textfield"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label="Official Email" hasFeedback>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your official email address',
                                        },
                                        {
                                            type: 'email',
                                            message:
                                                "oops! looks like you've entered an invalid email",
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="mail"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        type="email"
                                        placeholder="person@company.com"
                                        className="textfield"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Official Phone Number" hasFeedback>
                                {getFieldDecorator('phone', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your phone number',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="phone"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        type="number"
                                        placeholder="e.g 071234"
                                        className="textfield"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Official residency area" hasFeedback>
                                {getFieldDecorator('location', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your location',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        placeholder="e.g Nairobi"
                                        className="textfield"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8} className="citizenship-status">
                            <Radio.Group
                                // onChange={this.onChecked}
                                // value={this.state.checked}
                                name="checked"
                            >
                                <Radio value="1" className="citizen">
                                    Citizen
                                </Radio>
                                <Radio value="0" className="citizen">
                                    Non-Citizen
                                </Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label=" Identification Number" hasFeedback>
                                {getFieldDecorator('idno', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your  Identification Number',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="number"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        type="number"
                                        placeholder="e.g 071234"
                                        className="textfield"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Education Level" hasFeedback>
                                {getFieldDecorator('education', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select education level',
                                        },
                                    ],
                                })(
                                    <Select
                                        placeholder="Select Education Level"
                                        className="select"
                                        prefix={
                                            <Icon
                                                type="usergroup-add"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                    >
                                        {education !== undefined &&
                                        education !== 0 &&
                                        education.length !== 0 ? (
                                            education.map((element, index) => {
                                                return (
                                                    <Option key={index} value={element.id}>
                                                        {element.name}
                                                    </Option>
                                                );
                                            })
                                        ) : (
                                            <Option value="">Not Available</Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Required Documents" hasFeedback>
                                {getFieldDecorator('documents', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select required documents',
                                        },
                                    ],
                                })(
                                    <Select
                                     v-model={value}
                                     onChange={onChanges}
                                        placeholder="Select Required Documents"
                                        className="select"
                                        prefix={
                                            <Icon
                                                type="pic-right"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                    >
                                        {registration !== undefined &&
                                        registration !== 0 &&
                                        registration.length !== 0 ? (
                                            registration.map((element, index) => {
                                                return (
                                                    <Option key={index} value={element.id}>
                                                        {element.documentName}
                                                    </Option>
                                                );
                                            })
                                        ) : (
                                            <Option value="">Not Available</Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Upload {...prop}
                            
                        //     name = 'file'
                        //     loading = {technicianStore.techniciansLoading}
                        //    onChange={(acceptedFiles) =>console.log(acceptedFiles.file)}
                                
                        //         action = {async ()=>{
                        //             return  `${BASE_URL}/app/rest/v2/files`;
                        //         }}
                        //         headers = {
                        //             {
                        //                 Authorization: `Bearer ${token}`
                        //             }
                        //         }
                            >
                                <Button
                                disabled={!value}
                                 
                                 >

                                    <Icon type="upload" /> Click to Upload
                                </Button>
                            </Upload>
                        </Col>
                        <Col span={8} />
                        <Col span={8}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{ float: 'right', margin: '0' }}
                            >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    );
}

export default Form.create({ name: 'technician_onboard' })(Technician);
