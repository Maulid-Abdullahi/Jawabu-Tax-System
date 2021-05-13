/* eslint-disable no-useless-constructor */
import { runInAction, toJS } from 'mobx';
import { notify } from 'react-notify-toast';
import { Component } from 'react';
import { Form, Input, Button, Radio, Row, Col, Table } from 'antd';
import { Link } from "react-router-dom";
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
import '../technician/tickets/viewticket.scss';

import { ticketStore } from '../technician/tickets/ticketStore';
import moment from 'moment';

const { TextArea } = Input;

const token = localStorage.getItem('access_token');
const { Option } = Select;

let processVars ;

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
let Confirmation;
class confirmAssignedTicket extends Component {
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
        assignee: '',
        ticketNo: '',
        device: '',
        subject: '',
        confirm:'',
        ticketId:'',
    };
    
    
    
    handleChange = (e) => {
        e.preventDefault()
        Confirmation= e.target.value 
    
    };
    
    onChecked = (e) => {
        this.setState({
            checked: e.target.value,
        });
    };
    async actualMountAsync() {
        const { processInstanceId, id, name } = toJS(this.props.history.location.state.inboxDetail);
         processVars = await fetchProcessVars(processInstanceId);
        this.setState((prevState) => ({
            ...prevState,
            taskId: id,
            processInstanceId: processInstanceId,
        }));

      //  console.log('processInstanceId:this.state.processInstanceId, taskId:this.state.taskId', this.state.processInstanceId, this.state.taskId)

        runInAction( ()=>{
          
            ticketStore.resolveButtonData.push({processInstanceId:this.state.processInstanceId, taskId:this.state.taskId})
        })

        const transfer = await getCubaREST().loadEntity(Ticket.NAME, processVars.ticketId, {
            view: 'ticket-view-all',
        });
        //console.log('processVars', processVars);
        this.setState((prevState) => ({
            ...prevState,
            raisedBy: transfer.raisedBy._entityName,
            category: transfer.subCategory.category.ticketClass,
            description: transfer.description,
            status: transfer.status,
            ticketNo: transfer.ticketNumber,
            device: transfer.device.serialNumber,
            subject: transfer.subCategory.category.description,
            ticketId: processVars.ticketId,


        }));
    }
    componentDidMount() {
        this.actualMountAsync();
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        //ticketStore.sendMessage(messagedata, this.state.taskId);
        console.log('this.state.confirm ', this.state.confirm)

        const params = {
            outcome: this.state.confirm 
        };

        await restServices.miliki_FrontendBprocService.completeTask(getCubaREST())(params);
        try {
            if (e.target.value === 'confirm') {
                notify.show('Transfer Approved Successfully', 'success', 3000);
            } 
            notify.show('Action will be reviewed', 'warning', 3000);
            //history.push('/inbox');
        } catch (error) {
            notify.show('An Error has occurred, try again', 'error', 3000);
        }
    };

    render() {
        const messageData = toJS(ticketStore.messages);
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <Col span={10} offset={7}>
            <div style={{margin:'0 auto'}}>
                <Form
                    onSubmit={this.handleSubmit}
                    className="consignment-details"
                    layout="vertical"
                    colon={false}
                >
                    <div className="pageTitles">
                        
                            <div className="text">
                                <h3 style={{ color: 'red', display:'inline-block' }}>
                                    <Input
                                        style={{ fontWeight: 'bold', color: '#DA0000' }}
                                        size="large"
                                        disabled
                                        value={this.state.ticketNo}
                                        required
                                    />
                                </h3>
                                <h4 style={{ color: '#DC3545', marginTop: '30px' }}>
                                    Ticket Information
                                </h4>
                                </div>
                            <div className="detailsPanel">
                                <Col span={30}>
                                    <div className="details">
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Status : </h5>
                                            <h6
                                                className="ticketData"
                                                style={{ marginLeft: 'auto' }}
                                            >
                                                <Input
                                                    disabled
                                                    value={this.state.category}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Help Type :</h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    disabled
                                                    value={this.state.description}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Subject :</h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    disabled
                                                    value={this.state.subject}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Device Serial Number :</h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    disabled
                                                    value={this.state.device}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                    </div>
                                    
                                </Col>
                                
                            </div>
                            <Row>
                           
                            </Row>
                            <Col span={24}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size= "large"
                                          onClick = {()=>(
                                            history.push({
                                               
                                                pathname: `/checkAssignedTicket/${this.state.ticketId}`,
                                                state: {ticketId:this.state.ticketId, processInstanceId:this.state.processInstanceId},
                                        })
                                          )}
                                        style={{float:'right' ,width:'200px',textAlign: 'center',marginTop:'5em' }}
                                        //disabled={this.state.checked === ''}
                                    >
                                       Next
                                    </Button>
                                    </Col>
                    </div>
                </Form>
            </div>
            </Col>
        );
    }
}
export default observer(confirmAssignedTicket );
