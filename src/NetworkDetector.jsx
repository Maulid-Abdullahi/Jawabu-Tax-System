/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from 'react';
import { notify } from 'react-notify-toast';

export default function (ComposedComponent) {
    class NetworkDetector extends Component {
        state = {
            isDisconnected: false,
        };

        componentDidMount() {
            this.handleConnectionChange();
            window.addEventListener('online', this.handleConnectionChange);
            window.addEventListener('offline', this.handleConnectionChange);
        }

        componentWillUnmount() {
            window.removeEventListener('online', this.handleConnectionChange);
            window.removeEventListener('offline', this.handleConnectionChange);
        }

        handleConnectionChange = () => {
            const condition = navigator.onLine ? 'online' : 'offline';
            if (condition === 'online') {
                const webPing = setInterval(() => {
                    fetch('//google.com', {
                        mode: 'no-cors',
                    })
                        .then(() => {
                            this.setState({ isDisconnected: false }, () => {
                                return clearInterval(webPing);
                            });
                        })
                        .catch((error) => console.log(error));
                }, 2000);
                return;
            }

            return this.setState({ isDisconnected: true });
            // let xhr = new XMLHttpRequest();
            // return new Promise((resolve, reject) => {
            //      xhr.open('GET', 'https://www.google.com', true);
            //      xhr.onload = () => {
            //          // Set online status
            //         this.setState({ isDisconnected: false });
            //         resolve(true);
            //      };
            //      xhr.onerror = () => {
            //          // Set online status
            //          this.setState({ isDisconnected: true });
            //          reject(false);
            //      };
            //      xhr.send();
            //  });
        };

        render() {
            const { isDisconnected } = this.state;
            return (
                <>
                    {isDisconnected && notify.show('Internet connection lost', 'warning')}
                    {/* {!isDisconnected && notify.show('Back Online', 'success',2000)} */}
                    <ComposedComponent {...this.props} />
                </>
            );
        }
    }

    return NetworkDetector;
}
