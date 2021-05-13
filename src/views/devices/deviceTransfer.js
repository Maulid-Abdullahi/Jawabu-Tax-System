import React from 'react';
import './devices.scoped.scss';
import deviceStore from './deviceStore';
import { Form, Input, Button, Select, Table, Row, Col,Icon } from 'antd';
import { notify } from 'react-notify-toast';
import { observer } from 'mobx-react';
import { collection, data, getCubaREST, instance } from '@cuba-platform/react-core';
import { Device } from '../../sdk/miliki-frontend/entities/miliki_Device';
import { technicianStore } from '../users/technicianStore';
import Highlighter from 'react-highlight-words';

const { Option } = Select;

const dataCollection = collection(Device.NAME, {
    view: 'technician-view',
    limit: 10,
    offset: 0,
    loadImmediately: false, // false by default
});

class DeviceTransfer extends React.Component {

  

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
              <Input
                ref={node => {
                  this.searchInput = node;
                }}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
              />
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon="search"
                size="small"
                style={{ width: 90, marginRight: 8 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </div>
          ),
          filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
          ),
          onFilter: (value, record) =>
            record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => this.searchInput.select());
            }
          },
          render: text =>
            this.state.searchedColumn === dataIndex ? (
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
              />
            ) : (
              text
            ),
      });



    state = {
        selectedRowKeys: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, { supplier }) => {
            if (!err) {
                const jsonData = {
                    from: {
                        id: localStorage.getItem('supplier-id'),
                    },
                    to: {
                        id: supplier,
                    },
                    devices: [this.state.selectedRowKeys.map((dev) => { return { id: dev } })][0]
                };
                const dataToSend = JSON.stringify(jsonData);
                deviceStore.transferDevice(dataToSend);
            }
        });
    };
    componentDidMount() {
        deviceStore.getSupplierDeviceModels();
        deviceStore.getSuppliers();
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    
    columns = [
        // {
        //     title: 'Device ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Serial Number',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            ...this.getColumnSearchProps('serialNumber'),
        },
        {
            title: 'Fiscalized',
            render: (record, rowIndex) => <>{record.fiscalized ? <p>Yes</p> : <p>No</p>}</>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ]

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        try{
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
    }catch(e){
        notify.show('Error, Please enter full data', "error");

    }
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="device-transfer">
                <h1>Transfer Device</h1>
                <h3>Device Details</h3>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label="Select Supplier" required hasFeedback>
                                {getFieldDecorator('supplier', {
                                    rules: [
                                        { required: true, message: 'Please select a supplier' },
                                    ],
                                })(
                                    <Select placeholder="Select Supplier" className="select">
                                        {deviceStore.suppliers !== undefined &&
                                            deviceStore.suppliers !== 0 ? (
                                                deviceStore.suppliers.map((element, index) => {
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
                            <Form.Item label="Device Model" hasFeedback>
                                {getFieldDecorator(
                                    'deviceModel',
                                    {}
                                )(
                                    <Select
                                        placeholder="Select Device Model"
                                        className="select"
                                        loading={deviceStore.deviceModelLoading}
                                        onSelect={(e) => {
                                            deviceStore.getDevicesToTransfer(e);
                                        }}
                                    >
                                        {deviceStore.supplierDeviceModels !== undefined &&
                                            deviceStore.supplierDeviceModels !== 0 ? (
                                                deviceStore.supplierDeviceModels.map((element, index) => {
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
                            <Form.Item label="Number of Devices" hasFeedback>
                                <Input
                                    type="number"
                                    disabled
                                    placeholder="e.g 100"
                                    value={this.state.selectedRowKeys.length}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="table">
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected
                                ? `You have Selected ${selectedRowKeys.length} Devices`
                                : ''}
                        </span>
                        <Table
                            dataSource={deviceStore.datasource}
                            rowSelection={rowSelection}
                            size={'small'}
                            columns={this.columns}
                            rowKey={(record) => {
                                return record.id;
                            }}
                            loading={dataCollection.status === 'LOADING'}
                            scroll={{ y: 350 }}
                            pagination={{ pageSize: 20 }}
                        />
                    </div>
                    <Row gutter={[16, 16]} className="transfer-btns">
                        <Col span={4} />
                        <Col span={8}>
                            <Button type="primary" className="cancel">
                                Cancel
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button type="primary" htmlType="submit" className="submit" loading={deviceStore.transfering}>
                                Transfer
                            </Button>
                        </Col>
                        <Col span={4} />
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'device_transfer' })(observer(DeviceTransfer));
