import React, { useState } from 'react';
import axios from 'axios';
import './UpdateServerForm.css'; // Import the CSS file

const UpdateServerForm = () => {
    const [serverId, setServerId] = useState('');
    const [serverName, setServerName] = useState('');
    const [active, setActive] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/servers', {
                serverId,
                serverName,
                active,
                studentName,
                studentEmail
            });

            setMessage(response.data);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error inserting server data');
        }
    };

    return (
        <div className="update-server-form">
            <h2>Update Server Information</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="serverId">Server ID:</label>
                    <input
                        id="serverId"
                        type="text"
                        value={serverId}
                        onChange={(e) => setServerId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="serverName">Server Name:</label>
                    <input
                        id="serverName"
                        type="text"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="active">Active:</label>
                    <input
                        id="active"
                        type="checkbox"
                        checked={active}
                        onChange={() => setActive(!active)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="studentName">Student Name:</label>
                    <input
                        id="studentName"
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="studentEmail">Student Email:</label>
                    <input
                        id="studentEmail"
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Update Server</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default UpdateServerForm;
