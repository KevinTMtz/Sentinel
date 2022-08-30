import React, { useEffect, useState } from 'react';

const Testing: React.FC = () => {

    const api_serverless = process.env.REACT_APP_API_V1 || 'https://r3rv8hwxce.execute-api.us-east-1.amazonaws.com/dev/v1';

    const [info, setInfo] = useState("")

    useEffect(() => {
        retrieveData()
      });

    function retrieveData(){
        fetch(api_serverless+'/node')
        .then(response => response.json())
        .then(data =>setInfo(data.name))
        .catch(() => setInfo("Error de permisos :("));
    }

    return (
        <h1>{info}</h1>
    )
}

export default Testing