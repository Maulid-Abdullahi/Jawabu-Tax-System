import React from 'react';
import { Result, Button } from 'antd';
import { observer } from 'mobx-react';
import { CImg } from '@coreui/react';
import history from '../../helpers/routeUtils';

function Successful() {
    function handleSubmit() {
        history.push('/new-task');
    }

    return (
        <div>
            <Result
                icon={[
                    <CImg
                        src={'images/successfulpageicon.svg'}
                        className={{ height: '10px', width: '10px' }}
                        alt="admin@bootstrapmaster.com"
                    />,
                ]}
                status="success"
                title="Successfully Onboarded"
                subTitle="The Tax Payer has been successfully Onboarded, Kindly wait the approval"
                extra={[
                    <Button style={{ fontWeight: 'bold', padding:'5px' }} onClick={handleSubmit}>
                        <p>Thank You</p>
                    </Button>,
                ]}
            />
            ,
        </div>
    );
}

export default observer(Successful);
