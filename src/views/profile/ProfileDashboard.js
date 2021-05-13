import React from 'react';
import './profileDashboard.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faLock, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import '../pages/login/preLoginStore';

function ProfileDashboard() {
    return (
        <div className="container">
            { localStorage.getItem('IsTechnician') ? (
                <div className="container">
                    <h2 style={{ textAlign: 'center', color: '#002868cb' }}>
                        Hi ,{localStorage.getItem('technician-name')}
                    </h2>
                    <h4 style={{ textAlign: 'center', color: '#002868cb' }}>
                        You can manage your personal details here.
                    </h4>
                    <div className="dashboard">
                        <div className="profileCard">
                            <p>
                                <FontAwesomeIcon
                                    style={{ textAlign: 'center', fontSize: '80' }}
                                    icon={faLock}
                                    aria-hidden="true"
                                />
                            </p>

                            <h4>Security</h4>
                            <p>Manage your passwords and other security configurations</p>
                            <Link to="/technician/changepassword">
                                <h5>Manage Security</h5>
                            </Link>
                        </div>
                        <div className="profileCard" style={{ textAlign: 'center' }}>
                            <p>
                                <FontAwesomeIcon
                                    style={{ textAlign: 'center', fontSize: '80' }}
                                    icon={faAddressBook}
                                    aria-hidden="true"
                                />
                            </p>

                            <h4>Personal Information</h4>
                            <p>View and edit your personal information(Email,Phone number)</p>
                            <Link to="/technician/profileInfo">
                                <h5>Manage Personal info</h5>
                            </Link>
                        </div>
                        <div className="profileCard" style={{ textAlign: 'center' }}>
                            <p>
                                <FontAwesomeIcon
                                    style={{ textAlign: 'center', fontSize: '80' }}
                                    icon={faUser}
                                    aria-hidden="true"
                                />
                            </p>
                            <h4> Users</h4>
                            <p>Add, edit or remove your users</p>
                            <br />

                            <Link to="">
                                <h5>Manage Users</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <h2 style={{ textAlign: 'center', color: '#002868cb' }}>
                        Hi ,{localStorage.getItem('supplier-name')}
                    </h2>
                    <h4 style={{ textAlign: 'center', color: '#002868cb' }}>
                        You can manage your personal details here.
                    </h4>
                    <div className="dashboard">
                        <div className="profileCard">
                            <p>
                                <FontAwesomeIcon
                                    style={{ textAlign: 'center', fontSize: '80' }}
                                    icon={faLock}
                                    aria-hidden="true"
                                />
                            </p>

                            <h4>Security</h4>
                            <p>Manage your passwords and other security configurations</p>
                            <Link to="/technician/changepassword">
                                <h5>Manage Security</h5>
                            </Link>
                        </div>
                        <div className="profileCard" style={{ textAlign: 'center' }}>
                            <p>
                                <FontAwesomeIcon
                                    style={{ textAlign: 'center', fontSize: '80' }}
                                    icon={faAddressBook}
                                    aria-hidden="true"
                                />
                            </p>

                            <h4>Personal Information</h4>
                            <p>View and edit your personal information(Email,Phone number)</p>
                            <Link to="/technician/profileInfo">
                                <h5>Manage Personal info</h5>
                            </Link>
                        </div>
                        <div className="profileCard" style={{ textAlign: 'center' }}>
                            <p>
                                <FontAwesomeIcon
                                    style={{ textAlign: 'center', fontSize: '80' }}
                                    icon={faUser}
                                    aria-hidden="true"
                                />
                            </p>
                            <h4> Users</h4>
                            <p>Add, edit or remove your users</p>
                            <br />

                            <Link to="">
                                <h5>Manage Users</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDashboard;
