import React, { useState } from 'react';
import axios from 'axios';
import { Nav } from '../components/Nav'

export const Add = () => {
  const [formData, setFormData] = useState({
    svrUID: '',
    appUID: '',
    srcName: '',
    srcIP: '',
    destName: '',
    destIP: '',
    port: '',
    ipStatus: '',
    createdAt: '',
    createdBy: '',
    modifiedAt: '',
    modifiedBy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/serverinfos', formData);
      alert('Data added successfully!');
      setFormData({
        svrUID: '',
        appUID: '',
        srcName: '',
        srcIP: '',
        destName: '',
        destIP: '',
        port: '',
        ipStatus: '',
        createdAt: '',
        createdBy: '',
        modifiedAt: '',
        modifiedBy: ''
      });
    } catch (error) {
      console.error('Error adding data:', error);
      alert('An error occurred while adding data.');
    }
  };

  return (
      <div className="add-page">
        <><Nav /></>
        <h1>Add Data</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="svrUID" value={formData.svrUID} onChange={handleChange} placeholder="Server UID" />
          <input type="text" name="appUID" value={formData.appUID} onChange={handleChange} placeholder="App UID" />
          <input type="text" name="srcName" value={formData.srcName} onChange={handleChange} placeholder="Src. Host Name" />
          <input type="text" name="srcIP" value={formData.srcIP} onChange={handleChange} placeholder="Src. IP" />
          <input type="text" name="destName" value={formData.destName} onChange={handleChange} placeholder="Dest. Host Name" />
          <input type="text" name="destIP" value={formData.destIP} onChange={handleChange} placeholder="Dest. IP" />
          <input type="text" name="port" value={formData.port} onChange={handleChange} placeholder="Port #" />
          <input type="text" name="ipStatus" value={formData.ipStatus} onChange={handleChange} placeholder="Status" />
          <input type="text" name="createdAt" value={formData.createdAt} onChange={handleChange} placeholder="Created At" />
          <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="Created By" />
          <input type="text" name="modifiedAt" value={formData.modifiedAt} onChange={handleChange} placeholder="Modified At" />
          <input type="text" name="modifiedBy" value={formData.modifiedBy} onChange={handleChange} placeholder="Modified By" />
          <button type="submit">Submit</button>
        </form>
      </div>
  );
};