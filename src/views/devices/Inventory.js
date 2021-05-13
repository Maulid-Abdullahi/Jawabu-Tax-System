import React from 'react';
import './devices.scoped.scss';
import deviceStore from './deviceStore';
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
class Inventory extends React.Component {
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
            title: 'Serial Number',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            ...this.getColumnSearchProps('serialNumber'),
        },
        {
            title: 'Model',
            dataIndex: 'model.name',
            key: 'model.name',
        },
        {
            title: 'Manufacturer',
            dataIndex: 'model.manufacturer.name',
            key: 'model.manufacturer.name',
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
                {
                    text: 'DEAD_ON_ARRIVAL',
                    value: 'DEAD_ON_ARRIVAL',
                },
                {
                    text: 'ACTIVE',
                    value: 'ACTIVE',
                },
                {
                    text: 'PENDING_FISCALISATION',
                    value: 'PENDING_FISCALISATION',
                },
                {
                    text: 'PENDING_TRANSFER',
                    value: 'PENDING_TRANSFER',
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

    async handleSelectedSpoiltDevices() {
        const listdevices = this.state.selectedRowKeys.map((e) => e);
        //console.log('listdevices',listdevices);
        const params = {
            wrapper: {
                devices: listdevices,
            },
        };

        await restServices.miliki_DeviseService.deadOnArrivalUpdate(getCubaREST())(params);
        refreshPage();
    }

    componentDidMount() {
        deviceStore.getDevices();
        exportCsvStore.fetchReports('DEVICE_INVENTORY_REP');
        if (exportCsvStore.reportId) {
            this.setState({ reportId: exportCsvStore.reportId });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (exportCsvStore.reportId != prevState.reportId) {
            this.setState({ reportId: exportCsvStore.reportId });
            console.log(exportCsvStore.reportId);
            console.log(prevState);
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
            if (deviceStore?.deviceInventory?.length > 0) {
                deviceStore.deviceInventory.map((devices) => {
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
                <h1>Device Inventory</h1>

                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <div>
                        <ExportToExcel
                            id={this.state.reportId}
                            params={this.state.selectedRowKeys.length === 0 ? allDevices : params}
                            apiData={apiData}
                            fileName={'Device_Inventory'}
                        />
                        <Button
                            onClick={this.showModal}
                            type="danger"
                            size="default"
                            style={{ marginRight: '10px', float: 'right', marginBottom: '1em' }}
                        >
                            Dead On Arrival
                        </Button>
                    </div>
                    <div className="table">
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected
                                ? `You want to export ${selectedRowKeys.length} Devices`
                                : ''}
                        </span>
                        <Table
                            dataSource={deviceStore.deviceInventory}
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
                        <Modal
                            title="Are you sure the
                             selected devices are spoilt?"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <h5 style={{ color: 'red' }}>
                                By clicking OK the selected devices will be reported as spoilt
                            </h5>
                        </Modal>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'Inventory' })(observer(Inventory));
