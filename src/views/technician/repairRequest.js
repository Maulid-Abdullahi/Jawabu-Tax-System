import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Table, Button, Icon, Divider, DatePicker, Row, Col } from 'antd';
import { technicianStore } from './repairRequestStore';
import './repairRequest.scoped.scss';
import Search from 'antd/lib/input/Search';
import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}
class ListTechnicians extends Component {
    columns = [
        {
            title: 'Serial No',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: 'Device Type',
            dataIndex: 'deviceType',
            key: 'deviceType',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Simcard',
            dataIndex: 'simcard',
            key: 'simcard',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Date Received',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <a>View</a>,
        },
    ];
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    disabledStartDate = (startValue) => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue) => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = (value) => {
        this.onChange('startValue', value);
    };

    onEndChange = (value) => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    };
    componentDidMount() {
        technicianStore.getTechnicians();
    }
    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
            <div>
                <h1>Repair Requests</h1>

                <Divider />
                <Row gutter={[16, 16]}>
                    <Col span={2}>
                        <Select
                            placeholder="Bulk Action"
                            style={{ width: 200 }}
                            onChange={handleChange}
                        >
                            <Option value="Model">Model</Option>
                            <Option value="Supplier">Supplier</Option>
                            <Option value="Manufacturer">Manufacturer</Option>
                        </Select>
                    </Col>
                    <Col span={2} />
                    <Col span={2} />
                    <Col span={2} />
                    <Col span={3}>
                        <DatePicker
                            disabledDate={this.disabledStartDate}
                            format="YYYY-MM-DD HH:mm:ss"
                            value={startValue}
                            placeholder="From"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                        />
                    </Col>
                    <Col span={3}>
                        <DatePicker
                            disabledDate={this.disabledEndDate}
                            format="YYYY-MM-DD HH:mm:ss"
                            value={endValue}
                            placeholder="To"
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                        />
                    </Col>
                    <Col span={4}>
                        <Select placeholder="status" style={{ width: 130 }} onChange={handleChange}>
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <Search placeholder="search" />
                    </Col>
                    <Col span={3}>
                        <Button style={{ width: '80px', height: '30px' }} type="primary">
                            Filter
                        </Button>
                    </Col>
                </Row>
                <br />
                <div style={{ paddingTop: '50px' }}>
                    <Table
                        rowKey={(record) => {
                            return record.id;
                        }}
                        dataSource={technicianStore.dataSource}
                        columns={this.columns}
                        loading={technicianStore.techniciansLoading}
                    />
                </div>
            </div>
        );
    }
}

export default observer(ListTechnicians);
