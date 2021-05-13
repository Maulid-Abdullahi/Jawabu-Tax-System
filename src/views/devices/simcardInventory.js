import React from 'react';
import './devices.scoped.scss';
import deviceStore from './deviceStore';
import {Spin, Form, Input, Button, Select, Table, Row, Col, Icon } from 'antd';
import { notify } from 'react-notify-toast';
import { observer } from 'mobx-react';
import { collection, data, getCubaREST, instance } from '@cuba-platform/react-core';
import { Device } from '../../sdk/miliki-frontend/entities/miliki_Device';
import { technicianStore } from '../users/technicianStore';
import Highlighter from 'react-highlight-words';
import { runInAction, toJS } from 'mobx';
import { ExportToExcel, exportCsvStore } from '../../helpers/exportCsv';

const { Option } = Select;

const dataCollection = collection(Device.NAME, {
    view: 'device-search-view',
    limit: 10,
    offset: 0,
    loadImmediately: false, // false by default
});

class simcardInventory extends React.Component {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
        searchText: '',
        searchedColumn: '',
        selectedRowKeys: [],
        visible: false,
    };
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered) => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) =>
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
                    devices: [
                        this.state.selectedRowKeys.map((dev) => {
                            return { id: dev };
                        }),
                    ][0],
                };
                const dataToSend = JSON.stringify(jsonData);
                deviceStore.transferDevice(dataToSend);
            }
        });
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };

    columns = [
        {
            title: 'IMSI',
            dataIndex: 'imsi',
            key: 'imsi',
            ...this.getColumnSearchProps('imsi'),
        },
        {
            title: 'phoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ...this.getColumnSearchProps('status'),
        },
    ];

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        try {
            confirm();
            this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
            });
        } catch (e) {
            notify.show('Error, Please enter full data', 'error');
        }
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    componentDidMount() {
        deviceStore.getSimcards();
    }

    render() {
        let apiData = toJS(exportCsvStore.apiData);
        if (dataCollection.status === 'LOADING') {
            return <Spin></Spin>;
        }
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        console.log(selectedRowKeys);
        let params = [];
        let allDevices = [];
        if (selectedRowKeys.length > 0) {
            params = selectedRowKeys;
            runInAction(() => {
                exportCsvStore.isSelected = true;
            });
            console.log(' exportCsvStore.isSelected', exportCsvStore.isSelected)
            console.log('params', params);
        } else {
            if (dataCollection?.items?.length > 0) {
                dataCollection?.items?.map((devices) => {
                    allDevices.push(devices.id);
                });
            }
            runInAction(() => {
                exportCsvStore.isSelected = false;
            });
        }

        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <h1>Simcard Inventory</h1>
                <Form  layout="vertical">
                <div>
                        <ExportToExcel
                            isSelected = {this.state.isSelected}
                            id={exportCsvStore.reportId}
                            params={this.state.selectedRowKeys.length === 0 ? allDevices : params}
                            apiData={apiData}
                            fileName={'SIMCARDLIST'}
                        />
                    </div>
                    <span style={{ marginLeft: 8 }}>
                            {hasSelected
                                ? `You want to export ${selectedRowKeys.length} SIM Cards`
                                : ''}
                        </span>
                        
                        <Table
                            dataSource={deviceStore.simcardInventory}
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
                </Form>
            </div>
        );
    }
}

export default Form.create({ name:'simcardInventory' })(observer(simcardInventory));
