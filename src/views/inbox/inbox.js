import { Component} from 'react';
import { observer } from 'mobx-react';
import { inboxStore } from './inboxstore';
import './inbox.scoped.scss';
import { Table } from 'antd';
class Inbox extends Component{
    componentDidMount() {
        inboxStore.getUserTasks();
    }
    render() {
        return (
            <>
                <h1>Inbox</h1>
                <Table
                    dataSource={inboxStore.datasource}
                    columns={inboxStore.columns}
                    loading={inboxStore.inboxLoading}
                    rowKey={(record) => {
                        return record.id;
                    }}
                    />
            </>
        )
    }
}
export default observer(Inbox);
