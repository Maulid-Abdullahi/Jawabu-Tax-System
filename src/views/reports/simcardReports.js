import React from 'react';
import deviceStore from '../devices/deviceStore';
import { Form, Input, Button, Select, Table, Row, Col, Icon, Spin, Modal } from 'antd';
import { notify } from 'react-notify-toast';
import { observer } from 'mobx-react';
import { collection, data, getCubaREST, instance } from '@cuba-platform/react-core';
import { Device } from '../../sdk/miliki-frontend/entities/miliki_Device';
import { technicianStore } from '../users/technicianStore';
import { restServices } from '../../sdk/miliki-frontend/services';
import Highlighter from 'react-highlight-words';
import { ExportToExcel, exportCsvStore } from '../../helpers/exportCsv';
import { runInAction, toJS } from 'mobx';

const { Option } = Select;

function refreshPage() {
    window.location.reload();
}
class SimcardReport extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        selectedRowKeys: [],
        visible: false,
        reportId: '',
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

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.handleSelectedSpoiltDevices();
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };


    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };

    columns = [
        {
            title: 'Network',
            dataIndex: 'requisition.mno.name',
            key: 'requisition.mno.name',
        },
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
            title: 'Created At',
            dataIndex: 'createTs',
            key: 'createTs',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'IN_STORE',
                    value: 'IN_STORE',
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => {
                return record.status === value;
            },
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
        exportCsvStore.fetchReports('SIMCARDREPORT');
        if (exportCsvStore.reportId) {
            this.setState({ reportId: exportCsvStore.reportId });
        }
    }
    render() {
        let apiData = toJS(exportCsvStore.apiData);
        if (deviceStore.devicesLoading) {
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
            if (deviceStore.simcardInventory.length > 0) {
                deviceStore.simcardInventory.map((devices) => {
                    allDevices.push(devices.id);
                });
            }
            runInAction(() => {
                exportCsvStore.isSelected = false;
            });
        }

        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="device-transfer">
                <h1>SIM Card Report</h1>

                <Form layout="vertical">
                    <div>
                        <ExportToExcel
                            id={this.state.reportId}
                            params={this.state.selectedRowKeys.length === 0 ? allDevices : params}
                            apiData={apiData}
                            //fileName={'MODELREPORT'}
                        />
                    </div>
                    <div className="table">
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected
                                ? `You want to export ${selectedRowKeys.length} Device Models`
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
                            loading={deviceStore.devicesLoading}
                            scroll={{ y: 350 }}
                            pagination={{ pageSize: 20 }}
                        />
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'SimcardReport' })(observer(SimcardReport));
