import { React, Component } from 'react';
import { DatePicker, Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './dashboard.scss';
import deviceStore from '../devices/deviceStore';
import { observer } from 'mobx-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import moment from 'moment';

const taskcardimage = {
    position: 'absolute',
    left: '0px',
    bottom: '0px',
};

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = { start: '', disabled: true };
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    handleStartDate(date, dateString) {
        this.setState({ start: dateString, disabled: false });
    }
    handleEndDate(date, dateString) {
        if (this.state.start !== '' || dateString !== '') {
            this.makeApiCall(this.state.start, dateString);
        } else {
            console.log('No changes');
        }
    }

    makeApiCall(start, end) {
        console.log('+============================', start, end);
    }

    //  componentWillUpdate(){
    //      console.log(this.state)
    //    }

    deviceStatusReport = {
        labels: ['Instore', 'Sold', 'Under Repair', 'Blocked', 'Lost', 'Damaged'],
        datasets: [
            {
                label: 'Device Status',
                backgroundColor: ['#3598DC', '#00A651', '#FF8503', '#DB3444', '#606060', '#A27EA8'],
                borderColor: 'rgba(0,0,0,1)',

                data: [4, 20, 81, 56, 60, 81],
                barThickness: 18,
            },
        ],
    };

    ticketReports = {
        labels: ['Raised', 'Resolved', 'Assigned', 'Closed'],
        datasets: [
            {
                label: 'Reported Issues',
                backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
                data: [65, 59, 80, 81],
            },
        ],
    };
    deviceModelByClass = {
        labels: ['Type A', 'Type B', 'Type C'],
        datasets: [
            {
                label: 'Device Status',
                backgroundColor: ['#3598DC', '#00A651', '#FF8503'],
                data: [4, 20, 60],
            },
        ],
    };

    simcardReports = {
        labels: ['In Store', 'Sold', 'Blocked', 'Damaged'],
        datasets: [
            {
                label: 'Sim Card Reports',
                backgroundColor: ['#7AA3E5', '#00A651', '#DB3444', '#A8385D'],
                data: [65, 59, 80, 81],
                barThickness: 18,
            },
        ],
    };
    technicianReports = {
        labels: ['Active', 'Flagged', 'Blocked'],
        datasets: [
            {
                label: 'Technician Reports',
                backgroundColor: ['#7AA3E5', '#A8385D', '#DB3444'],
                data: [65, 59, 80],
                barThickness: 18,
            },
        ],
    };

    render() {
        return (
            <div className="mainDashboardLayout">
                <div className="cardLayout">
                    <Link to ="/report/modal" className="card1 effect">
                        <div>
                            <img
                                style={taskcardimage}
                                src="logos/SVG miliki supplier/Device Transfer.svg"
                                alt="device-transfer-logo"
                            />
                            <h1> 40000 </h1>
                            <p>Device Models</p>
                        </div>
                    </Link>
                    <Link to= "/report/simcard" className="card2 effect">
                        <div>
                            <img
                                style={taskcardimage}
                                src="logos/SVG miliki supplier/SIM Card Requisition.svg"
                                alt="device-transfer-logo"
                            />
                            <h1> 300000 </h1>
                            <p>Sim Cards </p>
                        </div>
                    </Link>
                    <Link to="/device/inventory" className="card3 effect">
                        <div>
                            <img
                                style={taskcardimage}
                                src="logos/SVG miliki supplier/Device requistition.svg"
                                alt="device-transfer-logo"
                            />
                            <h1> 300000 </h1>
                            <p>Devices</p>
                        </div>
                    </Link>
                    <Link to ="/technician/technicians" className="card4 effect">
                        <div>
                            <img
                                style={taskcardimage}
                                src="logos/SVG miliki supplier/Technician Onboarding.svg"
                                alt="device-transfer-logo"
                            />
                            <h1> 300000 </h1>
                            <p>Technicians</p>
                        </div>
                    </Link>
                    <Link className="card5 effect">
                        <div>
                            <img
                                style={taskcardimage}
                                src="logos/SVG miliki supplier/Reports.svg"
                                alt="device-transfer-logo"
                            />
                            <h1> 300000 </h1>
                            <p>New Tickets</p>
                        </div>
                    </Link>
                    <Link className="card6 effect">
                        <div>
                            <img
                                style={taskcardimage}
                                src="logos/SVG miliki supplier/Technician Onboarding.svg"
                                alt="device-transfer-logo"
                            />
                            <h1> 300000 </h1>
                            <p>Taxpayers Onboarded</p>
                        </div>
                    </Link>
                </div>
                <div className="date-filters">
                    <p style={{ display: 'inline', color: 'red' }}>Filter By Date</p>
                    <Col span={24}>
                        <DatePicker
                            onChange={this.handleStartDate}
                            name="start"
                            format="DD-MM-YYYY"
                            placeholder="Start"
                            defaultValue={moment()}
                            ref={(dateSelect) => {
                                this.dateSelect = dateSelect;
                            }}
                            disabledDate={(current) => {
                                return moment().add(0, 'days') <= current;
                            }}
                            style={{ width: '12em', marginRight: '2em' }}
                        />
                        <DatePicker
                            disabled={this.state.disabled}
                            onChange={this.handleEndDate}
                            name="end"
                            format="DD-MM-YYYY"
                            placeholder="End"
                            defaultValue={moment()}
                            ref={(dateSelect) => {
                                this.dateSelect = dateSelect;
                            }}
                            disabledDate={(current) => {
                                return moment().add(0, 'days') <= current;
                            }}
                            style={{ width: '12em', marginRight: '2em' }}
                        />
                    </Col>
                </div>
                <div className="charts">
                    <div className="graphs">
                        <h4> Device Status Reports </h4>
                        <Bar
                            data={this.deviceStatusReport}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                    <div className="graphs">
                        <h4> Ticket Reports </h4>

                        <Doughnut
                            data={this.ticketReports}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                            }}
                        />
                    </div>

                    <div className="graphs">
                        <h4> Device Models By Class </h4>

                        <Doughnut
                            data={this.deviceModelByClass}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                               
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                            }}
                        />
                    </div>

                    <div className="graphs">
                        <h4> Sim Card Reports </h4>

                        <Bar
                            data={this.simcardReports}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                               
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                            }}
                        />
                    </div>
                    <div className="graphs">
                        <h4> Technicians Reports </h4>

                        <Bar
                            data={this.technicianReports}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                               
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default observer(Dashboard);
