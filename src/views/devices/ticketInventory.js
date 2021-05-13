import axios from 'axios';
import { restServices } from '../../sdk/miliki-frontend/services';
import React from 'react';
import './devices.scoped.scss';
import deviceStore from './deviceStore';
import { Form, Input, Button, Select, Table, Row, Col, Icon, Spin } from 'antd';
import { notify } from 'react-notify-toast';
import { observer } from 'mobx-react';
import { collection, data, getCubaREST, instance } from '@cuba-platform/react-core';
import { Device } from '../../sdk/miliki-frontend/entities/miliki_Device';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { inboxStore } from '../inbox/inboxstore';
import history from '../../helpers/routeUtils';
import { BASE_URL } from '../.././configs';
import { observable, runInAction, toJS } from 'mobx';

const { Option } = Select;

const token = localStorage.getItem('access_token');

const dataCollection = collection(Device.NAME, {
    view: 'device-search-view',
    limit: 10,
    offset: 0,
    loadImmediately: false, // false by default
});


let allUserTicket = [];

class ticketInventory extends React.Component {
     getTicketTask = async() =>{
        inboxStore.userTasksLoading = true;
        const params = {
            processKey: "new-repair-ticket",
        };
        allUserTicket = JSON.parse(await restServices.miliki_UserTasksService.getUserTasksByProcessKey(getCubaREST())(params));
        try {
            runInAction(() => {
                inboxStore.userTasksLoading = false;
            })      
        } catch (error) {
            notify.show('Error Approving requisition, try again', 'error', 3000);
        }        
    }
   
    state = {
        selectedRowKeys: [],
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };

    columns = [
        {
            title: 'Ticket Number',
            dataIndex: 'businessKey',
            key: 'businessKey',
        },
        {
            title: 'Task Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Time Created',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (createTime) => { return (<p>{moment(createTime).format('llll')}</p>) },
        }
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
        this.getTicketTask();
    }

    render() {
        if(inboxStore.userTasksLoading && allUserTicket.length != 0)
        {
            return <Spin></Spin>
        }
        // console.log("/////////////////////");
        // console.log(allUserTicket);
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="device-transfer">
                <h1>Ticket Listing</h1>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <div className="table">
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected
                                ? `You have Selected ${selectedRowKeys.length} Devices`
                                : ''}
                        </span>
                        <Table
                           
                            dataSource={allUserTicket}
                            rowSelection={rowSelection}
                            size={'small'}
                            columns={this.columns}
                            rowKey={(record) => {
                                return record.id;
                            }}
                            loading={inboxStore.userTasksLoading}
                            scroll={{ y: 350 }}
                            pagination={{ pageSize: 20 }}
                        />
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'ticketInventory' })(observer(ticketInventory));
