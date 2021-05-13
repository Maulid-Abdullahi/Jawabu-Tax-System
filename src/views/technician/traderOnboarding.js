import React from 'react';
import { Form, Icon, Input, Button, Select,Progress,Checkbox } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { traderStore, postData, deviceStore } from './traderOnboardingStore';
import './technician.scoped.scss';
import AssignDevice from './AssignDevice';
import ContactDetails from './ContactDetails';
import '../../scss/custom-antd.css';
import { notify } from 'react-notify-toast';

const { Search } = Input;
const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}


class TraderOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.deviceRef = React.createRef();
        this.contactRef = React.createRef();

       
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.deviceRef.current.getForm().validateFields((err, values1) => {
            if (!err) {
                this.props.form.validateFields((err, values3) => {
                    if (!err) {
                        // console.log('Values1: ', values1);
                       
                        // console.log('Values3: ', values3);
                        // console.log('Merged', { ...values1, ...values3 });
                        postData({ ...values1, ...values3 });
                         
                    }
                    else{
                        notify.show('Error, Please fill required fields', "error");

                    }  

                });
            }
            else{
                notify.show('Error, Please fill required fields', "error");

            }
        });
    };
    // componentDidMount(e){
    //     traderStore.addedDeviceSimcardData
    // }

    searchValue = '';
   

    render() {
       
        
        const { getFieldDecorator } = this.props.form;
        return (
            
            <Form onSubmit={this.handleSubmit} colon={false}  ref={this.formRef}>
                <div>
                    <h1
                        style={{
                            textAlign: 'left',
                            fontSize: '26px',
                            letterSpacing: '0px',
                            color: '#002868',
                            textTransform: 'capitalize',
                            opacity: '1',
                            fontWeight: '600',
                        }}
                    >
                        Device Activation
                    </h1>
                </div>
                <br />

                <Row>
                    <div>
                        {' '}
                        <Typography>
                            <h3
                                style={{
                                    padding: '10px',
                                    textAlign: 'left',
                                    fontWeight: '600',
                                    fontSize: '20px',
                                    letterSpacing: '0px',
                                    color: '#DC3545',
                                    backgroundColor: '#F5F5F5',
                                    textTransform: 'capitalize',
                                    opacity: '1',
                                }}
                            >
                                Tax Payer Bio Data
                            </h3>
                        </Typography>
                    </div>
                </Row>
                <Row className="containers" gutter={[10, 10]}>
                    {/* <Col span={4}>
                        <Form.Item label="Select" required>
                            <Select
                                placeholder="PIN"
                                style={{ width: 130 }}
                                size="large"
                                onChange={handleChange}
                            >
                                <Option value="tin">PIN</Option>
                                <Option value="vat">VAT</Option>
                            </Select>
                        </Form.Item>
                    </Col> */}
                    <Col span={12}>
                        <Form.Item label="Number" required>
                            <Search
                                placeholder="search GST number"
                                enterButton="Search"
                                size="large"
                                loading={traderStore.isSearchLoading}
                                onSearch={async (value) => {
                                    // message.warn('searching...');
                                    this.searchValue = value;
                                    const searchResponse = await traderStore.searchByVatNumber(
                                        value
                                    );
                                    console.log('==', searchResponse);
                                    try{
                                    this.props.form.setFieldsValue({
                                        taxpayerid: searchResponse.id,
                                        tin: searchResponse.tin,
                                        phone2: searchResponse.phone,
                                        email2: searchResponse.email,
                                        region: searchResponse.region,
                                        regionid: searchResponse.regionid,
                                        website: searchResponse.website,
                                        location: searchResponse.location,
                                        businessname: searchResponse.name,
                                        physicalAddress: searchResponse.physicalAddress,
                                    });
                                }catch(e){
                                    notify.show('Please check your connection', "error");
                                    traderStore.isSearchLoading = false;


                                }
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <br />
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item label="TIN Number" required tin={{ width: '20px' }}>
                            {getFieldDecorator(
                                'tin',
                                {}
                            )(<Input size="large" placeholder="8y98u9y" disabled={true}></Input>)}
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Business Name" required businessname={{ width: '20px' }}>
                            {getFieldDecorator(
                                'businessname',
                                {}
                            )(
                                <Input
                                    size="large"
                                    placeholder="Joe Doe Enterprise"
                                    disabled={true}
                                />
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Email" required email={{ width: '20px' }}>
                            {getFieldDecorator('email2', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'Invalid email',
                                    },
                                ],
                            })(
                                <Input
                                    size="large"
                                    placeholder="Joedoe@gmail.com"
                                    disabled={true}
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <br />
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item label="Tax Region" required region={{ width: '20px' }}>
                            {getFieldDecorator(
                                'region',
                                {}
                            )(<Input size="large" placeholder="Nairobi" disabled={true} />)}
                        </Form.Item>

                        <Form.Item regionid={{ width: '20px' }} hidden={true}>
                            {getFieldDecorator(
                                'regionid',
                                {}
                            )(
                                <Input
                                    prefix={
                                        <Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                />
                            )}
                        </Form.Item>

                        <Form.Item taxpayerid={{ width: '20px' }} hidden={true}>
                            {getFieldDecorator(
                                'taxpayerid',
                                {}
                            )(
                                <Input
                                    prefix={
                                        <Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                />
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Phone Number" required phone={{ width: '20px' }}>
                            {getFieldDecorator(
                                'phone2',
                                {}
                            )(
                                <Input
                                    size="large"
                                    placeholder="+254 769 869 689"
                                    disabled={true}
                                />
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Physical Address" required location={{ width: '20px' }}>
                            {getFieldDecorator(
                                'location',
                                {}
                            )(<Input size="large" placeholder="Nairobi" disabled={true} />)}
                        </Form.Item>
                    </Col>
                </Row>

                <br />
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item label="Website URL" required email={{ width: '20px' }}>
                            {getFieldDecorator(
                                'website',
                                {}
                            )(<Input size="large" placeholder="www.hhdjhd.com" disabled={true} />)}
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="P.O B.O.X" required physicaladdress={{ width: '20px' }}>
                            {getFieldDecorator('physicalAddress', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Phone number required!'
                                // }],
                            })(
                                <Input
                                    size="large"
                                    placeholder="00100, Nairobi"
                                    disabled={true}
                                ></Input>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
               
                        </Row>

                <AssignDevice ref={this.deviceRef} />
                <br />
                <ContactDetails ref={this.contactRef} />
                <div className="certify-submit">
                    <Button
                        htmlType="submit"
                        type="primary"
                        loading={deviceStore.isSubmittingLoading}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        );
    }
}

export default Form.create()(observer(TraderOnboarding));
