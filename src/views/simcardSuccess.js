import {Button} from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import './success.scss';

export default function SuccessComponent(props) {
    return (
        <div className="success-component">
            <h2>Request Successful</h2>
            <img src="logos/checked.svg" alt="success-logo" className="success-logo" />
            <h2>Simcard requested successfully</h2>
            <h3>{localStorage.getItem('requisition-key')}</h3>
            <Link to="/inbox" >
                <Button
                    variant="contained"
                    type="primary"
                >
                    Okay
                </Button>
            </Link>
        </div>
    )
}
