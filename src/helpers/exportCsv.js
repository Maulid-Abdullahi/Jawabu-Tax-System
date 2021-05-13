import React from 'react';
import * as FileSaver from 'file-saver';
import { Button, Icon } from 'antd';
import { CUBA_URL } from '../configs';
import { observable } from 'mobx';
import axios from 'axios';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';

export const exportCsvStore = observable({
    reportId: '',
    inputParams: [],
    apiData: [],
    fileName: '',
    contentType: '',
    isSelected: false,

    async fetchReports(type) {
        const reportData = await axios.get(`${CUBA_URL}reports/v1/report`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });

        for (const report of reportData.data) {
            if (report.code === `${type}`) {
                const getInputParams = await axios.get(
                    `${CUBA_URL}reports/v1/report/${report.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        },
                    }
                );
                this.inputParams = getInputParams;
                this.reportId = report.id;
            }
        }
    },
    async getReportCsv(reportId, params) {
        let ret = {}
        const response = await axios
            .post(
                `${CUBA_URL}reports/v1/run/${reportId}`,
                {
                    parameters: [
                        {
                            name: 'entities',
                            values: params,
                        },
                    ],
                },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    responseType: 'blob',
                    observe: 'response',
                }
            )


            if (response){
                for (const values in response.headers) {
                    if (values === 'content-disposition') {
                       // console.log('Keys', values + 'Values' + response.headers[values]);
                        let fileName = /filename=\"?([^;"]+)\"?;?/g.exec(
                            response.headers[values]
                        );
                        ret.fileName = fileName[1];
                    }
                    if (values === 'content-type') {
                        ret.contentType = response.headers[values];
                    }
                }
                ret.blob = response.data;
                ret.success = true;

                return ret
            }
            ret.success = false;
            return ret;

    },
});



const buttonState = observable({
    loading:false
});


export const ExportToExcel = observer(({ apiData, params, id,isSelected }) => {
    //console.log('params***',params);
    const exportToCSV = async (apiData) => {
        buttonState.loading = true;
        const ret = await exportCsvStore.getReportCsv(id, params);
        buttonState.loading = false;
        //console.log(ret);

        var blob = new Blob([ret.blob], { type: ret.contentType });
        FileSaver.saveAs(blob, ret.fileName);
        //console.log(ret.fileName);
    };

    return (
        <div>
            <Button
                size="default"
                loading={buttonState.loading}
                onClick={(e) => exportToCSV(apiData, id)}
                style={{
                    background: '#2FF3E0 ',
                    color: 'black',
                    marginRight: '10px',
                    float: 'right',
                    color: '',
                }}
            >
                <Icon type="download" />
                {exportCsvStore.isSelected ? "ExportSelected" : "ExportAll"}
            </Button>
        </div>
    );
});
