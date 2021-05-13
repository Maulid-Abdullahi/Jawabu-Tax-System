import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Spin,Form, Table, Button, Icon, Input } from 'antd';
// import '../technician.scoped.scss';
import { collection, data, getCubaREST, instance } from '@cuba-platform/react-core';
import { notify } from 'react-notify-toast';
import Highlighter from 'react-highlight-words';
import { SupplierSimRequisition } from '../../sdk/miliki-frontend/entities/miliki_SupplierSimRequisition';
import { runInAction, toJS } from 'mobx';
import { ExportToExcel, exportCsvStore } from '../../helpers/exportCsv';

const dataCollection = collection(SupplierSimRequisition.NAME, {
    filter: {
        conditions: [
            {
                property: 'supplier',
                operator: '=',
                value: `${localStorage.getItem('supplier-id')}`,
            },
        ],
    },
    view: 'supplierSimRequisition-view',
    sort:"-createTs",
    limit: 10,
    offset: 0,
    loadImmediately: true, // false by default
});

class Simcards extends Component {

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
            this.setState({selectedRowKeys});
    };
    

    columns = [
        {
            title: 'Mobile Network Operator',
            dataIndex: 'mno.name',
            key: 'mno.name',
            ...this.getColumnSearchProps('mno'),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Date of Requisition',
            dataIndex: 'createTs',
            key: 'createTs',
        },
        {
            title: 'Requisitioned By',
            dataIndex: 'createdBy',
            key: 'createdBy',
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
                    text: 'PREPARED',
                    value: 'PREPARED',
                },
                {
                    text: 'SHIPPED',
                    value: 'SHIPPED',
                },
                {
                    text: 'DELIVERED',
                    value: 'DELIVERED',
                },
                {
                    text: 'REJECTED',
                    value: 'REJECTED',
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
        exportCsvStore.fetchReports('SIMCARDLIST');
    }


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
                <h1>SIM Card Requisitions</h1>
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
                    rowKey={(record) => {
                        return record.id;
                    }}
                    rowSelection={rowSelection}
                    dataSource={dataCollection.items}
                    size={'small'}
                    columns={this.columns}
                    loading={dataCollection.status === 'LOADING'}
                    //onChange={onChanges}
                />
                </Form>
            </div>
        );
    }
}

export default observer(Simcards);
