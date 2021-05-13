import { Component } from 'react';
import './inbox.scoped.scss';
import RequisitionApprovalForm from './requisitionApprovalForm';
import ConsignmentApprovalForm from './consignmentApprovalForm';
import ApproveTransferForm from './approveTransferForm';
import AssignTicketForm from './AssignTicketForm';
import CheckAssignTicket from './checkAssignedTicket';
import EnterResponse from './EnterResponse';
import SimcardApprovalForm from './SimcardApprovalForm';
class InboxDetails extends Component {
    render() {
        //console.log('this.props.history.location.state', this.props.history.location.state)
        return (
            <>
                <h1>Task: {this.props.history.location.state.inboxDetail.name}</h1>
                {
                    
                    (() => {
                        switch (this.props.history.location.state.inboxDetail.name) {
                            case 'Approve Requisition':
                                return <RequisitionApprovalForm {...this.props} />;
                                case 'Approve SIM Cards':
                                return <SimcardApprovalForm {...this.props} />;
                            case 'Consignment Received, approved and uploaded':
                                return <ConsignmentApprovalForm {...this.props} />;
                            case 'Supplier approve transfer':
                                return <ApproveTransferForm {...this.props} />;
                                case 'Assign ticket':
                                    return <AssignTicketForm {...this.props} />;
                                    case 'Register, assess device to determine level and assign':
                                    return <CheckAssignTicket {...this.props} />;
                                    case 'Enter Response':
                                    return <EnterResponse {...this.props} />;
                            default:
                                return <p>Task Not Available</p>
                        }
                    })()
                }
                </>
        );
    }
}

export default InboxDetails;
