import { Form, Input, Col, Row } from 'antd';
import React from 'react';
import { observer } from 'mobx-react';
import './tasks.scoped.scss';
import { Link } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import { cibWindows } from '@coreui/icons';

const { Search } = Input;
const roles = localStorage.getItem('roles');

class NewTask extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
   

    render() {
        return (
            <div className="">
                <div>
                   
                </div>
                <div className="cardContainer" style={{ margin: '20px auto' }}>
                    {roles.includes('TechnicianRestApiUser') ? (
                        ''
                    ) : (
                        <>
                        <Row>
                        <h1>Hi {localStorage.getItem('supplier-name')}</h1>
                         <h5>Kindly choose the task you would like to do.</h5>
                      
                        <Form.Item>
                            <Search
                                placeholder="Search an Entity (….Manufacturer, supplier, Technician)"
                                enterButton="Search"
                                size="large"
                                style = {{width:"500px"}}
                               // loading={traderStore.isSearchLoading}
                                onSearch={async (value) => {
                                   
                                    this.searchValue = value;
                                    
                                    try{
                                    this.props.form.setFieldsValue({
                                        
                                    });
                                }catch(e){
                                    notify.show('Please check your connection', "error");
                                    

                                }
                                }}
                            />
                        </Form.Item>
                    
                            <Col span={8}>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to="/device/onboarding"
                            >
                                <div className="taskcard-gray">
                                    <img
                                    className = "taskcard-image"
                                        src="logos/SVG miliki supplier/Device onboarding.svg"
                                        alt="certification-logo"
                                    />
                                    <h5>Device Model Onboarding</h5>
                                    <p>Select a manufacturer, Device type and other details to complete onboard a device...</p>
                                
                                    <h6>Onboarding</h6>
                                </div>
                            </Link>
                            </Col>
                            <Col span={8}>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to="/device/requisition"
                            >
                                <div className="taskcard-gray taskcard-white ">
                                    <img
                                     className = "taskcard-image"
                                        src="logos/SVG miliki supplier/Device requistition.svg"
                                        alt="requisition-logo"
                                    />
                                    <h5>Device Requisition</h5>
                                    <p>Select a manufacturer, Device type and other details to complete your Requisition...</p>
                                   
                                    <h6>Requisition</h6>
                                </div>
                            </Link>
                            </Col>
                            <Col span={8}>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to="/technician/onboard"
                            >
                                <div className="taskcard-gray">
                                    <img
                                     className = "taskcard-image"
                                        src="logos/SVG miliki supplier/Technician Onboarding.svg"
                                        alt="technician-onboarding-logo"
                                    />
                                    <h5>Technician Onboarding</h5>
                                    <p>Enter TIN to search the technician and other details to complete Onboarding...</p>
                                    <h6>Onboarding</h6>
                                </div>
                            </Link>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={8}>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to="/device/transfer"
                            >
                                <div className="taskcard-gray taskcard-white ">
                                    <img
                                      className = "taskcard-image"
                                        src="logos/SVG miliki supplier/Device Transfer.svg"
                                        alt="device-transfer-logo"
                                    />
                                    <h5>Device Transfer</h5>
                                    <p>Select a Supplier, select model and other details to complete Transfer...</p>
                                    <h6>Transfer</h6>
                                </div>
                            </Link>
                            </Col>
                            <Col span={8}>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to="sim/requisition"
                            >
                                <div className="taskcard-gray">
                                    <img
                                    className = "taskcard-image"
                                        src="logos/SVG miliki supplier/SIM Card Requisition.svg"
                                        alt="simcard-logo"
                                    />
                                    <h5>Sim Card Requisition</h5>
                                    <p>Select a supplier, mobile network and other details to complete Requisition...</p>
                                    <h6>Requisition</h6>
                                </div>
                            </Link>
                            </Col>
                            <Col span={8}>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to="/reports"
                            >
                                <div className="taskcard-gray taskcard-white ">
                                    <img
                                      className = "taskcard-image"
                                        src="logos/SVG miliki supplier/Reports.svg"
                                        alt="device-transfer-logo"
                                    />
                                    <h5>Reports</h5>
                                    <p>To see reports on your approved Devices, how you preform kindly have a look at your...</p>
                                    <h6>View Reports</h6>
                                </div>
                            </Link>
                            </Col>
                            </Row>
                            
                        </>
                    )}
                    {roles.includes('SupplierRestApiUser') ? (
                        ''
                    ) : (
                        <>
                        <Row>
                        <h1>Hi {localStorage.getItem('technician-name')}</h1>
                         <h5>Kindly choose the task you would like to do.</h5>
                      
                        <Form.Item>
                            <Search
                                placeholder="Search an Entity (….Manufacturer, supplier, Technician)"
                                enterButton="Search"
                                size="large"
                                style = {{width:"500px"}}
                               // loading={traderStore.isSearchLoading}
                                onSearch={async (value) => {
                                   
                                    this.searchValue = value;
                                    
                                    try{
                                    this.props.form.setFieldsValue({
                                       
                                    });
                                }catch(e){
                                    notify.show('Please check your connection', "error");
                                    // traderStore.isSearchLoading = false;


                                }
                                }}
                            />
                        </Form.Item>
                        <Col span={8}>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to="trader/onboarding"
                            >
                                <div className="taskcard-gray">
                                    <img
                                     className = "taskcard-image"
                                        src="logos/SVG miliki supplier/Technician Onboarding.svg"
                                        alt="technician-onboarding-logo"
                                    />
                                    <h5>Tax Payer Onboarding</h5>
                                    <p>Enter TIN to search the technician and other details to complete Onboarding...</p>
                                    <h6>Onboarding</h6>
                                </div>
                            </Link>
                            </Col>
                            <Col span={8} >
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to="/ticket/tickets"
                            >
                                <div className="taskcard-gray">
                                    <img
                                     className = "taskcard-image"
                                        src="logos/SVG miliki supplier/Technician Onboarding.svg"
                                        alt="technician-onboarding-logo"
                                    />
                                    <h5>Help Desk</h5>
                                    <p>To see reports and other issues...</p>
                                    <h6>help Desk</h6>
                                </div>
                            </Link>
                            </Col>
                            <Col span={8}>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to="/reports"
                            >
                                <div className="taskcard-gray taskcard-white ">
                                    <img
                                      className = "taskcard-image"
                                        src="logos/SVG miliki supplier/Reports.svg"
                                        alt="device-transfer-logo"
                                    />
                                    <h5>Reports</h5>
                                    <p>To see reports on your approved Devices, how you preform kindly have a look at your...</p>
                                    <h6>View Reports</h6>
                                </div>
                            </Link>
                            </Col>
                        </Row> 
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default Form.create()(observer(NewTask));
