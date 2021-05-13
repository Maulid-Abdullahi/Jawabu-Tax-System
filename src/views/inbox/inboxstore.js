
import { observable, runInAction, toJS } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { Icon, Button } from 'antd';
import history from '../../helpers/routeUtils';
import './inbox.scoped.scss';
import { BASE_URL } from '../../configs';
const token = localStorage.getItem('access_token');

let inboxApiResponse;
export async function fetchProcessVars(id) {
    const processVarsResp = await axios
        .get(
            `${BASE_URL}/app/rest/v2/services/miliki_FrontendBprocService/getProcessVariables?processInstanceId=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    return processVarsResp.data;
}
export const inboxStore = observable({
    inboxLoading: false,
    userTasksLoading: false,
    datasource: [],
    columns: [
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
                        onClick={() => {
                            history.push({
                                pathname: `/inbox/${record.id}`,
                                state: { inboxDetail: record},
                            })
                            //console.log('record',record)
                        }
                        }
                    >
                        <Icon className="eyeIcon" type="eye" theme="filled" />
                        <p className="iconText">view</p>
                    </Button>
                </a>
            ),
        },
    ],
    async getUserTasks() {
        try {
            this.inboxLoading = true;
            this.datasource = toJS(await this.fetchUserTaks());
        } catch (error) {
            notify.show('Unable to load Inbox', "error");
        }
        runInAction(() => {
            this.inboxLoading = false;
        })
    },
    async fetchUserTaks() {
        try {
            this.userTasksLoading = true;
            inboxApiResponse = await axios
                .get(`${BASE_URL}/app/rest/v2/services/miliki_UserTasksService/getUserTasks`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            runInAction(() => {
                this.userTasksLoading = false;
            })
            return inboxApiResponse.data;
        } catch (error) {
            notify.show('Unable to load task details', 'error');
            runInAction(() => {
                this.userTasksLoading = false;
            })
        }      
    },

   

  


});
