import React from 'react';
import ls from 'local-storage';
import Form from '../Form/Form';
const edit = (props) => {
    return (
        <div>
            <Form property={ls.get('property')}/>
        </div>
    )
}

export default edit;
