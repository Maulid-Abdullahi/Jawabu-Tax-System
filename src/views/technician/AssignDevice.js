import React, { Component } from 'react';
import { Form, Select, Input, Checkbox, Button, Icon } from 'antd';
import { Table, Row, Col } from 'antd';
import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { traderStore, deviceStore, addContactDetails, column2 } from './traderOnboardingStore';
import WrapperSelect from './components/wrapperSelect.tsx';
import SimcardSelect from './components/simcardSelect';
import { Device } from '../.././sdk/miliki-frontend/entities/miliki_Device';
import { SimCard } from '../.././sdk/miliki-frontend/entities/miliki_SimCard';
import { collection, getCubaREST, instance } from '@cuba-platform/react-core';
import './technician.scoped.scss';
import '../../scss/custom-antd.css';
import { toJS } from 'mobx';
import { notify } from 'react-notify-toast';

const { Option } = Select;

const { TextArea } = Input;

const dataCollection = collection(Device.NAME, {
    view: 'device-search-view',
    // sort: 'identificationNumber',
    // filter: {conditions: [{property: 'name', operator: "contains", value: 'Ro'}]},
    limit: 10,
    offset: 0,
    loadImmediately: false, // false by default
});
const deviceInstance = instance(Device.NAME, {
    view: 'device-search-view',
});

const simcardCollection = collection(SimCard.NAME, {
    view: 'simCard-search-view',
    limit: 10,
    offset: 0,
    loadImmediately: false, // false by default
});

class AssignDevice extends Component {

    handleAssignDevice = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {     
            // the rest remains the same...
            if (!err) {
                //console.log(values);
                if(values.devices != undefined && values.simcards != undefined){
                    traderStore.addDeviceSimcard(values);
                }else{
                    notify.show('Kindly select device and simcard', 'error');
                }
                this.props.form.resetFields(['devices', 'simcards']);    
                this.props.onButtonClick(this.state.value);    
            }
             
            
        });
    };


    constructor(props) {
        super(props);
        this.state = { value: ''};
        this.onChange = this.onChange.bind(this);
        this.add = this.handleAssignDevice.bind(this);
    }

    componentDidMount = () => {
        deviceStore.fetchTaxRegions();
    };

    handleButton = (ev) => {};
  

    onChange(e) {
        this.setState({ value: e }); 
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        function onBlur() {
            console.log('blur');
        }

        function onFocus() {
            console.log('focus');
        }

        function onSearch(val) {
            console.log('search:', val);
        }

        // function onChange(value) {
        //     console.log(`selected ${value}`);
        // }
        return (
            <div className="mainContainer">
                <Form colon={false}>
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
                                    Assign Device
                                </h3>
                            </Typography>
                        </div>
                <Col span={5}>
                            <div className="device-type">
                                <br />
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: deviceStore.isNewTaxRegion,
                                    })(
                                        <Checkbox onChange={(v) => deviceStore.onNewTaxRegion(v)}>
                                            Select Tax County?
                                        </Checkbox>
                                    )}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                regions={{ width: '20px' }}
                                label="Select new Tax County"
                            >
                                {getFieldDecorator(
                                    'Regions',
                                    {}
                                )(
                                    <Select
                                        size="large"
                                        showSearch
                                        // onChange={onChange}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        loading={traderStore.isTaxRegionLoading}
                                        style={{ width: 250 }}
                                        placeholder="Branch new Tax Region"
                                        optionFilterProp="children"
                                        disabled={!deviceStore.isNewTaxRegion}
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {deviceStore.taxRegions.map((e, i) => (
                                            <Option key={i} value={e}>
                                              {e['_instanceName']}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        

                        {/* <div>
                            <WrapperSelect ref={this.deviceRef} form={this.props.form} />
                        </div> */}

                      
                    </Row>

                    {/* <div className="device-model order-number">
                        <SimcardSelect ref={this.simcardRef} form={this.props.form} />
                    </div> */}

                    {/* <Row>
                      
                    </Row> */}

                    <div>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Form.Item label="Device" device={{ width: '20px' }}>
                                    {getFieldDecorator('devices', {
                                        // rules: [
                                        //     {
                                        //         required: true,
                                        //         message: 'Please Select Device!',
                                        //     },
                                        // ],
                                    })(
                                        <Select
                                            v-model={this.state.value}
                                            onChange={this.onChange}
                                            size="large"
                                            showSearch
                                            placeholder="Search Device"
                                            optionFilterProp="children"
                                            onSearch={(v) => {
                                                dataCollection.filter = {
                                                    conditions: [
                                                        {
                                                            property: 'serialNumber',
                                                            operator: 'contains',
                                                            value: v,
                                                        },
                                                        {
                                                            property: 'status',
                                                            operator: '=',
                                                            value: 'IN_STORE',
                                                        },
                                                        {
                                                            property: 'currentOwner.id',
                                                            operator: '=',
                                                            value: `${localStorage.getItem(
                                                                'supplier-id'
                                                            )}`,
                                                        },
                                                    ],
                                                };
                                                dataCollection.load();
                                            }}
                                            loading={dataCollection.status === 'LOADING'}
                                            onSelect={async (e) => {
                                                deviceInstance.item = dataCollection.items.find(
                                                    (v) => v === e
                                                );
                                               // console.log('deviceInstance.item',deviceInstance.item)
                                            }}
                                        
                                        >
                                            {dataCollection.items.map((eve, index) => (
                                               
                                                <Option value={eve}>
                                                    {eve['_instanceName']}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Simcards" lastname={{ width: '20px' }}>
                                    {getFieldDecorator('simcards', {
                                        // rules: [
                                        //     {
                                        //         required: true,
                                        //         message: 'Please Select Simcard!',
                                        //     },
                                        // ],
                                    })(
                                        <Select
                                        v-model={this.state.value}
                                        onChange={this.onChange}
                                            size="large"
                                            showSearch
                                            placeholder="Search Simcard"
                                            optionFilterProp="children"
                                            onSearch={(v) => {
                                                simcardCollection.filter = {
                                                    conditions: [
                                                        {
                                                            property: 'status',
                                                            operator: '=',
                                                            value: 'INACTIVE',
                                                        },
                                                    ],
                                                };
                                                simcardCollection.load();
                                            }}
                                            loading={simcardCollection.status === 'LOADING'}
                                            
                                        >
                                            {simcardCollection.items.map((eve, index) => (
                                                <Option value={eve}>{eve['imsi']}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            {' '}
                            <Col span={8}>
                                {' '}
                                <div className="device-model order-number ">
                                    <Button
                                        disabled={!this.state.value}
                                        loading={traderStore.addContactData}
                                        type="primary"
                                        variant="contained"
                                        color="primary"
                                        htmlType="submit"
                                        className="login-form"
                                        onClick={this.add}
                                        onClick={this.handleAssignDevice}
                                        submit={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginBottom: '1%',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Icon
                                            type="plus"
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                color: 'white',
                                            }}
                                        />
                                        Add Device & Simcard
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className="containers">
                            {' '}
                            <div>
                                <Table
                                    className="deviceListTable"
                                    Rowkey="id"
                                    onRowClick={(record, index) =>
                                        addContactDetails.onViewItem(record)
                                    }
                                    loading={traderStore.IsaddDeviceSimcardData}
                                    dataSource={traderStore.addedDeviceSimcardData}

                                    columns={column2}
                                />
                            </div>
                        </Row>
                    </div>
                </Form>
            </div>
        );
    }
}
export default Form.create()(observer(AssignDevice));
