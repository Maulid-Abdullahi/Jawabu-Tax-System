import React, { Component } from 'react';
import { Table, Input, Button, Icon, Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { observer } from 'mobx-react';
import history from '../../../helpers/routeUtils';
import { ticketStore } from './ticketStore';
import './tickets.scss';

class Tickets extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
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
            <Icon type="search" style={{ color: filtered ? 'white' : undefined }} />
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

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    //Table columns
    columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Date Created',
            dataIndex: 'createTs',
            key: 'createTs',
            sorter: (a, b) => new Date(a.createTs) - new Date(b.createTs),
            render: (createTs) => {
                return (
                    <p style={{ margin: '0' }}>
                        {moment(createTs).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                    </p>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ...this.getColumnSearchProps('status'),
            width: '20%',
        },

        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record, rowIndex) => (
                <a>
                    <Button
                        style={{ display: 'flex', borderColor: 'transparent' }}
                        className="button"
                        onClick={() =>
                         
                            history.push({
                                pathname: `/ticket/viewticket/${record.id}`,
                                state: { ticketId: record.id },
                            })
                        }
                    >
                        <Icon className="eyeIcon" type="eye" theme="filled" />
                        <p className="iconText">view</p>
                    </Button>
                </a>
            ),
        },
    ];

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        ticketStore.fetchTickets();
    }

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };
    selectedRowKeys = [];
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        if (ticketStore.ticketsDataIsLoading)
            return (
                <>
                    <Spin />
                </>
            );

        return (
            <div>
                <h2 style={{ color: '#002868', marginBottom: '40px' }}>My Tickets</h2>
                <Table
                    rowKey={(record) => {
                        return record.id;
                    }}
                    rowSelection={rowSelection}
                    dataSource={ticketStore.ticketsData}
                    columns={this.columns}
                />
            </div>
        );
    }
}

export default observer(Tickets);
