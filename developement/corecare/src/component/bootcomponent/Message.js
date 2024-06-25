
import React, { useRef } from 'react';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
// import '../../../node_modules/primeflex/primeflex.css';                          // PrimeFlex

import './message.css';

export default function Message() {
    const msgs = useRef(null);
    const stateList = ['success', 'info', 'warn', 'error'];
    // const iconsList = ['pi pi-send',];
    useMountEffect(() => {
        if (msgs.current) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: stateList[0], detail: 'Info message' },
            ]);
        }
    });

    return (
        <div className="card flex justify-content-center">
            <Messages ref={msgs} />
        </div>
    )
}
