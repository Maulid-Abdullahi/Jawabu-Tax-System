import React from 'react';
import { Form, Row, Col } from 'antd';
import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { taxPayerStore } from './taxPayerStore';
import { toJS } from 'mobx';
import './profile.scss';
import { notify } from 'react-notify-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values3) => {
            if (!err) {
            }
        });
    };

    componentDidMount() {
        // console.log('toJS(taxPayerStore.loggedInTaxPayerDetails)',toJS(taxPayerStore.TechData))
        taxPayerStore.getDataDetails();
    }

    render() {
        try {
            const { getFieldDecorator } = this.props.form;
            const data = taxPayerStore.TechData;
            return (
                <>
                    <div
                        className="mainContainer"
                        style={{ width: '80%', margin: '0 auto', marginBottom: '5%' }}
                    >
                        <Form onSubmit={this.handleSubmit}>
                           {data.isTechnician ? (
                                <div>
                                <div style={{ textAlign: 'center' }}>
                                    <h2
                                        style={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: '#002868cb',
                                        }}
                                    >
                                        My Profile
                                    </h2>
                                    <FontAwesomeIcon
                                        style={{ textAlign: 'center', fontSize: '100' }}
                                        icon={faUserCircle}
                                        aria-hidden="true"
                                    />
    
                                    <h4 style={{ fontWeight: '700', marginTop: '3%' }}>
                                        {!data.technician
                                            ? 'Not Available'
                                            : `${data.technician.email}`}
                                    </h4>
                                </div>
                                <br />
    
                                <Row>
                                    <div>
                                        {' '}
                                        <Typography>
                                            <h4
                                                style={{
                                                    color: 'white',
                                                    backgroundColor: '#003C9B',
                                                    padding: '5px',
                                                    // paddingLeft: '10%',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Edit Profile
                                            </h4>
                                        </Typography>
                                    </div>
                                </Row>
                                <div className="profileDetails">
                                    <Row gutter={[0, 24]}>
                                        {' '}
                                        <Col span={24}>
                                            <div className="userProfile">
                                                <h5>TIN</h5>
                                                <h6>
                                                    {!data.technician
                                                        ? 'Not Available'
                                                        : `${data.technician.tin}`}
                                                </h6>
                                            </div>
                                        </Col>{' '}
                                    </Row>
                                    <Row gutter={[0, 24]}>
                                        {' '}
                                        <Col span={24}>
                                            <div className="userProfile">
                                                <h5>ID Number</h5>
                                                <h6>
                                                    {!data.technician
                                                        ? 'Not Available'
                                                        : `${data.technician.idNumber}`}
                                                </h6>
                                            </div>
                                        </Col>{' '}
                                    </Row>
                                    <Row gutter={[0, 24]}>
                                        {' '}
                                        <Col span={24}>
                                            <div className="userProfile">
                                                <h5>First Name</h5>
                                                <h6>
                                                    {!data.technician
                                                        ? 'Not Available'
                                                        : `${data.technician.firstName}`}
                                                </h6>
                                            </div>
                                        </Col>{' '}
                                    </Row>
                                    <Row gutter={[0, 24]}>
                                        {' '}
                                        <Col span={24}>
                                            <div className="userProfile">
                                                <h5>Last Name</h5>
                                                <h6>
                                                    {!data.technician
                                                        ? 'Not Available'
                                                        : `${data.technician.lastName}`}
                                                </h6>
                                            </div>
                                        </Col>{' '}
                                    </Row>
                                    <Row gutter={[0, 24]}>
                                        {' '}
                                        <Col span={24}>
                                            <div className="userProfile">
                                                <h5>Phone Number</h5>
                                                <h6>
                                                    {!data.technician
                                                        ? 'Not Available'
                                                        : `${data.technician.phone}`}
                                                </h6>
                                            </div>
                                        </Col>{' '}
                                    </Row>
                                    <Row gutter={[0, 24]}>
                                        {' '}
                                        <Col span={24}>
                                            <div className="userProfile">
                                                <h5>Education Level</h5>
                                                <h6>
                                                    {!data.technician
                                                        ? 'Not Available'
                                                        : `${data.technician.educationLevel}`}
                                                </h6>
                                            </div>
                                        </Col>{' '}
                                    </Row>
                                </div>
    
                                <div style={{ float: 'right', margin: '20px 0' }}>
                                    {/* <Button type="primary" variant="contained" htmlType="submit">
                                        Update
                                    </Button> */}
                                </div>
                                </div>
                           ):(
                            <div>
                            <div style={{ textAlign: 'center' }}>
                                <h2
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: '#002868cb',
                                    }}
                                >
                                    My Profile
                                </h2>
                                <FontAwesomeIcon
                                    style={{ textAlign: 'center', fontSize: '100' }}
                                    icon={faUserCircle}
                                    aria-hidden="true"
                                />

                                <h4 style={{ fontWeight: '700', marginTop: '3%' }}>
                                    {!data
                                        ? 'Not Available'
                                        : `${data.email}`}
                                </h4>
                            </div>
                            <br />

                            <Row>
                                <div>
                                    {' '}
                                    <Typography>
                                        <h4
                                            style={{
                                                color: 'white',
                                                backgroundColor: '#003C9B',
                                                padding: '5px',
                                                // paddingLeft: '10%',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Edit Profile
                                        </h4>
                                    </Typography>
                                </div>
                            </Row>
                            <div className="profileDetails">
                                <Row gutter={[0, 24]}>
                                    {' '}
                                    <Col span={24}>
                                        <div className="userProfile">
                                            <h5>Name</h5>
                                            <h6>
                                                {!data.supplier
                                                    ? 'Not Available'
                                                    : `${data.supplier.name}`}
                                            </h6>
                                        </div>
                                    </Col>{' '}
                                </Row>
                                <Row gutter={[0, 24]}>
                                    {' '}
                                    <Col span={24}>
                                        <div className="userProfile">
                                            <h5>Tenant Id</h5>
                                            <h6>
                                                {!data
                                                    ? 'Not Available'
                                                    : `${data.sysTenantId}`}
                                            </h6>
                                        </div>
                                    </Col>{' '}
                                </Row>
                                {/* <Row gutter={[0, 24]}>
                                    {' '}
                                    <Col span={24}>
                                        <div className="userProfile">
                                            <h5>First Name</h5>
                                            <h6>
                                                {!data.technician
                                                    ? 'Not Available'
                                                    : `${data.supplier.name}`}
                                            </h6>
                                        </div>
                                    </Col>{' '}
                                </Row>
                                <Row gutter={[0, 24]}>
                                    {' '}
                                    <Col span={24}>
                                        <div className="userProfile">
                                            <h5>Last Name</h5>
                                            <h6>
                                                {!data.technician
                                                    ? 'Not Available'
                                                    : `${data.supplier.lastName}`}
                                            </h6>
                                        </div>
                                    </Col>{' '}
                                </Row>
                                <Row gutter={[0, 24]}>
                                    {' '}
                                    <Col span={24}>
                                        <div className="userProfile">
                                            <h5>Phone Number</h5>
                                            <h6>
                                                {!data.technician
                                                    ? 'Not Available'
                                                    : `${data.supplier.phone}`}
                                            </h6>
                                        </div>
                                    </Col>{' '}
                                </Row>
                                <Row gutter={[0, 24]}>
                                    {' '}
                                    <Col span={24}>
                                        <div className="userProfile">
                                            <h5>Education Level</h5>
                                            <h6>
                                                {!data.technician
                                                    ? 'Not Available'
                                                    : `${data.supplier.educationLevel}`}
                                            </h6>
                                        </div>
                                    </Col>{' '}
                                </Row> */}
                            </div>
                            <div style={{ float: 'right', margin: '20px 0' }}>
                                {/* <Button type="primary" variant="contained" htmlType="submit">
                                    Update
                                </Button> */}
                            </div>
                            </div>
                           )}
                        </Form>
                    </div>
                </>
            );
        } catch (e) {
            notify.show(
                'Error, unable to load user details , check your internet connection',
                'error'
            );
        }
    }
}

export default Form.create()(observer(NormalLoginForm));
