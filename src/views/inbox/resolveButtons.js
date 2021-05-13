/* eslint-disable no-useless-constructor */
import { runInAction, toJS } from 'mobx';
import { notify } from 'react-notify-toast';
import { Component } from 'react';
import { Form, Input, Button, Modal, Radio, Row, Col, Table } from 'antd';
import { fetchProcessVars } from './inboxstore';
import { getCubaREST } from '@cuba-platform/react-core';
import history from '../../helpers/routeUtils';
import './inbox.scoped.scss';
import { restServices } from '../../sdk/miliki-frontend/services';
import { Select } from 'antd';
import { observer } from 'mobx-react';
import '../technician/tickets/viewticket.scss';
import { ticketStore } from '../technician/tickets/ticketStore';
import { traderStore } from '../technician/traderOnboardingStore';
import { TechnicianUser } from '../../sdk/miliki-frontend/entities/miliki_TechnicianUser';
import { collection, instance } from '@cuba-platform/react-core';

const { TextArea } = Input;

const token = localStorage.getItem('access_token');
const { Option } = Select;

const dataCollection = collection(TechnicianUser.NAME, {
    view: 'technicianUser-view',
    limit: 10,
    filter: {
        conditions: [
            {
                property: 'supplier.id',
                operator: '=',
                value: `${localStorage.getItem('supplier-id')}`,
            },
        ],
    },
    offset: 0,
    loadImmediately: true, // false by default
});
const technicianInstance = instance(TechnicianUser.NAME, {
    view: 'technicianUser-view',
});
function refreshPage() {
    window.location.reload();
}

