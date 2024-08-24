
import React, { useRef } from 'react';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
// import '../../../node_modules/primeflex/primeflex.css';                          // PrimeFlex

// import './message.css';

export default function Message(props) {
    const msgs = useRef(null);
    const stateList = ['success', 'info', 'warn', 'error'];
    useMountEffect(() => {
        if (msgs.current) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: stateList[props.indexState], detail: props.message, closable: false },
            ]);
        }
    });

    return (
        <div className="card flex justify-content-center">
            <Messages ref={msgs} />
        </div>
    )
}
