import { Ticket } from '../../../sdk/miliki-frontend/entities/miliki_Ticket';
import { TicketMessageLog } from '../../../sdk/miliki-frontend/entities/miliki_TicketMessageLog';
import { runInAction, toJS, observable } from 'mobx';
import { getCubaREST } from '@cuba-platform/react-core';
import { notify } from 'react-notify-toast';
import { BASE_URL } from '../../../configs';
import axios from 'axios';

export const ticketStore = observable({
    categoryData: null,
    subCategoryData: null,
    ticketsDataIsLoading: true,
    subCategoryDataIsLoading: true,
    selectedCategoryClass: null,
    selectedCategoryId: null,
    isSubmittingLoading: false,
    ticketData: null,
    isMessagesLoading: false,
    messages: [],
    isSendingMessage: false,
    resolveButtonData:[],
    selectedMessage:[],
    selectedLevel:[],
    selectedLevelData:[{}],

    disableButton: false,

    disableBlockButton: false,
    comment:[],
    disableLevel: false,
   
    async fetchTickets() {
        try {
            this.ticketsDataIsLoading = true;
            this.ticketsData = await getCubaREST().loadEntities(Ticket.NAME, {
                view: 'ticket-view-all',
                sort: 'createTs',
            });
            console.log(toJS(this.ticketsData));
            runInAction(() => {
                this.ticketsDataIsLoading = false;
            });
        } catch (error) {
            notify.show('Error, unable to load tickets', 'error');
            console.log(error);
        }
    },
    async getTicket(ticketId) {
        try {
            this.ticketsDataIsLoading = true;
            this.ticketData = await getCubaREST().loadEntity(Ticket.NAME, ticketId, {
                view: 'ticket-view-all',
            });
            runInAction(() => {
                this.ticketsDataIsLoading = false;
            });
        } catch (error) {
            notify.show('Error, unable to load ticket', 'error');
            console.log(error);
        }
    },
    async getMessages(ticketId) {
        try {
            this.isMessagesLoading = true;
            this.messages = await getCubaREST().searchEntities(
                TicketMessageLog.NAME,
                {
                    conditions: [
                        {
                            property: 'ticket.id',
                            operator: '=',
                            value: `${ticketId}`,
                        },
                    ],
                },
                { view: 'ticketMessageLog-view' }
            );
            runInAction(() => {
                this.isMessagesLoading = false;
            });
        } catch (error) {
            notify.show('Error, unable to load messages', 'error');
        }
    },
    async sendMessage(message, id) {
       const token = localStorage.getItem('access_token');
        try {
            this.isSendingMessage = true;
            await axios.post(`${BASE_URL}/app/rest/v2/services/miliki_TicketService/replyTicket`, {
                ticketId: id,
                message: message,
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
            notify.show('Message sent', 'success');
            runInAction(() => {
                this.isSendingMessage = false;
            });
        } catch (error) {
            notify.show('Sending message failed', 'error');
        }
    },
});