class ResolveButtons extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        selectedButton: '',
        status: '',
        assignee: '',
    };

    handleChange = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value],
        }));
    };

    handleState = (value) => {
        this.setState({
            status: value.target.value,
        });
    };

    // componentDidUpdate(){
    //  if(ticketStore.resolveButtonData[1] === "LEVEL_3"){
    //     ticketStore.disableButton = false
    //  }
    //  console.log('ticketStore.resolveButtonData',toJS(ticketStore.resolveButtonData))
    // }

    saveValue = (e) => {
        console.log('selectedButton', e.target.value);
        this.setState(
            {
                selectedButton: e.target.value,
            },
            this.handleSubmitTwo
        );
    };
    blockButton = (e) => {
        console.log('selectedButton', e.target.value);
        this.setState(
            {
                selectedButton: e.target.value,
            },
            this.BlockApi
        );
    };

    ForwardButton = async (e) => {
        const assigneeJson = JSON.stringify({
            assignee: {
                id: `${this.state.assignee}`,
            },
        });
        console.log('Assignee', assigneeJson);
        const params = {
            processInstanceId: ticketStore.resolveButtonData[0].processInstanceId,
            taskId: ticketStore.resolveButtonData[0].taskId,
            assignee: `${this.state.assignee}`,
            isReassign: true,
            completeTask: false,
        };
        await restServices.miliki_FrontendBprocService.completeAssignmentTask(getCubaREST())(
            params
        );
        try {
            if (this.state.assignee === 'assign') {
                notify.show('Transfer Approved Successfully', 'success', 3000);
            }
            notify.show('Action will be reviewed', 'success', 3000);
            //history.push('/inbox');
        } catch (error) {
            notify.show('An Error has occurred, try again', 'error', 3000);
        }
    };

    handleBlockApi = async () => {
        const params = {
            message: toJS(ticketStore.selectedMessage[0]),
            ticketId: `${ticketStore.resolveButtonData[0].ticketId}`,
        };
        ticketStore.messages.push(params);
        await restServices.miliki_TicketService.replyTicket(getCubaREST())(params);
        try {
            notify.show('Action will be reviewed', 'success', 3000);
        } catch (error) {
            notify.show('An Error has occurred, try again', 'error', 3000);
        }

        // const blockParams = {
        //     deviceId: `${ticketStore.resolveButtonData[0].deviceId}`,
        //     block: true,
        // };
        // await restServices.miliki_DeviseService.blockDevice(getCubaREST())(blockParams);
        // try {
        //     if (this.state.selectedButton === 'Block') {
        //         notify.show('Transfer Approved Successfully', 'success', 3000);
        //         history.push('/inbox');
        //         runInAction(() => {
        //             ticketStore.disableLevel = true;
        //         });
        //     }
        //     notify.show('Action will be reviewed', 'success', 3000);
        //     history.push('/inbox');

        // } catch (error) {
        //     notify.show('An Error has occurred, try again', 'error', 3000);
        // }

        const levelJson = JSON.stringify({ level: `${ticketStore.selectedMessage[0]}` });
        const Completeparams = {
            processInstanceId: ticketStore.resolveButtonData[0].processInstanceId,
            taskId: ticketStore.resolveButtonData[0].taskId,
            incomingVariables: levelJson,
            outcome: 'approved',
        };
        await restServices.miliki_FrontendBprocService.completeTask(getCubaREST())(Completeparams);
        try {
            notify.show('Request Successful', 'warning', 3000);
            history.push('/inbox');
            refreshPage();
        } catch (error) {
            notify.show('An Error has occurred, try again', 'error', 3000);
        }
    };

    BlockApi = async (e) => {
        console.log('eeeee', toJS(ticketStore.resolveButtonData));
        this.handleBlockApi();
            {this.state.selectedButton === 'Block' ? runInAction(() => {ticketStore.disableButton = false})
                         : runInAction(() => {ticketStore.disableButton = true})}
        
    };
    handleSubmitTwo = async (e) => {
        console.log('eeeee', toJS(ticketStore.resolveButtonData));
        const params = {
            processInstanceId: ticketStore.resolveButtonData[0].processInstanceId,
            taskId: ticketStore.resolveButtonData[0].taskId,
            incomingVariables: {},
            outcome: this.state.selectedButton,
        };
        await restServices.miliki_FrontendBprocService.completeTask(getCubaREST())(params);
        try {
            if (
                this.state.selectedButton === 'Resolved' ||
                this.state.selectedButton === 'Unresolvable'
            ) {
                notify.show('Transfer Approved Successfully', 'success', 3000);
            }
            notify.show('Action will be reviewed', 'success', 3000);
            history.push('/inbox');
        } catch (error) {
            notify.show('An Error has occurred, try again', 'error', 3000);
        }
    };

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        //console.log(e);
        this.saveValue(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <div className="consignment-view-form">
                <form className="consignment-details" layout="vertical" colon={false}>
                    <div className="pageTitles">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Row style={{ marginLeft: '-30%', marginTop: '1em' }}>
                                <Col span={15}>
                                    <Form.Item required>
                                        <Select
                                            style={{ width: '130px' }}
                                            name="assignee"
                                            disabled={ticketStore.disableButton}
                                            // onChange={this.handleChange}
                                            size="default"
                                            showSearch
                                            placeholder="Forward Technician"
                                            optionFilterProp="children"
                                            onSearch={(v) => {
                                                dataCollection.filter = {
                                                    conditions: [
                                                        {
                                                            group: 'OR',
                                                            conditions: [
                                                                {
                                                                    property: 'firstName',
                                                                    operator: 'contains',
                                                                    value: v,
                                                                },
                                                                {
                                                                    property: 'lastName',
                                                                    operator: 'contains',
                                                                    value: v,
                                                                },
                                                                {
                                                                    property: 'email',
                                                                    operator: 'contains',
                                                                    value: v,
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            property: 'supplier.id',
                                                            operator: '=',
                                                            value: `${localStorage.getItem(
                                                                'supplier-id'
                                                            )}`,
                                                        },
                                                    ],
                                                };
                                                dataCollection.load();
                                            }}
                                            onSelect={async (e) => {
                                                technicianInstance.item = dataCollection.items.find(
                                                    (v) => v.id === e
                                                );
                                                this.state.assignee = e;
                                            }}
                                            loading={dataCollection.status === 'LOADING'}
                                        >
                                            {dataCollection.items.map((eve, index) => (
                                                <Option value={eve.id}>
                                                    {eve.technician['firstName']}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item style={{ marginLeft: '0.5em' }}>
                                        <Button
                                            type="primary"
                                            value="Forward"
                                            disabled={!ticketStore.disableButton}
                                            onClick={this.ForwardButton}
                                            size="default"
                                            //  style={{marginTop:"1em", float:"right" }}
                                        >
                                            Forward
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Col span={30}>
                                <Row style={{ marginTop: '1em' }}>
                                    <div className="buttons">
                                        <Button
                                            type="danger"
                                            size="default"
                                            value={
                                                this.state.selectedButton === 'Block'
                                                    ? 'UnBlock'
                                                    : 'Block'
                                            }
                                            disabled={ticketStore.disableButton}
                                            onClick={this.blockButton}
                                            style={{ marginRight: '10px' }}
                                        >
                                            {this.state.selectedButton === 'Block'
                                                ? 'UnBlock'
                                                : 'Block'}
                                        </Button>

                                        <Modal
                                            title="Resolve Ticket"
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                            okButtonProps={{value: "Resolved" }}
                                        >
                                            <p>Are you sure you want to close this Ticket?</p>
                                        </Modal>
                                        <Button
                                            type="danger"
                                            value="Unresolvable"
                                            disabled={!ticketStore.disableButton}
                                            onClick={this.saveValue}
                                            size="default"
                                            style={{ marginRight: '10px' }}
                                        >
                                            Excalate
                                        </Button>
                                        <Button
                                            type="primary"
                                            size="default"
                                            value="Resolve"
                                            disabled={!ticketStore.disableButton}
                                            onClick={this.showModal}
                                            // onClick={this.saveValue}
                                            style={{ marginRight: '10px' }}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </Row>
                            </Col>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default observer(ResolveButtons);
