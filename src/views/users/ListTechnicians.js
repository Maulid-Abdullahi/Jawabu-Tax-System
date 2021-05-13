import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Spin, Table, Button, Icon, Input, Form } from 'antd';
import { technicianStore } from './technicianStore';
import './technician.scoped.scss';
import { Link } from 'react-router-dom';
import Search from 'antd/lib/input/Search';
import { collection, data, getCubaREST, instance } from '@cuba-platform/react-core';
import { Technician } from '../../sdk/miliki-frontend/entities/miliki_Technician';
import { notify } from 'react-notify-toast';
import Highlighter from 'react-highlight-words';
import { runInAction, toJS } from 'mobx';
import { ExportToExcel, exportCsvStore } from '../../helpers/exportCsv';

const dataCollection = collection(Technician.NAME, {
    view: 'technician-view',
    limit: 10,
    offset: 0,
    loadImmediately: true,
    sort: '-createTs', // false by default
});

function onChanges(pagination, filters) {
    console.log(filters);
    console.log(pagination);
    //create cuba compatible filters
    const keys = Object.keys(filters);
    console.log(keys);
    const conditions = [];
    keys.forEach((e) => {
        if (filters[e].length === 0) return;
        conditions.push({
            property: e,
            operator: '=',
            value: filters[e][0],
        });
    });
    const cubaFilter = {
        conditions,
    };
    console.log(cubaFilter);

    dataCollection.offset = (pagination.current - 1) * pagination.pageSize;
    dataCollection.limit = pagination.pageSize;
    if (conditions.length > 0) dataCollection.filter = cubaFilter;
    else dataCollection.filter = null;
    dataCollection.load();
}
class ListTechnicians extends Component {
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
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };

    columns = [
        {
            title: 'Tax Identification Number(TIN)',
            dataIndex: 'tin',
            key: 'tin',
        },
        {
            title: 'ID Number (National)',
            dataIndex: 'idNumber',
            key: 'idNumber',
            ...this.getColumnSearchProps('idNumber'),
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            ...this.getColumnSearchProps('firstName'),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Nationality Status',
            render: (record, rowIndex) => (
                <>{record.residence ? <p>Citizen</p> : <p>Non-Citizen</p>}</>
            ),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'APPROVED',
                    value: 'APPROVED',
                },
                {
                    text: 'UNAPPROVED',
                    value: 'UNAPPROVED',
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => {
                return record.status === value;
            },
        },
    ];
   

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };
    componentDidMount() {
        exportCsvStore.fetchReports('TECHNICIANLIST');
    }

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

    // rowSelection object indicates the need for row selection
    // rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    //     getCheckboxProps: (record) => ({
    //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //         name: record.name,
    //     }),
    // };

    handleDisable() {
        alert('Disable');
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
            console.log('allDevices', allDevices);
        }

        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <h1>List Technicians</h1>
                <Form layout="vertical">
                    <div>
                        <ExportToExcel
                            id={exportCsvStore.reportId}
                            params={this.state.selectedRowKeys.length === 0 ? allDevices : params}
                            apiData={apiData}
                            fileName={'Technician_LIST'}
                        />
                    </div>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected
                            ? `You want to export ${selectedRowKeys.length} Technician List`
                            : ''}
                    </span>
                    <Table
                        rowKey={(record) => {
                            return record.id;
                        }}
                        rowSelection={rowSelection}
                        dataSource={dataCollection.items}
                        size={'small'}
                        columns={this.columns}
                        loading={dataCollection.status === 'LOADING'}
                        // rowKey={(record) => {
                        //     return record.id;
                        // }}
                        // rowSelection={rowSelection}
                        // dataSource={dataCollection.items}
                        // size={'small'}
                        // columns={this.columns}
                        // loading={dataCollection.status === 'LOADING'}
                        //onChange={onChanges}
                        //rowSelection={this.rowSelection}
                    />
                </Form>
            </div>
        );
    }
}

export default observer(ListTechnicians);
