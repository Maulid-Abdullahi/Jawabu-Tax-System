/* eslint-disable no-useless-constructor */
import { toJS } from 'mobx';
import { notify } from 'react-notify-toast';
import { Component } from 'react';
import { Form, Input, Button, Radio, Row, Col, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { fetchProcessVars } from './inboxstore';
import { getCubaREST } from '@cuba-platform/react-core';
import history from '../../helpers/routeUtils';
import './inbox.scoped.scss';
import { restServices } from '../../sdk/miliki-frontend/services';
import { Ticket } from '../../sdk/miliki-frontend/entities/miliki_Ticket';
import { Technician } from '../../sdk/miliki-frontend/entities/miliki_Technician';
import { collection, instance } from '@cuba-platform/react-core';
import { Select } from 'antd';
import { observer } from 'mobx-react';
import { TechnicianUser } from '../../sdk/miliki-frontend/entities/miliki_TechnicianUser';

const token = localStorage.getItem('access_token');
const { Option } = Select;

const dataCollection = collection(TechnicianUser.NAME,{
    view: 'technicianUser-view',
        limit: 10,
        filter: {
            conditions: [
                {
                    property: 'supplier.id',
                    operator: '=',
                    value: `${localStorage.getItem('supplier-id')}`,
                }
            ],
        },
        offset: 0,
        loadImmediately: true, // false by default
    });
    const technicianInstance = instance(TechnicianUser.NAME, {
        view: 'technicianUser-view',
   });

class AssignTicketForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        taskId: '',
        processInstanceId: '',
        raisedBy: '',
        category: '',
        status: '',
        description: '',
        checked: '',
        technician: '',
        assignee:''
    };
    handleChange = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value],
        }));
    };
    onChecked = (e) => {
        this.setState({
            checked: e.target.value,
        });
    };
    async actualMountAsync() {
        const { processInstanceId, id, name } = toJS(this.props.history.location.state.inboxDetail);
        const processVars = await fetchProcessVars(processInstanceId);
        this.setState((prevState) => ({
            ...prevState,
            taskId: id,
            processInstanceId: processInstanceId,
        }));
        const transfer = await getCubaREST().loadEntity(Ticket.NAME, processVars.ticketId, {
            view: 'ticket-view-all',
        });
        //console.log('transfer', transfer);
        this.setState((prevState) => ({
            ...prevState,
            raisedBy: transfer.createdBy,
            category: transfer.subCategory.category.ticketClass,
            description: transfer.description,
            status: transfer.status,
            
        }));
    }
    componentDidMount() {
        this.actualMountAsync();
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const assigneeJson = JSON.stringify({ assignee: {
            id:`${this.state.assignee}` }});
        console.log('Assignee', assigneeJson);
        const params = {
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId,
            assignee: `${this.state.assignee}`,
            isReassign: false,
            completeTask: true,
        };
        await restServices.miliki_FrontendBprocService.completeAssignmentTask(getCubaREST())(params);
        try {
            if (this.state.checked === 'assign') {
                notify.show('Transfer Approved Successfully', 'success', 3000);
            }
            notify.show('Action will be reviewed', 'success', 3000);
            history.push('/inbox');
        } catch (error) {
            notify.show('An Error has occurred, try again', 'error', 3000);
        }
    };

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="consignment-view-form">
                <h3>Transfer details</h3>
                <Form
                    onSubmit={this.handleSubmit}
                    className="consignment-details"
                    layout="vertical"
                    colon={false}
                >
                    <Input type="hidden" readOnly value={this.state.taskId} />
                    <Input type="hidden" readOnly value={this.state.processInstanceId} />
                    <Row gutter={[16, 16]} style={{ justifyContent: 'space-between' }}>
                        <Col span={8}>
                            <Form.Item label="Raised By" required>
                                <Input disabled value={this.state.raisedBy} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Category" required>
                                <Input disabled value={this.state.category} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Description" required>
                                <Input disabled value={this.state.description} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Status" required>
                                <Input disabled value={this.state.status} required />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <div>
                                <Form.Item label=" Assign Technician" required>
                                    <Select
                                        name="assignee"
                                        // onChange={this.handleChange}
                                        size="large"
                                        showSearch
                                        placeholder="Search Technician"
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
                                                        value: `${localStorage.getItem('supplier-id')}`,
                                                    }
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
                                                      <Option value={eve.id}>{eve.technician['firstName']}</Option>
                                        )
                                        )}
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: 'left' }}>
                            {/* <Radio.Group
                                onChange={this.onChecked}
                                value={this.state.checked}
                                name="checked"
                                className="radio-group"
                            >
                                <Radio style={radioStyle} value="approve">
                                    Assign
                                </Radio> */}
                                {/* <Radio style={radioStyle} value="rejected">
                                Reject
                                {this.state.checked === 'rejected' ? (
                                    <Form.Item label="Comment" required>
                                        <TextArea
                                            value={this.state.comment}
                                            name="comment"
                                            onChange={this.handleChange}
                                            style={{
                                                width: '260px',
                                                height: '100px',
                                                marginBottom: '0',
                                            }}
                                        />
                                    </Form.Item>
                                ) : null}
                                    </Radio> */}
                            {/* </Radio.Group> */}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="submit-btn2"
                                    value = "assign"
                                  
                                    // disabled={this.state.checked === ''}
                                >
                                    Assign
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default observer(AssignTicketForm);
