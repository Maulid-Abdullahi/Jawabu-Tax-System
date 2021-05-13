import { observable, runInAction } from 'mobx';
import { BASE_URL } from '../../configs';
import axios from 'axios';
import { Button} from 'antd';

export const columns = [
    {
        title: 'Vat Number',
        dataIndex: 'vatNo',
        key: 'vatNo',
    },
    {
        title: 'Name',
        dataIndex: '_entityName',
        key: '_entityName',
    },
    {
        title: 'Business Name',
        dataIndex: '_instanceName',
        key: '_instanceName',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Pin',
        dataIndex: 'tin',
        key: 'tin',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        // render: (record) => record.id,
    },

    {
        title: 'Contact Details',
        dataIndex: '',
        key: 'x',
        render: () => (
            <a>
                <Button>
                    <i className="fa fa-eye" aria-hidden="true">
                        <p>view</p>
                    </i>
                    </Button> 
            </a>
        ),
    },
];
export const traderDetails =  observable( {
    isTraderDetailsLoading:false,
    traders :[],
    selectedTrader :{},

    isModalOpened :false,


    async fetchTrader() {
        this.isTraderDetailsLoading = true;
        this.traders = await fetchTrader();
        runInAction(()=>{
            this.isTraderDetailsLoading = false;
        })

    },

    onViewItem (itemData){
        this.selectedTrader = itemData;
        this.isModalOpened = true;
        },
        onClosedModal(){
        this.isModalOpened = false;
        },

})

async function fetchTrader() {
    const token = localStorage.getItem('access_token');

    const trResp = await axios.get(`${BASE_URL}/app/rest/v2/entities/miliki_Trader`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(trResp);

    return trResp.data;
}
